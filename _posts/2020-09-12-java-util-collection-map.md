---
title: jdk源码rt.jar中java.util包拆解
categories:
- jdk
- rt.jar
- java
- collectin
- map
- util
description: jdk源码rt.jar中java.util包拆解、详解
permalink: "/posts/jdk-rt-jar-java-util-collection-map"
excerpt: Collection、List、Set、SortedSet、Queue、Map、AbstractMap、SortedMap、AbstractList、AbstractSet
---

基于 jdk8 <https://docs.oracle.com/javase/8/docs/api/index.html>

# 概览

![概览](/assets/images/java-util-collection-map/java-util-collection-map.svg)

## Collection

集合层次结构中的根接口。集合表示一组对象，称为其元素。一些集合允许重复的元素，而另一些则不允许。一些是有序的，而其他则是无序的。 JDK不提供此接口的任何直接实现：它提供更特定的子接口（例如Set和List）的实现。该接口通常用于传递集合并在需要最大通用性的地方操作它们。 

## List

有序集合（也称为序列）。该界面的用户可以精确控制列表中每个元素的插入位置。用户可以通过其整数索引（列表中的位置）访问元素，并在列表中搜索元素。 与集合不同，列表通常允许重复的元素。

## Set

不包含重复元素的集合。

## SortedSet

一个进行过排序的Set。通过在排序集创建时提供的Comparator进行排序。集合的迭代器将以升序顺序遍历集合。插入排序集中的所有元素都必须实现Comparable接口（或被指定的比较器接受）。

## Queue

设计用于在处理之前容纳元素的集合。除了基本的收集操作外，队列还提供其他插入，提取和检查操作。这些方法中的每一种都以两种形式存在：一种在操作失败时引发异常，另一种返回一个特殊值（根据操作而为null或false）。插入操作的后一种形式是专为与容量受限的Queue实现一起使用而设计的；在大多数实现中，插入操作不会失败。

|  | Throws exception | Returns special value |
| --- | --- | --- |
| Insert | add(e) | offer(e) |
| Remove | remove() | poll() |
| Examine | element() | peek() |

## Map

将键映射到值的对象。映射不能包含重复的键；每个键最多可以映射到一个值。 该接口代替了Dictionary类，后者是一个完全抽象的类，而不是一个接口。 Map界面提供了三个集合视图，这些视图允许将Map的内容视为一组键，一组值或一组键-值映射。映射的顺序定义为映射的集合视图上的迭代器返回其元素的顺序。一些Map实现（例如TreeMap类）对其顺序做出特定的保证。其他的（例如HashMap类）则没有。 注意：如果将可变对象用作Map键，则必须格外小心。如果在对象是映射中的键的情况下以影响等值比较的方式更改对象的值，则不会指定映射的行为。

## SortedMap

进一步提供其键的总体排序的Map。通常在排序的Map创建时提供的Comparator来对地图进行排序。遍历排序后的地图的集合视图（由entrySet，keySet和values方法返回）时，将反映此顺序。