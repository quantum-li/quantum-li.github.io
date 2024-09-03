---
title: VS Code 扩展开发
categories:
- JavaScript
- VS Code
- VS Code Extension
description: 从搭建项目开始到完成一个可以使用并发布的 VS Code 扩展
permalink: "/posts/implement-vscode-extension"
excerpt: 本次分享是实践类的分享，会先介绍知识点，然后从搭建项目开始到完成一个可以使用并发布的 VS Code 扩展。VS Code 是很多人都在使用的文本编辑器，同时它也是一个开放度很高的瑞士军刀。我们在使用其他文本编辑器的时候，可能会有一些不满意的实现，或不能满足的功能，但是都会受制于它们开放度不高而没有办法。在我们完成了本次分享内容之后，如果我们使用 VS Code 时需要一些定制化的功能，都可以自己动手实现，并发布到扩展商店。
---

本次分享是实践类的分享，会先介绍知识点，然后从搭建项目开始到完成一个可以使用并发布的 VS Code 扩展。

VS Code 是很多人都在使用的文本编辑器，同时它也是一个开放度很高的瑞士军刀。

我们在使用其他文本编辑器的时候，可能会有一些不满意的实现，或不能满足的功能，但是都会受制于它们开放度不高而没有办法。

在我们完成了本次分享内容之后，如果我们使用 VS Code 时需要一些定制化的功能，都可以自己动手实现，并发布到扩展商店。

文中所有的 ⚓️ 图标都是维基百科或官方文档链接。

# 目标

<https://marketplace.visualstudio.com/items?itemName=QuanLi.focus&ssr=false#overview>

本次分享最后实现的结果，是我在去年开发并发布的一款插件。它提供了不同维度的代码高亮功能，比如基于方法块高亮、针对 Python 的基于缩进高亮、固定行数高亮。

实现方案是基于文本分析，这种方案十分轻量级并且适配度很高，可以适配多种语言和语法。如果基于语法，实现就会非常重量级。扩展在运行的时候需要启动不同语言的 Language Server，启动慢并且耗内存等资源。

# 预备知识

## Visual Studio Code [⚓️](https://zh.wikipedia.org/zh-cn/Visual_Studio_Code)

Visual Studio Code（简称VS Code）是一个基于 Electron 开发的跨平台的高度可扩展的文本编辑器，微软于2015年启动项目并开源。其社区活跃，扩展商店内容丰富。

## Electron [⚓️](https://zh.wikipedia.org/wiki/Electron)

Electron 是一个支持跨平台桌面GUI应用开发的框架，通过使用 Node.js 作为后端代码执行引擎，和 Chromium 作为前端渲染引擎。

一个基础的 Electron 包含三个文件：

+ 配置元数据 package.json
+ 后端代码入口 main.js
+ 图形界面 index.html

## Chromium [⚓️](https://zh.wikipedia.org/wiki/Chromium)

Chromium 是 Google 为发展浏览器 Google Chrome 而开启的免费开源软件项目。Chromium 与 Google Chrome 共享大部分代码和功能。Google 使用该代码来制作其 Chrome 浏览器，Chrome 浏览器比 Chromium 具有更多功能。

Google 选择了 "Chromium" 这个名字，比喻将铬(英语：Chromium)金属锻造成镀铬(英语：Chrome plating)。

## Node.js [⚓️](https://zh.wikipedia.org/wiki/Node.js)

Node.js 是大部分基本模块都用 JavaScript 语言编写的能够运行在服务端的开源跨平台的 JavaScript 运行环境。所谓的服务端是相对于 JavaScript 的传统运行环境浏览器来讲，提供了文件系统I/O、网络等模块。

其也和 Google Chrome 浏览器、Chromium 浏览器一样都是基于 Google 的 V8 执行引擎。

## V8 (JavaScript引擎) [⚓️](https://zh.wikipedia.org/wiki/V8_(JavaScript%E5%BC%95%E6%93%8E))

V8 是一个由 Google 开发的开源 JavaScript 引擎。V8在运行之前将 JavaScript 编译成了机器代码，而非字节码或是解释执行。

# 环境准备

## 准备哪些内容？[⚓️](https://code.visualstudio.com/api/get-started/your-first-extension)

``` shell
#如果npm下载慢可以切换到淘宝仓库 npm config set registry http://registry.npm.taobao.org
npm install -g yo generator-code
```

## NPM [⚓️](https://zh.wikipedia.org/wiki/Npm)

NPM（全称 Node Package Manager，即“node包管理器”）是 Node.js 默认的、用 JavaScript 编写的软件包管理系统。

对比Maven

## Yeoman [⚓️](https://en.wikipedia.org/wiki/Yeoman_(software))

Yeoman 是一个用于 JavaScript 开发的开源客户端脚手架工具。Yeoman 作为为 Node.js 编写的命令行界面运行，并将多个功能组合到一个地方，例如生成入门模板。

对比Maven的Archetype

## generator-code [⚓️](https://github.com/microsoft/vscode-generator-code)

VS Code 扩展的项目生成器

对比例如 maven-archetype-quickstart

# 开发

一个可以跑起来的扩展 = 约定配置 [⚓️](https://code.visualstudio.com/api/references/extension-manifest) + 从 VS Code 接收用于触发的事件 [⚓️](https://code.visualstudio.com/api/references/vscode-api) + 调用 VS Code 功能的开放 API [⚓️](https://code.visualstudio.com/api/references/vscode-api)

VS Code 对开发者暴露的接口功能 [⚓️](https://code.visualstudio.com/api/extension-capabilities/overview) 

官方Samples [⚓️](https://github.com/microsoft/vscode-extension-samples)

## 创建项目

``` shell
yo code
​
#? What type of extension do you want to create? New Extension (JavaScript)
#? What's the name of your extension? focus-demo
#? What's the identifier of your extension? focus-demo
#? What's the description of your extension?
#? Enable JavaScript type checking in 'jsconfig.json'? No
#? Initialize a git repository? Yes
#? Which package manager to use? npm
​
code ./focus-demo
# 如果没有code命令，打开一个VS Code 搜索运行 "install command in path" 命令
```

## 运行项目

Run -> Start Debugging

## 文件目录 [⚓️](https://github.com/li-qr/focus)

+ 主要代码文件 extension.js
+ 配置文件 package.json（VS Code约定）
+ 介绍文档 README.md（GitHub约定）
+ 更新日志 CHANGELOG.md
+ 软件授权条款 LICENSE（GitHub约定）

## 配置
``` json
{
    "name": "focus-demo",  # 扩展的标识名
    "displayName": "Focus-Demo", # 扩展显示的名字
    "description": "帮助高亮代码",  # 描述
    "version": "0.2.0",  # 插件版本，发布时需升高版本号才能发布成功
    "publisher": "QuanLi", # 扩展页面展示的发布者名字
    "author": {    # 插件作者信息
        "email": "",
        "name": "",
        "url": ""
    },
    "icon":"images/logo.png",  # 插件Logo
    "license": "SEE LICENSE IN LICENSE", # 约定内容，指向根目录LICENSE文件
    "engines": {    # 扩展兼容的VS Code版本
        "vscode": "^1.35.0"
    },
    "categories": [   # 扩展在应用商店的分类
        "Programming Languages",
        "Other"
    ],
    "activationEvents": [  # 扩展激活的事件
        "*"
    ],
    "keywords": [  # 扩展在应用商店对应的关键字
        "javascript",
        "python",
        "java",
        "c/c++",
        "multi-root ready"
    ],
    "bugs": {  # BUG提交地址
        "url":"https://github.com/li-qr/focus/issues",
        "email": ""
    },
    "homepage": "https://github.com/li-qr/focus/blob/master/README.md",  # 扩展主页
    "repository": { # 扩展代码仓库位置
        "type": "git",
        "url": "https://github.com/li-qr/focus.git"
    },
    "main": "./extension.js", # 扩展代码入口
    "contributes": {
        "commands":[   # 注册的VS Code命令
            {
                "command": "focus.swtichToLineLevel",
                "title": "Focus: Switch To Line Level"
            },
            {
                "command": "focus.switchToBlockLevel",
                "title": "Focus: Switch To Block Level"
            },
            {
                "command": "focus.switchToIndentLevel",
                "title": "Focus: Switch To Indent Level"
            },
            {
                "command": "focus.switchToFixedLevel",
                "title": "Focus: Switch To Fixed Level"
            },
            {
                "command": "focus.turnOff",
                "title": "Focus: Turn Off"
            },
            {
                "command": "focus.toggleLevel",
                "title": "Focus: Toggle Level"
            }
        ],
        "keybindings":[ # 注册的快捷键
            {
                "command": "focus.toggleLevel",
                "key": "ctrl+alt+u"
            }
        ],
        "configuration":[  # 注册的VS Code设置项
            {
                "title": "Focus configuration",
                "properties": {
                    "focus.opacity":{
                        "type":"string",
                        "default":"0.7",
                        "pattern": "^0\\.\\d{1}$",
                        "description": "Opacity of the out of focus lines"
                    },
                    "focus.highlightRange":{
                        "type":"string",
                        "default":"fixed",
                        "enum": [
                            "line",
                            "block",
                            "indent",
                            "fixed",
                            "none"
                        ],
                        "description": "Highlight range",
                        "markdownEnumDescriptions": [
                            "Only highlight current line",
                            "Highlight code block with token",
                            "Highlight lines by same indent with current line",
                            "Fixed highlight `#focus.highlightLines#` lines",
                            "Not highlight any code"
                        ]
                    },
                    "focus.highlightLines":{
                        "type":"integer",
                        "default":5,
                        "markdownDescription":"This configuration only useful when `#focus.highlightRange#` set to *fixed* .this mean how many lines will be highlight."
                    }
                }
            }
        ]
    }
}
```

## 代码

``` javascript
const vscode = require('vscode');
​
// 注册过的配置项及配置枚举值
const CONF_OPACITY = "focus.opacity";
const CONF_HIGHLIGHT_RANGE = "focus.highlightRange";
const CONF_HIGHLIGHT_RANGE_LINE = "line";
const CONF_HIGHLIGHT_RANGE_BLOCK = "block";
const CONF_HIGHLIGHT_RANGE_INDENT = "indent";
const CONF_HIGHLIGHT_RANGE_FIXED = "fixed";
const CONF_HIGHLIGHT_RANGE_NONE = "none";
const CONF_HIGHLIGHT_LINES = "focus.highlightLines";
​
// 注册过的命令
const CMD_TO_LINE = "focus.swtichToLineLevel";
const CMD_TO_FIXED = "focus.switchToFixedLevel";
const CMD_TO_INDENT = "focus.switchToIndentLevel";
const CMD_TO_BLOCK = "focus.switchToBlockLevel";
const CMD_TURN_OFF = "focus.turnOff";
const CMD_TOGGLE = "focus.toggleLevel";
​
function activate(context) {
    
    // 获取文本编辑器的修饰类
    let baseDecoration = vscode.window.createTextEditorDecorationType({
        // 从设置获取值
        opacity: vscode.workspace.getConfiguration().get(CONF_OPACITY)
    });
​
​
    let timeout = null;
    // 事件的回调入口
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(updateDecorations, 100);
    }
​
    // 注册编辑器中的鼠标选中事件
    vscode.window.onDidChangeTextEditorSelection(event => {
        triggerUpdateDecorations();
    });
​
    // 注册编辑器切换事件
    vscode.window.onDidChangeActiveTextEditor(editor => {
        editor && triggerUpdateDecorations();
    });
​
    // 注册设置变更事件
    vscode.workspace.onDidChangeConfiguration(listener => {
        if (listener.affectsConfiguration(CONF_OPACITY)) {
            baseDecoration.dispose();
            baseDecoration = vscode.window.createTextEditorDecorationType({
                opacity: vscode.workspace.getConfiguration().get(CONF_OPACITY)
            });
        }
        if((listener.affectsConfiguration(CONF_OPACITY)
            || listener.affectsConfiguration(CONF_HIGHLIGHT_LINES)
            || listener.affectsConfiguration(CONF_HIGHLIGHT_RANGE))
            && vscode.window.activeTextEditor){
            triggerUpdateDecorations();
            updateStatusBarItem();
            }
    });
  
    // 注册命令回调  命令回调变更的是VS Code设置，然后上面注册了设置变更事件
    vscode.commands.registerCommand(CMD_TO_LINE, () => {
        vscode.workspace.getConfiguration().update(CONF_HIGHLIGHT_RANGE, CONF_HIGHLIGHT_RANGE_LINE, vscode.ConfigurationTarget.Global);
    });
    vscode.commands.registerCommand(CMD_TO_BLOCK, () => {
        vscode.workspace.getConfiguration().update(CONF_HIGHLIGHT_RANGE, CONF_HIGHLIGHT_RANGE_BLOCK, vscode.ConfigurationTarget.Global);
    });
    vscode.commands.registerCommand(CMD_TO_INDENT, () => {
        vscode.workspace.getConfiguration().update(CONF_HIGHLIGHT_RANGE, CONF_HIGHLIGHT_RANGE_INDENT, vscode.ConfigurationTarget.Global);
    });
    vscode.commands.registerCommand(CMD_TO_FIXED, () => {
        vscode.workspace.getConfiguration().update(CONF_HIGHLIGHT_RANGE, CONF_HIGHLIGHT_RANGE_FIXED, vscode.ConfigurationTarget.Global);
    });
    vscode.commands.registerCommand(CMD_TURN_OFF,()=>{
        vscode.workspace.getConfiguration().update(CONF_HIGHLIGHT_RANGE,CONF_HIGHLIGHT_RANGE_NONE,vscode.ConfigurationTarget.Global);
    });
    vscode.commands.registerCommand(CMD_TOGGLE, () => {
        switch (vscode.workspace.getConfiguration().get(CONF_HIGHLIGHT_RANGE)) {
            case CONF_HIGHLIGHT_RANGE_BLOCK:
                vscode.commands.executeCommand(CMD_TO_LINE);
                break;
            case CONF_HIGHLIGHT_RANGE_LINE:
                vscode.commands.executeCommand(CMD_TO_FIXED);
                break;
            case CONF_HIGHLIGHT_RANGE_FIXED:
                vscode.commands.executeCommand(CMD_TO_INDENT);
                break;
            case CONF_HIGHLIGHT_RANGE_INDENT:
                vscode.commands.executeCommand(CMD_TURN_OFF);
                break;
            case CONF_HIGHLIGHT_RANGE_NONE:
                vscode.commands.executeCommand(CMD_TO_BLOCK);
                break;
        };
        updateStatusBarItem();
    });
​
    // 注册状态栏图标及其功能
    let statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    // 状态栏按钮绑定的命令
    statusItem.command = CMD_TOGGLE;
    statusItem.tooltip="Toggle Focus Level";
    // 注册触发状态栏图标样式变化的事件
    vscode.window.onDidChangeActiveTextEditor(() => updateStatusBarItem());
    vscode.window.onDidChangeTextEditorSelection(() => updateStatusBarItem());
    updateStatusBarItem();
  // 状态栏图标功能及样式变化的主要方法
    function updateStatusBarItem() {
        statusItem.hide();
        switch (vscode.workspace.getConfiguration().get(CONF_HIGHLIGHT_RANGE)) {
            case CONF_HIGHLIGHT_RANGE_BLOCK:
                statusItem.text = `Focus:$(json)`;
                break;
            case CONF_HIGHLIGHT_RANGE_LINE:
                statusItem.text = `Focus:$(diff-remove)`;
                break;
            case CONF_HIGHLIGHT_RANGE_FIXED:
                statusItem.text = `Focus:$(find-selection)`;
                break;
            case CONF_HIGHLIGHT_RANGE_INDENT:
                statusItem.text = `Focus:$(tree-filter-on-type-on)`;
                break;
            case CONF_HIGHLIGHT_RANGE_NONE:
                statusItem.text = `Focus:$(stop)`;
                break;
        }
        statusItem.show();
    }
​
    // 实现的主要方法
    function updateDecorations() {
       // 获取鼠标位置和选中区域
        let activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) return;
        const ROLL_ABOVE = -1;
        const ROLL_BELOW = 1;
        let range = [];
        let selections = activeEditor.selections.sort((a, b) => a.start.line - b.start.line);
        let rangeType = vscode.workspace.getConfiguration().get(CONF_HIGHLIGHT_RANGE);
      
        // 根据鼠标位置和选中区域计算装饰范围
        switch (rangeType) {
            case CONF_HIGHLIGHT_RANGE_LINE:
                lineDecoration();
                break;
            case CONF_HIGHLIGHT_RANGE_BLOCK:
                rangeDecoration();
                break;
            case CONF_HIGHLIGHT_RANGE_INDENT:
                indentDecoration();
                break;
            case CONF_HIGHLIGHT_RANGE_FIXED:
                let lineCount = vscode.workspace.getConfiguration().get(CONF_HIGHLIGHT_LINES) / 2;
                fixedDecoration(lineCount);
                break;
            case CONF_HIGHLIGHT_RANGE_NONE:
                noneDecoration();
                break;
        };
      
        // 应用装饰
        activeEditor.setDecorations(baseDecoration, range);
​
        function noneDecoration(){
            range.push(new vscode.Range(new vscode.Position(0,0),
            new vscode.Position(0,0)));
        }
​
        function rangeDecoration() {
            const TOKEN_BASE = 1;
            const TOKEN = ['{', '', '}'];
            rollDecoration((position, type) => {
                return position;
            }, (position, type) => {
                var stack = 0;
                for (var line = position.line; line > -1 && line < activeEditor.document.lineCount; line += type) {
                    let lineString = activeEditor.document.lineAt(line).text;
                    for (var char = line == position.line ? position.character : (type == ROLL_ABOVE ? lineString.length : 0);
                        char > -1 && char <= lineString.length; char += type) {
                        let charS = lineString.charAt(char);
                        if (charS == TOKEN[TOKEN_BASE - type]
                            && !(line == position.line && char == position.character)) {
                            stack++;
                        }
                        if (charS == TOKEN[TOKEN_BASE + type]) {
                            if (stack == 0) {
                                return new vscode.Position(line, type == ROLL_BELOW ? char + 1 : char);
                            } else {
                                stack--;
                            }
                        }
                    }
                }
                return new vscode.Position(type == ROLL_ABOVE ? 0 : activeEditor.document.lineCount, 0);
            });
        };
​
        function indentDecoration() {
            rollDecoration(offsetPosition, (position, type) => {
                let tabs = " ".repeat(activeEditor.options.tabSize);
                let lineString = activeEditor.document.lineAt(position.line).text.replace(/\t/g, tabs);
                let indent = lineString.search("\\S");
                let l = position.line;
                for (var i = indent; i >= indent && l > -1 && l < activeEditor.document.lineCount; l += type) {
                    i = activeEditor.document.lineAt(l).text.replace(/\t/g, tabs).search("\\S");
                }
                return new vscode.Position(l - type * 2, 0);
            });
        };
​
        function rollDecoration(p, r) {
            for (let i = 0; i < selections.length; i++) {
                if (i == 0) {
                    range.push(new vscode.Range(
                        new vscode.Position(0, 0),
                        p(r(selections[i].start, ROLL_ABOVE), 0)));
                } else {
                    firstPosition = r(selections[i - 1].end, ROLL_BELOW);
                    nextPosition = r(selections[i].start, ROLL_ABOVE);
                    if (nextPosition.isAfter(firstPosition)) {
                        range.push(new vscode.Range(
                            p(firstPosition, 1),
                            p(nextPosition, 0)
                        ));
                    }
                }
                if (i == selections.length - 1) {
                    range.push(new vscode.Range(
                        p(r(selections[i].end, ROLL_BELOW), 1),
                        new vscode.Position(activeEditor.document.lineCount, 1)
                    ));
                }
            }
        };
​
        function lineDecoration() {
            fixedDecoration(0);
        };
​
        function fixedDecoration(lineCount) {
            for (let i = 0; i < selections.length; i++) {
                if (i == 0) {
                    range.push(new vscode.Range(
                        new vscode.Position(0, 0),
                        offsetPosition(selections[i].start, -lineCount)));
                } else if (selections[i].start.line - lineCount > selections[i - 1].end.line + lineCount + 1) {
                    range.push(new vscode.Range(
                        offsetPosition(selections[i - 1].end, lineCount + 1),
                        offsetPosition(selections[i].start, -lineCount)));
                }
                if (i == selections.length - 1) {
                    range.push(new vscode.Range(
                        offsetPosition(selections[i].end, lineCount + 1),
                        new vscode.Position(activeEditor.document.lineCount, lineCount + 1)));
                }
            }
        };
    };
​
    function offsetPosition(position, offset) {
        return new vscode.Position(position.line + offset, 0);
    };
  
}
exports.activate = activate;
​
function deactivate() { }
​
module.exports = {
    activate,
    deactivate
}
```
​
## 发布 [⚓️](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

``` shell
npm install -g vsce
cd 扩展代码目录
vsce package  # 生成vsix文件，可是直接用于安装
vsce publish # <publisherID>.扩展名字 的格式发布到 VS Code 扩展商店
# 并不能直接发布，需要注册 Azure DevOps 的账号，配置 Token，创建发布用户
vsce unpublish (publisher name).(extension name)   # 撤销发布
```