---
title: 深入理解Java虚拟机——JVM高级特性与最佳实践
categories:
- JAVA
- JVM
description: 深入理解Java虚拟机——JVM高级特性与最佳实践摘要
permalink: "/posts/understanding-the-jvm-advanced-features-and-best-practices"
excerpt: 序员可以把主要精力放在具体业务逻辑，而不是放在保障物理硬件的兼容性上。通常情况下，一个程序员只要了解了必要的Java类库API、Java语法，学习适当的第三方开发框架，就已经基本满足日常开发的需要了。虚拟机会在用户不知不觉中完成对硬件平台的兼容及对内存等资源的管理工作。如果开发人员不了解虚拟机诸多技术特性的运行原理，就无法写出最适合虚拟机运行和自优化的代码。但是，如果用于生产开发，尤其是大规模的、企业级的生产开发，就迫切需要开发人员中至少有一部分人对虚拟机的特性及调节方法具有很清晰的认识。所以在Java开发体系中，对架构师、系统调优师、高级程序员等角色的需求一直都非常大。学习虚拟机中各种自动运作特性的原理也成为Java程序员成长路上最终必然会接触到的一课。
---

# Java内存区域与内存溢出异常

## 概述

因为Java程序员把控制内存的权利交给了Java虚拟机，一旦出现内存泄露和溢出方面的问题，如果不了解虚拟机是怎样使用内存的，那排查错误、修正问题将成为一项异常艰难的工作。

## 运行时数据区域

这些区域有各自的用途，以及创建和销毁的时间，有的区域随着虚拟机进程的启动而一直存在，有些区域是依赖用户线程的启动和结束而建立和销毁。

![Java虚拟机运行时数据区](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/2c4c9d28-3e69-4d0e-94c6-2e3e71cf6f2b.png)

### 程序计数器

程序计数器(Progam Counter Register)是一块较小的内存空间，它可以看作是当前线程所执行的字节码的行号指示器。在Java虚拟机的概念模型里，字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令，它是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。

由于Java虛拟机的多线程是通过线程轮流切换、分配处理器执行时间的方式来实现的，在任何一个确定的时刻，一个处理器(对于多核处理器来说是一个内核)都只会执行一条线程中的指令。因此，为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器，各条线程之间计数器互不影响，独立存储，我们称这类内存区域为“线程私有"的内存。

如果线程正在执行的是一个Java方法，这个计数器记录的是正在执行的虛拟机字节码指令的地址;如果正在执行的是本地(Native) 方法，这个计数器值则应为空(Undefined) 。此内存区域是唯一一个在《Java虚拟机规范》中没有规定任何OutOfMemoryError情况的区域。

### Java虚拟机栈

线程私有，生命周期与线程相同。栈描述的是Java方法执行的线程内存模型，由于存储局部变量表、操作数栈、动态链接、方法出口等信息。方法的调用和执行对应栈帧的入栈和出栈。

局部变量表存放了编译期可知的各种Java虚拟机基本数据类型、对象引用和returnAddress类型（指向一条字节码指令地址）

这些数据类型以局部变量槽（Slot）来表示，64位的long和double占用两个槽，其他类型占用一个槽。局部变量表所需的空间在编译期完成分配，进入方法时分配的空间大小（槽的数量）确定运行时不会改变。

《Java虚拟机规范》中规定了内存区域两种异常情况：如果线程请求的栈深度大于虚拟机允许深度，抛出StackOverflowError；对于非HotSpot虚拟机，如果栈容量扩展时没有足够空间抛出OutOfMemoryError。HotSpot无法扩容，所以在栈空间申请时可能会抛出OOM异常。

### 本地方法栈

执行本地方法（Native）的栈空间。同样存在栈溢出和OOM异常。

### Java堆

线程共享区域，启动时创建。用于存放对象实例。由GC管理。从GC的角度看，在G1之前大部分GC都是基于分代收集理论设计，因此堆会被垃圾回收器分为新生代（Eden、Survivor）、老年代、永久代（方法区）等区域。但是G1开始不再对堆进行分代回收，也就不再划分分代区域。

堆也会划出多个线程私有的分配缓冲区（Thread Local Allocation Buffer TLAB）来提升对象分配时的效率。《规范》中没有规定堆的物理空间连续性，只规定了逻辑空间上的连续性。而虚拟机的实现可能要求大对象请求连续的内存空间。堆空间不够时会抛出OOM异常。《规范》中没有规定该区域是固定大小还是可伸缩。

### 方法区

线程共享，存储已经被虚拟机加载的类型信息、常量、静态变量、JIT代码缓存等数据。《规范》中描述方法区是堆的一部分，但方法区有个别名叫“非堆”。仅HotSpot使用永久代来实现方法区，以便垃圾回收器可以管理这部分内存省去专门编写方法区内存管理的工作。其他虚拟机不存在方法区概念。HotSpot在JDK8后完全废除永久代的概念，改用本地内存中实现的元空间来替代。《规范》中没有规定方法区物理内存连续性和空间是否固定，也没有规定必须实现垃圾回收。方法区内存不足时会抛OOM异常。

### 运行时常量池

是方法区的一部分。Class文件中的常量池表(Constant Pool Table)，用于存放编译期生成的各种字面量与符号引用，这部分内容将在类加载后存放到方法区的运行时常量池中。该区域在《规范》中没有细节要求。并且常量可以动态产生放入常量池。常量池内存不足时会OOM异常。

### 直接内存

直接内存不是虚拟机运行时数据区的内容，也不是《规范》中定义的区域，存在OOM异常。

在JDK 1.4中新加入了NIO (New Input/Output)类，引入了一种基于通道(Channel) 与缓冲区( Buffr)的I/O方式，它可以使用Native函数库直接分配堆外内存，然后通过一个存储在Java堆里面的DirectByteBuffer对象作为这块内存的引用进行操作。这样能在一些场景中显著提高性能，因为避免了在Java堆和Native堆中来回复制数据。

## HotSpot虚拟机对象

### 对象的创建

当Java虚拟机遇到一条字节码new指令时，首先将去检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已被加载、解析和初始化过。如果没有，那必须先执行相应的类加载过程。

在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需内存的大小在类加载完成后便可完全确定。为对象分配空间的方法由GC是否进行碎片整理决定：对于Serial、ParNew等进行碎片整理的GC使用指针碰撞的方式（移动空闲空间指针）；对于CMS等使用空间列表来分配（存储剩余空闲空间列表）。但是CMS的实现中，为了能在多数情况下快速分配，设计了Linear Allocation Buffer分配缓冲区，通过空闲列表获取一大块分配缓冲区后使用指针碰撞方式分配对象内存。

有两种方式解决线程分配时的线程安全性，一种采用CAS失败重试方式保证空间指针移动与对象内存分配的原子性；一种是使用本地线程分配缓冲TLAB，优先在本地缓冲区分配内存，当本地缓冲区用完后同步锁定。

内存分配完成之后，虚拟机将分配到的内存空间(但不包括对象头)都初始化为零值，如果使用了TLAB的话，这一项工作也可以提前至TLAB分配时顺便进行。这也就是为什么int的默认值是0，boolean的默认值是false。

接下来，Java虚拟机对象头进行初始化。

至此对于虚拟机来说一个对象已经创建完成了。接下来是Java程序的对象创建。调用构造函数进行对象初始化。即Class文件中的<init>()方法。

### 对象内存格式

在HotSpot虚拟机中，对象在堆内存中的分为三个部分：对象头、实例数据、和对齐数据。

对象头存储两类信息，一类是运行时数据（Mark Word），一类是类型指针。其中运行时数据区域在对象的不同状态会存储不同内容：

普通对象

``` java
|--------------------------------------------------------------|
|                     Object Header (64 bits)                  |
|------------------------------------|-------------------------|
|        Mark Word (32 bits)         |    Klass Word (32 bits) |
|------------------------------------|-------------------------|
```

数组对象

``` java
|---------------------------------------------------------------------------------|
|                                 Object Header (96 bits)                         |
|--------------------------------|-----------------------|------------------------|
|        Mark Word(32bits)       |    Klass Word(32bits) |  array length(32bits)  |
|--------------------------------|-----------------------|------------------------|
```

为了让一个字大小存储更多的信息，JVM将字的最低两个位设置为标记位，不同标记位下的Mark Word示意如下：

``` java
|-------------------------------------------------------|--------------------|
|                  Mark Word (32 bits)                  |       State        |
|-------------------------------------------------------|--------------------|
| identity_hashcode:25 | age:4 | biased_lock:1 | lock:2 |       Normal       |
|-------------------------------------------------------|--------------------|
|  thread:23 | epoch:2 | age:4 | biased_lock:1 | lock:2 |       Biased       |
|-------------------------------------------------------|--------------------|
|               ptr_to_lock_record:30          | lock:2 | Lightweight Locked |
|-------------------------------------------------------|--------------------|
|               ptr_to_heavyweight_monitor:30  | lock:2 | Heavyweight Locked |
|-------------------------------------------------------|--------------------|
|                                              | lock:2 |    Marked for GC   |
|-------------------------------------------------------|--------------------|
```

64位的JVM的标记位为：

``` java
|------------------------------------------------------------------------------|--------------------|
|                                  Mark Word (64 bits)                         |       State        |
|------------------------------------------------------------------------------|--------------------|
| unused:25 | identity_hashcode:31 | unused:1 | age:4 | biased_lock:1 | lock:2 |       Normal       |
|------------------------------------------------------------------------------|--------------------|
| thread:54 |       epoch:2        | unused:1 | age:4 | biased_lock:1 | lock:2 |       Biased       |
|------------------------------------------------------------------------------|--------------------|
|                       ptr_to_lock_record:62                         | lock:2 | Lightweight Locked |
|------------------------------------------------------------------------------|--------------------|
|                     ptr_to_heavyweight_monitor:62                   | lock:2 | Heavyweight Locked |
|------------------------------------------------------------------------------|--------------------|
|                                                                     | lock:2 |    Marked for GC   |
|------------------------------------------------------------------------------|--------------------|
```
在64位虚拟机下对象头的class pointer部分和array length会浪费更多的空间，可以使用 *+UseCompressedOops* 开启指针压缩。

接下来存储的是继承下来的对象字段和对象自己的字段内容。在内存中的存储顺序受虚拟机分配策略参数和字段定义顺序的影响。如果不开启 *+XX: CompactFields* 则父类字段会在子类字段前面。

第三部分是填充数据，由于HotSpot虚拟机GC要求对象起始地址必须是8字节的整数倍。

### 对象访问定位

栈的本地变量表会保存对象的reference数据。《规范》中没有规定具体reference访问方法。主流访问方式有两种：通过句柄地址、通过对象指针,HotSpot使用的是对象指针访问：

![通过句柄访问对象](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/193e992a-8b7b-4fa8-9831-73db74d5482c.png)

![通过对象指针访问](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/f58bc853-bd0f-42f6-bef8-7e6f73aa914a.png)

使用对象指针访问可以节省一次指针定位开销（Shenandoah收集器除外会有一次额外转发）。

## 制造OOM

### 堆溢出

分为内存泄漏和内存溢出，内存泄漏表示你认为应该被回收的对象没有被回收导致OOM，内存溢出表示你认为所有对象都应该保留，导致OOM。

改小堆大小，创建很多的有效对象直到OOM。

### 栈溢出

虚拟机栈和本地方法栈有两种异常，一种是线程请求深度大于JVM允许深度，抛出StackOverFlowError。一种是栈允许动态扩展，但空间大小无法扩展时OutOfMemoryError。

使用 *-Xss* 参数减少栈内存容量，可以导致StackOverflowError。

定义大量本地变量，增大方法帧中本地变量表长度，可以导致StackOverflowError。

受直接物理内存影响，通过不断创建线程方式可能导致OOM。

### 方法区和运行时常量池溢出

运行时常量池是方法区一部分。JDK 6之前常量池分配在永久代。JDK7起字符串常量和静态变量放在了堆中，常量池只存引用。JDK8使用元空间替代永久代。

JDK 6之前通过改小 *-XX: MaxPermSize* 可以导致OOM：PermGen space异常。

JDK 7之前可以通过不断创建新类，例如动态代理可以导致方法区OOM: PermGen space异常。JDK 8使用元空间替代永久代，而元空间归本地内存不在虚拟机内存。所以只受限于本地内存大小。

### 本机直接内存溢出

直接内存容量通过 *-XX: MaxDirectMemorySize* 调整，可以通过Unsafe类申请内存。

# 垃圾收集器与内存分配策略

GC概念早于Java在Lisp语言开始存在。JVM内存中，程序计数器、虚拟机栈、本地方法栈内存伴随线程的生命周期。而Java堆和方法区则更需要垃圾收集。

## 判断可回收对象

### 引用计数法

需要占用额外的内存来存储计数，由于存在循环引用问题，需要额外的处理才能正确工作。

### 可达性分析算法

![可达性分析](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/9d2374dd-edb4-4589-9ac0-530236fee3a9.png)

通过一系列称为"GC Roots"的根对象作为起始点，根据引用向下搜索。搜索过的路径称为“引用链”，到GC Roots不可达的对象可以被回收。Java中的GC Roots包括：

+ 在虚拟机栈（栈帧中的本地变量表）中引用的对象，比如参数、局部变量、临时变量
+ 在方法区中类静态属性引用的对象
+ 方法区中常量引用的对象，比如字符串常量池里的引用
+ 本地方法栈中JNI（Native方法）引用的对象
+ Java虚拟机内部的引用，比如Class对象、常驻异常对象空指针OOM异常、系统类加载器
+ 被同步锁synchronized持有的对象
+ 根据GC及当前回收的内存区域不同，GC会临时引入对象到GC Roots。比如某GC对一块区域进行回收，但是此区域对象可能被其他区域引用，就要把相关区域对象加入GC Roots
+ 反映JVM内部情况的JMXBean，JVMTI中注册的回调，本地代码缓存等

### 引用

JDK 1.2之后，引用分为强引用（Strongly Reference）、软引用（Soft Reference）、弱引用（Weak Reference）、虚引用（Phantom Reference）。

+ 强引用指引用赋值，类似new对象，只要引用还存在永远不会被回收
+ 软引用，内存溢出前会进行回收，如果对软引用回收还没有足够内存才抛OOM
+ 弱引用，每次GC都会被回收
+ 虚引用，不对对象生命周期构成影响，也不能通过虚引用获取对象实例。虚引用可以用来代替 finalize 方法，保证对象在finalize时不会复活；或者在对象被回收时收到一个系统通知

### 回收过程

第一次可达性分析后对没有生存链的对象标记。然后筛选出需要执行finalize()方法的对象（覆盖了finalize方法，或者已经被虚拟机调用过），放入到JVM内名为F-Queue的对象，由一个低优先级Finalizer线程执行它们finalize()方法。为了避免finalize()方法实现问题导致对回收系统的影响，只会触发，不会等待方法执行完。然后对F-Queue队列中对象进行第二次标记，如果上一次调用finalize()方法后对象重新建立起了引用，就会被从F-Queue对象移除。之后剩下的对象就会被回收。

### 回收方法区

《规范》中没有规范方法区的回收行为。如ZGC不支持类卸载。因为方法区GC性价比较低。方法区回收部分主要包括：废弃常量和不再使用的类型。

如果常量池中的方法、字段符号引用已经没有被其他地方引用，可以被回收。

而类型的回收，需要判断这个类的所有实力都已经被回收，加载该类的加载器已经被回收，该类的Class对象没有被引用即可被回收。

Java虚拟机被允许对满足上述三个条件的无用类进行回收，这里说的仅仅是“被允许”，而并不是和对象一-样，没有引用了就必然会回收。在大量使用反射、动态代理、CGLib等字节码框架，动态生成JSP以及OSGi这类频繁自定义类加载器的场景中，通常都需要Java虛拟机具备类型卸载的能力，以保证不会对方法区造成过大的内存压力。

## 垃圾收集算法

### 分代收集理论

分代收集建立在几个分代理论上，弱分代：绝大多数对象只短暂存在；强分代：经过多次GC后都没被回收的对象存在时间会更长；跨代引用：跨代引用只占极少数。

对于弱分代区，只需要关注如果保留少量存活对象，而不用去标记大量要被回收的对象。

对于强分代区，可以用较低的频率来回收。

对于跨代引用，在新生代建立一个全局数据结构把老年代划分成不同的块，只标记出哪一块会出现跨代引用。当手机弱分代区时把该块内老年代对象加入GC Roots。该方法会在改变对象引用关系时记录数据正确性，增加运行时开销。

+ 部分收集(Partial GC) :指目标不是完整收集整个Java堆的垃圾收集，其中又分为:
  1. 新生代收集(MinorGC/YoungGC):指目标只是新生代的垃圾收集。
  2. 老年代收集(Major GC/OldGC) :指目标只是老年代的垃圾收集。目前只有CMS收集器会有单独收集老年代的行为。另外请注意M ajor GC"这个说法现在有点混淆，在不同资料上常有不同所指，读者需按上下文区分到底是指老年代的收集还是整堆收集。
  3. 混合收集(MixedGC):指目标是收集整个新生代以及部分老年代的垃圾收集。目前只有G1收集器会有这种行为。
+ 整堆收集(FullGC) :收集整个Java堆和方法区的垃圾收集。

### 标记-清除算法

最基础的垃圾收集算法，后续收集算法大多以此为基础，对其缺点进行改进。该算法分为两个阶段，第一个阶段是标记出需要回收的对象，或者标记出存活对象。第二个阶段是都需要回收的对象进行清理。

该算法的缺点主要有两个，一个是如果堆中对象数量很多且大部分需要被回收，导致标记清理执行效率随着对象数量的增长而降低；一个是清理后会有内存碎片产生，在以后分配大对象且无连续空间时需要触发另一次垃圾收集动作。

![标记清理算法](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/e048175d-9aa9-4891-976f-62259a6c0a81.png)

### 标记-复制算法

简称复制算法，又称“半区复制”。将可用空间分为大小相等的两块，每次只使用其中一块，GC时将存活的对象复制到另一块保留空间，然后把原空间一次清理。

![标记复制算法](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/8978628e-f073-49e4-bced-1873e2ecf39b.png)

但是如果内存中大多数对的都是存活的，会产生大量的内存复制开销。且会将可用内存空间缩小一半，浪费空间很大。但是根据其新生代对象生命周期特点，并不需要1：1分配。于是产生了现有的分配策略：把新生代分为一块较大的Eden空间和两块较小的Survivor空间，在Eden和s0分配内存，GC时把Eden和s0中存活对象复制到s1。HotSpot默认Eden和2个Survivor空间占比8：2。如果只有一个Survivor区，那么第一次GC后s区会有存活对象，再进行第二次GC在s区会产生空间碎片。而两个s区交替复制存活对象可以避免空间碎片。

但是如果存活对象大于一个s区空间，需要依赖其他内存区域进行“分配担保”，HotSpot上使用老年代。如果s区空间不够存活对象大小，则直接进入老年代。

### 标记-整理算法

鉴于标记复制算法适合存活率低的新生代，不实用与老年代。针对老年代提出了标记整理算法。分为两个阶段，第一个阶段标记出要回收对象或存活对象，第二个阶段把所有存活对象向内存空间一端移动。然后直接清理掉边界以外的空间。

![标记整理算法](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/f2d1ccd4-c9ec-4ad6-a882-d268727ae529.png)

由于老年代对象存活率较高，每次移动对象都需要暂停用户应用程序（STW）。但是如果不进行整理，就需要引入更复杂的内存分配策略和内存访问策略来解决碎片化问题。而内存访问又是用户程序频率最高的操作，不便在这个阶段增加负担。因此是否有整理过程有会存在弊端。反映到垃圾收集器上看，关注吞吐量的Parallel Scavenge收集器基于标记整理，关注延迟的CMS收集器则基于标记清理。而CMS的策略是，大多数时间使用标记清理算法，只有在碎片影响到内存分配时才采用标记整理算法清理一次碎片空间。

## HotSpot算法细节

### 根节点枚举

可达性分析算法中需要从GC Roots开始寻找对象引用链。而可以作为GC Roots的对象除了在全局性引用（例如常量或静态类属性），还有执行的动态上下文中（例如栈帧中的本地变量表）。虽然目标区域范围明确，但还是需要每次GC时都需要从这些内存区域中扫描出引用类型对象，因为只有引用类型才能作为GC Roots，并且这个过程需要STW。由于HotSpot虚拟机使用的是准确式垃圾收集（内存位置上的对象类型是确定的），所以可以通过一组叫OopMap的数据结构来保存引用类型对象位置，而不需要逐一的扫描过滤出引用类型对象。OopMap的结构存放一个对象内什么偏移量上是什么类型的数据。

### 安全点

虽然OopMap可以在GC时快速在目标区域范围定位出引用类型对象。但是如果每一条指令都生成对应的OopMap，会占用很大的额外空间。因此HotSpot只有在安全点才会生成OopMap。而安全点也就决定了不能在用户程序执行的任一指令流位置执行GC，必须要到达安全点后才能暂停。安全点位置：

+ 方法临返回前/调用方法的call指令后
+ 循环的末尾
+ 抛异常的位置

选取这些位置的目的是避免程序长时间无法进入安全点。GC之前要等所有的应用线程进入安全点，如果有一个线程一直没有进入安全点，就会导致GC时JVM停顿时间延长。比如超大的循环导致执行GC等待时间过长。

目有两种方法可以让GC发生时所有的线程都在最近的安全点停顿下来：抢占式中断和主动式中断。

抢先式中断在GC发生时，首先中断所有线程，如果发现线程未执行到安全点，就恢复线程让其运行到安全点上。

主动式中断在GC发生时，不直接操作线程中断，而是简单地设置一个标志，让各个线程执行时主动轮询这个标志，发现中断标志为真时就自己中断挂起。由于轮询标志的频率很高，需要轮询高效，所以HotSpot使用内存保护陷阱的方式，把轮询操作精简为一条test汇编指令。当需要暂停用户线程时，虚拟机把某一内存页设置为不可读，在执行test时就会产生异常信号，然后在预先设置的异常处理中挂起线程实现等待。这样一条汇编指令即可实现安全点的轮询和触发线程挂起。主动式中断也是目前HotSpot采用的中断方式。

### 安全区域

安全点机制只适用于执行中的线程，对于处于Sleep或Blocked状态的线程，引入了安全局域。安全区域是指能够确保在某一段代码片段之中，引用关系不会发生变化，因此，在这个区域中任意地方开始垃圾收集都是安全的。

当用户线程执行到安全区域里面的代码时，首先会标识自己已经进入了安全区域，那样当这段时间里虚拟机要发起垃圾收集时就不必去管这些已声明自己在安全区域内的线程了。当线程要离开安全区域时，它要检查虚拟机是否已经完成了根节点枚举(或者垃圾收集过程中其他需要暂停用户线程的阶段)，如果完成了，那线程就当作没事发生过，继续执行;否则它就必须一直等待，直到收到可以离开安全区域的信号为止。

### 记忆集与卡表

记忆集是用来存储，老年代到新生代的引用，或者分区域收集时的非收集区域指向收集区域的引用。对于垃圾收集器来说，只需要通过记忆集判断出某一块非收集区域是否有指向收集区域的指针即可，并不需要知道所有对象引用关系。所以记忆集的粒度可以更大一些。可选的粒度有：

+ 字长精度：每个记录精确到一个机器字长（32位和64位的寻址位数），该字包含跨代指针。
+ 对象精度：每个记录精确到一个对象，对象的字段包含跨代指针。
+ 卡精度：每个记录精确到一块内存区域，该区域内有对象含有跨代指针。

HotSpot所使用的是卡精度，称为“卡表(Card Table)”。卡表是记忆集的一种实现。卡表可以用于老年代到新生代的引用，也可以用于新生代跨Region之间的引用。将老年代内存空间，或者某一块Region按照512字节分成不同的“卡页（Card Page）”，一个Card Page内存中通常有多个对象，只有有一个对象存在跨代、区域的引用，那么这个卡页就是Dirty的。卡表中维护着一个字节数组，每一位字节按顺序对应一个Card Page。如果对应的Card Page是Dirty的，那么这一位就是1，否则是0。

![Card Table 与 Card Page 示意图](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/4b8f37f5-2345-4db4-aea6-9f538d91c316.png)

### 写屏障

前面已经解决了如何使用Remembered Set来缩减GC Roots扫描范围，接下来解决如何维护卡表。卡表的维护难度在编译执行场景中，因为经过即时编译后的代码是机器指令流，没有虚拟机的介入空间了。

HotSpot虚拟机通过Write Barrier维护卡表状态。这个写屏障和低延迟收集器与内存屏障没有任何关系，清做好区分。写屏障可以看做是虚拟机层面对“引用类型变量的复制”这个动作的AOP切面，在引用赋值时以提供程序执行额外动作。赋值前叫Pre-Write Barrier，赋值后叫Post-Write Barrier。应用写屏障后会被织入赋值操作指令流，虽然会产生一些开销，但是相对于扫描整个老年代空间性价比会高。

假设处理器缓存行大小为64字节，一个Card Table元素占1字节，那一个缓存行对应32KB的Card Page大小。但是在多线程赋值操作在这32KB内是会存在并发问题，又叫“伪共享”，会影响性能。因此引入了预先判断的写屏障，先检查Card Table的标记，只有当未标记过，才去更新标记。JDK 7之后可以使用参数 *-XX: +UseCondCardMark* 决定是否开启预判断。

### 并发的可达性分析

经过上面的过程虽然找出了GC Root，但是遍历对象引用链的停顿时间也会和堆内对象数量和图结构复杂程度成正比。

为了不停顿，就需要一种能够和用户线程并行的遍历算法。三色标记，在JVM和GO等很多语言的垃圾收集中都有使用。三色标记指三种颜色：白色表示对象未被扫描过；黑色表示该对象所有引用都被扫描过；灰色表示该对象上至少存在一个引用没被扫描过。在使用三色标记的遍历算法下，当用户线程产生了从黑色对象到白色对象的引用并且删除了所有从灰色对象到该白色对象的引用时，会影响扫描结果而对用户程序造成影响。因此同时引入了两个解决方案，一个是增量更新，一个是原始快照。

增量更新避免了用户线程新建从黑色对象到白色对象的引用。当发生这种操作时，就将新插入的引用记录下来，当扫描结束之后再以记录的黑色节点为根重新扫描一次。

原始快照避免了所有灰色对象到该白色对象的引用都被删除。当发生这种操作时，就将要删除的引用记录下来，当扫描结束之后再以记录的灰色节点为根重新扫描一次。

以上两种解决方案都是通过写屏障实现的。在HotSpot中，CMS基于增量更新做并发标记，G1、Shenandoah用原始快照实现并发标记。

## HotSpot中常见垃圾收集器

GC算法是方法论，收集器是具体实现。而且《规范》中也没有规定收集器该如何实现。

![HotSpot虚拟机垃圾收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/6262bab4-0127-40cf-b2f6-adb08b155925.png)

JDK 9中取消了Serial+CMS和ParNew+Serial Old组合。

### Serial

单线程工作收集器，Serial线程在进行收集工作时，必须暂停所有用户线程。特点是简单且高效，相比其他收集器，由于GC所占用的额外内存最小，且没有线程交互开销。至今依然是HotSpot在Client模式下默认新生代收集器。可选参数-XX: SurvivorRatio、 -XX: PretenureSizeThreshold、-XX: HandlePromotionFailure等。

![Seria/Serial Old收集器运行示意图](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/5c6cecf7-0d56-4b2f-8ce6-53dc66b56ae7.png)

### ParNew

只是Serial的多线程版本，但是在单核心处理器下由于存在线程交互开销可能还不如Serial收集器。目前只有Serial和ParNew可以与CMS配合，而Parallel Scavenge收集器和CMS除了一个面向低延迟一个面向高吞吐量的目标不一致外，技术上的原因是Parallel Scavenge收集器及后面提到的G1收集器等都没有使用HotSpot中原本设计的垃圾收集器的分代框架，而选择另外独立实现。Serial、 ParNew收集器则共用了这部分的框架代码。ParNew是CMS的默认新生代收集器。因此是CMS巩固了ParNew的地位。JDK 9后被G1取代。可选参数-XX: SurvivorRatio、 -XX: PretenureSizeThreshold、-XX: HandlePromotionFailure等。

![ParNew/Serial Old收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/3c9da17f-0c07-47dd-bb72-45b1a1cf0689.png)

### Parallel Scavenge

基于标记复制的新生代收集器。CMS等目标是缩短GC用户线程停顿时间，而Parallel Scavenge目标是吞吐量可控。吞吐量=用户代码时间/(用户代码时间+GC时间)。提供了参数用于控制吞吐量：

+ -XX: MaxGCPauseMillis 控制最大停顿时间，大于0的毫秒数。但是停顿时间变小可能会牺牲吞吐量和新生代空间。
+ -XX: GCTimeRatio 设置吞吐量大小，大于0小于100的整数，1/(1+N)。
+ -XX: +UseAdaptiveSizePolicy，根据系统运行情况动态调整新生代大小、Eden与Survivor比例、晋升老年代对象大小等参数。

### Serial Old

标记整理算法的老年代单线程收集器，供Client模式使用。需要说明一下，Parallel Scavenge收集器架构中本身有PS MarkSweep收集器来进行老年代收集，并非直接调用Serial Old收集器，但是这个PS MarkSweep收集器与Serial Old的实现几乎是一样的，所以在官方的许多资料中都是直接以Serial Old代替PS MarkSweep进行讲解。


![Serial Old收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/a733cb0c-faf0-4f5c-90fd-93f323c99b24.png)

### Parallel Old

Parallel Scavenge老年代版本，基于标记整理算法。可以和Parallel Scanvenge组合。

![Parallel Old收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/f7624728-6b23-402f-852d-0f1725feb6e9.png)

### CMS 收集器

基于标记清理算法的关注定顿时间的收集器。整个过程分为四步：initial mark/concurrent mark/remark/concurrent sweep。

其中初始标记、重新标记需要STW。初始标记仅仅只是标记一下GC Roots能直接关联到的对象，速度很快;并发标记阶段就是从GC Roots的直接关联对象开始遍历整个对象图的过程，这个过程耗时较长但是不需要停顿用户线程，可以与垃圾收集线程一起并发运行;而重新标记阶段则是为了修正并发标记期间，因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，这个阶段的停顿时间通常会比初始标记阶段稍长一些，但也远比并发标记阶段的时间短;最后是并发清除阶段，清理删除掉标记阶段判断的已经死亡的对象，由于不需要移动存活对象，所以这个阶段也是可以与用户线程同时并发的。

![CMS收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/50fdf46f-02aa-4530-a2ef-d6e0bdcd9cd9.png)

在并发阶段虽然不会导致用户线程停顿，但会占用处理器资源，处理器核心越少影响越大。

无法处理并发标记和清理过程中用户线程新产生的浮动垃圾。因为是与用户线程并发运行，还需要预留出空间，所以当老年代空间使用占比达到一定阈值后才会激活（-XX: CMSInitiatingOccupancyFraction）。而因为预留内存不足而导致并发失败会启用Serial Old收集器来工作。

因为是基于标记清理算法，所以会产生空间碎片。当不能分配大对象时会触发Full GC。*-XX: +UseCMS-CompactAtFullCollection*  参数可以配置在FullGC时开启碎片整理，由于碎片整理需要停顿时间变长，所以提供 *-XX： CMSFullGCsBeforeCompaction* （JDK9中已废弃）配置多少次FullGC后，下一次FullGC进行碎片整理。

### Garbage First

G1收集器是里程碑式成果。基于Region的内存布局形式的局部收集设计，在延迟可控的情况下获得尽可能高的吞吐量。JDK 9开始G1替换Parallel Scavenge+Parallel Old。G1不再应用于分代，而是面向堆内存中的任何部分来组成Collection Set（CSet）。进行回收的衡量标准是哪块内存中存放的垃圾数量最多，回收收益最大。这就是Mixwd GC模式。

G1中的Ragion划分，每个Region都可以扮演新生代Eden、Survivor、或者老年代。收集器能够对扮演不同角色的Region采用不同策略。Region中有一类叫Humongous区域专门用来存放大对象，大对象表示超过了一个Region容量一半的对象。每个Region大小可以通过 *-XX: G1HeapRegionSize* 设定，1M-32M。如果一个对象超过了一个Region大小会被存放在N个连续的Humongous Region中。

虽然G1仍然保留新生代和老年代概念，但是这两个空间不再固定，而是一系列Region的动态集合。根据每个Region回收获得的空间大小及所需时间，维护一个回收优先级列表，优先处理回收性价比最高的Region。这也是“Garbage First”名字的由来。这种使用Region划分内存空间，和按优先级的区域回收方式，保证了G1在优先的时间内获取更高的效率。

![G1收集器](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/c81076a4-3799-410c-adab-e9a3dc7f8c21.png)

G1处理跨Region的对象引用的方法是，每个Region维护自己的RSet哈希表，Key是其他Region的起始地址，value是Card Page索引号的集合，这些RSet记录其他Region指向自己的指针，并标记这些指针位于哪些Card Page。这是一种双向的Card Page结构，同时记录了向外指针和向内指针。由于Region的数量很多，所以G1要使用大约占堆容量的10%~20%的额外内存。

G1处理与用户线程同步进行GC的方法是，采用原始快照SATB的方式。并且G1为每个Region设计了两个TAMS(Top at Mark Start)的指针，把Region中的一部分指针以上的空间用来并发回收过程中的新对象分配，G1会认为在这个地址以上的对象被隐式标记过默认存活。但是如果内存回收速度赶不上内存分配速度，G1会STW。

G1为了满足 *-XX: MaxGCPauseMillis* 用户期望停顿时间，是以衰减均值的方式。在GC过程中记录每个Region的回收耗时、Dirty Card数量等成本并得出统计信息。然后通过这些信息预测从哪些Region开始回收才能满足期望值。衰减平均值比普通的平均值更能代表最近时间的平均状态。

G1的GC过程大致可以分为以下四步：

+ Initial Marking，标记GC Roots能直接关联到的对象，并修改TAMS指针让下一阶段用户线程分配对象时能正确在可用Region中分配。需要STW。
+ Concurrent Marking，从GC Roots开始对堆中对象进行可达性分析，耗时较长但与用户线程并发进行。扫描完成后会再次重新处理SATB记录的引用变动对象。
+ Final Marking，处理并发阶段结束后遗留的SATB记录。需要STW。
+ Live Data Counting and Evacuation，筛选回收阶段更新Region的统计数据并排序，指定回收计划。把计划回收的Region中存活对象复制到空Region，再清理整个Region。需要SWT。

G1之所以不把回收阶段设计为并行，是为了保证简单的实现高吞吐量，而把这个设计延迟到ZGC实现。

![G1运行示意图](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/3b33f2da-713f-4e35-b017-1643a64ecfe7.png)

*-XX: MaxGCPauseMillis* 默认两百毫秒，如果设置的非常低会导致每次只回收一小部分Region，从而收集速度跟不上分配速度最终引发Full GC。从G1开始垃圾收集器的设计导向由清理干净转变为收集速度能跟得上分配速度。

G1从整体上看是标记整理，局部上看是标记复制。都意味着G1不会产生空间碎片，不容易因为大对象无法找到连续空间而触发GC。

而G1的缺点也是存在的，每个Region都要保存一份RSet而带来的额外内存占用；多了写前屏障来跟踪并发时动态指针变化SATB带来的额外的运行负载。由于G1的对写屏障的复杂操作，不得不把写屏障要做的事放到队列里异步处理。

经验上看小内存CMS优于G1，大内存G1优于CMS。

## 低延迟垃圾收集器

衡量垃圾收集器的三项最重要的指标是：内存占用（Footprint）、吞吐量（Throughput）、延迟（Latency）。随着计算机硬件的发展内存的增长，吞吐量会更高，但是对延迟会造成负面影响，因此更低的延迟成为了下一代GC的目标。下图是前文中所有GC的停顿情况，浅色标识必须挂起用户线程，深色标识并发工作。

![各收集器并发情况](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/7795a6a6-1be6-4ebf-927c-6ea5034aa0cb.png)

在CMS和G1之前的全部收集器，其工作的所有步骤都会STW;CMS和G1分别使用增量更新和原始快照技术，实现了标记阶段的并发，不会因管理的堆内存变大，要标记的对象变多而导致停顿时间随之增长。但是对于标记阶段之后的处理，仍未得到妥善解决。CMS使用标记清除算法，虽然避免了整理阶段收集器带来的停顿，但是清除算法不论如何优化改进，在设计原理上避免不了空间碎片的产生，随着空间碎片不断淤积最终依然逃不过STW。G1虽然可以按更小的粒度进行回收，从而抑制整理阶段出现时间过长的停顿，但毕竟也还是要暂停的。

而Shenandoah和ZGC， 几乎整个工作过程全部都是并发的，只有初始标记、最终标记这些阶段有短暂的停顿，这部分停顿的时间基本.上是固定的，与堆的容量、堆中对象的数量没有正比例关系。实际上，它们都可以在任意可管理的(譬如现在ZGC只能管理4TB以内的堆)堆容量下，实现垃圾收集的停顿都不超过十毫秒。这两款目前仍处于实验状态的收集器，被官方命名为“低延迟垃圾收集器”(Low-Latency Garbage Collector或者Low-Pause Time Garbage Collector)。

### Shenandoah

[OpenJDK WIKI](https://wiki.openjdk.java.net/display/shenandoah/Main "Shenandoah GC")

由于和Oracle官方实现的下一代功能重合，遭受了Ocacle将其完全排除在了OracleJDK之外，因此只能在OpenJDK中使用。其和G1之间有很多的相似和代码复用，因此G1还从Shenandoah代码合并了多线程Full GC功能。G1回收阶段是多线程并行的，但却不能与用户线程并发，而Shenandoah支持并发的整理算法；Shenandoah没有新生代Region或者老年代Region之分；G1中消耗大量内存和计算资源维护的RSet在Shenandoah中改为使用Connection Matrix连接矩阵的全局数据结构来记录跨Region引用关系且降低了伪共享发生的概率。连接矩阵大致结构是一张二维表：

![Shenandoah的Connection Matrix示意图](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/a3a6564d-fc1a-4611-bcd8-1ff694e68a60.png)

Shenandoah工作过程大致分为九个阶段，2.0版本中在初始标记之前还有Initial Partial/Concurrent Partial/Final Partial阶段可以理解为分代收集中的Minor GC的工作。

+ Initial Marking初始标记：标记与GC Roots直接关联的对象，需要STW，与堆大小无关，至于GC Roots数量有关。
+ Concurrent Marking并发标记：遍历对象引用图，标记处所有可达对象。时间取决于堆中存活对象数量和图的复杂程度。
+ Final Marking最终标记：处理剩余SATB扫描，并按回收价值统计出Collection Set回收集，需要小段时间的STW。
+ Concurrent Cleanup并发清理：清理Immediate Grabage Region（内部无存活对象的Region）。
+ Concurrent Evacuation：并发回收：Collection Set中存活对象复制到空Region中，通过读屏障和Brooks Pointers转发指针解决旧对象引用问题。时间取决于Collection Set大小
+ Initial Update Reference初始引用更新：此阶段确保所有对象复制操作已经完成。需要短暂STW。
+ Concurrent Update Reference并发引用更新：按照内存物理地址顺序线性找出引用类型，把旧引用改为新引用。时间取决于引用数量多少。
+ Final Update Reference最终引用更新：修正GC Roots中的引用，需要STW，与GC Roots数量有关。
+ Concurrent Cleanup并发清理：回收集中所有Region变为Immediate Garbage Regions，统一回收。

![Shenandoah收集周期](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/af90593b-9508-4c03-9d3d-376077f55112.png)

> 
GC(3) Pause Init Mark 0.771ms  
GC(3) Concurrent marking 76480M->77212M(102400M) 633.213ms  
GC(3) Pause Final Mark 1.821ms  
GC(3) Concurrent cleanup 77224M->66592M(102400M) 3.112ms  
GC(3) Concurrent evacuation 66592M->75640M(102400M) 405.312ms  
GC(3) Pause Init Update Refs 0.084ms  
GC(3) Concurrent update references  75700M->76424M(102400M) 354.341ms  
GC(3) Pause Final Update Refs 0.409ms  
GC(3) Concurrent cleanup 76244M->56620M(102400M) 12.242ms  

Brooks Pointers转发指针用来实现对象移动与用户程序并发。Brooks是一个人名。再次之前的实现需要在被移动对象上设置内存保护陷阱，在异常处理器中把访问转发到新对象。这样会导致频繁的用户态核心态切换。转发指针在原对象结构头添加新引用字段，在正常情况下改引用指向自己。这样间接对象访问可以优化到只有一行汇编即可。

如果收集器和用户线程并发对同一个对象并发写，要保证写操作发生在新对象上。Shenandoah通过CAS保证GC更新转发指针和用户线程更新对象数据只有一个可以成功。Shenandoah为了覆盖全部对象访问操作，同时设置了读写屏障。因为读的操作量级很大，所以在JDK 13中Shenandoah内存屏障模型改为基于引用访问屏障，只拦截引用类型数据的读写。

### ZGC

[OpenJDK WIKI](https://wiki.openjdk.java.net/display/zgc/Main "ZGC")

Oracle亲儿子。目标都是在不影响吞吐量的情况下实现堆大小对停顿时间无影响。PGC->C4->ZGC一脉相承。ZGC基于Region布局，不分代，使用了读屏障、染色指针和内存多重映射等技术实现可并发的标记整理算法。

与G1不同的是，ZGC的Region（Page或ZPage）动态的创建和销毁，动态的容量大小。ZGC的Region分为大中小三类：

+ Small Region：固定为2MB，用于存放小于256KB的对象。
+ Medium Region：容量固定为32MB，用于存放大于等于256KB小于4MB的对象。
+ Large Region：大小为2MB的整数倍，用于存放4MB或以上的对象。每个Region只存放一个对象，且内存不会被重新分配。

![ZGC 内存模型](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/603b145f-e0a6-49fb-aa6e-81b54e8c4a0a.png)

Shenandoah使用转发指针和读屏障来实现并发整理，ZGC使用染色指针技术实现了读屏障。在此之前要在对象上存储额外数据都是在对象头中添加字段，例如传统垃圾收集会在对象头中打存活标记，但是这本质上只和引用有关。G1和Shenandoah使用了堆内存1/64大小的BitMap来记录标记，而ZGC的染色指针把标记信息记录类引用对象的指针上，这样可达性分析中只需要遍历指针即可。

在64位的操作系统中，限于硬件的发展和操作系统的使用方式，64位的指针中只会使用低几位用于寻址，高几位并没有使用到。例如在64位linux下只有低46位能用来寻址。而剩下的46位64TB的寻址范围当今还使用不到，所以ZGC在剩下的46位指针中取出高4位用于标记存储信息。因为在46位又拿出了4位用于存储信息，所以ZGC只能使用42位来分配地址，导致堆容量最大4TB。

![ZGC 染色指针](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/d4caf0f9-2e0e-41f3-b3f3-e9bef4d6a129.png)

而由于虽然46位中的高4位被ZGC用来标记，但是对于操作系统，还是要使用整个46位用来寻址。所以ZGC不得不使用标志位来分割虚拟内存空间，通过多重映射把（标志位+实际ZGC堆内地址）带来的空间偏移的多段虚拟内存空间通过mmap映射到同一块物理内存。这样才能正常的对堆中的一个对象进行寻址。

![ZGC 内存映射](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/2b3f1da4-723d-4633-b26e-a8dc76855d8a.png)

染色指针带来的好处：

+ 某个Region的存活对象被移走后这个Region立即就能被释放和重用，不用像Shenandoah一样整个堆中所有指向这个Region的引用被修正后才能清理。
+ 可以减少GC过程中内存屏障的使用数量。写屏障通常为了记录对象引用变动的情况，把这些信息维护在指针中可以省去一些专门的记录操作。
+ 染色指针并不局限于使用46位中的高4位。实际上可以利用更高位。以便日后扩展。

![ZGC 周期](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/d91d3868-b86c-4a5f-8466-c408544010bb.png)

+ Concurrent Mark：遍历对象引用图的可达性分析阶段，前后也要经过初始标记、最终标记的短暂停顿。但是此阶段是在指针上标记。
+ Concurrent Prepare for Relocate：并发预备重分配统计出要清理的Region组成重分配集Relocation Set。重分配集决定里面的存活对象会被重新复制到其他Region，集合里面的Region会被释放。
+ Concurrent Relocate：并发重分配把存活对象复制到新Region，并未分配集中每个Region维护一个转发表Forward Table记录旧对象到新对象的转向关系。使用染色指针，ZGC可以从引用上判断对象是否在重分配集中，如果用户线程此时并发访问对象，会被内存屏障截获，并根据Region上的转发表将访问转发到新对象上，同时修正更新引用的值使其直接指向新对象，这个动作称为SelfHealing自愈能力。这样做只有在第一次访问转发对象的时候需要判断。而Shenandoah的Brooks指针每次都要付出开销。
+ Concurrent Remap：并发重映射用来修正整个堆中的引用转发关系，虽然转发对象第一次访问时可以自愈，但是这个阶段可以帮助修正一些引用减少自愈开销。ZGC把这个阶段合并到下一次垃圾收集生命周期中的并发标记阶段。因为它们都需要遍历所有对象可以节省一次遍历开销。所有指针被修正后转发表才被释放。

ZGC的缺陷是，如果并发收集的生命周期过长，比如十几分钟。新分配的对象会当存活对象，会产生浮动垃圾。很有可能跟不上分配的速度。要从根本上解决这个问题还需要引入分代收集。

在多核处理器上的非同一内存访问架构中，ZGC会优先在当前处理器的本地内存上分配对象。

### Epsilon

只负责对象分配管理，不进行垃圾回收的收集器。这个收集器可以用性能测试和压力测试中的差异性分析和内存压力测试，以避免gc的性能损耗对测试结果的影响。

在微服务和无服务架构的演进下，对于短周期应用可能不需要垃圾清理，可以使用Epsilon。

## 选择合适的垃圾收集器

### 收集器的权衡

+ 应用是关注吞吐量还是关注及时性
+ 硬件规格
+ JDK发行版本

### JVM及GC日志

JDK 9之前JVM各功能模块的开关分布在不同的参数上，且格式不统一。直到JDK 9才统一日志框架，所有的日志功能配置都统一到了 *-Xlog* 参数上。

## 实战内存分配与回收

### 对象优先在Eden分配

通过设置各分代大小，打印GC日志，查看对象先在Eden中分配，当Eden中内存不足时触发Minor GC，如果Survivor空间不足通过分配担保机制老对象提前转移到老年代。新对象再在Eden中分配。

### 大对象直接进入老年代

对于长字符串和数组，通过配置 *-XX: PretenureSizeThreshold* ，超过阈值的直接进入老年代。

### 长期存活的对象进入老年代

通过配置 *-XX: MaxTenuringThreshold* 存活周期超过阈值的进入老年代。

### 动态对象年龄判定

如果再Survivor空间中相同年龄所有对象的大小总和大于一半，年龄大于等于该年龄的对象将直接进入老年代

### 空间分配担保

在发生Minor GC之前，虚机要检查老年代最大可用连续空间是否大于新生代所有对象总和，如果大于认为这次Minor GC是安全的。如果小于，会查看 *-XX: HandlePromotionFailure* 是否允许担保失败，如果允许，会继续检查老年代连续空间是否大于历次晋升到老年代对象平均大小，如果大于将进行Minor GC。如果小于将进行一次Full GC。

# 性能监控、故障处理

## 概述

给一个系统定位问题的时候，知识、经验是基础，数据是依据，工具是运用知识处理数据的手段。数据包括但不限于异常堆栈、虚拟机运行日志、垃圾收集器日志、线程快照（threaddump/javacore）文件、堆转储文件（heapdump/hprof）等。

## 基础故障处理工具

### jps：JVM进程状况工具

JVM Process Status Tool，可以列出正在运行的虚拟机进程。

### jstat：JVM统计信息监控工具

JVM Statistics Monitoring Tool，可以显示本地或远程进程中的类加载、内存、垃圾收集、即时编译等运行时数据。

### jinfo：Java配置信息工具

Configuration Info for Java，实时查看和调整虚拟机参数。

### jmap：Java内存映像工具

Memory Map for Java，用于生成堆转储快照heapdum/dump文件。查询finalize执行队列、堆和方法区的空间利用率等信息。

### jhat：JVM堆转储快照分析工具

JVM Heap Analysis Tool与jmap搭配使用。很少使用。

### jstack：Java堆栈跟踪工具

Stack Trace for Java，生成JVM当前时刻线程快照。当前每一个线程的方法堆栈集合。

### 可视化工具

JConsole、VisualVM、Java Mission Control（需要和JFR一同使用）。

# 虚拟机执行子系统

## 类文件结构









# Java技术体系

Java程序设计语言、Java虚拟机、Java类库三部分统称为JDK。JCP官方所定义的Java技术体系包括了：

+ Java程序设计语言
+ 各种硬件平台上的Java虚拟机实现
+ Class文件格式
+ Java类库API
+ 第三方Java类库

![Java技术体系](/assets/images/understanding-the-jvm-advanced-features-and-best-practices/8f3089a1-3bad-4e66-ab81-b72bbc725839.png)

# Java虚拟机家族

1. 虚拟机始祖：Sun Classic/Exact VM，只能解释执行Java，或通过外挂即时编译器。并且两者冲突。
2. HotSpot VM，由Sun收购而来。拥有热点代码探测技术，通过执行计数器找到热点代码进行即时编译。和栈上替换编译(OSR)。
3. Mobile/Embedded VMs，Java ME产品线上的虚拟机。
4. BEA JRockit和IBM j9 VM。
5. Google Android Dalvik VM。
6. Microsoft JVM。
7. 专用硬件平台上的虚拟机及其他。

2018年Oracle Labs公开了Graal VM。号称Run Programs Faster Anywhere。除了可以运行JVM系语言，还可以运行C、C++等基于LLVM语言和JavaScript、Ruby、Python、R。Graal VM可以无额外开销的混合使用这些语言，支持不同语言混用接口。

# 新一代即时编译器

HotSpot,虚拟机中含有两个即时编译器，分别是编译耗时短但输出代码优化程度较低的客户端编译器(简称为C1)以及编译耗时长但输出代码优化质量也更高的服务端编译器(简称为C2)，通常它们会在分层编译机制下与解释器互相配合来共同构成HotSpot虚拟机的执行子系统。自JDK 10 起，HotSpot引入和Graal编译器。

# 向Native迈进

在未来微服务甚至无服务的趋势下，Java越来越显得臃肿和不适应。因为Java需要几百兆的JRE，以及预热才能达到快速运行。所以Java需要向提前编译迈进，但是提前编译就不能一次编写到处运行。直到Substrate VM的出现。

Subtrate VM是在Graal VM 0.20版本里新出现的一个极小型的运行时环境，包括了独立的异常处理、同步调度、线程管理、内存管理(垃圾收集)和JNI访问等组件，目标是代替HotSpot用来支持提前编译后的程序执行。它还包含了一个本地镜像的构造器(Native Image Generator)，用于为用户程序建立基于Substrate VM的本地运行时镜像。这个构造器采用指针分析(Points-To Analysis)技术，从用户提供的程序入口出发，搜索所有可达的代码。在搜索的同时，它还将执行初始化代码，并在最终生成可执行文件时，将已初始化的堆保存至一个堆快照之中。这样一来，Substrate VM就可以直接从目标程序开始运行，而无须重复进行Java虛拟机的初始化过程。但相应地，原理上也决定了Substrate VM必须要求目标程序是完全封闭的，即不能动态加载其他编译器不可知的代码和类库。基于这个假设，Substrate VM才能探索整个编译空间，并通过静态分析推算出所有虛方法调用的目标方法。Substrate VM带来的好处是能显著降低内存占用及启动时间。

# HotSpot

现在，HotSpot 虚拟机能够在编译时指定一系列特性开关，让编译输出的HotSpot虚拟机可以裁剪成不同的功能，譬如支持哪些编译器，支持哪些收集器，是否支持JFR、
AOT、CDS、NMT等都可以选择。能够实现这些功能特性的组合拆分，反映到源代码不仅仅是条件编译，更关键的是接口与实现的分离。

早期的HotSpot虛拟机为了提供监控、调试等不会在《Java虛 拟机规范》中约定的内部功能和数据，就曾开放过Java虛拟机信息监控接口(Java Vrtual Machine ProflerInterface，JVMPI) 与Java虛 拟机调试接口(Java Vrtual Machine Debug Interface, JVMDI)供运维和性能监控、IDE等外部工具使用。到了JDK 5时期，又抽象出了层次更高的Java虚拟机工具接口(Java Virtual Machine Tool Interface, JVMTI) 来为所有Java虛拟机相关的工具提供本地编程接口集合，到JDK 6时JVMTI就完全整合代替了JVMPI和JVMDI的作用。

在JDK 9时期，HotSpot虛拟机开放了Java语言级别的编译器接口B] (Java Vrtual Machine Compiler Interface, JVMCI) ，使得在Java虛拟机外部增加、替换即时编译器成为可能，这个改进实现起来并不费劲，但比起之前JVMPI、JVMDI和JVMTI却是更深层次的开放，它为不侵入HotSpot代码而增加或修改HotSpot虛拟机的固有功能逻辑提供了可行性。Graal编译器就是通过这个接口植入到HotSpot之中。

到了JDK 10，HotSpot又重构了Java虛拟机的垃圾收集器接口[4] (Java Vrtual Machine Compiler Interface)，统一了其内部各款垃圾收集器的公共行为。有了这个接口，才可能存在日后(今天尚未)某个版本中的CM S收集器退役，和JDK 12中Shenandoah这样由Oracle以外其他厂商领导开发的垃圾收集器进入HotSpot中的事情。如果未来这个接口完全开放的话，甚至有可能会出现其他独立于HotSpot的垃圾收集器实现。

