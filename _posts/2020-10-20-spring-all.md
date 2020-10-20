---
title: Spring All
categories:
- Spring
- Java
description: 
permalink: "/posts/spring-all"
excerpt: Spring使每个人都可以更快，更轻松和更安全地进行Java编程。 Spring对速度，简单性和生产率的关注使其成为世界上最受欢迎的Java框架。
---

使用了Spring框架，可是获得许多现成的解决方案，而不必担心编写大量额外的代码。

[WhySpring](https://spring.io/why-spring)
 
[SpringProjects](https://spring.io/projects)

# 微服务架构

{% for art in site.article %}
{% for categorie in art.categories %}
{% if categorie == "spring" %}
<div>
    <br>
    <a class="articleLink" href="{{site.baseurl}}{{art.url}}">{{art.title}}——{{ art.date | date: "%b %-d, %Y" }}</a>
    <br/>
    <br/>
    <blockquote><p>{% if art.excerpt.size < 200 %}{{ art.excerpt | strip_html }}{% else %}{{ art.excerpt | strip_html | truncate:200}}{% endif %}</p></blockquote>
</div>
{% endif %}
{% endfor %}
{% endfor %}