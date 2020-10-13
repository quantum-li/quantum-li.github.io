---
title: 微服务解决方案
categories:
- 微服务
description: 
permalink: "/posts/microservice-overview"
excerpt: 微服务架构组件，以及解决方案
---

# 注册发现中心

+ Eureka ：Netflix系
+ Consul：使用GO语言编写，Raft算法
+ SmartStack
+ Nacos：注册中心加配置中心
+ etcd
+ redis
+ sofa
+ zk

# 服务网关

+ SpringCloud gateway
+ Zuul

# 配置中心

+ SpringCloud config
+ Nacos
+ Apollo
+ Consul
+ zk
+ edct

# 限流
+ SpringCloud自带限流器
+ Sentinel

# 熔断降级
+ Hystrix
+ Sentinel

# 调用链追踪
+ Zipkin
+ Pinpoint
+ SkyWalking
+ CAT

# 远程服务调用
+ Feign
+ Dubbo

# 负载均衡
+ Ribbon（客户端）

# 权限验证
+ CAS
+ OAUTH
+ JWT
+ SpringSecurity

# 多语言支持
+ Sidecar
如果你的应用不是用Java语言开发，Sidecar提供了一些HTTP接口，供你的应用去调用这些接口而使用Netflix的套件，比如Eureka, Ribbon, Cloud Server等。
