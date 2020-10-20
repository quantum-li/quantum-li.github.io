---
title: Spring Boot
categories:
- spring
description: 
permalink: "/posts/spring-boot"
excerpt: 使用SpringBoot来使服务更快的搭建并运行起来
---

[docs](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/)

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

