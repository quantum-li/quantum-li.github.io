---
title: JAVA发展史
categories:
- JAVA
description: 内容源自《深入理解Java虚拟机——JVM高级特性与最佳实践》.第三版.第一章.第3节
permalink: "/posts/java-history"
excerpt: 从Java的第一个版本诞生到现在已经有二十余年的时间，白驹过隙，沧海桑田，转眼已过了四分之一个世纪，JDK的版本已经发展到了JDK 13。这二十多年里诞生过无数与Java相关的产品、技术与标准。现在让我们走入时间隧道，从孕育Java语言的时代开始，再来回顾一下Java的发展轨迹和历史变迁。
---

+ [更新记录-wiki](https://en.wikipedia.org/wiki/Java_version_history)
+ [虚拟机规范](https://docs.oracle.com/javase/specs/index.html)
+ [doc](https://docs.oracle.com/en/java/javase/index.html)
+ [Java存档](https://www.oracle.com/cn/java/technologies/oracle-java-archive-downloads.html)

![Java技术发展的时间线](/assets/images/java-history/ce2ed681-f046-4102-9e2e-4159a2d8c173.png)

1991年，绿色计划(Green Project)开始启动，此计划最初的目标是开发一种能够在各种消费性电子产品(如机顶盒、冰箱、收音机等)上运行的程序架构。这个计划的产品就是Java语言的前身: Oak (领导人办公室外的一棵橡树) 。Oak当时在消费品市场上并不算成功，但随着1995年互联网潮流的兴起，Oak迅速找到了最适合自己发展的市场定位并蜕变成为Java语言。

------

1995年，Oak语言改名为Java，并正式发布Java 1.0版本，是Java Alpha和Beta的第一个版本，它们的API非常不稳定。提供的Java Web浏览器名为 WebRunner。Java语言第一次提出了"Write Once，Run Anywhere"的口号。

------

1996年，JDK 1.0发布，Java语言有了第一个正式版本的运行环境。JDK 1.0提供了一个纯解释执行的Java虚拟机实现(Sun Classic VM)。JDK 1.0版本的代表技术包括: Java虚拟机、Applet、AWT等。在JDK 1.0.1之前，private和protected关键字可以一起使用来创建另一种保护形式，该保护形式主要用作对给定类的子类的方法或变量的限制。在JDK 1.0.2中，此功能已被删除。

------

1996年，首届JavaOne大会，从此JavaOne成为全世界数百万Java语言开发者每年一度的技术盛会。

------

1997年，Sun公司发布了JDK 1.1，Java里许多最基础的技术支撑点(如JDBC等)都是在JDK 1.1版本中提出的，JDK 1.1版的技术代表有: JAR文件格式、JDBC、JavaBeans、 RMI等。Java语言的语法也有了一定的增强，如内部类(Inner Class)和反射(Reflection) 都是在这时候出现的。
1. 内部类的概念
2. Java Bean的概念
3. JDBC
4. RMI
5. AWT事件模型被彻底重塑
6. 反射仅支持Introspection，在运行时无法修改。（通过引入AccessibleObject类及其子类，如Field类，在J2SE 1.2中添加了反射性修改对象的能力。）
7. Symantec公司为JavaSoft制作了Microsoft Windows平台上的 JIT（Just In Time）编译器
8. 来自Taligent公司的国际化和Unicode支持

------

1998年，JDK迎来了一个里程碑式的重要版本:工程代号为Playground的JDK 1.2，Sun在这个版本中把Java技术体系拆分为三个方向，分别是J2SE 、J2EE 和J2ME 。在这个版本中出现的代表性技术非常多，如EJB、Java Plug-in、Java IDL、Swing等，并且这个版本中Java虚拟机第一次内置了JIT(Just In Time)即时编译器(JDK 1.2中曾并存过三个虚拟机，Classic VM、HotSpot VM和Exact VM，其中Exact VM只在Solaris平台出现过；后面两款虛拟机都是内置了JIT即时编译器的，而之前版本所带的Classic VM只能以外挂的形式使用即时编译器)。在语言和API层面上，Java添加了一系列Collections集合类等。
1. Java plug-in(Java applet)
2. Java IDL，一种用于CORBA互操作性的IDL实现
3. Collections集合框架
4. Swing图形API已集成到核心类中
5. Sun的JVM首次配备了JIT编译器
6. strictfp关键字

------

1999年，HotSpot虚拟机诞生。

------

2000年，JDK 1.3发布。从此Sun公司维持着稳定的研发节奏：大约每隔两年发布一个JDK的主版本，以动物命名，期间发布的各个修正版本则以昆虫作为工程代号。
1. 包括了HotSpot JVM（HotSpot JVM于1999年4月首次发布，用于J2SE 1.2 JVM）
2. 修改了RMI以支持与CORBA的可选兼容性
3. Java Naming and Directory Interface (JNDI) 包含在核心库中（以前作为扩展提供）
4. Java Platform Debugger Architecture (JPDA)
5. JavaSound API
6. [Synthetic proxy classes](https://stackoverflow.com/questions/399546/synthetic-class-in-java)

------

2002年，JDK 1.4发布，是标志着Java真正走向成熟的一个版本，带来了很多新的技术特性，如正则表达式、异常链、NIO、日志类、XML解析器和XSLT转换器，
1. assert关键字
2. 以Perl正则为模型的正则表达式支持
3. Exception chaining，允许一个异常封装低级别的原始异常
4. IPv6支持
5. Non-blocking I/O (NIO)
6. 日志接口(Logging API)
7. 用于读取和写入JPEG和PNG等格式的图像I/O API
8. 集成了XML解析器和XSLT处理器 (JAXP)
9. 集成了安全和加密扩展（JCE、JSSE、JAAS）
10. 包括了Java Web Start（Java Web Start 于2001年3月首次发布，适用于J2SE 1.3）

------

2004年，JDK 5发布，从这个版本开始将产品版本号修改成了“JDK x”。在Java语法易用性上做出了非常大的改进。如:自动装箱、泛型、动态注解、枚举、可变长参数、遍历循环(foreach循环) 等语法特性。这个版本改进了Java的内存模型(Java Memory Model, JMM)、提供了java.util.concurent并发包等。
1. 引入了泛型：避免了手动类型转换，使用类型擦除实现，在编译时删除泛型信息并使用Object替换，在实际使用时强转会原始类型
2. 引入了注解，也叫原数据(metadata)，允许在类或方法等数据结构上做附加数据标记
3. 原始类型的自动拆装箱
4. 引入了枚举
5. 边长参数，允许方法的最后一个参数是可变长度
6. for each 循环，用于迭代数组或Iterable集合
7. 改进了Java多线程语义，增加了JUC(java.util.concurrent)包，增加了多个多线程工具，新的Java内存模型解决了先前规范的复杂性、有效性和性能问题
8. 增加了静态import语法(import static)
9. 自动为RMI（远程方法调用）对象生成方法[stub](https://zh.wikipedia.org/wiki/%E6%A1%A9_(%E8%AE%A1%E7%AE%97%E6%9C%BA))
10. Swing：新的look and fell，称为 synth
11. 用于解析来自各种输入流和缓冲区的数据的扫描器类(Scanner class)
12. 版本命名变更，1.5.0 表示开发者内部版本，JDK 5表示产品版本

------

2006年，JDK 6发布，在这个版本中，Sun公司终结了J2EE、J2SE、 J2ME的产品线命名方式，启用JavaEE6、 JavaSE6、 JavaME 6的新命名来代替。
1. 脚本语言支持：用于与脚本语言紧密集成的通用API，以及内置的 Mozilla JavaScript Rhino 集成。
2. Swing 的显着性能改进
3. 通过JAX-WS改进了Web服务支持
4. JDBC 4.0
5. Java Compiler API：一种允许Java程序以编程方式选择和调用Java编译器的API
6. JAXB升级到2.0版：包括集成 StAX 解析器
7. 支持可插入注解（在编译期对代码中的注解进行处理，从而影响前端编译器的工作过程，常见时间是lombok）
8. 许多GUI接口的改进
9. JVM 改进包括：同步和编译器性能优化、新算法和对现有垃圾收集算法的升级以及应用程序启动性能。

------

在2006年的JavaOne大会上，Sun公 司宜布计划要把Java开源，它陆续地将JDK的各个部分在GPLv2 (GNU General Public Lcensev2)协议下公开了源码，并建立了OpenJDK组织对这些源码进行独立管理。

------

2009年，JDK 7完成了其第第一个里程碑版本。按照JDK 7最初的功能规划，一共会设置十个里程碑。从JDK 7最原始的功能清单来看，它本应是一个包含许多重要改进的JDK版本，但现实不如人愿，以下功能没能全在JDK 7中实现：
1. Lambda项目:支持Lambda表达式，支持函数式编程。(JDK 8)
2. Jigsaw项目:虚拟机层面的模块化支持。(JDK 9)
3. 动态语言支持: Java是静态语言，为其他运行在Java虛拟机上的动态语言提供支持。
4. Garbage-First收集器。（JDK 8）
5. Coin项目: Java语法细节进化。(部分JDK 8)

------

从JDK 7 Update 4起，Java SE的核心功能正式开始为MacOS X操作系统提供支持，并在JDK 7 Update 6中达到所有功能与Mac OS X完全兼容的程度；同时，JDK 7 Update 6还对ARM指令集架构提供了支持。至此，官方提供的JDK可以运行于Wndows (不含Windows 9x)、Linux、 Solaris和Mac OS X操作系统上，支持ARM、x86、x86-64和SPARC指令集架构，JDK 7也是可以支持WIndows XP操作系统的最后一个版本。
1. 动态语言支持，使用新的invokedynamic字节码，遵循当前在多语言虚拟机上完成的原型设计工作
2. 压缩的 64 位指针（在Java 6中可用 -XX:+UseCompressedOops开启）
3. Coin项目：
   1. switch语句中使用String
   2. 自动管理资源的try-with-resources
   3. 改进了实例创建时的类型推断菱形运算符`<>`
   4. 简化了可变参语法
   5. 二进制的数字表示 `byte aByte = (byte)0b00100001;`
   6. 允许在数字中使用下划线
   7. 使用改进的类型检查捕获多种异常类型并重新抛出异常
4. JDBC4.1
5. jcmd工具，用来代替jps
6. fork/join框架
8. 并发实用工具
9. 新的文件I/O库增加了对多个文件系统、文件元数据和符号链接的支持。新包是`java.nio.file`、`java.nio.file.attribute` 和 `java.nio.file.spi`
7. Java Mission Control
10. 使用[Timsort](https://en.wikipedia.org/wiki/Timsort)替代集合和数组中的归并排序
11. 对[椭圆曲线密码学](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6)的库级支持
12. 用于Java 2D的XRender管道，可改进对现代GPU特定功能的处理
13. 实现6u10中不受支持的图形API
14. 增强了对新网络协议的库级支持，包括SCTP和Sockets Direct Protocol
15. XML和Unicode的上游更新
16. Java deployment rule sets

------

2014年，JDK8发布，提供了Lambda表达式支持、内置Nashorn JavaScript引擎支持、新的时间日期API、彻底移除HotSpot永久代。
1. Lambda表达式
2. stream操作
3. HashMap改进
4. Nashorn项目，允许开发人员在应用程序中嵌入JavaScript代码
5. 重复注解
6. 类型注解
7. 无符号整型
8. 新的日期和时间API
9. 静态链接的JNI库
10. 启动JavaFX应用程序（直接启动JavaFX应用程序JAR）
11. 删除永久代

------

2017年，JDK9发布，带来了Jigsaw虚拟机模块化支持。从此每六个JDK大版本划出一个三年支持的LTS版，普通版只有六个月生命周期。JDK 8和JDK 11是LTS版。下一就是要在2021年发布的JDK 17了。
1. Jigsaw项目下JDK的模块化（Java 平台模块系统）
2. G1成为了默认的垃圾回收器
3. 统一了 JVM/GC 日志
4. HTTP/2 Client
5. 更方便的集合工厂方法，以前大多使用Guava类库
6. docker方便的支持
7. 货币API
8. 实现了响应式流
9. 新的Flow类
10. 并发工具的更新
11. 更加紧凑的字符串
12. HiDPI graphics：自动缩放和调整大小
13. 变量句柄(Variable handles)：用来代替`java.util.concurrent.atomic`和`sun.misc.Unsafe`操作的等价物
14. Coin语法改进项目继续进行
15. jshell：Java Shell：JShell 是Java语言的REPL（读取-评估-打印循环）命令行界面
16. XML目录
17. jlink：Java 链接器：创建一个工具，可以将一组模块及其依赖项组装和优化为自定义运行时映像。它有效地允许生成一个完全可用的可执行文件，包括运行它的 JVM。
18. 提前编译：GraalVM 提供的提前编译。

------

2018年，JDK 10发布，主要是内部重构。同年，Oracle宣告Java EE成为历史名词。同年，JavaOne大会成为最后一届
1. 局部变量类型推断 var 关键字
2. GC接口：通过引入干净的垃圾收集器 (GC) 接口来改进不同垃圾收集器的源代码隔离
3. G1并行full GC
4. CDS：为了改善启动和占用空间，扩展现有的类数据共享 (“CDS”) 功能以允许将应用程序类放置在共享存档中
5. 线程的本地握手：一种无需执行全局VM安全点即可在线程上执行回调的方法。使停止单个线程而不只是所有线程或不停止所有线程成为可能且成本低廉
6. 移除了javah工具，被JDK 8中添加的javac高级功能取代
7. 额外的 Unicode 语言标签扩展
8. 替代内存设备上的堆分配：启用HotSpot VM以在用户指定的备用内存设备（例如 NV-DIMM）上分配Java对象堆
9. 实验性基于 Java 的 JIT 编译器
10. 基于时间的发布版本控制：针对当前和未来基于时间的发布模型，修订 Java SE 平台和 JDK 的版本字符串方案以及相关版本控制信息

------

2018年，LTS版本的JDK 11发布，ZGC出现。同时Oracle调整了JDK授权许可证。OpenJDK免费单只有半年支持。OracleJDK在生产环境必须付费，但有三年支持。迫使商业用户要么不断升级JDK版本，要么就去购买商业支持。
1. 

2019年，JDK 12发布，引入Shenandoah垃圾收集器。作为首个非Oracle开发的垃圾收集器，由于目标与Oracle在JDK 11引入的ZGC几乎一致存在竞争。OracleJDK 12把相关代码通过条件编译强行提出，使其无法在OracleJDK中使用。

2019年9月，JDK 13发布，动态 CDS 归档；ZGC: 取消提交未使用存储器；重新实现旧版 Socket API；Switch 表达式（预览阶段）。

2020年3月，JDK14发布，包含主要16个功能改进和漏洞修复。

2020年9月，JDK15发布，主要是安全更新和bug修复。

2021年3月，JDK16发布，包含主要17个更新。

2021年9月，LTS版本的JDK17发布，包含主要14个更新。