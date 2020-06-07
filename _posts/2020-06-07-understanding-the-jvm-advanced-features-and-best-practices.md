---
title: 深入理解Java虚拟机——JVM高级特性与最佳实践
categories:
- JAVA
- JVM
description: 深入理解Java虚拟机——JVM高级特性与最佳实践摘要
permalink: "/posts/understanding-the-jvm-advanced-features-and-best-practices"
excerpt: 序员可以把主要精力放在具体业务逻辑，而不是放在保障物理硬件的兼容性上。通常情况下，一个程序员只要了解了必要的Java类库API、Java语法，学习适当的第三方开发框架，就已经基本满足日常开发的需要了。虚拟机会在用户不知不觉中完成对硬件平台的兼容及对内存等资源的管理工作。如果开发人员不了解虚拟机诸多技术特性的运行原理，就无法写出最适合虚拟机运行和自优化的代码。但是，如果用于生产开发，尤其是大规模的、企业级的生产开发，就迫切需要开发人员中至少有一部分人对虚拟机的特性及调节方法具有很清晰的认识。所以在Java开发体系中，对架构师、系统调优师、高级程序员等角色的需求一直都非常大。学习虚拟机中各种自动运作特性的原理也成为Java程序员成长路上最终必然会接触到的一课。
---

# JAVA

## Java技术体系

Java程序设计语言、Java虚拟机、Java类库三部分统称为JDK。JCP官方所定义的Java技术体系包括了：

+ Java程序设计语言
+ 各种硬件平台上的Java虚拟机实现
+ Class文件格式
+ Java类库API
+ 第三方Java类库

![Java技术体系](/assets/images/8f3089a1-3bad-4e66-ab81-b72bbc725839.png)

## Java虚拟机家族

1. 虚拟机始祖：Sun Classic/Exact VM，只能解释执行Java，或通过外挂即时编译器。并且两者冲突。
2. HotSpot VM，由Sun收购而来。拥有热点代码探测技术，通过执行计数器找到热点代码进行即时编译。和栈上替换编译(OSR)。
3. Mobile/Embedded VMs，Java ME产品线上的虚拟机。
4. BEA JRockit和IBM j9 VM。
5. Google Android Dalvik VM。
6. Microsoft JVM。
7. 专用硬件平台上的虚拟机及其他。

2018年Oracle Labs公开了Graal VM。号称Run Programs Faster Anywhere。除了可以运行JVM系语言，还可以运行C、C++等基于LLVM语言和JavaScript、Ruby、Python、R。Graal VM可以无额外开销的混合使用这些语言，支持不同语言混用接口。

## 新一代即时编译器

HotSpot,虚拟机中含有两个即时编译器，分别是编译耗时短但输出代码优化程度较低的客户端编译器(简称为C1)以及编译耗时长但输出代码优化质量也更高的服务端编译器(简称为C2)，通常它们会在分层编译机制下与解释器互相配合来共同构成HotSpot虚拟机的执行子系统。自JDK 10 起，

