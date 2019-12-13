---
title: MySQL排序后去重查询
categories:
- MySQL
description: 解决MySQL排序后去重输出顺序变乱的问题
permalink: "/posts/mysql-distinct-sort-query"
excerpt: 今天遇到了一个问题，MySQL的distinct会打乱order by的顺序，导致想要排序后去重输出结果不符合预期期望。我自己没有想到怎么解决，从stackoverflow查询到了使用group by来取得相同的效果。
---

MySQL的distinct会打乱order by的顺序，导致想要排序后去重输出，结果顺序却乱了，不符合预期期望。我自己没有想到怎么解决，从[stackoverflow](https://stackoverflow.com/a/34691270 "SELECT DISTINCT and ORDER BY in MySQL")查询到了使用group by来取得相同的效果。


## 数据准备

| id | name |
|---|---|
| 1 | tomc |
| 2 | toma |
| 3 | tomb |
| 4 | toma |

## 复现

### sql

``` sql
select distinct id,name
from table
order by id desc;
```
### 结果

| id | name |
|---|---|
| 3 | tomb |
| 2 | toma |
| 1 | tomc |

## 解决

### sql

``` sql
select id,name
from table
group by id,name
order by max(id) desc;
```
### 结果

| id | name |
|---|---|
| 4 | toma |
| 3 | tomb |
| 1 | tomc |