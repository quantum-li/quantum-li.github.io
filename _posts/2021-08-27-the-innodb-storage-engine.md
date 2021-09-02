---
layout: posts
title: InnoDB 存储引擎
categories:
- 数据库
- InnoDB
- MySQL
description: InnoDB 是一种兼顾高可靠和高性能的通用存储引擎。在 MySQL 5.7 中，InnoDB 是默认的 MySQL 存储引擎。
classify: innodb
permalink: "/posts/innodb"
excerpt: InnoDB 是一种兼顾高可靠和高性能的通用存储引擎。在 MySQL 5.7 中，InnoDB 是默认的 MySQL 存储引擎。
---

# InnoDB 简介

InnoDB 是一种兼顾高可靠和高性能的通用存储引擎。在 MySQL 5.7 中，InnoDB 是默认的 MySQL 存储引擎。

## InnoDB 主要优势

+ InnoDB 的 DML 操作支持 ACID 模型，事务具有提交、回滚和崩溃恢复的功能，以保护用户数据。
+ 支持行级锁定和 Oracle 风格的一致性读取，提高了多用户并发性和性能。
+ InnoDB 将数据基于主键顺序存储在磁盘上以优化查询性能。主键索引又称为 “聚簇索引”，可以提高查找的IO效率。
+ InnoDB 支持外键约束，关键字 `FOREIGN KEY`。外键约束可以防止插入、更新和删除时导致相关表数据不一致。

| 功能特性 | 是否支持 |
|:--- | --- |
| B树索引 | :white_check_mark: |
| 通过备份或时间点进行恢复(由server支持，而不是存储引擎) | :white_check_mark: |
| 分布式数据库 | :x: |
| 聚簇索引 | :white_check_mark: |
| 压缩数据 | :white_check_mark: |
| 数据缓存 | :white_check_mark: |
| 加密(由server支持，而不是存储引擎) | :white_check_mark: |
| 外键约束 | :white_check_mark: |
| 全文检索索引 | :white_check_mark: |
| 地理空间数据类型支持 | :white_check_mark: |
| 地理空间索引支持 | :white_check_mark: |
| Hash 索引(InnoDB 为自适应Hash索引，仅限内部使用) | :x: |
| 索引缓存 | :white_check_mark: |
| 锁粒度 | 行级锁 |
| MVCC | :white_check_mark: |
| 复制集支持(由server支持) | :white_check_mark: |
| 存储极限 | 64TB |
| T树索引 | :x: |
| 事务 | :white_check_mark: |
| 更新数据字典的统计信息 | :white_check_mark: |

## TODO 

# ACID 模型

+ *A(atomicity)*：原子性
+ *C(consistency)*：一致性
+ *I(isolation)*：隔离性
+ *D(durability)*：持久性

ACID 模型是一套数据库设计原则，侧重点在数据和关键任务的可靠性。InnoDB 存储引擎严格遵守 ACID 模型。但也可以通过调整 MySQL 的设置，来降低一些可靠性来换取更大的性能或吞吐量。

## 原子性

InnoDB 的原子性涉及到[事务](https://dev.mysql.com/doc/refman/5.7/en/glossary.html#glos_transaction)。相关功能包括：

+ [autocommit](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_autocommit)配置
+ [COMMIT](https://dev.mysql.com/doc/refman/5.7/en/commit.html)语句
+ [ROLLBACK](https://dev.mysql.com/doc/refman/5.7/en/commit.html)语句

## 一致性

InnoDB 的一致性主要涉及 InnoDB 的内部处理，以保护数据免遭崩溃。相关的功能包括：

+ InnoDB 的[双写缓冲区](https://dev.mysql.com/doc/refman/5.7/en/innodb-doublewrite-buffer.html)
+ InnoDB 的[崩溃恢复](https://dev.mysql.com/doc/refman/5.7/en/innodb-recovery.html#innodb-crash-recovery)

## 隔离性

InnoDB 的隔离性体现在事务的隔离级别，相关特性包括：

+ [autocommit](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_autocommit)配置
+ [事务隔离级别](https://dev.mysql.com/doc/refman/5.7/en/innodb-transaction-isolation-levels.html)和[SET TRANSACTION](https://dev.mysql.com/doc/refman/5.7/en/set-transaction.html)语句
+ [锁](https://dev.mysql.com/doc/refman/5.7/en/glossary.html#glos_locking)