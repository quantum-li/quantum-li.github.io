---
layout: posts
title: JDK 8源码体系结构
categories:
- jdk
- 源码
description: 
classify: jdk8
permalink: "/posts/jdk-8-source"
excerpt: 介绍jdk包结构，类及接口继承实现关系来了解jdk源码。
---
 
+ [HOME](https://docs.oracle.com/javase/8/)
+ [Document](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/toc.html)
+ [Java Doc](https://docs.oracle.com/javase/8/docs/api/index.html)

## [Object](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)

`Object` 是Java中类结构的根。是所有类和数组(T[])的超类。

### public final native Class<?> getClass()

该方法由本地方法实现。

返回一个对象的类对象。返回的类对象，就是该类中`static synchronized`方法加锁的对象。

如果对象是一个类型擦除对象，则返回对象运行时的类。也就是说`((Object)new String()).getClass()`实际返回的是 String。

### public native int hashCode()

该方法由本地方法实现。

返回对象的哈希码，已用于需要判断对象相等的场景。

这个方法可以重写，但需要满足以下约定：

+ 在应用运行期间，当hashCode方法使用到的对象信息没有被修改过的情况下，对同一个对象的多次调用必须产生相同的整数。但同一个应用程序的两次运行不需要产生相同的整数。
+ 如果`equals(Object)`返回两个对象相等，则这两个对象中的每一个调用hashCode方法必须产生相同的整数结果。
+ 如果`equals(Object)`返回两个对象不相等，并不要求对每个对象调用hashCode方法必须产生相同的整数结果。但虽然没做要求，如果产生不相等的整数能够提高哈希表的性能。

在合理的情况下，没有被重写的 hashCode 方法确实为不同的对象返回不同的整数。这是通过将对象的内部地址转换为整数来实现的，对象不同则内部地址不同。但Java并没有要求必须这样做。所以重写后的 hashCode 方法，不同的对象可能会返回相同的整数。

### public boolean equals(Object obj)

 equals 在非空对象引用上实现如下等价关系：

+ 自反关系：对于任何非空对象x，`x.equals(x)`应该返回true。
+ 对称关系：对于任何非空对象x和y，当且仅当`y.equals(x)`返回true时，`x.equals(y)`才应该返回true。
+ 传递关系：对于任何非空对象x，y和z。如果`x.equals(y)`返回true并且`y.equals(z)`返回true，那么`x.equals(z)`应该返回true。
+ 一致关系：对于任何非空对象x和y，当对象`equals`方法中使用到的信息没有被修改时，`x.equals(y)`的多次调用应该保持一致。
+ 对于任何非空对象x，`x.equals(null)`应该返回false。

当重写此方法时，应当重写hashCode方法。

Object类默认的实现是，判断是否是同一个对象，因此对于非空引用值x和y，只有x和y引用同一个对象时，才返回true。

### protected native Object clone() throws CloneNotSupportedException

该方法由本地方法实现。

返回一个对象的副本。对于对象x，需要但不强制满足：

+ x.clone() != x
+ x.clone().getClass() == x.getClass()
+ x.clone().equals(x)

通常来讲，clone方法需要调用`super.clone`。如果所有超类都遵守这个约定，就可以满足`x.clone().getClass() == x.getClass()`。

Object类中的默认实现是浅拷贝。并且如果对象没有实现Cloneable接口，会抛出CloneNotSupportedException。需要注意所有数组T[]都认为实现了Cloneable。

通常来讲，这个方法的重写应该实现深拷贝。

因为类Object没有实现Cloneable接口，所以在对Object对象上调用clone方法会抛出CloneNotSupportedException。

### public String toString()

返回一个对象的字符串表示形式。结果应该是一个简洁但信息丰富的提示，易于阅读。Object类的默认实现是`getClass().getName() + '@' + Integer.toHexString(hashCode())`。因此建议重写此方法。

### 为什么notify和wait在Object中实现，以及synchronized的可重入次数

[相关阅读](https://www.one-tab.com/page/XYutdKpNQdOqbfwM9NeiIw)

Java提供解决线程安全的方式有两种，一种是synchronized关键字，另一种是juc工具包。synchronized关键字是jvm虚拟机级别提供的控制反转形式的监视器线程安全处理方式。使用synchronized关键字后，由jvm处理线程并发、锁等待，锁升级、锁占用、锁释放。如果只使用了synchronized，仅解决了线程安全问题，而没有解决线程通信问题。典型的生产-消费者模型中，需要线程通信来解决消费者线程等待、生产者线程唤醒的问题。

synchronized提供的监视器，可以使用任何Java类或对象来作为信号量，所以synchronized可以修饰任何方法，或使用任何对象作为参数。使用对象头中的markword当做锁。因此监视器只能知道锁被哪些线程持有，而不知道哪些线程持有锁。所以为了解决线程通信的问题，就需要使用监视器的信号量来唤醒等待中的进程。因为对象就是监视器的信号量，所以notify和wait方法需要在Object类中实现。虽然这两个方法在Object类中，但是由于它们的目的为了解决线程通信问题，所以在非synchronized代码块内调用会抛出IllegalMonitorStateException。也就是只能持有锁的线程能调用wait和notify方法。

synchronized加的锁是可重入锁，持有锁的线程可以多次获取锁。juc中的Lock锁可重入次数是Integer.MAX_VALUE。而synchronized的可重入次数虚拟机规范中并没有明确说明，取决于具体的虚拟机实现。但是一般来说Lock可以在循环中调用，所以需要设置可重入次数。而synchronized关键字，由于虚拟机会对字节码进行优化，进行锁消除或合并相邻、嵌套的synchronized块，是有一个逻辑上的次数上限的。这个上限取决于class文件大小限制（最多65535个方法每个方法限制为65535个字节）和jvm的堆栈大小限制。

但是从程序的角度讲，只要涉及到了计数，jvm中一定会有一个计数器的。以HotSpot虚拟机为例，查看objectMonitor.cpp文件可以看到，`ObjectMonitor::enter`方法中的计数器是`_recursions`变量，它在objectMonitor.hpp中的定义是`intptr_t`类型。`intptr_t`是个指针类型，在32位和64位操作系统中长度不一样，所以上限也不一样。

``` c++
/** objectMonitor.hpp **/
 private:
  volatile intptr_t  _recursions;   // recursion count, 0 for first entry

  // TODO-FIXME: _count, _waiters and _recursions should be of
  // type int, or int32_t but not intptr_t.  There's no reason
  // to use 64-bit fields for these variables on a 64-bit JVM.
```

``` c++
/** objectMonitor.cpp **/

  if (cur == current) {
    // TODO-FIXME: check for integer overflow!  BUGID 6557169.
    _recursions++;
    return true;
  }
```

从HotSpot代码中可以看出来，关于_recursions的大小是有过争议的。在使用的地方考虑过整型溢出的问题。但是从[BUGID 6557169](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6557169)可以知道，这个风险由于字节码优化、文件大小、堆栈大小等限制，是被忽略了的。在字段定义位置的注释也可以看出设计者认为这个变量只需要32位就足够了，intptr_t在64位虚拟机上是一种浪费。

### public final native void notify()

## JDK包目录

