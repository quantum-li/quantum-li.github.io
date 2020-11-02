---
title: JAVA发展史
categories:
- JAVA
description: 内容源自《深入理解Java虚拟机——JVM高级特性与最佳实践》.第三版.第一章.第3节
permalink: "/posts/java-history"
excerpt: 从Java的第一-个版本诞生到现在已经有二十余年的时间，白驹过隙，沧海桑田，转眼已过了四分之一个世纪，JDK的版本已经发展到了JDK 13。这二十多年里诞生过无数与Java相关的产品、技术与标准。现在让我们走入时间隧道，从孕育Java语言的时代开始，再来回顾一下Java的发展轨迹和历史变迁。
---

+ [更新记录-wiki](https://zh.wikipedia.org/wiki/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2)
+ [虚拟机规范](https://docs.oracle.com/javase/specs/index.html)
+ [doc](https://docs.oracle.com/en/java/javase/index.html)
+ [Java存档](https://www.oracle.com/cn/java/technologies/oracle-java-archive-downloads.html)

![Java技术发展的时间线](/assets/images/java-history/ce2ed681-f046-4102-9e2e-4159a2d8c173.png)

1991年，绿色计划(Green Project)开始启动，此计划最初的目标是开发一种能够在各种消费性电子产品(如机顶盒、冰箱、收音机等)上运行的程序架构。这个计划的产品就是Java语言的前身: Oak (领导人办公室外的一棵橡树) 。Oak当时在消费品市场上并不算成功，但随着1995年互联网潮流的兴起，Oak迅速找到了最适合自己发展的市场定位并蜕变成为Java语言。

1995年，Oak语言改名为Java，并正式发布Java 1.0版本。Java语言第一次提出 了“Write Once，Run Anywhere"的口号。

1996年，JDK 1.0发布，Java语言有了第一个正式版本的运行环境。JDK 1.0提供了一个纯解释执行的Java虚拟机实现(Sun Classic VM)。JDK 1.0版本的代表技术包括: Java虚拟机、Applet、AWT等。

1996年，首届JavaOne大会，从此JavaOne成为全世界数百万Java语言开发者每年一度的技术盛会。

1997年，Sun公司发布了JDK 1.1，Java里许多最基础的技术支撑点(如JDBC等)都是在JDK 1.1版本中提出的，JDK 1.1版的技术代表有: JAR文件格式、JDBC、JavaBeans、 RMI等。Java语言的语法也有了一定的增强，如内部类(Inner Class)和反射(Reflection) 都是在这时候出现的。

1998年，JDK迎来了一个里程碑式的重要版本:工程代号为Playground (竞技场)的JDK1.2，Sun在这个版本中把Java技术体系拆分为三个方向，分别是J2SE 、J2EE 和J2ME 。在这个版本中出现的代表性技术非常多，如EJB、Java Plug-in、Java IDL、Swing等， 并且这个版本中Java虚拟机第一次内置 了JIT (Just In Time)即时编译器(JDK 1.2中曾并存过三个虚拟机，Classic VM、HotSpot VM和Exact VM，其中Exact VM只在Solaris平台出现过;后面两款虛拟机都是内置了JIT即时编译器的，而之前版本所带的Classic VM只能以外挂的形式使用即时编译器)。在语言和API层面上，Java添加了一系列Collections集合类等。 

1999年，HotSpot虚拟机诞生。

2000年，JDK 1.3发布。从此Sun公司维持着稳定的研发节奏:大约每隔两年发布一个JDK的主版本，以动物命名，期间发布的各个修正版本则以昆虫作为工程代号。

2002年，JDK 1.4发布，是标志着Java真正走向成熟的一个版本，带来了很多新的技术特性，如正则表达式、异常链、NIO、日志类、XML解析器和XSLT转换器，

2004年，JDK 5发布，从这个版本开始将产品版本号修改成了“JDK x”。在Java语法易用性上做出了非常大的改进。如:自动装箱、泛型、动态注解、枚举、可变长参数、遍历循环(foreach循环) 等语法特性。这个版本改进了Java的内存模型(Java Memory Model, JMM)、提供了javautil.concurent并发包等。

2006年，JDK 6发布，在这个版本中，Sun公司终结了J2EE、J2SE、 J2ME的产品线命名方式，启用JavaEE6、 JavaSE6、 JavaME 6的新命名来代替。

在2006年的JavaOne大会上，Sun公 司宜布计划要把Java开源，它陆续地将JDK的各个部分在GPLv2 (GNU General Public Lcensev2)协议下公开了源码，并建立了OpenJDK组织对这些源码进行独立管理。

2009年，JDK 7完成了其第第一个里程碑版本。按照JDK 7最初的功能规划，一共会设置十个里程碑。从JDK 7最原始的功能清单来看，它本应是一个包含许多重要改进的JDK版本，包括: 

+ Lambda项目:支持Lambda表达式，支持函数式编程。
+ Jigsaw项目:虚拟机层面的模块化支持。
+ 动态语言支持: Java是静态语言，为其他运行在Java虛拟机上的动态语言提供支持。
+ Garbage-First收集器。
+ Coin项目: Java语法细节进化。

从JDK 7 Update 4起，Java SE的核心功能正式开始为MacOS X操作系统提供支持，并在JDK 7 Update 6中达到所有功能与Mac OS X完全兼容的程度;同时，JDK 7 Update 6还对ARM指令集架构提供了支持。至此，官方提供的JDK可以运行于Wndows (不含Windows 9x)、Linux、 Solaris和Mac OS X操作系统上，支持ARM、x86、x86-64和SPARC指令集架构，JDK 7也是可以支持WIndows XP操作系统的最后一个版本。

2014年，JDK8发布，提供了Lambda表达式支持、内置Nashorn JavaScript引擎支持、新的时间日期API、彻底移除HotSpot永久代。

2017年，JDK9发布，带来了Jigsaw虚拟机模块化支持。从此每六个JDK大版本划出一个三年支持的LTS版，普通版只有六个月生命周期。JDK8和JDK11是LTS版。下一就是要在2021年发布的JDK 17了。

2018年，JDK 10发布，主要是内部重构。同年，Oracle宣告Java EE成为历史名词。同年，JavaOne大会成为最后一届。

2018年，LTS版本的JDK 11发布，ZGC出现。同时Oracle调整了JDK授权许可证。OpenJDK免费单只有半年支持。OracleJDK在生产环境必须付费，但有三年支持。迫使商业用户要么不断升级JDK版本，要么就去购买商业支持。

2019年，JDK 12发布，引入Shenandoah垃圾收集器。作为首个非Oracle开发的垃圾收集器，由于目标与Oracle在JDK 11引入的ZGC几乎一致存在竞争。OracleJDK 12把相关代码通过条件编译强行提出，使其无法在OracleJDK中使用。

2019年9月，JDK 13发布，动态 CDS 归档；ZGC: 取消提交未使用存储器；重新实现旧版 Socket API；Switch 表达式（预览阶段）；

