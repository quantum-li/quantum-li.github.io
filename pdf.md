---
title: PDF
---
{% assign pdf_files = site.static_files | where: "pdf", true %}
{% for mypdf in pdf_files %}
  <a href="{{ myimage.path }}">{{ mypdf.name }}</a>
{% endfor %}