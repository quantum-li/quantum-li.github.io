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

Spring支持[基于注解](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-annotation-config)的Bean配置和XML的Bean配置，XML配置会覆盖注解的行为。
包括但不限于 
[`@Required`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-required-annotation)、
[`@Autowired`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-autowired-annotation)、
[`@Primary`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-autowired-annotation-primary)、
[`@Qualifier`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-autowired-annotation-qualifiers)。
还可以对[泛型](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-generics-as-qualifiers)进行注入。
甚至可以不使用`@Qualifier`而[自定义](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-custom-autowire-configurer)一个注解。
也支持JDK注解[`@Resource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-resource-annotation)。
[`@Value`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-value-annotations)用来注入外部配置值而不是Bean。
[`@PostConstruct`和`@PreDestroy`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-postconstruct-and-predestroy-annotations)在JDK6-8中存在，在JDK11中被删除。

除了使用XML来管理Bean，还可以使用[组件扫描](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-classpath-scanning)来管理Bean。
同时也可以配置扫描时的[过滤选项](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-scanning-filters)。
使用注解也可以[定义Bean的元数据](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-factorybeans-annotations)。
或者[指定Bean的Name](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-scanning-name-generator)。
使用注解[设置Bean的生命周期](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-scanning-scope-resolver)。
设置[Qualifier元数据](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-scanning-qualifiers)。
大型应用为了加快组件扫描，可以使用[组件索引](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-scanning-index)。
除了使用Spring提供的组件扫描依赖注入注解，还可以使用[JSR-330标准依赖注入](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-standard-annotations)注解。
当然它们相比Spring提供的注解会有一些[限制](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-standard-annotations-limitations)。

使用注解来[配置容器](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java)，
可以初始化[`AnnotationConfigApplicationContext`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-instantiating-container)容器。`AnnotationConfigApplicationContext`也可以再[Web应用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-instantiating-container-web)中使用。
使用`@Bean`注解来[声明一个Bean](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-declaring-a-bean)，
配置Bean的[生命周期回调](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-lifecycle-callbacks),
使用`@Scope`来声明Bean的[生命周期](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-specifying-bean-scope)。或者[重新命名](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-customizing-bean-naming)Bean在容器中的名字。

如果[使用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-configuration-annotation)`@Configuration`来包裹`@Bean`声明，则Bean之间的依赖关系会[更加方便](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-injecting-dependencies)。
对于单例模式的Bean，即使在`@Configuration`下被多次调用，也只会[生成一次](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-further-information-java-config)。
使用`@Import`注解可以[传递引用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-using-import)多个`@Configuration`类。
设置Bean在[一定条件](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-conditional)下才需要被初始化，对于不同环境创建不同的Bean这里有更详细的[介绍和使用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-definition-profiles)。

使用Java代码和注解初始化容器可以和使用XML的方法[结合使用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-java-combining)。

不用的环境可以有不用的[配置源](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-property-source-abstraction)。

可以通过在`@Configuration`类上添加`@EnableLoadTimeWeaving`来把Aspectj的编译器织入换成类加载期织入，这里有个[使用场景](https://www.cnblogs.com/davidwang456/p/5633609.html)。

`ApplicationContext`接口继承了解决i18n问题的[`MessageSource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-functionality-messagesource)、
标准或者自定义的[事件通知&处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-functionality-events)、
[访问资源文件](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-functionality-resources)、
在[Web项目中加载容器](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-create)、
将`ApplicationContext`[部署到一个RAR文件](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-deploy-rar)。

`BeanFactory`及诸多接口是Spring与第三方结合的[切入点](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-beanfactory)。
`BeanFactory`与`ApplicationContext`之间的[区别](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#context-introduction-ctx-vs-beanfactory)。

Spring的[资源管理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources)，
Spring中所有形式的资源都继承自[`Resource`接口](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-resource)，
Spring内部有[多种形式的资源类型](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations)：
[`UrlResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-urlresource)、
[`ClassPathResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-classpathresource)、
[`FileSystemResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-filesystemresource)、
[`ServletContextResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-servletcontextresource)、
[`InputStreamResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-inputstreamresource)、
[`ByteArrayResource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-implementations-bytearrayresource)。
通过使用`ResourceLoader`来[加载资源](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-resourceloader)。
任何Bean都可以通过实现[`ResourceLoaderAware`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-resourceloaderaware)来注入`ResourceLoader`，如果一个类持有`Resource`字段，可以[使用资源路径](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-as-dependencies)来注入资源。
有多种方法使用资源路径来[初始化](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-app-ctx-construction)一个容器，资源路径有多种[通配符表示](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-app-ctx-wildcards-in-resource-paths)。
注意`FileSystemApplicationContext`会认为所有`FileSystemResource`为[相对路径](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#resources-filesystemresource-caveats)，所以注意使用方式来避免意外。

Spring提供了[验证器](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#validator)可以用来验证数据，并[处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#validation-conversion)验证失败结果。

`BeanWrapper`丰富了许多[操作Bean属性](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-beans)的方法。
以及继承`PropertyEditorSupport`转换String到Bean实例的[方法](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-beans-conversion)，
也可以继承`PropertyEditorSupport`来[自定义](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#beans-beans-conversion-customeditor-registration)String到类的转换方法。
除了这种方法，还可以使用Spring提供的[Converter SPI](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#core-convert)功能。