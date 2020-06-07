---
title: 深入理解Java虚拟机——JVM高级特性与最佳实践
categories:
- JAVA
- JVM
description: 深入理解Java虚拟机——JVM高级特性与最佳实践摘要
permalink: "/posts/understanding-the-jvm-advanced-features-and-best-practices"
excerpt: 序员可以把主要精力放在具体业务逻辑，而不是放在保障物理硬件的兼容性上。通常情况下，一个程序员只要了解了必要的Java类库API、Java语法，学习适当的第三方开发框架，就已经基本满足日常开发的需要了。虚拟机会在用户不知不觉中完成对硬件平台的兼容及对内存等资源的管理工作。如果开发人员不了解虚拟机诸多技术特性的运行原理，就无法写出最适合虚拟机运行和自优化的代码。但是，如果用于生产开发，尤其是大规模的、企业级的生产开发，就迫切需要开发人员中至少有一部分人对虚拟机的特性及调节方法具有很清晰的认识。所以在Java开发体系中，对架构师、系统调优师、高级程序员等角色的需求一直都非常大。学习虚拟机中各种自动运作特性的原理也成为Java程序员成长路上最终必然会接触到的一课。
---

# 内存自动管理

## Java内存区域与内存溢出异常







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

HotSpot,虚拟机中含有两个即时编译器，分别是编译耗时短但输出代码优化程度较低的客户端编译器(简称为C1)以及编译耗时长但输出代码优化质量也更高的服务端编译器(简称为C2)，通常它们会在分层编译机制下与解释器互相配合来共同构成HotSpot虚拟机的执行子系统。自JDK 10 起，HotSpot引入和Graal编译器。

## 向Native迈进

在未来微服务甚至无服务的趋势下，Java越来越显得臃肿和不适应。因为Java需要几百兆的JRE，以及预热才能达到快速运行。所以Java需要向提前编译迈进，但是提前编译就不能一次编写到处运行。直到Substrate VM的出现。

Subtrate VM是在Graal VM 0.20版本里新出现的一个极小型的运行时环境，包括了独立的异常处理、同步调度、线程管理、内存管理(垃圾收集)和JNI访问等组件，目标是代替HotSpot用来支持提前编译后的程序执行。它还包含了一个本地镜像的构造器(Native Image Generator)，用于为用户程序建立基于Substrate VM的本地运行时镜像。这个构造器采用指针分析(Points-To Analysis)技术，从用户提供的程序入口出发，搜索所有可达的代码。在搜索的同时，它还将执行初始化代码，并在最终生成可执行文件时，将已初始化的堆保存至一个堆快照之中。这样一来，Substrate VM就可以直接从目标程序开始运行，而无须重复进行Java虛拟机的初始化过程。但相应地，原理上也决定了Substrate VM必须要求目标程序是完全封闭的，即不能动态加载其他编译器不可知的代码和类库。基于这个假设，Substrate VM才能探索整个编译空间，并通过静态分析推算出所有虛方法调用的目标方法。Substrate VM带来的好处是能显著降低内存占用及启动时间。

## HotSpot

现在，HotSpot 虚拟机能够在编译时指定一系列特性开关，让编译输出的HotSpot虚拟机可以裁剪成不同的功能，譬如支持哪些编译器，支持哪些收集器，是否支持JFR、
AOT、CDS、NMT等都可以选择。能够实现这些功能特性的组合拆分，反映到源代码不仅仅是条件编译，更关键的是接口与实现的分离。

早期的HotSpot虛拟机为了提供监控、调试等不会在《Java虛 拟机规范》中约定的内部功能和数据，就曾开放过Java虛拟机信息监控接口(Java Vrtual M achine ProflerInterface，JVMPI) 与Java虛 拟机调试接口(Java Vrtual M achine Debug Interface, JVMDI)供运维和性能监控、IDE等外部工具使用。到了JDK 5时期，又抽象出了层次更高的Java虚拟机工具接口(Java Virtual Machine Tool Interface, JVMTI) 来为所有Java虛拟机相关的工具提供本地编程接口集合，到JDK 6时JVMTI就完全整合代替了JVMPI和JVMDI的作用。

在JDK 9时期，HotSpot虛拟机开放了Java语言级别的编译器接口B] (Java Vrtual M achine Compiler Interface, JVMCI) ，使得在Java虛拟机外部增加、替换即时编译器成为可能，这个改进实现起来并不费劲，但比起之前JVMPI、JVMDI和JVMTI却是更深层次的开放，它为不侵入HotSpot代码而增加或修改HotSpot虛拟机的固有功能逻辑提供了可行性。Graal编译器就是通过这个接口植入到HotSpot之中。

到了JDK 10，HotSpot又重构了Java虛拟机的垃圾收集器接口[4] (Java Vrtual M achine Compiler Interface)，统一了其内部各款垃圾收集器的公共行为。有了这个接口，才可能存在日后(今天尚未)某个版本中的CM S收集器退役，和JDK 12中Shenandoah这样由Oracle以外其他厂商领导开发的垃圾收集器进入HotSpot中的事情。如果未来这个接口完全开放的话，甚至有可能会出现其他独立于HotSpot的垃圾收集器实现。

