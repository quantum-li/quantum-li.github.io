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

### 为什么notify和wait在Object中实现，以及synchronized与Lock的区别

[相关阅读](https://www.one-tab.com/page/1pIxm9kpSeaEQr4h1jGg1A)

当你看到Object类中居然有notify和wait这两个方法的时候，第一感觉可能是懵的，这不是线程并发相关的方法吗，为什么会在Java中所有对象的基类Obejct中声明？




### public final native void notify()

## JDK包目录

