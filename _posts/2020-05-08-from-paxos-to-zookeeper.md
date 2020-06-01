---
title: 从Paxos到ZooKeeper分布式一致性原理与实践摘要
categories:
- ZooKeeper
- JAVA
- 分布式
description: 从Paxos到ZooKeeper分布式一致性原理与实践摘要
permalink: "/posts/from-paxos-to-zookeeper"
excerpt: 内容全部源自《从Paxos到ZooKeeper分布式一致性原理与实践》，取自里面的重点内容摘要。包括分布式架构、一致性协议、ZooKeeper与Paxos、ZooKeeper典型使用场景等。
---

# 分布式架构

## 从集中式到分布式

### 集中式的特点

集中式系统部署结构简单，无须分布式协作问题

### 分布式的特点

分布式系统的定义——《分布式系统概念与设计》

> 分布式系统是一个硬件或软件组件分布在不同的网络计算机上，彼此之间仅仅通过消息传递进行通信和协调的系统。

一个标准的分布式系统在没有任何特定业务逻辑约束的情况下，会有如下几个特征：

+ 分布性, 分布式系统中的多台计算机都会在空间上随意分布，同时机器的分布情况也会随意变动。
+ 对等性, 分布式系统中的计算机没有主从之分，这里面的主从是指没有控制整个系统的主机也没有被控制的主机。
+ 并发性, 多个节点并发操作共享资源
+ 缺乏全局时钟, 分布式系统缺乏全局的时钟序列控制
+ 故障总是会发生 
  
### 分布式环境的各种问题

+ 通信异常
+ 网络分区
+ 三态（成功、失败、与超时）
+ 节点故障

## 从ACID到CAP/BASE

### ACID

事务可以在并发情况下提供一个隔离方法以防止互相干扰。并且为数据库提供了一个从失败中恢复的方法，和数据库即使在异常状态下仍能保持数据一致性的方法。

### 分布式事务

由于在分布式环境中会出现[各种问题](/posts/from-paxos-to-zookeeper#分布式环境的各种问题)，所以需要分布式事务。

分布式事务是指事务的参与者、支持事务的服务器、资源服务器一级事务管理器分布在分布式环境中。通常可以把一系列分布式操作序列称为子事务，因此分布式事务也可以被定义为一种嵌套型事务，同时也具有了ACID属性。

### CAP和BASE理论

ACID在分布式环境严格的一致性难以保证可用性，因此出现了CAP和BASE理论。

#### CAP

C-一致性(Consistency)，A-可用性(Availability)，P-分区容错性(Partition tolerance)。一个分布式系统最多只能满足其中两项。

##### 一致性

分布式系统中的一致性指多个副本之间能否保持一致的特性。对一个节点的更新同步到其他节点。

##### 可用性

可用性指对用户的每一个请求总是能在有限的时间内返回结果。重点在于有限的时间和返回结果。有限时间指一个合理的返回时间；返回结果是指一个明确是成功或失败的结果。

##### 分区容错性

分布式系统在遇到任何*网络分区*故障的时候，仍然需要保证对外提供一致性和高可用性服务，除非是整个网络环境的故障。*网络分区*指不同子网络之间出现无法联通的情况，但子网络内正常，导致网络环境被切分成若干孤立区域。

| 放弃其中之一 | 说明 |
| :---:| :---: |
| 放弃P | 一种较为简单的方法是把所有的数据都放到一个节点上，同时也放弃了可扩展性 |
| 放弃A | 一旦遇到网络分区或其他故障时服务需要停止一段时间 |
| 放弃C | 放弃强一致性保留最终一致性 |

对于分布式系统来说，P(分区容错性)是一个基本的要求，因此根据业务点一般在C和A直接寻求平衡。

#### BASE

Basically Available（基本可用）、Soft state（软状态）、Eventually consistent(最终一致性)。是对CAP中一致性和可用性权衡的结果。

##### 基本可用

允许损失部分可用性，比如响应时间延长或功能降级。

##### 弱状态

允许不会影响系统整体可用性的数据中间状态，因为需要在不同节点之间进行数据同步。

##### 最终一致性

系统中的数据副本能够最终达到一致状态

+ 因果一致性，具有因果关系的进程A和进程B，进程B的读写一定在A之后。
+ 读自己所写，进程A总能读到自己更新后的数据。（不会读到数据副本中的旧值）
+ 回话一致性，总能在同一个会话中满足一致性
+ 单调读一致性，如果一个进程从系统中读取一个数据项的值后，系统后续不应该再返回旧值
+ 单调写一致性，保证同一个进程的写操作顺序执行

# 一致性协议

2PC、3PC、Paxos。2PC和3PC使用一个协调者来调度参与者进行事务提交和回滚。

## 2PC

使分布式事务保证原子性和一致性。

### 阶段一：提交事务请求

1. 事务询问，协调者向所有参与者发送事务内容，询问是否可以执行提交操作，并开始等待参与者响应
2. 执行事务，各参与者执行事务，并将Undo和Redo信息记入事务日志
3. 参与者向协调者反馈事务询问的响应

### 阶段二：执行事务提交

#### 执行事务提交

1. 发送提交请求，协调者向所有参与者发出Commit请求
2. 事务提交，参与者执行Commit请求，并释放资源
3. 反馈事务提交结果，参与者向协调者发送Ack消息
4. 完成事务，协调者收到所有Ack消息后完成事务

#### 中断事务

1. 发送回滚请求，协调者向所有参与者发送Rollback请求。
2. 事务回滚，参与者利用阶段一记录的Undo信息进行回滚，并释放资源
3. 反馈事务回滚结果，参与者完成回滚向协调者发送Ack消息
4. 中断事务，协调者收到所有Ack消息后完成事务中断

![2PC事务提交](/assets/images/994291e1-a6d5-4cbd-93bd-e942b8528ac5.png)

![2PC事务中断](/assets/images/f318aacc-57b2-44ab-bcfc-5d066b979125.png)

优点：原理简单，实现方便

缺点：

+ 同步阻塞，各阶段参与者都需要等待其他参与者响应，会极大限制分布式系统性能
+ 单点问题，协调者是个单点，如果协调者在阶段二出现问题，参与者无法释放资源以及完成事务
+ 脑裂，数据不一致，阶段二执行事务提交时，如果发生局部网络异常或协调者崩溃，收到Commit请求的参与者和未收到请求的将出现数据不一致
+ 太过保守，协调者进行事务提交询问过程中无法或者参与者响应，只能依靠自身超时机制判断是否中断事务。没有较为完善的容错机制，失败率高

## 3PC

将3PC的提交事务请求过程一分为二，CanCommit、PreCommit、do Commit三个阶段。

![3PC协议流程](/assets/images/1d96cc75-9cb4-4f05-af23-5264e7dab6bd.png)

### 阶段一：CanCommit

1. 事务询问，协调者向参与者询问是否可以执行事务提交，并等待响应
2. 参与者向协调者反馈响应

### 阶段二：PreCommit

根据阶段一的响应

#### 执行事务预提交

1. 发送预提交请求，协调者向参与者发送PreCommit请求，进入Prepared阶段
2. 事务预提交，参与者收到PreCommit请求后执行事务提交，并记录Undo和Redo信息到事务日志
3. 参与者反馈事务执行响应，同时等待最终指令：commit或abort
   

#### 中断事务

1. 协调者向参与者发送abort请求
2. 参与者收到abort请求或者等待超时，中断事务

### 阶段三：doCommit

#### 执行事务提交

1. 协调者向参与者发送doCommit请求
2. 参与者收到doCommit请求提交事务并释放资源
3. 参与者向协调者反馈Ack消息
4. 完成事务

#### 中断事务

1. 协调者向参与者发送abort请求
2. 参与者收到abort请求利用Undo信息执行回滚并释放资源
3. 参与者向协调者反馈Ack消息
4. 协调者收到所有Ack消息后完成事务中断

在阶段三协调者可能会出现问题或者协调者和参与者直接网络故障，参与者会在等待超时后执行事务提交

优点：降低了参与者的阻塞范围，并能出现单点故障后继续达成一致

缺点：参与者接收到preCommit命令后如果出现网络分区，该参与者会执行事务提交，会导致数据不一致

## Paxos算法

基于消息传递且高度容错的一致性算法。解决了无限期等待问题和“脑裂”问题。Paxos算法保证在分布式系统内被提出的提案中只有唯一的一个有效且被大部分节点认可和获取。在该算法中有三种参与者角色：Proposer、Acceptor、Learner。该算法面对的问题是所有参与者都以任意的不确定的状态运行，且参与者之间的通信也得不到保证。

可跳过推导过程直接进入结果-> [Paxos算法的两个阶段](/posts/from-paxos-to-zookeeper#结果)

### 提案的选定

为了避免Accpetor单点问题，该算法允许过半数的Acceptor同意的提案被选定。其中每个Acceptor最多只能批准一个提案。

### 推导过程

通过反向推导P2c、P2b、P2a、P2，然后通过P2和P1保证一致性。

#### P1：一个Acceptor必须批准它收到的第一个提案

##### 存在的问题

如果多个Proposer提出的提案被多个Acceptor批准，且每个Acceptor都批准了一个不同的提案。或者由于节点故障剩下的节点恰好为偶数。就无法选出提案

![每个Acceptor批准不同的提案](/assets/images/5048cc0a-58c4-498d-b520-58d9898a0f37.png)

![不同的提案被相同数量的Acceptor批准](/assets/images/979c8e05-b4d9-493c-8bd4-73cd3571dfea.png)

##### 解决方案

一个提案需要被半数以上Acceptor批准，所以一个Acceptor可以批准不止一个提案。因此引入一个全局编号M来标识每一个被批准的提案编号。当一个编号M0，值为V0的提案被半数以上Acceptor批准后可以被选定。

#### P2：如果编号为M0、值为V0的提案被选定，那么所有被选定的提案，如果编号比M0高，其值必须是V0

因为一个提案要被选定，必须至少被一个Acceptor批准

#### P2a：如果编号为M0、值为V0的提案被选定，那么所有被Acceptor批准的提案，如果编号比M0高，其值必须是V0

如果一个提案在某个Acceptor还未收到上一个提案时被选定，会产生一个被批准的值，且编号更高。

![一个提案在某个Acceptor还未收到上一个提案时被选定](/assets/images/5e9d7edc-7657-4bf2-8321-2ffd91ea6bb8.png)

#### P2b：如果一个值为V0提案被选定后，那么之后任何Proposer产生的编号更高的提案值必须为V0

因为M0已经被选定，所以肯定存在一个超过半数的Acceptor集合C，都批准了该提案。

因为任何半数以上的Acceptor集合S，都至少包含集合C中的一个成员，因此保证P2c即可满足P2b

#### P2c：对于被提出的提案Mn和Vn，存在集合S满足S中不存在任何批准过编号小于Mn的提案的Acceptor，或者S中所有Acceptor批准过得编号小于Mn的提案，其中编号最大的提案值也为Vn。

当M0，V0被选定的情况下，证明在P2C的前提下对于所有的[Mn，Vn]，存在Vn=V0。

（太绕，暂且留坑）

### Proposer生成提案

Proposer向Acceptor集合提出Prepare请求提案Mn，等待如下回应：

如果Acceptor没有批准过提案，Acceptor不再批准任何编号小于Mn的提案；否则返回已经批准过得提案中编号最大的提案的值。

如果Proposer收到半数以上Acceptor响应结果，就可以产生Mn，Vn提案。Vn是所有响应中编号最大的值或者新的值（如果Acceptor没有响应过提案）。

确定提案后Proposer再次向否个Acceptor集合发送提案以获得Accept请求。


### Acceptor批准提案

Acceptor可以在任何时候响应一个Prepare请求。

在不违背现有承诺的情况下可以响应Accept请求。

### 算法优化

如果一个Acceptor已经响应了Mn的Prepare请求，那么它可以忽略编号小于Mn的Prepare请求。也可以忽略已经批准过得提案的Prepare请求。

### 结果

概括为两个阶段的提交过程

#### 阶段一

Proposer向超过半数的Acceptor集合发送编号Mn的Prepare请求

Acceptor向Proposer反馈已经响应过Prepare请求的编号最大的值，并且不再批准编号小于Mn的提案

#### 阶段二

如果Proposer收到半数以上的Acceptor响应，那么它可以发出Mn，Vn的提案的Accept请求。Vn的值是响应中编号最大的值或者任意值（如果Acceptor没有响应过提案）。

如果Acceptor尚未对编号大于Mn的Prepare请求作出响应，那么它可以通过Mn的Accept请求

### 获取提案

选定一个提案后，需要Learner来获取提案，有如下三种方案：

1. Acceptor每批准一个提案就发送给所有Learner，但是需要通信的次数太多
2. 所有Acceptor都把批准的提案发给特定的主Learner，由主Learner通知其他Learner。但是主Learner可能会故障
3. Acceptor将批准的提案发送给特定的Learner集合，由Learner集合向外同步。

### 通过选取主Proposer保证算法的活性

Paxos算法存在的漏洞是当所有Proposer轮流提出新的提案时，没有提案可以被批准。所以需要选择一个主Proposer负责提出提案。

# Paxos的工程实践

Paxos只是一套理论上算法思想，在遇到真正的工程实践当中还需要遇到非常多的该思想中没有涉及的问题。

## Chubby

分布式锁服务，GFS和Big Table使用来解决分布式协作，选主等。Chubby以Paxos算法为基础。

## Hypertable

主要目的构建分布式海量数据的高并发数据库。所以其功能和吞吐量并不占优势

# ZooKeeper与Paxos

ZooKeeper没有直接采用Paxos算法，而是使用了ZAB（Zookeeper Atomic Broadcast）一致性协议。

## 初识ZooKeeper

### ZooKeeper介绍

ZooKeeper是一个分布式数据一致性解决方案，分布式应用可以基于它实现数据发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master选举、分布式锁和分布式队列等功能。Zookeeper可以保证

+ 分布式顺序一致性，同一客户端发起请求处理顺序的一直
+ 原子性，所有请求的处理对于集群的原子性。要么所有机器都执行要么都不执行
+ 单一视图，客户端在zk集群的任何服务器看到的数据模型一致
+ 可靠性，一旦zk处理了一个请求，那么请求将永久的应用
+ 实时性，这里的实时性是指zk仅保证在一定时间内，客户端最终一定能获取最新状态。

ZK使用ZNode数据节点在内存中维护像文件系统目录一样的名字空间。ZK的全量数据存储在内存中。

### ZK基本概念

三种角色：Leader、Follower、Observer。Leader可以提供读和写服务，Follower和Observer只能提供读服务，Observer不参与选举和写操作的“过半写成功”策略。

会话（Session）会话开始于生命周期的建立，结束于连接的断开且超过sessionTimeout时限。

数据节点（Znode）分为持久节点和临时节点。节点中数据由版本维护

ACL（Access Control Lists）权限控制。CREATE创建子节点权限、READ读取节点数据和子列表权限、WRITE更新节点数据权限、DELETE删除子节点权限、ADMIN设置节点ACL权限。

## ZAB协议

所有事物请求由Leader处理，Leader将一个请求以Proposal（提议）的方式发送给Follower，如果得到过半数的正确响应，Leader会再次发送Commit消息以要求Follower提交协议。

### 协议介绍

ZAB协议包括两种基本模式：崩溃恢复和消息广播。同一时刻只能处于一种模式中。

#### 消息广播

![消息广播](/assets/images/b2cee297-6434-46d1-9689-a3983ddb750c.png)

ZAB的二阶段提交过程移除了中断逻辑，所以ZK引入崩溃恢复模式来解决Leader崩溃导致的数据不一致问题。

#### 崩溃恢复

崩溃涉及到需要确保Leader已经提交出去Commit的事务执行和丢弃只在Leader上提出的事务。所以ZK需要重新选取拥有集群中ZXID最大的事务Proposal的机器。

#### 数据同步

Leader为每个Follower准备一个队列，然后将没有同步的Proposal发送给Follower随后发送Commit。当Follower同步完成后Leader才会将其加入到可用Follower列表

对于需要回滚的事务，因为用于低epoch值的Follower不会成为Leader，因此当它加入到Leader后，Leader会将自己记录的最后被提交的事务和该Follower上的事务进行对比，根据ZXID值回滚到一个确实已经被集群通过的事务节点。

### 深入ZAB协议

整个ZAB协议主要包括消息广播和崩溃恢复两个过程，进一步细分为发现、同步、广播三个阶段。组成ZAB协议的每一个分布式进程会循环的执行这三个阶段，称之为一个主进程周期。

#### 发现

Follower将自己最后接受的事务的epoch值发给准Leader，准Leader在接收到过半的Follower的epoch消息后会选取其中最大的值加一，然后发送给Follower。如果Follower检测当前的所有epoch都小于新epoch就会恢复ACK（包含原最大epoch和历史事务集合）。然后Follower会从ACK消息中选取一个原epoch最大，且历史事务ZXID最大的Follower作为初始化集合。

#### 同步

Leader会将新epoch和初始化集合发送给Follower。如果Follower发现自己的最大epoch等于新epoch，就会接受所有新epoch的事务并ACK。Leader接收过半ACK后发送Commit消息。完成此阶段后准Leader成为真正的Leader

#### 广播

开始接收客户端请求。Leader把接收到的新请求以新epoch和递增的ZXID发送给Follower，Follower返回ACK。Leader发送Commit。

![算法示意图](/assets/images/770d9565-59cb-4800-830a-228514b46383.png)

在ZAB协议中，每一个进程都可能处于以下三个状态之一：LOOKING、FOLLOWING、LEADING。

### ZAB与Paxos区别和联系

+ 两者都存在Leader角色负责协调Follower角色运行
+ 每一个决策都需要超过半数的ACK才会执行
+ 两个协议都存在一个值用来表示Leader的周期（epoch，Paxos中叫Ballot）

ZAB协议主要用于构建一个高可用的分布式数据主备系统，而Paxos用于构建一个分布式一致性状态机系统。

# 客户端

官方客户端、ZkClient、Curator，使用场景有事件监听(NodeCache，PathChildrenCache)、Master选举(LeaderSelector)、分布式锁(InterProcessLock)、分布式计算器(DistributedAtomicInteger)、分布式Barrier(DistributedBarrier)。

# ZK的使用场景

## 数据发布订阅

也叫配置中心，配置存储在数据节点，集群机器读取数据节点并订阅监听

![配置管理节点示意图](/assets/images/fa92bb0d-c4fa-4a17-8d7e-ab054f23fd97.png)

## 负载均衡

在ZK创建域名节点，存储解析数据

使用ZK做负载均衡需要的组件：

+ Register 负责域名的动态注册，客户端上线后会把自己的域名和ip端口发给Register
+ Dispatcher 负责域名解析，客户端发送解析请求，通过负载均衡策略返回解析结果
+ Scanner 巡检客户端的状态，探测服务可用性，移除不可用客户端
+ SDK 提供接入服务
+ Monitor 监控自身状态
+ Controller 统一管理入口或页面

![DDNS节点示意图](/assets/images/049c2dbc-b526-48d3-af48-2a266a28342a.png)

## 命名服务

在分布式环境中全局唯一的名字用以标识机器、服务、对象等资源。相比uuid长度可控、语义明确。

在ZK中使用顺序节点的方式命名得到顺序的全局唯一标识。

![全局唯一ID节点示意图](/assets/images/42db8c0e-627f-4031-94a9-22c655ad9cbf.png)

## 分布式协调/通知

ZK的Watcher注册和异步通知机制，能够很好地实现分布式环境不同机器的协调与通知，从而实现对数据变更的处理：心跳检测、进度汇报、系统调度。

![MySQL数据复制服务业务热备节点示意图](/assets/images/fc991ebb-34ff-4935-ae31-263df9985bc5.png)

![MySQL数据复制服务业务冷备节点示意图](/assets/images/ed12ecee-dedd-476d-8f6b-735869196029.png)

![MySQL数据复制服务冷备流程图](/assets/images/e167fd4c-161b-4491-a658-947a2b07e01d.png)

## 集群管理

## Master选举

ZK同一个临时节点只有一个客户端能够创建成功，创建成功的节点成为Master，其他节点注册节点变更的Watcher，来监听主节点的状态。

## 分布式锁

排它锁：

![排它锁流程示意图](/assets/images/7c77c6ab-9f5e-4595-9256-7db460a5b935.png)

共享锁：

![共享锁流程示意图](/assets/images/60b3776a-35e0-421c-bd1b-78056d2789b8.png)

为了减少共享锁通知影响范围，改进后流程如下

![改进后的共享锁流程示意图](/assets/images/91fc8c9b-0aa5-47ff-b512-d08a752ffbb0.png)

## 分布式队列

FIFO队列：

![FIFO队列](/assets/images/3658a58d-4c53-4c19-89fd-a4233030fa9c.png)

Barrier屏障：

![Barrier:分布式屏障](/assets/images/e44a8c47-2e1e-4526-9003-c864aa89dd48.png)

## ZK在大型分布式系统中的应用

在Hadoop用于实现HA，在YARN用于现ResourceManager的HA、状态存储，在HBASE中用于系统容错、RootRegion管理、Region状态管理、SplitLog任务管理、Replication管理，在Kafka中用于Broker注册、Topic注册、生产者/消费者负载均衡、绑定分区与消费者、记录Offset。

还有消息中间件Metamorphosis、RPC服务状态：Dubbo、基于MySQL Binlog的增量订阅和消费组件：Canal、分布式数据库同步系统Otter、实时计算引擎JStorm

# ZooKeeper实现

## 系统模型

### 数据模型

ZK的数据节点ZNode是ZK中数据的最小单元，每个ZNode上都可以保存数据和挂载子节点。因此构成了一个层次化的命名空间——树。

ZK中的事务是指能够改变ZK服务器状态的操作，包括节点创建于删除，内容更新和客户端会话创建失效等。对于每一个事务请求ZK都会分配一个全局唯一的事务ID也叫ZXID，可以帮助识别事务的全局顺序。

### 节点特性

+ 持久节点 节点的创建和删除又客户端请求触发
+ 持久顺序节点 节点创建时会有顺序的后缀，最大值是整型最大值
+ 临时节点 节点的生命周期和客户端会话绑定
+ 临时顺序节点 

状态信息:

![Stat对象状态属性说明](/assets/images/b3b8303f-c978-40e1-ab1d-7cff7c94d458.png)

### 版本——保证分布式数据原子性操作

version、cversion、aversion，说明见Stat。

使用version字段做乐观锁的写入校验。在ZK的PrepRequestProcessor处理器类中，处理每一个数据更新请求时都会进行版本检查。从setDataRequest获取当前请求版本的version，同时从数据记录nodeRecord获取数据的最新版本currentVersion。如果请求的version等于-1说明客户端不要求使用乐观锁，可以忽略版本对比。否则如果两者版本不一致会抛出BadVersionException。

### Watcher——数据变更的通知

#### Watcher事件

![Watcher通知状态与事件类型](/assets/images/3a62800e-0e49-4fcb-b45b-84bb982248d7.png)

#### 工作机制

客户端注册Watcher到ZKWatchManager、服务端处理Watcher、客户端回调Watcher。Watcher具有一次性、客户端串行执行和轻量的特点。

接口类Watcher标识一个标准的事件处理器，定义了事件通知的状态KeeperState和事件类型EventType，还有回调方法process(WatchedEvent event)。服务端生成WatchedEvent，调用getWapper方法把自己包装成WatcherEvent类用于网络传输。客户端将WatcherEvent反序列化成WatchedEvent。

![WatchedEvent类图](/assets/images/c56813bf-0014-432c-b2f7-f34ace480cdf.png)

![WatcherEvent类图](/assets/images/dbacf947-7151-4690-a400-b471d819fee5.png)

客户端可以在创建ZooKeeper对象时指定默认Watcher，也可以通过getData、getChildren、exist三个接口注册Watcher。注册Watcher后客户端会将当前请求request标记为有Watcher监听，然后封装一个WatchRegistration对象保存数据节点和Watcher对应关系。ClientCnxn会把WatchRegistration封装到最小通信协议单元Packet中放入发送队列等待发送。完成发送后客户端的SendThread线程的readResponse方法负责接收响应，finishPacket方法从Packet中的WatchRegistration对象取出Watcher注册到ZKWatchManager中，保存在Map<String,Set<Watcher>> dataWatches字段中，该字段保存了数据节点路径到Watcher对象的映射。

而在网络传输的过程中，并不会传输完整的Watcher对象，Packet序列化时只会序列化requestHeader和request两个属性。

服务端收到请求后在FinalRequestProcessor.processRequest()中判断当前请求是否需要注册Watcher。如果需要注册，节点路径和ServerCnxn会被存储到WatchManager的watchTable和watch2Paths中。WatchManager负责Watcher事件触发和移除已经被触发的Watcher。watchTable保存节点下的Watcher，watch2Paths保存Watcher需要触发的数据节点。服务器会维护两个WatcherManager：dataWatches和childWatches。

以下是NodeDataChanged事件的触发逻辑：当调用setData数据节点发生变更时，会调用dataWatches.triggerWatch(path,EventType.NodeDataChanged)触发事件。首先将状态KeeperState、事件类型EventType和节点路径封装成WatchedEvent对象。然后从watchTable中取出Watcher同时从watchTable和watch2Paths中删除。调用Watcher的process方法把请求头和由WatchedEvent包装成的WatcherEvent发送给客户端。

SendThread.readResponse(ByteBuffer incomingBuffer)方法处理服务端的通知，如果响应头replyHdr中标识的XID为-1说明是一个通知类型的响应。之后反序列化，处理chrootPath，还原WatchedEvent，回调Watcher交给EventThread处理。

EventThread是ZK客户端专门处理服务端通知事件的线程，根据通知事件从ZKWatchManager中的dataWatches、existWatches或childWatches取出所有相关Watcher并删除。放入到waitingEvents队列待run方法处理。随后run方法会串行处理每一个Watcher调用Watcher的process方法。

### ACL——保障数据的安全

ZK的ACL权限控制包含权限模式(Scheme)，授权对象(ID)，权限(Permission)，使用scheme：id：permission标识。

权限模式有IP、Digest（用户名密码）、World（对所有用户开放）、Super（需要再ZK启动时开启）

授权对象，IP的授权对象是一个ip地址或者ip段，Digest授权对象是一个用户密码，World的授权对象只有anyone所有用户，Super的授权对象也是一个用户名密码。

权限分为CREATE(C)、DELETE(D)、READ(R)、WRITE(W)、ADMIN(A)。

用户可以通过实现org.apache.zookeeper.server.auth.AuthenticationProvider实现自己的权限控制器。

## 序列化与协议

使用Jute进序列化

### 通信协议

![协议格式](/assets/images/7c7e1858-237f-4ac2-9913-a95d88bf20ac.png)

## 客户端

ZK客户端主要有以下几个核心组件组成：

+ ZooKeeper实例：客户端入口
+ ClientWatchManager：客户端Watcher管理器
+ HostProvider：客户端地址列表管理器
+ ClientCnxn：内部包含两个核心线程SendThread和EventThread。前者是一个IO线程负责客户端和服务端之间的网络通信，后者负责对服务端事件做处理

### 一次会话的创建过程

#### 初始化阶段

1. 初始化ZooKeeper对象，同时会创建一个ClientWatchManager。
2. 设置会话默认Watcher，如果再构造方法传入一个Watcher对象的话。
3. 构造ZooKeeper服务器地址列表管理器HostProvider，并把保存构造方法传入的地址。
4. 创建并初始化网络连接器ClientCnxn，同时初始化请求发送队列outgoingQueue和服务端响应队列pendingQueue。和IO处理器ClientCnxnSocket
5. 初始化负责网络IO的SendThread和处理客户端事件的EventThread。EventThread中有一个waitingEvents队列存放待处理事件。

#### 会话创建阶段

6. 启动SendThread和EventThread
7. 随机获取一个服务器地址并创建TCP长连接
8. 构造一个包装成Packet的ConnectRequest对象放入outgoingQueue，并由ClientCnxnSocket取出序列化发送到服务端。

#### 响应处理阶段

9. 接受服务端响应，并判断当前客户端状态是否初始化，如果没初始化说明是会话创建请求的响应，交由readConnectResult方法处理。
10. ClientCnxnSocket反序列化响应得到ConnetResponse对象，并获取服务端分配的sessionId。
11. 通知SendThread线程更新客户端状态；通知HostProvider连接服务器成功。
12. 生成SyncConnected-Node事件传给EventThread线程。
13. EventThread从ClientWatcherManager找出Watcher放入EventThread的waitingEvents队列。
14. EventThread从waitingEvents队列取出Watcher对象调用process方法。

### 服务器地址列表

ConnectStringParser解析器对连接串解析chrootPath，并保存解析后的地址列表。

Chroot是客户端隔离命名空间，在连接串中可以通过在最后一个地址后面加路径 *ip:port,ip:port/path* 来指定。之后该客户端的所有操作都会映射到该路径下。

ConnectStringParser把连接串封装成InetSocketAddress对象保存在ConnectStringParser.serverAddress队列中。并进一步封装到实现了HostProvider接口的StaticHostProvider类中。

StaticHostProvider会在初始化时使用Collections.shuffle把列表打散组成链表，并循环使用，类似于RoundRobin调度策略。

可以自己实现HostProvider，以满足配置文件方式，动态变更地址，同机房优先等策略。

### ClientCnxn：网络IO

协议层封装类Packet，outgoingQueue、pendingQueue。以及底层通信接口ClientCnxnSocket。请求发送完毕后会将Packet保存到pendingQueue队列以便等待响应后处理。

响应分为三种，一个是客户端未初始化时的响应会被序列化成ConnectResponse对象，一个是会话周期内的事件响应会被序列化成WatcherEvent对象，还有就是常规客户端操作请求的响应，会被序列化成Response对象从pendingQueue取出Packet来做处理。

SendThread除了负责请求发送和响应接受还负责维护生命周期，定时发送心跳。

EventThread负责事件处理，通过waitingEvents队列里面的对象是Watcher或AsyncCallback分别调用process或processResult方法触发回调。

## 会话

### 会话状态

会话建立之后，会话会在以下状态之间切换：CONNECTING/CONNECTED/RECONNECTING/RECONNECTED/CLOSE。

### 会话创建

#### Session

Session是ZK中的会话实体，代表了一个客户端会话。

##### sessionID

会话ID，用来标识一个会话，每次会话创建时ZK分配一个全局唯一的id。

生成方法是当前时间戳 *<<24* (将高位1移出防止负数出现)然后 *>>8* ，与myid文件配置的id值 *<<56* 后进行 *或* 操作。高8位确定所在机器，后56位使用时间进行随机。

##### TimeOut

会话超时时间

##### TickTime

为了对会话实行分桶策略管理，高效实现会话的超时检查与清理，ZK为每个会话标记会话下次超时的时间点。long型，接近当前时间+TimeOut时间

##### isClosing

标记会话是否已经关闭，服务器检测到会话失效会关闭会话，确保不在处理来自该会话的请求

#### SessionTracker

会话管理器，每一个会话在其内部都保留三份：

+ sessionsById: HashMap<Long,SessionImpl> 结构，使用sessionID管理Session。
+ sessionWithTimeout：ConcurrentHashMap<Long,Integer> 结构，用sessionID管理超时时间。会被定期持久化到快照文件。
+ sessionSets：HashMap<Long,SessionSet>结构，根据下次会话超时时间点归档会话。用于分桶策略。
  
##### 创建连接

大体分为处理ConnectRequest请求、会话创建、处理器链路处理和会话响应。

### 会话管理

#### 分桶策略

使用分桶策略管理会话，把下次超时时间点相邻的会话分配在同一区块中。这是一个近似值，向后取ExpirationInterval的整数倍。

#### 会话激活

接受客户端心跳检测，校验会话是否关闭，计算下一次超时时间点，移动会话到下一次时间点的区块。

心跳检测发生在客户端发送任何请求；或者如果客户端sessionTime/3时间内没有通信需求会发起一个PING请求。

#### 会话超时检查

SessionTracker中有一个单独的线程逐个对会话桶中剩下的会话进行批量清理。

### 会话清理

1. 因为会话清理需要时间，所以先标记会话状态为已关闭。
2. 提交“会话关闭”请求给PrepRequestProcessor处理器进行处理，以使操作在整个集群中生效。
3. 清理该会话的临时节点。根据sessionID获取临时节点列表L0，如果会话关闭之前到来了节点删除请求，把请求节点从L0中移除；如果到来的是节点创建请求，把请求节点添加到L0中。
4. 把节点删除请求发送到事务变更队列outstandingChanges
5. 由FinalRequestProcessor删除临时节点
6. 从sessionsById、sessionWithTimeOut和sessionSets中移除会话
7. 从NIOServerCnxnFactory中找到对应会话的NIOServerCnxn并关闭

### 重连

连接断开CONNECTION_LOSS，客户端会接收到None-Desconnected通知。
会话失效SESSION_EXPIRED，超时时间外重连。
会话转移SESSION_MOVED，客户端重连后连接了不同的服务端。当多个客户端使用相同的sessionId/sessionPasswd创建会话时会被认为发生了会话转移。

## 服务器启动

### 单机版启动

大体分为配置文件解析、初始化数据管理器、初始化网络管理器、数据恢复和对外服务。

![单机版启动流程](/assets/images/1594f1a8-f881-4f22-affd-281fd9e6c67b.png)

#### 预启动

1. 所有模式启动都是以QuorumPeerMain作为启动类
2. 解析配置文件zoo.cfg
3. 创建并启动历史文件清理器DatadirCleanupManager
4. 判断是集群模式还是单机模式，如果是单机模式交给ZooKeeperServerMain启动
5. 再次进行配置文件解析
6. 创建服务器实例zookeeper.server.ZooKeeperServer

#### 初始化

1. 创建服务器统计器ServerStats
2. 创建数据管理器FileTxnSnapLog，上层服务器和底层数据存储之间的中间层。
3. 设置服务器tickTime和超时时间
4. 创建、初始化、启动ServerCnxnFactory
5. 恢复本地数据
6. 创建、启动会话管理器SessionTracker
7. 初始化ZK的请求处理链，责任链模式，PrepRequestProcessor、SyncRequestProcessor、FinalRequestProcessor
8. 注册JMX服务
9. 注册ZooKeeper服务器实例，把初始化完毕的ZooKeeper服务器实例注册给ServerCnxnFactory

### 集群版启动

![集群版启动](/assets/images/6d725bd5-1feb-44d9-b4b3-314cde363bd3.png)

#### 预启动

1. 由QuorumPeerMain作为启动类
2. 解析配置文件
3. 创建文件清理器
4. 判断当前模式，如果配置了多个服务器地址以集群模式启动

#### 初始化

1. 创建、初始化ServerCnxnFactory
2. 创建数据管理器
3. 创建QuorumPeer实例，Quorum是ZooKeeper服务器实例的托管者，检测当前服务器状态和进行Leader选举。
4. 创建内存数据库ZKDatabase
5. 初始化QuorumPeer
6. 恢复本地数据
7. 启动ServerCnxnFactory主线程

#### Leader选举

1. 初始化选举，初始化过程中每个服务器给自己投票。
2. 注册JMX服务
3. 检测当前服务器状态
4. Leader选举，如果所有ZXID都一样，那么SID最大的称为Leader

#### Leader和Follower启动期交互

![启动期交互](/assets/images/f0191750-6e52-4ec9-b97a-eb4564643cb1.png)

1. 创建Leader服务器和Follower服务器
2. Leader服务器启动Follower接收器LearnerCnxAcceptor
3. Learner服务器和Leader建立连接
4. Leader服务器创建LearnerHandler，每个Handler实例对应一个Leader与Learner的连接。
5. Learner把自己的信息发送给Leader完成注册
6. Leader解析Learner信息，计算新的epoch
7. 发送Leader状态并等待响应
8. 数据同步
9. 启动Leader和Learner服务器。

#### Leader和Follower的启动

1. 创建并启动会话管理器
2. 初始化ZooKeeper请求处理链
3. 注册JMX服务

## Leader选举

### 概述

#### 服务器启动时期的选举

1. 每个Server发出一个(myid,ZXID)的投票发送给集群中的其它机器。
2. 接收到投票后判断有效性是否是本轮投票或是否来自LOOKING状态服务器
3. 根据myid和ZXID处理投票，并发出自己认为该成为Leader的机器的投票（选ZXID大的，如果一样选SID大的）。
4. 统计投票，判断是否有过半的机器接收到相同的投票信息。选出Leader
5. 改变服务器为响应的状态FOLLOWING或LEADING

#### 运行期选举

只有Leader挂了才会触发重新选举

1. 余下的非Observer服务器改变状态为LOOKING
2. 发出(myid,ZXID)的投票发送给集群中的其他机器
3. 接受投票并处理
4. 统计投票
5. 改变服务器状态

### Leader选举算法的分析

哪台服务器数据越新，ZXID就越大，所以先比较ZXID，如果ZXID一样选SID最大。然后发送给所有机器，并统计结果是否有大于一半的机器。

### Leader选举实现细节

#### 服务器状态

+ LOOKING
+ FOLLOWING
+ LEADING
+ OBSERVING

#### QuorumCnxManager:网络IO

负责各台服务器之间的Leader选举过程中的网络管理器其中维护了一系列的队列

+ recvQueue：用于存放从其他服务器接收到的消息的队列
+ queueSendMap：按照每台机器的SID进行分组的Map，用来保存待发送的消息队列。
+ sendWorkerMap：发送器集合，每个SendWorker消息发送器都对应一台远程ZooKeeper服务器，负责消息发送。按照SID进行分组。
+ lastMessageSent：为每个SID保留最近发送过的一个消息

#### 建立连接

为了能够进行投票，ZooKeeper集群所有机器建立两两连接。QuorumCnxManager在启动的时候创建一个ServerSocker监听Leader选举端口，并接收来自其他服务器的创建连接请求。ZK只允许SID大的服务器主动连接，如果接收到的SID小，则断开连接。如果建立起连接就根据远程服务器SID创建SendWorker和RecvWorker。

#### 消息接收与发送

每个RecvWorker不断的从TCP连接中读取消息保存到recvQueue中。

每个SendWorker不断的从发送队列取消息发送，并放入到lastMessageSent中。以后如果SendWorker发现当前远程服务器发送队列为空就从lastMessageSent中取出最近发送过的消息再次发送，之所以这样做是防止接收方接收不到消息并且ZK可以对重复消息进行正确处理，所以重复投递。

#### FastLeaderElection：选举算法核心部分

##### 选票管理

在QuorumCnxManager中

+ sendqueue：待发送选票发送队列
+ recvqueue：接收到的外部选票的接收队列
+ WorkerReciever：选票接收器，不断的从QuorumCnxManager中取出其他服务器发送来的消息并转换成一个选票保存到recvqueue中。如果发现外部票轮次小于当前服务器或者当前服务器不是LOOKING状态就会丢弃并发出自己的选票。
+ WorkerSender：不断的从sendqueue获取待发送选票并传给QuorumCnxManager

![选举流程示意图](/assets/images/38b48ef4-264d-4175-9b11-0e0e7c8cfce2.png)

1. 自增选票轮次
2. 初始化选票
3. 发送初始化选票
4. 接受外部选票
5. 判断选票轮，次如果外部大于自己更新自己轮次清空已收到选票使用初始化选票PK
6. 如果轮次一致进行选票PK
7. 变更投票
8. 选票归档
9. 统计选票
10. 更新服务器状态，更新为LEADING或FOLLOWING或OBSERVING

## 各服务器角色介绍

### Leader

+ 事务请求的唯一调度和处理者，保证集群事务处理的顺序性
+ 集群内部服务器的调度者

### 请求处理链

使用责任链模式处理每一个客户端请求。

![处理链](/assets/images/3b4e6604-9d7c-49ab-88d0-7b897ac16d5e.png)

#### PrepRequestProcessor

对于增删改节点，创建对话等事务请求，会进行一系列预处理：创建请求事务头、事务体、会话检查、ACL检查等

#### ProposalRequestProcessor

投票处理器，对于事务请求，除了流转给CommitProcessor还会创建投票并发起一次投票。并交给SyncRequestProcessor进行日志记录

#### SyncRequestProcessor

事务日志记录处理器，将事务记录到日志文件并触发快照

#### AckRequestProcessor

Leader特有负责在SyncRequestProcessor处理器完成事务记录后向投票收集器发送ACK反馈通知收集器完成了对该事务的记录（本地反馈）

#### CommitProcessor

事务提交处理器，对于非事务请求该处理器直接交给下一级处理，对于事务请求会等待投票结果可以被提交

#### ToBeCommitProcessor

内部有一个toBeApplied队列用来存储CommitProcessor处理过可提交的提议，然后逐个交给FinalRequestProcessor处理完后再从toBeApplied中移除

#### FinalRequestProcessor

真正请求执行者

#### LearnerHandler

为每一个Follower和Observer建立一个TCP长链接和一个LearnerHandler，负责与Follower和Observer的通信

### Follower

+ 处理客户端非事务请求，转发事务请求给Leader
+ 参与事务投票
+ 参与Leader选举

![Follower责任链](/assets/images/d694c9c0-4caa-4a09-9ecb-874a31c0abcd.png)

#### FollopwerRequestProcessor

识别是否是事务请求，如果是事务请求就转发给Leader

#### SendAckRequestProcessor

进行事务记录并向Leader发送ACK反馈表明自己完成了事务记录。（向Leader反馈）

### Observer

处理请求但不参与事务投票和选举投票

![Oblerver处理链](/assets/images/2b8baed5-572d-4769-9c38-42a215b1e8c2.png)

### 集群间消息通信

ZK的消息类型分为四类：数据同步型，服务器初始化型，请求处理型，会话管理型

#### 数据同步型

![同步过程消息类型](/assets/images/fc2483d5-6872-49f3-8d6c-8b04eed12f17.png)

#### 服务器初始化型

![服务器初始化消息类型1](/assets/images/b4b51829-9915-45ca-b1e1-55afe64470ea.png)

![服务器初始化消息类型2](/assets/images/c3481fe1-8581-41e3-9271-3efc4bff8e7d.png)

#### 请求处理型

![请求处理消息类型1](/assets/images/58ad0761-78a0-4237-8389-18c3c06f0d6d.png)
![请求处理消息类型2](/assets/images/f9c68d46-d6ee-418a-ba94-d1c5b6583f17.png)

#### 会话管理型

![会话管理消息类型](/assets/images/34fbb230-393a-45a7-9402-6062da9eb4bd.png)

## 请求处理

### 会话创建请求

![会话创建请求流程示意图](/assets/images/34fbb230-393a-45a7-9402-6062da9eb4bd.png)

#### 请求接收

1. IO层接收来自客户端的请求，每一个会话由一个NIOServerCnxn负责
2. 判断是否是会话创建请求，如果NIOServerCnxn没被初始化说明是创建会话
3. 反序列化ConnectRequest请求
4. 判断是否是ReadOnly客户端，如果服务器以ReadOnly模式启动，只会接收ReadOnly型客户端的请求
5. 检查客户端ZXID，如果客户端ZXID大于服务端ZXID就不接收会话创建请求
6. 协商sessionTimeout，根据配置的tickTime，服务器会限制于2倍tickTIme 到 20倍ticeTime
7. 判断是否需要重新创建会话，如果客户端请求包含sessionID，认为是重连，服务端会重新打开会话。

#### 会话创建

8. 为客户端生成sessionID，根据全局唯一的基准sessionID递增。
9. 注册会话，向SessionTracker注册会话
10. 激活会话，为会话安排一个分桶区块
11. 生成会话秘钥，作为会话在集群不同机器转移的凭证

#### 预处理

12. 将请求交给PrepRequestProcessor处理器处理
13. 创建请求事务头和请求事务体
14. 再次注册于激活会话，目的处理非Leader服务器转发过来的会话创建请求，重复注册是安全的。

#### 事务处理

15. 将请求交给ProposalRequestProcessor处理器

#### Sync流程

SyncRequestProcessor处理器的记录事务日志过程。

#### Proposal流程

1. 发起投票
2. 生成提议
3. 广播提议
4. 收集投票，Follower服务器接收到Leader的提议后会进入Sync流程进行事务日志记录，记录成功后会想Leader发送ACK消息。过半的ACK认为提议通过
5. 将请求放入toBeApplied队列
6. 广播COMMIT消息，Leader向Follower发送ZXID，而向Observer发送INFORM信息包含当前提议内容

#### Commit流程

1. 将请求交给CommitProcessor
2. 处理queuedRequests队列请求
3. 标记nextPending，目的是确保事务请求顺序性和便于CommitProcessor处理器检测当前集群中是否正在进行事务请求投票
4. 等待投票结果
5. 投票通过，将请求放入committedRequests队列
6. 提交请求，对比nextPending和committedRequests队列中第一个请求是否一致，将请求放入toProcess队列，然后交付给FinalRequestProcessor处理

#### 事务应用

16. 交付给FinalRequestProcessor处理器，检查outstandingChanges队列请求的有效性，如果这些请求落后于当前的请求，就从outstandingChanges中移除
17. 事务应用，之前已经将请求记录到了事务日志中，现在将请求应用到内存数据库中
18. 将事务请求放入commitProposal队列

#### 会话响应

19. 统计处理，统计花费的时间，和客户端连接的lastZXID、lastOP(最后一次的操作)和lastLatency(最后一次请求花费的时间)等信息。
20. 创建响应ConnectResponse
21. 序列化ConnectResponse
22. IO层发送响应给客户端

### SetData请求

![SetData流程图](/assets/images/0c00aaa8-cfd7-4edd-81f5-4ba9bc3448e0.png)

#### 预处理

1. IO层接收来自客户端的请求
2. 判断是否是会话创建请求
3. 把请求交给PrepRequestProcessor处理器
4. 创建请求事务头
5. 会话检查，检查改会话是否超时
6. 反序列化请求，并创建ChangeRecord记录放入outstandingChanges队列
7. ACL检查
8. 数据版本检查
9. 创建请求事务体SetDataTxn
10. 保存事务操作到outstandingChanges队列

#### 事务处理

由ProposalRequestProcessor处理器发起，通过Sync、Proposal、Commit流程完成

#### 事务应用

11. 交付给FinalRequestProcessor处理器
12. 事务应用，把请求事务头和事务体交给内存数据库ZKDatabase进行事务应用，并返回ProcessTxnResult对象。
13. 将事务请求放入commitProposal队列

#### 请求响应

14. 统计处理
15. 创建响应体SetDataResponse
16. 创建响应头
17. 序列化
18. IO层发送给客户端

### 事务请求转发

对于Follower和Observer服务器，如果第一个请求处理器FollowerRequestProcessor或ObserverRequestProcessor发现是事务请求，会将该客户端请求以REQUEST消息形式发送给Leader，Leader解析出原始请求提交到自己的处理链进行事务处理

### GetData请求

![GetData请求流程](/assets/images/14c141e2-1239-4d69-9fd4-bcafd633b5e4.png)

#### 预处理

1. IO层接收来自客户端的请求
2. 判断是否是会话创建请求
3. 将请求交给PrepRequestProcessor处理
4. 会话检查

#### 非事务处理

5. 反序列化GetDataRequest请求
6. 获取数据节点
7. ACL检查
8. 获取数据内容和stat，注册Watcher

#### 请求响应

9. 创建响应体GetDataResonse
10. 创建响应头
11. 统计处理
12. 序列化
13. IO层发送给客户端

## 数据与存储

### 内存数据

ZK的数据模型是一棵树，存储了节点路径，节点数据，ACL信息等数据。

![DataTree和DataNode数据结构](/assets/images/15d18aa4-3b8e-48dd-b755-c9f3164dd5ed.png)

DataTree内部用ConcurrentHashMap<String,DataNode>存储所有节点，同时还用ConcurrentHashMap<Long,HashSet<String>>存储临时节点

#### ZKDatabase

真正的数据库实现，负责管理ZK的所有会话、DataTree存储和事务日志。会定时向磁盘dump快照。启动时会通过事务日志和快照文件恢复成一个完整的内存数据库。

### 事务日志

#### 文件存储

配置中的dataDir用于存储事务日志文件，也可单独设置dataLogDir。事务日志文件大小一致一般为64M。文件名是log.XXXX，其中XXX是日志第一条记录的ZXID的十六进制。

可以帮助快速定位事务操作所在的日志，也可以根据后缀的ZXID知道当前Leader周期。

日志文件可以通过org.apache.zookeeper.Server.LogFormatter解析展示。**Java LogFormatter log.XXXX**

#### 日志写入

日志写入由FileTxnLog负责。写入过程如下：

1. 确定是否有事务日志可写
2. 确定事务日志文件是否需要扩容。日志文件会会使用0填充进行预分配，当剩余空间不足4KB时重新分配64MB。
3. 事务序列化。
4. 生成Checksum。用来校验日志文件的完整性和准确性。
5. 写入事务日志文件流。
6. 事务日志刷入磁盘。

#### 日志截断

当非Leader机器上记录的事务ID大于Leader时，Leader会发送TRUNC命令给这台机器让其进行日志截断。随后该机器会删除非Leader机器事务ID的文件。

### 事务快照

#### 文件存储

ZK会定期往dataDir目录创建当前时刻的全量内存数据内容。快照文件也是使用ZXID的十六进制作为后缀。快照文件不会预分配文件空间。

#### 存储格式

可以使用快照工具查看快照内容 org.apache.zookeeper.server.SnapshotFormatter。java SnapshotFormatter snapshot.XXXXX。

#### 数据快照

FileSnap负责维护数据快照接口。可以使用snapCount参数配置每次快照间的事务操作次数。

1. 确定是否需要进行数据快照
2. 重新创建新的事务日志
3. 创建数据快照异步线程
4. 获取全量数据和会话信息
5. 生成快照数据文件名
6. 数据序列化

### 初始化

ZK启动时进行数据初始化将磁盘上的数据加载到ZooKeeper内存中。

![数据初始化过程](/assets/images/d0cd4ca8-5dbf-4b1e-a8a9-74438fc47213.png)

主要包括从快照文件加载快照数据和根据实物日志进行数据订正两个过程

1. 初始化FileTxnSnapLog，内部又分为FileTxnLog和FileSnap
2. 初始化ZKDatabase
3. 创建PlayBackListener监听器，在ZK数据恢复后期，会有一个数据订正的过程。接收事务时回调此监听器。
4. 处理快照文件，首先从快照文件加载数据到内存。先获取100个快照文件，从最新的开始进行文件正确性校验，直到找到一个数据正确的文件进行加载。
5. 获取最新的ZXID，处理事务日志，应用事务并回调PlayBackListener。
5. 再次获取最新的ZXID，
6. 校验epoch，把从文件恢复的epoch与currentEpoch和acceptedEpoch文件进行校验。

#### PlayBackListener

将事务转存到ZKDatabase.committedLog中使集群服务器间进行快速的数据同步。

### 数据同步

Learner服务器向Leader同步没有提交过的事务请求。

#### 获取Learner状态

注册Learner最后阶段，Learner向Leader发送一个ACKEPOCH数据包，Leader解析出该Learner的currentEpoch和lastZxid。

#### 数据同步初始化

Leader从数据库中提取出提议缓存队列，获取peerLastZxid：该Learner服务器最后的ZXID；minCommittedLog：Leader缓存队列最小ZXID；maxCommittedLog：Leader缓存队列最大ZXID。集群同步通常分为四类，差异化同步（DIFF），先回滚再差异化（TRUNC+DIFF）、仅回滚同步（TRUNC），全量（SNAP)。

当peerLastZxid介于minCommittedLog和maxCommitedLog之间
