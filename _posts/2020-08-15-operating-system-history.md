---
title: 操作系统发展史
categories:
- OS
- Operating System
description: 操作系统的发展历史，以及操作系统的演变。从1964年的Multics发展衍生出现在众多的操作系统版本，比如Windows、Linux、Mac OSX等。
permalink: "/posts/operating-system-history"
excerpt: 从大型机之后1964年由贝尔实验室、麻省理工学院及美国通用电气公司所共同参与研发的Multics开始，历史上出现了UNIX、BSD、AIX、HP-UX、Solaris、Minix、Linux、Mac OSX、Windows等众多版本众多分支的操作系统。
---

所有内容全部抄自[维基百科](https://zh.wikipedia.org/)，末尾有引用连接。扩展阅读[文件系统](https://zh.wikipedia.org/zh-cn/%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)。

## 操作系统演变

![操作系统演变](/assets/images/operating-system-history/操作系统演变.svg)

## 操作系统演变简版

![操作系统演变简版](/assets/images/operating-system-history/操作系统演变简版.svg)

## 操作系统

早期的计算机没有操作系统。只有单独的机器，通过读取数据卡片或打孔纸工作，通过控制板的开关和状态灯来调试。

后来，机器引入帮助程序输入输出等工作的代码库。这是现代操作系统的起源。然而，机器每次只能执行一件任务。

概念意义上的操作系统和通俗意义上的操作系统差距越来越大。通俗意义上的操作系统为了方便而把最普通的包和应用程序的集合包括在操作系统内。

大型机时代操作系统非常多样化，生产商生产出针对各自硬件的系统。每一个操作系统都有很不同的命令模式、操作过程和调试工具，即使它们来自同一个生产商。这种情况一直持续到二十世纪六十年代IBM公司开发了System/360系列机器。尽管这些机器在性能上有明显的差异，但是他们有统一的操作系统——OS/360。

## UNIX

UNIX操作系统是在1960年由AT&T公司的贝尔实验室开发出来的，由于他是以C语言撰写，当这种语言撰写的程序被移植到另一个架构时，UNIX也能移植过去。由于早期的广泛应用，UNIX已经成为的操作系统的典范。不过它始终属于AT&T公司。借由广泛的被大量采用，UNIX展示了在不同硬件架构上操作系统可以是一致的概念。后来还成自由软件与开源软件包含 GNU, Linux, BSD 的发展根基。

![操作系统简略架构](/assets/images/operating-system-history/操作系统简略架构.svg)

操作系统是一组主管并控制计算机操作、运用和运行硬件、软件资源和提供公共服务来组织用户交互的相互关联的系统软件程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。

综观电脑之历史，操作系统与电脑硬件的发展息息相关。操作系统之本意原为提供简单的工作排序能力，后为辅助更新更复杂的硬件设施而渐渐演化。从最早的批量模式开始，分时机制也随之出现，在多处理器时代来临时，操作系统也随之添加多处理器协调功能，甚至是分布式系统的协调功能。

![Linux架构图](/assets/images/operating-system-history/Linux架构图.jpg)

![简化版的WindowsNT抽象架构图](/assets/images/operating-system-history/简化版的WindowsNT抽象架构图.jpg)

1964年由贝尔实验室、麻省理工学院及美国通用电气公司所共同参与研发Multics，（多任务信息与计算系统：MULTiplexed Information and Computing System）。由于其进展缓慢贝尔实验室退出转而开发UNIX。

1969年在AT&T的贝尔实验室开发UNIX（非复用信息和计算机服务：Uniplexed Information and Computing Service，UnICS），一种多用户、多进程的计算机操作系统。最初是完全用汇编语言编写，在1973年用一个重要的开拓性的方法使用C重新编写。目前它的商标权由国际开放标准组织所拥有，只有符合单一UNIX规范的UNIX系统才能使用UNIX这个名称，否则只能称为类UNIX（UNIX-like）。后来由于BSD带来的影响力使得UNIX被很多商用。后来AT&T意识到了UNIX的商业价值，不再将UNIX源码授权给学术机构，并开展一场持久的著作权官司。这也间接促进了Linux开源操作系统的发展。

1982年，AT&T基于UNIX版本7开发了UNIX System Ⅲ的第一个版本，这是一个商业版本仅供出售。为了解决混乱的UNIX版本情况，AT&T综合了其他大学和公司开发的各种UNIX，开发了UNIX System V Release 1。UNIX System V Release 4发布后不久，AT&T就将其所有UNIX权利出售给了Novell。Novell期望以此来对抗微软的Windows NT。

1970年代，伯克利加州大学基于UNIX开创伯克利软件包（Berkeley Software Distribution；也被称为伯克利UNIX或Berkeley UNIX）是一个派生自UNIX（类UNIX）的操作系统。今天“BSD”并不特指任何一个BSD衍生版本，而是类UNIX操作系统中的一个分支的总称。BSD对UNIX最重要的贡献之一是TCP/IP。其关于TCP/IP代码几乎是现在所有系统中TCP/IP实现的前辈，包括AT&T System V UNIX和Microsoft Windows。BSD率先包含了支持互联网协议栈（Stack）、伯克利套接字（sockets）的函数库。通过将套接字与UNIX操作系统的文件描述符相集成，库用户通过计算机网络读写数据，跟直接在磁盘上操作一样容易。

1993年FreeBSD的第一个版本发布，是FreeBSD项目的发展成果。它是一种开放源代码的类Unix的操作系统，基于BSD Unix的源代码派生发展而来。它有广泛的应用软件支持。

1993年NetBSD发布，目的在于发展一套跨平台、高质量、以伯克利软件套件为基础的操作系统。最轻便的操作系统。目前能够在46种之多的不同硬件构架上运行。便携性使得NetBSD成为嵌入式系统的最佳选择。

1995年从NetBSD分支签出。被称为世界上最安全的操作系统。

Solaris原先是SUN公司研制的类Unix操作系统，在Sun公司被Oracle并购后被称作Oracle Solaris。早期的Solaris是由BSDUnix发展而来，但是随着时间的推移，Solaris现在在接口上正在逐渐向System V靠拢。Sun的操作系统最初叫做SunOS，SunOS 5.0开始，SUN的操作系统开发开始转向System V 4，并有了新名字Solaris 2.0；Solaris 2.6以后，SUN删除了版本号中的“2”，因此，SunOS 5.10叫做Solaris 10。

1987年由于UNIX的法律问题，一个大学教授为了教学而开发兼容UNIX的操作系统Minix。是一个迷你版本的类Unix操作系统，它的名称取自英语：Mini UNIX的缩写。

1991年由于Minix只能运行教育用途，Linus开发Linux。

1985年微软公司以图形用户界面为主推出的一系列专有商业软件操作系统。起初为运行于MS-DOS之下的桌面环境。

2001年。macOS是1999年发行的Classic Mac OS最终版本Mac OS 9的后继者。1999年发布macOS Server的首个版本Mac OS X Server 1.0，桌面版Mac OS X 10.0“Cheetah”于2001 年 3 月 24 日发布。2012 年苹果将Mac OS X更名为OS X。它以Mach内核为基础，加入UNIX的BSD实现，再集成到NeXTSTEP当中（NeXTSTEP 为当时乔布斯被迫离开苹果后，到NeXT公司所发展的）。

## Linux

![Linux分支图](/assets/images/operating-system-history/Linux分支图.svg)

### Debian系

软件包管理系统：APT (DEB)

### Red Hat系

软件包管理系统：up2date (RPM)， YUM (RPM)

### SUSE

软件包管理系统：YaST (RPM)， 第三方APT (RPM) 软件库(repository)

# 引用

[https://zh.wikipedia.org/zh-cn/操作系统历史](https://zh.wikipedia.org/zh-cn/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%8E%86%E5%8F%B2)

[https://zh.wikipedia.org/zh-cn/操作系统](https://zh.wikipedia.org/zh-cn/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)