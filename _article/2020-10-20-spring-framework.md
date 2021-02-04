---
title: Spring Framework
categories:
- spring
description: 
permalink: "/posts/spring-framework"
excerpt: Spring框架提供依赖注入、事务管理、Web应用、数据访问、消息传递等核心支持
---

+ [reference](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/)
+ [github](https://github.com/spring-projects/spring-framework)

## [概览](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/overview.html#overview)

最低需JDK8+，支持JDK11 LTS。建议使用最低 Java SE 8 update 60。

`Spring` 在不同语境中可以指代 `Spring Framework`，或基于`Spring Framework`构建的整个Spring生态。

Spring Framework 5 的jar包附带了“自动模块名称”的mainfest，支持部署到JDK9的模块化路径中（"jigsaw")。

## [核心功能](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#spring-core)

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
同时Spring也提供了支持国际化和互转的[Formatter SPI](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#format)功能。
配置一个[全局的Formatter](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#format-configuring-formatting-globaldatetimeformat)。
Spring提供了对Java Bean[验证API](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#validation-beanvalidation)的支持。

Spring特有的[`SpEL`表达式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions)，
及其[简单实用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions-evaluation)。
可以对其解析行为[进行配置](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions-parser-configuration)。
Spring提供两种`SpEL`解析[Context](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions-evaluation-context)实现。
可以将`SpEL`表达式与基于XML或基于注释的配置元数据一起使用，以[定义BeanDefinition实例](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions-beandef)。
`SpEL`表达式和Java语言一样也有[自己的语法](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#expressions-language-ref)。

Spring AOP实现[面向切面编程](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop)，
切面编程的一些[概念](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-introduction-defn)。Spring AOP区别于切面框架的[功能和目标](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-introduction-spring-defn)。Spring AOP使用[代理模式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-introduction-proxies)实现切面编程，默认使用JDK动态代理，可以使用CGLIB代理。Spring AOP支持部分@AspectJ[语法](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-ataspectj)，同时也支持使用Spring特有的[XML风格](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-schema)声明切面。至于是[选择](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-choosing)Spring AOP还是AspectJ、是使用@AspectJ风格声明Spring AOP还是XML风格，因素包括应用程序需求，开发工具和团队对AOP的熟悉程度。甚至可以[混合](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-mixing-styles)使用@AspectJ风格和XML风格。Spring AOP的代理[机制](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-proxying)。当然Spring也支持使用[纯编码](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-aspectj-programmatic)的方式组装切面。虽然Spring AOP只支持部分@AspectJ注解，并且和AspectJ实现完全不一样，但是也可以[在Spring框架中使用AspectJ](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-using-aspectj)。

上面介绍了Spring AOP和AspectJ之间的关系。切面编程中的一些概念在Spring AOP中都有相应的[接口及实现](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-api)。
比如：[`Pointcut`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-api-pointcuts)、
[`Advice`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-api-advice)、
以及Spring AOP特有的[`Advisor`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-api-advisor)。
使用[`ProxyFactoryBean`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-pfb)创建AOP代理。
选择代理[声明方式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-concise-proxy)。
使用[`ProxyFactory`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-prog)通过代码创建AOP代理。
创建了代理对象之后使用[`Advised`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-api-advised)对其进行修改。除了使用`ProxyFactoryBean`或`ProxyFactory`，
还可以使用[自动代理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-autoproxy)Bean。
可以使用[`TargetSource`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#aop-targetsource)实现HotSwap代理对象、Pooling代理对象、Prototype代理对象、ThreadLocal代理对象。
Spring在`org.springframework.aop.framework.adapter`包中提供了SPI来客制化新的Advice类型。

Spring在框架层面提供对[空指针安全](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#null-safety)的支持。

Spring中的[Data Buffer和Codecs](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#databuffers)。

Spring XML [Schemas扩展阅读](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#appendix)，包含[util Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#xsd-schemas-util)、[aop Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#xsd-schemas-aop)、[context Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#xsd-schemas-context)、[beans Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#xsd-schemas-beans)。
[创作Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/core.html#xml-custom)。

## [持久化数据访问](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html)

Spring中的[事务管理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction)，传统上，Java EE开发人员在事务管理中有两种选择：[全局](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-global)或[本地事务](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-local)，这两者都有很大的局限性。Spring框架的事务管理支持[如何解决](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-programming-model)全局和本地事务模型的局限性。理解Spring如何对事务进行[抽象](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-strategies)。多种级别接口的[事务管理和资源使用](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-resource-synchronization)。使用[声明式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative)的事务管理，和[编码式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-programmatic)的事务管理。[理解](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-decl-explained)声明式事务管理，声明式事务管理的[例子](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative-first-example)，声明式事务[回滚方式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative-rolling-back)，绑定[不同的事务](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative-diff-tx)，[\<tx:advice/>](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative-txadvice-settings)配置，使用[`@Transactional`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-declarative-annotations)注解来声明事务，事务的[传播](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-propagation)。编码式事务实现有：[`TransactionTemplate`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-prog-template),[`TransactionOperator`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-prog-operator),[`TransactionManager`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-programmatic-tm)。对于声明式和编码式事务方式的[选择](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#tx-decl-vs-prog)。围绕事务相关的[事件通知](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-event)。对与不同WebServer的[集成](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#transaction-application-server-integration)。

Spring对[Data Access Object (DAO)的支持](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#dao)，Spring提供了从特定于技术的异常（例如SQLException）到其自己的[异常类层次结构](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#dao-exceptions)的便捷转换。用于配置DAO或Repository类的[注解](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#dao-annotations)。

使用[JDBC](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc)访问数据库。在[`JdbcTemplate`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-JdbcTemplate)、[`NamedParameterJdbcTemplate`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-NamedParameterJdbcTemplate)、`SimpleJdbcInsert`和`SimpleJdbcCall`、`RDBMS`当中[选择](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-choose-style)一种数据库访问方式。spring-jdbc[包层次结构](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-packages)。8种数据库[连接管理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-connections)方式。使用jdbc进行[批量操作](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-advanced-jdbc)。使用[SimpleJdbc](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-simple-jdbc)简化jdbc操作。将jdbc操作[建模](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-object)为Java对象。jdbc对[嵌入式数据库](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-embedded-database-support)的支持。`org.springframework.jdbc.datasource.init`包提供了[初始化现有DataSource](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#jdbc-initializing-datasource)的支持。使用对象关系映射[Object Relational Mapping (ORM)](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#orm)。[tx XML Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#xsd-schemas-tx)，[jdbc XML Schema](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/data-access.html#xsd-schemas-jdbc)。

## [Spring Web MVC](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc)

Spring MVC的前端控制器[`DispatcherServlet`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-servlet)的[上下文层次](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-servlet-context-hierarchy)。在Servlet 3.0+环境中，可以选择以[编程方式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-container-config)配置Servlet容器。`DispatcherServlet`处理一个请求的[整个流程](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-servlet-sequence)。对于请求处理过程进行[拦截](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-handlermapping-interceptor)，MVC中的[异常处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-exceptionhandlers)，[视图解析](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-viewresolver)，[本地化处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-localeresolver)，[主题样式](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-themeresolver)，支持文件上传的[分组请求](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-multipart)，[日志](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-logging)。

Spring MVC[过滤器](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#filters)实现[CORS](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#filters-cors)。

使用[注解](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-controller)声明[Controller](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-controller)，[请求映射](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-requestmapping)，[请求处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-methods)，[`ModelAttribute`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-modelattrib-methods)，[`DataBinder`](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-initbinder)，请求[异常处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-exceptionhandler)。请求处理[函数式编程](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#webmvc-fn)，对URI链接进行[处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-uri-building)。请求[异步处理](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-ann-async)，[跨域请求](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-cors)，[Web安全](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-web-security)，Http[缓存](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-caching)。Spring支持多种[视图模板处理技术](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-view)。MVC各种[配置](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-config)。需要Servlet 4容器[支持HTTP/2](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#mvc-http2)，并且Spring Framework 5与Servlet API 4兼容。

REST[客户端](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#webmvc-client)。

Web MVC[测试](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#testing)。

[WebSockets](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#websocket)。

Spring可以与[第三方Web框架](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/web.html#web-integration)继承。

