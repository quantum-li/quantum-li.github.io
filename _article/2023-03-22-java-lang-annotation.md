---
title: JDK源码rt.jar中java.lang.annotation包拆解
categories:
- jdk8
- rt.jar
- java
- annotation
description: JDK源码rt.jar中java.lang.annotation包拆解、详解
permalink: "/posts/jdk-rt-jar-java-lang-annotation"
excerpt: 注解相关类
---

[Java元注解作用及使用](http://c.biancheng.net/view/7009.html)

![概览](/assets/images/java-lang-annotation/包结构uml.png)

## Documented @i

@Documented 是一个标记注解，没有成员变量。用 @Documented 注解修饰的注解类会被 JavaDoc 工具提取成文档。默认情况下，JavaDoc 是不包括注解的，但如果声明注解时指定了 @Documented，就会被 JavaDoc 之类的工具处理，所以注解类型信息就会被包括在生成的帮助文档中。


## Inherited @i

@Inherited 是一个标记注解，用来指定该注解可以被继承。使用 @Inherited 注解的 Class 类，表示这个注解可以被用于该 Class 类的子类。就是说如果某个类使用了被 @Inherited 修饰的注解，则其子类将自动具有该注解。

## Native @i

使用 @Native 注解修饰成员变量，则表示这个变量可以被本地代码引用，常常被代码生成工具使用。对于 @Native 注解不常使用，了解即可。

## Repeatable @i

@Repeatable 注解是 Java 8 新增加的，它允许在相同的程序元素中重复注解，在需要对同一种注解多次使用时，往往需要借助 @Repeatable 注解。Java 8 版本以前，同一个程序元素前最多只能有一个相同类型的注解，如果需要在同一个元素前使用多个相同类型的注解，则必须使用注解“容器”。

## Retention @i

@Retention 用于描述注解的生命周期，也就是该注解被保留的时间长短。@Retention 注解中的成员变量（value）用来设置保留策略，value 是 java.lang.annotation.RetentionPolicy 枚举类型，RetentionPolicy 有 3 个枚举常量，如下所示。
SOURCE：在源文件中有效（即源文件保留）
CLASS：在 class 文件中有效（即 class 保留）
RUNTIME：在运行时有效（即运行时保留）

生命周期大小排序为 SOURCE < CLASS < RUNTIME，前者能使用的地方后者一定也能使用。如果需要在运行时去动态获取注解信息，那只能用 RUNTIME 注解；如果要在编译时进行一些预处理操作，比如生成一些辅助代码（如 ButterKnife），就用 CLASS 注解；如果只是做一些检查性的操作，比如 @Override 和 @SuppressWarnings，则可选用 SOURCE 注解。

## Target @i

@Target 注解用来指定一个注解的使用范围，即被 @Target 修饰的注解可以用在什么地方。@Target 注解有一个成员变量（value）用来设置适用目标，value 是 java.lang.annotation.ElementType 枚举类型的数组，下表为 ElementType 常用的枚举常量。

## RetentionPolicy e

``` java
public enum RetentionPolicy {
    /**
     * 注释将被编译器丢弃。
     */
    SOURCE,

    /**
     * 注释由编译器记录在类文件中，但不需要由 VM 在运行时保留。这是默认行为。
     */
    CLASS,

    /**
     * 注释由编译器记录在类文件中，并在运行时由 VM 保留，因此它们可以被反射读取。
     * @see java.lang.reflect.AnnotatedElement
     */
    RUNTIME
}
```

## ElementType e

``` java
public enum ElementType {
    /** 类、接口（包括注释类型）或枚举声明 */
    TYPE,

    /** 字段声明（包括枚举常量） */
    FIELD,

    /** 方法声明 */
    METHOD,

    /** 形参声明 */
    PARAMETER,

    /** 构造函数声明 */
    CONSTRUCTOR,

    /** 局部变量声明 */
    LOCAL_VARIABLE,

    /** 注解类型声明 */
    ANNOTATION_TYPE,

    /** 包声明 */
    PACKAGE,

    /**
     * 类型参数声明
     *
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * 类型使用
     *
     * @since 1.8
     */
    TYPE_USE
}


```