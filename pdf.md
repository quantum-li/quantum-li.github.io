---
title: PDF
description: pdf、电子书、书、编程资源
---
{% assign pdf_files = site.static_files | where: "pdf", true %}
{% for mypdf in pdf_files %}
  <a href="{{ mypdf.path }}">{{ mypdf.name }}</a>
{% endfor %}