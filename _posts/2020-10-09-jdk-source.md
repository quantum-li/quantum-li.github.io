---
title: jdk源码体系结构
categories:
- jdk
- 源码
description: 
permalink: "/posts/jdk-source"
excerpt: 介绍jdk包结构，类及接口继承实现关系来了解jdk源码。
---
 
# JDK包目录

{% for art in site.article %}
{% for categorie in art.categories %}
{% if categorie == "jdk" %}
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