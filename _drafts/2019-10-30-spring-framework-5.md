---
title: Spring Framework 5 更新
categories:
- spring
- java
- program
permalink: "/posts/what-is-new-in-spring-framework-5"
description: spring框架，java，编程，代码，spring-framework5更新内容
excerpt: Spring Framework 5 已经更新好久了，列举一下都有哪些更新内容。
---

# 1. JDK依赖变更
* spring-framework 5 需要JAVA SE 8+ ,JAVA EE 7+
# 2. 核心代码改动
* 基于JDK 8对于反射的增强，spring-framework 5 可以有效地访问方法参数
* @Nullable 和 @NotNull 可以再编译时增加对空值的处理从而避免空指针
* spring-framework 5 使用了名为*spring-jcl*的 Commons Logging 桥模块。新版本将自动检测Log4j 2.x,SLF4J,*[JUL]: java.util.logging 而不需要其他扩展

# 3. 容器改动
*