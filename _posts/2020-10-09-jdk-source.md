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

`Object` 是Java中类结构的根。是所有类的超类，包括数组。

### public final native Class<?> getClass()

该方法由本地方法实现。
返回一个对象`o`的类对象。返回的类对象，就是该类中`static synchronized`方法加锁的对象。
如果对象`o`是一个类型擦除对象，则返回对象`o`运行时的类。也就是说`((Object)new String()).getClass()`实际返回的是`String`。

### public native int hashCode()

该方法由本地方法实现。
返回对象的哈希码，已用于需要判断对象相等的场景。
这个方法可以重写，但需要满足以下约定：
+ 在应用运行期间，当`hashCode`方法使用到的对象信息没有被修改过的情况下，对同一个对象的多次调用必须产生相同的整数。但同一个应用程序的两次运行不需要产生相同的整数。
+ 如果`equals(Object)`返回两个对象相等，则这两个对象中的每一个调用`hashCode`方法必须产生相同的整数结果。
+ 如果`equals(Object)`返回两个对象不相等，并不要求对每个对象调用`hashCode`方法必须产生相同的整数结果。但虽然没做要求，如果产生不相等的整数能够提高哈希表的性能。
在合理的情况下，没有被重写的`hashCode`方法确实为不同的对象返回不同的整数。这是通过将对象的内部地址转换为整数来实现的，对象不同则内部地址不同。但Java并没有要求必须这样做。所以重写后的`hashCode`方法，不同的对象可能会返回相同的整数。

### public boolean equals(Object obj)



## JDK包目录

