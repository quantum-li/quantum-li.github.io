---
# title: PICTURES
description: 图片、gif、动图、猫、狗
layout: "page"
---
{% assign image_files = site.static_files | where: "picture", true %}
{% for myimage in image_files %}

  <img class="picture" src="{{ myimage.path }}" alt="{{ myimage.name}}"/>

{% endfor %}