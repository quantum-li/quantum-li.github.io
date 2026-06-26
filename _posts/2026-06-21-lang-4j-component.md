---
layout: posts
title: LangChain4j 与 LangGraph4j 框架组件介绍
categories:
- java
- ai
- langchain
description: LangChain4j 和 LangGraph4j 框架组件与设计思想介绍
excerpt: 介绍 LangChain4j 与 LangGraph4j 的核心组件、架构角色和应用场景。
permalink: "/posts/lang-4j-component"
---
# LangChain4j

## Models 模型

* ChatModel：语言模型，主要用于文本等内容的输入输出。
* EmbeddingModel：用于向量化文本的嵌入模型。
* ImageModel：生成或编辑图片的模型。
* ModerationModel：用于检测内容是否含有伤害性信息的风控模型。
* ScoringModel：对文本相关度进行评分的模型。

ChatModel 模型可以直接接收一批 ChatMessage 内容，也可以接收一个完整的 ChatRequest 进行定制。

**一张图理清“数据流”变化：**

| 阶段    | 操作             | 候选词数量                     | 概率总和                 |
| ------- | ---------------- | ------------------------------ | ------------------------ |
| 初始    | 模型输出 Logits  | 50,000 个                      | 原始分数无意义           |
| 第 1 步 | Temperature 缩放 | 50,000 个（分数差距改变）      | 仍为原始分数，非概率     |
| 第 2 步 | Top-K 截断       | 骤减至 50 个（其余变负无穷）   | 非概率，但只剩 50 个有值 |
| 第 3 步 | Top-P 截断       | 进一步减至 20 个（尾部被清零） | 非概率，只剩 20 个有值   |
| 第 4 步 | Softmax 归一化   | 20 个                          | 重新归一化为 100%        |
| 第 5 步 | 随机采样         | 最终抽出 1 个                  | -                        |

### ChatMessage

* UserMessage：用户输入内容
* AiMessage：模型生成的内容
* ToolExecutionResultMessage：工具输出的内容
* SystemMessage：系统提示词，只能存在 1 个。

UserMessage 可以包含多模态内容：
* TextContent
* ImageContent
* AudioContent
* VideoContent
* PdfFileContent

### ChatRequest

* messages：请求给模型的消息内容
* modelName：动态选择指定模型
* temperature：控制模型输出的创造性，值越低创造性越低。0.0 ~ 2.0
* topP：学名核采样，控制输出内容的合理性。在候选集中按照概率从大到小排列，只保留概率总和小于 topP 的候选词。0.0 ~ 1.0
* topK：只保留概率最高的 topK 个候选词。用于当模型输出十分犹豫时，所有候选词概率都接近，topP 失效。这时候 topK 会做硬性截断。
* frequencyPenalty：控制词句出现频率，越低增强一致性，越高减少重复词汇。-2.0 ~ 2.0
* presencePenalty：存在惩罚，如果某个词已经出现过，就进行控制。越低为围绕已有主题展开，越高会展开新话题。-2.0 ~ 2.0
* maxOutputTokens：控制模型输出 token 数
* stopSequences：设置模型输出断流关键字
* toolSpecifications：模型可使用的工具描述
* toolChoice：控制模型不能使用、必须使用、自己决定使用哪些工具
* responseFormat：控制模型输出格式
* parameters：透传模型参数，针对不同模型的个性化参数，或暂不支持的新参数

### 流式响应

实现 StreamingChatResponseHandler 接口来接收模型的流式输出，来进行任意的使用。

## Memory 记忆

### Memory 和 History

记忆和对话历史是完全不同的概念。对话历史记录的是用户和 Agent 之间的完整内容，通常是用户在对话框看到的对话历史，代表用户和 Agent 实际输出内容。
而记忆是 Agent 运行过程中为了保持模型输入信息的完整度，保留的一些信息。通常是模型多轮交互历史、工具调用结果、检索结果等。它可以为了保证 Agent 运行的稳定性进行删除、修改、增加。

基于以下原因，记忆需要控制内容数量：
1. 模型窗口有大小，不能超过这个大小
2. 控制 token 成本，投给模型太多已经不需要的内容会浪费钱
3. 控制性能，token 越多，传输和响应的时间都会受影响

目前 LangChain4j 提供了两种开箱即用的记忆窗口：MessageWindowChatMemory 和 TokenWindowChatMemory。

记忆是保存在内存中的，用户需要实现 ChatMemoryStore 来自己实现持久化。

## AI Services

框架处理了频率最高的工作：格式化 LLM 的输入内容；解析 LLM 的输出内容、记忆、工具、RAG。

## Tools 工具


## RAG 检索增强生成

## 格式化输出内容

## LLM 输入输出护栏

## 分类

利用 LLM 推理分析的一种形式，使用 LLM 对输入内容按照预先定义的枚举进行分析。 可以用于情感分析、意图检测、实体识别。

也可以使用 EmbeddingModelTextClassifier 通过对每个枚举值提供少量样本，来完成不需要调用 LLM 的本地分类。

## 向量存储支持

## 构建 MCP 调用或者提供服务端

## 可观测性

LangChain4j 为 Agent 的每一次活动都提供了回调用于观测输入输出数据。

# LangGraph4j

