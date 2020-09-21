---
# title: POETRY
description: 诗词歌赋
layout: "default"
---

<div class="home">


  {% for poe in site.poetry%}
  <div class="post postContent">
    <div class="poeDate">{{ poe.time }}
    </div>
    <div class="postTitle">
    <div class="poeTag">
      {{ poe.categories }}
    </div>
    <br>
    <a class='poeLink' href="{{site.url}}{{site.baseurl}}{{poe.url}}">{{poe.title}}</a>
    </div>
    <div class="poeExt">
     {{ poe.excerpt }}
    </div>
  </div>

  {% endfor %}


</div>
