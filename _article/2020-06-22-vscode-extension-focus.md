---
title: VS Code Extension-Focus
categories:
- VS Code
- VS Code Extension
description: VS Code Extension-Focus 介绍
permalink: "/posts/vscode-extension-focus"
excerpt: VS Code 插件，突出显示当前代码行、代码块，帮助你专心于眼前。
---

## Focus

突出显示当前代码行、代码块，帮助你专心于眼前。

[Download page](https://marketplace.visualstudio.com/items?itemName=QuanLi.focus)

### Features

* 高亮当前行。
* 根据配置，高亮固定的行数。
* 高亮代码块，根据缩进高亮，适合Python。
* 高亮代码块，高亮以 "{" 和 "}" 包裹的代码块。

### Usages

* 点进链接或者在vscdoe扩展搜索并安装。
* 提供了快捷命令和状态栏快捷按钮帮助切换。

![Usage01](/assets/images/vscode-extension-focus/usage01.png)

![Usage02](/assets/images/vscode-extension-focus/usage02.png)

![Usage03](/assets/images/vscode-extension-focus/usage03.png)


### Configuration

使用UI或者JOSN设置高亮级别:

``` json
"focus.highlightRange":"line"   //仅高亮当前行
"focus.highlightRange":"block"  //高亮以"{"和"}"包裹的代码块
"focus.highlightRange":"indent" //根据索引级别高亮代码块，适合Python
"focus.highlightRange":"fixed"  //高亮固定的行，行数可配置
```

当高亮级别设置成 *fixed*,这个配置可以设置高亮多少行:

``` json
"focus.highlightLines":5
```

设置非突出显示行的透明度，0.1到0.9:

``` json
"focus.opacity":0.7 //number between (0,1)
```


### 迭代记录
See Change Log [here](https://github.com/mzzw/focus/blob/master/CHANGELOG.md)

### Issues
Submit the [issues](https://github.com/mzzw/focus/issues) if you find any bug or have any suggestion.

### Contribution
Fork the [repo](https://github.com/mzzw/focus) and submit pull requests.
