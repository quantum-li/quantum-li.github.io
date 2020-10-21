---
title: Spring Framework
categories:
- spring
description: 
permalink: "/posts/spring-framework"
excerpt: Spring框架提供依赖注入、事务管理、Web应用、数据访问、消息传递等核心支持
---

[docs](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/)

[github](https://github.com/spring-projects/spring-framework)

# [概览](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/overview.html#overview)

最低需JDK8+，支持JDK11 LTS。建议使用最低 Java SE 8 update 60。

`Spring` 在不同语境中可以指代 `Spring Framework`，或基于`Spring Framework`构建的整个Spring生态。

Spring Framework 5 的jar包附带了“自动模块名称”的mainfest，支持部署到JDK9的模块化路径中（"jigsaw")。

# [核心功能](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#spring-core)

`org.springframework.beans` 和 `org.springframework.context` 包中的内容是Ioc容器的基础。`BeanFactory` 接口提供了配置框架和基本功能。`ApplicationContext` 是 `BeanFactory`的子接口并且是其完成超集，提供了应用层级的上下文比如`WebApplicationContext`。

`org.springframework.context.ApplicationContext`接口代表了Spring IoC容器，负责实例化，配置和组装Bean。容器通过读取配置元数据来获取有关要实例化，配置和组装哪些对象的指令。配置元数据以XML，Java注解或Java代码表示。它使您能够表达组成应用程序的对象以及这些对象之间的丰富相互依赖关系。

Spring提供了`ApplicationContext`接口的几种实现。在单体应用程序中，通常创建`ClassPathXmlApplicationContext`或`FileSystemXmlApplicationContext`的实例。在Web应用中通常在`web.xml`中配置`ContextLoaderListener`。

[容器配置及初始化](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-instantiation)

[使用容器](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-client)

在容器当中，Bean被定义为`BeanDefinition`对象，并包含一些[原信息](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-definition)。

Bean可以有一个`id`属性和多个`name`属性。可以有别名。可以创建内部类。可是使用工厂方法以及工厂方法对象。

依赖注入主要有构造方法注入和set方法注入。可以使用变量名、变量类型、方法参数位置等方式映射。

IOC容器检测到环形依赖时会抛出异常，可以不使用构造方法注入而是使用set方法注入。[原文](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-dependency-resolution)

Bean会被尽量晚的解决依赖问题，因此在引用Bean时才会检查出一些异常。因此对于单例Bean会[预初始化](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-lazy-init)以便提前发现问题，也可以被设置为延迟初始化。

依赖注入及Bean关联关系[配置方法](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-properties-detailed)。
集合类属性可以使用合并操作。XML配置支持[更便捷的配置方式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-p-namespace)。
也可以跨[多个变量层级](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-compound-property-names)进行配置。
支持使用`depends-on`[声明依赖关系](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-dependson)。

我们也可以使用[自动装配](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-autowire)来简化配置Bean之间的依赖注入。
但其也有一些[限制](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-autowired-exceptions)。
也可以配置一些Bean[不使用自动装配](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-autowire-candidate)。
也会有不同生命周期的Bean之间相互依赖的情况，比如[单例Bean依赖Prototype](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-sing-prot-interaction)的情况，
需要[特殊处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-method-injection)这种关系的注入。
比如使用[代理方式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-other-injection)。

容器创建Bean时实际创建的是`BeanDefinition`，此后会根据它创建[不同声明周期的对象实例](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes)。
Bean的声明周期主要有 [singleton](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-singleton) 、[prototype](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-prototype)及[其他](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-other)。
Bean的声明周期可以[自由定制](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-scopes-custom)。

不仅可以定制Bean的声明周期，还可以[定制Bean的行为](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-nature)。比如注册[生命周期回调](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-lifecycle)、[给Bean注入`ApplicationContext`或给Bean注入在容器中的名字](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-aware)、以及其他的Bean[感知接口](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aware-list)。

容器可以[扩展功能](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-extension)。
比如在[容器创建Bean实例前后](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-extension-bpp)对其进行一些自定义操作。
或者对Bean的[元数据进行操作](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-extension-factory-postprocessors)。
或者[重写Bean初始化逻辑](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factory-extension-factorybean)。

