---
title: Spring Framework Code
categories:
- spring
description: 
permalink: "/posts/spring-framework-code"
excerpt: Spring框架提供依赖注入、事务管理、Web应用、数据访问、消息传递等核心支持
---

+ [reference](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/spring-framework-reference/)
+ [github](https://github.com/spring-projects/spring-framework)
+ [docs](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/)

# org.springframework.beans

## $`BeanFactory`

访问Spring Bean容器的最底层接口。诸如`ListableBeanFactory`和`ConfigurableBeanFactory`之类的其他接口都有专业用途。

该接口由包含多个Bean定义的对象实现。根据不同的Bean定义，Factory返回Prototype模式对象或Singleton模式对象，或者其他生命周期对象。可以理解为`BeanFactory`就是应用组件的配置中心和注册中心。

使用`BeanFactory`最好以依赖注入的push方式，而不要使用任何轮询的pull方式。

`BeanFactory`可以从任何配置源加载Bean定义包括但不限于XML、RDBMS、properties文件等。然后使用`org.springframework.beans`包来配置Bean。

和`ListableBeanFactory`中的方法相比，`HierarchicalBeanFactory`中的所有操作还将检查父工厂，如果在此工厂实例中未找到Bean，则将询问直接的父工厂。该工厂实例中的Bean应该覆盖任何父工厂中的同名Bean。

`BeanFactory`的实现应尽可能支持标准Bean生命周期接口。全套初始化方法及其标准顺序为：
1. BeanNameAware.setBeanName
2. BeanClassLoaderAware.setBeanClassLoader
3. BeanFactoryAware.setBeanFactory
   //以上在`org.springframework.beans`包中
4. EnvironmentAware.setEnvironment
5. EmbeddedValueResolverAware.setEmbeddedValueResolver
6. ResourceLoaderAware.setResourceLoader (only application context)
7. ApplicationEventPublisherAware.setApplicationEventPublisher (only application context)
8. MessageSourceAware.setMessageSource (only application context)
9.  ApplicationContextAware.setApplicationContext (only application context)
    //以上在`org.springframework.context`包中
10. ServletContextAware.setServletContext (only web application context)
11. `postProcessBeforeInitialization` methods of `BeanPostProcessors`
12. InitializingBean.afterPropertiesSet
13. a custom init-method definition
14. `postProcessAfterInitialization` methods of `BeanPostProcessors`

在BeanFactory关闭情况下应用如下声明周期：
1. `postProcessBeforeDestruction` methods of `DestructionAwareBeanPostProcessors`
2. DisposableBean.destroy
3. a custom destroy-method definition

## $`ListableBeanFactory`

可以枚举其所有bean实例的`BeanFactory`实现。预加载其所有bean定义的`BeanFactory`实现（例如基于XML的工厂）可以实现此接口。

如果其实现类同样实现了`HierarchicalBeanFactory`，则枚举的Bean不关联BeanFactory的层级，而只返回当前工厂中定义的Bean。可以使用`BeanFactoryUtils`工具类来在上层工厂中查找Bean。该接口下的方法除了`getBeanNamesOfType`和`getBeansOfType`外都会忽略通过其他方式注册的任何单例bean（如ConfigurableBeanFactory.registerSingleton），但是可以使用`BeanFactory.getBean`继续获取单例Bean。

该接口下除了`getBeanDefinitionCount`和`containsBeanDefinition`方法外都不适合频繁调用，因为其实现执行时间相对较慢。

## $`HierarchicalBeanFactory`

继承`BeanFactory`接口，该工厂有层级关系，`ConfigurableBeanFactory.setParentBeanFactory`可以设置层级关系。

## $`ConfigurableBeanFactory`

大多数`BeanFactory`实现类都实现此接口，提供了对工厂的配置方法。但是此接口不应在用户程序中使用，仅用于框架内部功能实现。

## $`BeanFactoryUtils`

使用Bean工厂的工具类，获取工厂中Bean数量，Bean名称或实例，及Bean工厂层级结构。

## $`Aware`

所有希望Spring容器回调注入内容的根接口。实际的方法签名由各个子接口确定，但通常应仅包含一个接受单个参数的返回空值的方法。

请注意仅实现此接口没有实际作用，最终需要对应的处理类来完成实际功能。例子可见`ApplicationContextAwareProcessor`。

## $`BeanNameAware`

如果一个Bean想要知道其在工厂中的名称，可以实现此接口。但是不建议Bean对象依赖于其名称，因为这样会与外部Bean配置又潜在依赖及对Spring接口的不必要依赖。

## $`BeanClassLoaderAware`

让Bean知道Bean工厂加载它的类加载器。

## $`BeanFactoryAware`

让Bean知道创建它的Bean工厂。虽然这样Bean可以通过工厂来查找其他的Bean。但是不建议这样做，合理的方法是使用DI来管理依赖。

## $`BeanPostProcessor`

工厂类的hook。可以对新Bean实例进行自定义修改，例如进行代理。

`ApplicationContext`可以在其​​bean定义中自动检测`BeanPostProcessor`bean，并将这些后处理器应用于随后创建的任何bean。一个普通的`BeanFactory`允许以编程方式注册后处理器，并将其应用于通过Bean工厂创建的所有Bean。

在`ApplicationContext`中自动检测到的`BeanPostProcessor`bean将根据`PriorityOrdered`和`Ordered`语义进行排序。相比之下，以`BeanFactory`编程方式注册的`BeanPostProcessor`Bean将按注册顺序应用；以编程方式注册的后处理器将忽略通过实现`PriorityOrdered`或`Ordered`接口表示的任何排序语义。此外，`BeanPostProcessor`Bean不关心`@Order`注解。

## $`InitializingBean`

由`BeanFactory`设置完所有属性后需要回调的Bean接口比如需要：执行自定义初始化，或仅检查是否已设置所有必填属性。 实现`InitializingBean`的另一种方法是指定自定义init方法，例如在XML定义中。

## $`DestructionAwareBeanPostProcessor`

`BeanPostProcessor`的子接口，用于添加销毁前的回调。 典型的用法是在特定的bean类型上调用自定义销毁回调，并与相应的初始化回调匹配。

## $`DisposableBean`

要在销毁时释放资源的bean所实现的接口。 `BeanFactory`将在对作用域bean进行单独销毁时调用destroy方法。应该假定`ApplicationContext`在应用程序生命周期的驱动下在关机时处置其所有单例。 出于同样的目的，Spring管理的bean也可以实现Java的`AutoCloseable`接口。实现接口的另一种方法是指定自定义的destroy方法，例如在XML bean定义中。

## $`BeanDefinition`

提供对一个Bean实例的描述，它具有属性值，构造函数参数值以及具体实现所提供的更多信息。 这只是一个最小的接口：主要目的是允许`BeanFactoryPostProcessor`修改属性值和其他bean元数据。



# org.springframework.context

## $`ApplicationContext`

提供一个对于完整应用的配置的支持。虽然在应用运行期间只读，但是通过实现可以重新加载。

ApplicationContext提供了： 
+ 用于访问应用程序组件的Bean工厂方法。继承自ListableBeanFactory。 
+ 以通用方式加载文件资源的能力。继承自ResourceLoader接口。 
+ 将事件发布给已经注册过的侦听器的能力。继承自ApplicationEventPublisher接口。 
+ 支持国际化。继承自MessageSource接口。 
+ 从父上下文继承。在后代上下文中的定义将始终优先。例如，对于整个Web应用程序都可以使用单个父上下文，而每个servlet都有其自己的子上下文，该子上下文独立于任何其他servlet的子上下文。

## $`ConfigurableApplicationContext`



## $`EnvironmentAware`

任何希望收到其运行环境的通知的bean都将实现的接口。

## $`EmbeddedValueResolverAware`

可以获取Spring容器加载的属性配置。接受一个`StringValueResolver`并通过它获取配置值。

## $`ResourceLoaderAware`

通常`ApplicationContext`的实现类会实现此接口。可以获取Spring容器的资源加载器来加载外部文件等资源。

## $`ApplicationEventPublisherAware`

通常`ApplicationContext`的实现类会实现此接口。可以注入`ApplicationEventPublisher`。

## $`MessageSourceAware`

通常`ApplicationContext`的实现类会实现此接口。可以注入`MessageSource`。

注意`MessageSource`可以像普通Bean一样使用依赖注入的方式获取，它在容器中的名字是”messageSource“

## $`ApplicationContextAware`

可以向Bean注入`ApplicationContext`。

该接口聚合了`ResourceLoaderAware`,`ApplicationEventPublisherAware`,`MessageSourceAware`功能。

该接口的典型实现类是`ApplicationObjectSupport`提供了访问`ApplicationContext`的便携方法。




# org.springframework.web

## $`ServletContextAware`

提供注入`ServletContext`的功能。仅在`WebApplicationContext`中有效。