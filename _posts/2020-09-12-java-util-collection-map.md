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

[The Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/index.html)

# 概览

![概览](/assets/images/java-util-collection-map/java-util-collection-map.svg)

## Collection

集合层次结构中的根接口。集合表示一组对象，称为其元素。一些集合允许重复的元素，而另一些则不允许。一些是有序的，而其他则是无序的。 JDK不提供此接口的任何直接实现：它提供更具体的子接口（例如`Set`和`List`）的实现。所有通用的`Collection` 实现类都应提供两个“标准”构造函数：一个void（无参数）构造函数（用于创建一个空集合）和一个带有单个参数类型的构造函数`Collection`，它将创建一个新集合，其元素与其参数相同。不同的集合实现类对包含的元素有不同的限制。线程安全由实现者自己保证。对于集合直接或间接包含自身的自引用实例，某些执行集合的递归遍历的集合操作可能会失败。这包括 `clone()`，`equals()`，`hashCode()`和`toString()` 方法。实现可以有选择地处理自引用场景，但是大多数当前实现不这样做。

## AbstractCollection

此类提供了`Collection` 接口的基本实现，以最大程度地减少实现此接口所需的工作。

## List

有序集合（也称为序列）。该接口可以精确控制列表中每个元素的插入位置。用户可以通过其整数索引（列表中的位置）访问元素，并在列表中搜索元素。 与集合不同，列表通常允许重复的元素。该接口提供了一个特殊的迭代器，称为 `ListIterator`，它允许元素插入和替换。

## Set

不包含重复元素的集合。最多包含一个空元素。小心集合元素中的可变对象。

## SortedSet

一个进行过排序的Set。通过在排序集创建时提供的`Comparator`进行排序。集合的迭代器将以升序顺序遍历集合。插入排序集中的所有元素都必须实现Comparable接口（或被指定的比较器接受）。实现类应该提供四个标准的构造函数，无参；带比较器；一个`Collection`类型的参数以便对其自然排序；一个`SortedSet`。

## Queue

设计用于在处理之前容纳元素的集合。除了基本的收集操作外，队列还提供其他插入，提取和检查操作。这些方法中的每一种都以两种形式存在：一种在操作失败时引发异常，另一种返回一个特殊值（根据操作而为null或false）。插入操作的后一种形式是专为与容量受限的`Queue`实现一起使用而设计的；在大多数实现中，插入操作不会失败。该接口未定义阻塞队列的方法。不允许插入空值，因为poll方法空值认为不包含任何元素。

|  | Throws exception | Returns special value |
| --- | --- | --- |
| Insert | add(e) | offer(e) |
| Remove | remove() | poll() |
| Examine | element() | peek() |

## Deque

支持在两端插入和删除元素的线性集合。"double ended queue"的缩写。不支持索引访问。不应该向其插入空值，一般空值意味着队列为空。

|  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   | &nbsp;&nbsp; &nbsp; &nbsp;  First Element (Head)  | &nbsp; &nbsp; &nbsp; &nbsp; Last Element (Tail) |
| --- | --- | --- |

|   | Throws exception | Special value | Throws exception  | Special value |
| --- | --- | --- | --- | --- | 
| Insert | addFirst(e) | offerFirst(e) | addLast(e) | offerLast(e) |
| Remove | removeFirst() | pollFirst() | removeLast() | pollLast() |
| Examine | getFirst() | peekFirst() | getLast() | peekLast() |

该接口扩展了`Queue`接口。当双端队列用作队列时，将导致FIFO（先进先出）行为。元素在双端队列的末尾添加，并从开头删除。

| Queue 方法 | 等效Deque方法 |
| --- | --- |
| add(e) | addLast(e) |
| offer(e) | offerLast(e) |
| remove() | removeFirst() |
| poll() | pollFirst() |
| element() | getFirst() |
| peek() | peekFirst() |

双端队列也可以用作LIFO（后进先出）堆栈。此接口应优先于旧`Stack`类使用。当双端队列用作堆栈时，元素从双端队列的开头被压入并弹出。

| 堆叠方式 | 等效Deque方法 |
| --- | --- |
| push(e) | addFirst(e) |
| pop() | removeFirst() |
| peek() | peekFirst() |

## AbstractList

此类提供 `List` 接口的基本实现，以最大程度地减少实现由“随机访问”数据存储（例如数组）支持的该接口所需的工作。对于顺序访问数据（例如链表），应优先使用`AbstractSequentialList` 。

## AbstractSequentialList

此类提供了 `List` 接口的基本实现，以最大程度地减少实现由“顺序访问”数据存储（例如链表）支持的该接口所需的工作。对于随机访问数据（例如数组），应优先使用`AbstractList`。

## LinkedList

`List`和`Deque` 接口的双链表实现。实现所有可选的列表操作，并允许所有元素（包括null）。索引到列表中的操作将从开头或结尾遍历列表，以更接近指定索引的位置为准。此实现未同步，如果需要同步应使用`Collections.synchronizedList`来进行包装。`List list = Collections.synchronizedList(new LinkedList(...));`

## ArrayDeque

`Deque`接口的可调整大小的数组实现。阵列双端队列没有容量限制。它们会根据需要增长以支持使用。它们不是线程安全的。在没有外部同步的情况下，它们不支持多个线程的并发访问。空元素是禁止的。此类可能比`Stack`用作堆栈时要快 ，并且比`LinkedList` 用作队列时要快。

## Vector

可以使用下标索引访问，可以根据需要增加或减小容器大小。线程安全，所有修改的方法上都有 `synchronized` 修饰。此类返回的迭代器是快速失败，在创建迭代器后Vector结构变更会快速失败。

## Stack

所述Stack类表示对象的后进先出（LIFO）堆栈。它通过五个操作扩展了`Vector`类，这些操作允许将矢量视为堆栈。首次创建堆栈时，它不包含任何项目。在需要堆栈时应优先使用`Deque`类。 `Deque<Integer> stack = new ArrayDeque<Integer>();`。

## ArrayList

`List`接口的可调整大小的数组实现。实现所有可选的列表操作，并允许所有元素，包括 null。除了实现`List`接口之外，此类还提供一些方法来操纵内部用于存储列表的数组的大小。容量是用于在列表中存储元素的数组的大小。它至少与列表大小一样大。应用程序可以通过使用`sureCapacity` 操作在添加大量元素之前增加ArrayList实例的容量。这可以减少增量重新分配的数量。

此实现未同步。 如果多个线程同时访问`ArrayList`实例，并且至少有一个线程在结构上修改列表，则必须在外部进行同步。（结构修改是添加或删除一个或多个元素或显式调整后备数组大小的任何操作；仅设置元素的值不是结构修改。）如果要同步需要使用` Collections.synchronizedList` 进行包装。`List list = Collections.synchronizedList(new ArrayList(...));`。此类在创建迭代器后任何操作都会快速失败。 

## AbstractQueue

此类提供某些`Queue` 操作的基本实现。不允许空值。

## Map

将键映射到值的对象。映射不能包含重复的键；每个键最多可以映射到一个值。 该接口代替了`Dictionary`类，后者是一个完全抽象的类，而不是一个接口。 Map界面提供了三个集合视图，这些视图允许将Map的内容视为一组键，一组值或一组键-值映射。映射的顺序定义为映射的集合视图上的迭代器返回其元素的顺序。一些Map实现（例如TreeMap类）对其顺序做出特定的保证。其他的（例如HashMap类）则没有。 注意：如果将可变对象用作Map键，则必须格外小心。如果在对象是映射中的键的情况下以影响等值比较的方式更改对象的值，则不会指定映射的行为。

## SortedMap

进一步提供其键的总体排序的Map。通常在排序的Map创建时提供的Comparator来对地图进行排序。遍历排序后的地图的集合视图（由entrySet，keySet和values方法返回）时，将反映此顺序。