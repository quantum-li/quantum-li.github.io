---
title: PICTURES
description: 图片、gif、动图、猫、狗
---
{% assign image_files = site.static_files | where: "picture", true %}
{% for myimage in image_files %}
  <a class="fancybox" rel="fancybox-thumb" href="{{ myimage.path }}" title="{{ myimage.name }}">
  <img class="picture" src="{{ myimage.path }}"/>
  </a>
{% endfor %}