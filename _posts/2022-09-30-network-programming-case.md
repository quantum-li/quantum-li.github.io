---
title: 网络编程模型演进、语言封装与案例
categories:
- network
- c++
- java
description: 描述从c++中的基础网络编程到IO多路复用演进，redis对不通平台实现的封装，JAVA的网络编程模型与Netty的封装
permalink: "/posts/network-programming-case"
excerpt: 描述从c++中的基础网络编程到IO多路复用演进，redis对不通平台实现的封装，JAVA的网络编程模型与Netty的封装
---

+ [linux 仓库(次官方)](https://github.com/torvalds/linux)
+ [linux 仓库(主官方)](https://www.kernel.org)

c++网络编程模型有其标准的骨架。网络通信


```c++
#include <netinet/in.h>
#include <sys/socket.h>
#include <cstring>
#include <cstdio>
#include <unistd.h>

int main(){
    /*----socket----------------------------------------------------*/
    int serverfd = socket(AF_INET,SOCK_STREAM,0);
    /*----bind------------------------------------------------------*/
    struct sockaddr_in serveraddr;
    memset(&serveraddr,0,sizeof(serveraddr));
    serveraddr.sin_family=AF_INET;
    serveraddr.sin_addr.s_addr=htonl(INADDR_ANY);
    serveraddr.sin_port=htons(16555);
    bind(serverfd,(struct sockaddr*)&serveraddr,sizeof(serveraddr));
    /*----listen----------------------------------------------------*/
    listen(serverfd,10);
    /*----循环等待----------------------------------------------------*/
    int i=0;
    while(i<5){
        /*----accept------------------------------------------------*/
        int connfd = accept(serverfd,NULL,NULL);
        /*----recv--------------------------------------------------*/
        int BUFFSIZE = 500;
        char buff[BUFFSIZE];
        memset(&buff,0,sizeof(buff));
        recv(connfd,buff,BUFFSIZE-1,0);
        printf("收到：%s\n",buff);
        /*----send--------------------------------------------------*/
        char answer[]="服务端已响应";
        send(connfd,answer,strlen(answer),0);
        /*----close-------------------------------------------------*/
        close(connfd);
        i++;
    }
    close(serverfd);
    return 0;
}
```


```c++
#include <sys/socket.h>
#include <netinet/in.h>
#include <cstring>
#include <libc.h>

int main(){
    /*----socket----------------------------------------------------*/
    int clientfd = socket(AF_INET,SOCK_STREAM,0);
    /*----connect---------------------------------------------------*/
    struct sockaddr_in clientaddr;
    memset(&clientaddr,0,sizeof(clientaddr));
    clientaddr.sin_family=AF_INET;
    clientaddr.sin_addr.s_addr=inet_addr("127.0.0.1");
    clientaddr.sin_port=htons(16555);
    connect(clientfd,(struct sockaddr*)&clientaddr,sizeof(clientaddr));
    /*----send------------------------------------------------------*/
    int BUFFSIZE=500;
    char buff[BUFFSIZE];
    printf("请输入。。。");
    scanf("%s",buff);
    send(clientfd,buff,strlen(buff),0);
    memset(&buff,0,sizeof(buff));
    /*----recv------------------------------------------------------*/
    recv(clientfd,buff,BUFFSIZE-1,0);
    printf("%s\n",buff);
    /*----close-----------------------------------------------------*/
    close(clientfd);
    return 0;
}
```


## epoll

### 描述

+ [man7](https://man7.org/linux/man-pages/man7/epoll.7.html)
+ [c文件](https://github.com/torvalds/linux/blob/master/fs/eventpoll.c)

epoll API 可以监控多个文件描述符的I/O状态。epoll 有两种触发模式 `edge-triggered` 和 `level-triggered`。epoll 监控的描述符数量很多时，有比 select 和 poll 更好的性能。epoll API 的核心概念是 epoll 实例，从用户空间的角度看，epoll 实例可以被视为包含两个列表的容器：

+ interest 列表（或称为 epoll set）：进程注册的一组监控的文件描述符。
+ ready 列表：可以进行 I/O 读写的一组文件描述符。ready 列表是 interest 列表的子集，ready 列表内每项是对 interest 列表项的引用。ready 列表由内核从 interest 列表中挑出 I/O 状态就绪的文件描述符进行动态填充。

epoll实例由下列方法进行创建和管理：

+ [`epoll_create`](https://man7.org/linux/man-pages/man2/epoll_create.2.html) 创建一个 epoll 实例并返回这个实例的文件描述符 fd。（后来出现的 `[epoll_create1](https://man7.org/linux/man-pages/man2/epoll_create1.2.html)` 扩展了 `epoll_create` 的功能）
+ [`epoll_ctl`](https://man7.org/linux/man-pages/man2/epoll_ctl.2.html) 向 epoll 实例注册受监控的文件描述符。
+ [`epoll_wait`](https://man7.org/linux/man-pages/man2/epoll_wait.2.html) 等待 I/O 事件。如果没有任何就绪的 I/O 事件会阻塞调用线程。这个系统调用可以被认为是从 epoll 实例中的 ready 列表抓取文件描述符。


### Level-triggered (LT) 和 edge-triggered (ET)

epoll 的事件分发有 level-triggered (LT) 和 edge-triggered (ET) 两种行为模式。接下来描述两种机制的区别。假设发生如下事件：

1. 向 epoll 实例注册表示管道读取端（reader）的文件描述符（rfd）。
2. 管道写入端（writer）写入了 2KB 数据。
3. 调用 `epoll_wait` 并返回了I/O就绪的 rfd。
4. 管道读取端 1KB 的数据进行处理。
5. 此次 `epoll_wait` 调用处理完成。

如果 rfd 文件描述符在注册的时候使用了 EPOLLET (edge-triggered) 标志，则第 5 步调用结束后将不会再继续读取管道内剩下的 1KB 数据。尽管文件输入缓冲区内仍有数据可读取，同时写入方正在等待对于已经写入数据的响应。之所以会这样的原因是，edge-triggered 模式是在受监视的文件描述符发生变更时发出事件。因此第 2 步中只触发了一次事件，且在第 3 步把这个事件使用掉了。所以第 5 步即使管道中仍有数据，也会一直阻塞等待下一次事件发生。

如果应用使用 EPOLLET 标记应该同时使用非阻塞的文件描述符，以避免正在处理多个文件描述符的任务因阻塞在读或写而导致无数据可处理。并且，应该只有在 `read` 或 `write` 方法返回 EAGAIN 后再进入阻塞。

