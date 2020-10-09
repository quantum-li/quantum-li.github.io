---
title: 诗词
categories:
- 
description: 
permalink: "/posts/peorty-list"
excerpt: 
---
 
{% for poe in site.poetry%}
    <br>
    <a class='poeLink' href="{{site.url}}{{site.baseurl}}{{poe.url}}">{{poe.title}}</a>
{% endfor %}