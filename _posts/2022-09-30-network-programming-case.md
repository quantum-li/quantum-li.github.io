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