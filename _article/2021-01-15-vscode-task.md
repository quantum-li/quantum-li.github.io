---
title: VS Code Task
categories:
- VS Code
- VS Code Task
description: VS Code Task 使用介绍
permalink: "/posts/vscode-task"
excerpt: 非常多的工具都有自动化的任务，比如：构建、打包、测试、部署。比如 TypeScript 编译器。
---

VS Code 提供了 Task 的新版本，不与旧版本兼容。 VS Code 中的 Task 可以用来运行脚本、执行应用程序。因此很多工具都可以用来替代在命令行中输入代码的行为。在 VS Code 中，只有Workspace 可以拥有 Task。单个文件不能配合 Task 使用。Task 的配置文件在 `.vscode` 文件夹下的 `task.json` 文件中。扩展可以通过 [Task Provider](https://code.visualstudio.com/api/extension-guides/task-provider) 来使用 Task 丰富自己的行为。

# 自动检测可用 Task

VS Code 可以从 Gulp、Grunt、NPM 或者 Maven、c# 的 `dotnet` 自动检测可用的Task。可以通过以下配置来关闭自动检测可用 Task：

``` json
{
  "typescript.tsc.autoDetect": "off",
  "grunt.autoDetect": "off",
  "jake.autoDetect": "off",
  "gulp.autoDetect": "off",
  "npm.autoDetect": "off"
}
```

# 自定义 Task

通过编辑 `task.json` 配置自定义 Task。详见 Task [语法](https://code.visualstudio.com/docs/editor/tasks-appendix)，常用的配置项有：

+ **label**：标识一个Task的标签
+ **type**：对于自定义Task来说 **type** 有 `shell` 和 `process` 两种
+ **command**：期望运行的命令
+ **windows**：windows平台上的属性，在windows上运行时将替代默认属性
+ **group**：Task 所属分组，可以用来按组执行
+ **presentation**：设置 Task 与窗口的展示行为
+ **options**：自定义配置，可以覆盖 `cwd` `env` `shell`
+ **runOptions**：配置合适怎样运行 Task

对于 shell 命令中的空格和转义等行为。需要更复杂的配置：

+ 如果只是一个命令，它就是一个命令
+ 如果命令需要引用或者转义成方法参数，则命令需要包含单双引号或转义字符
+ 如果命令行或参数出现空格，则也可以使用额外的 `args` 配置，它是一个数组
+ 如果你想自定义参数如何被引用，也可以自定义引用类型比如：
  ``` json
  "args": [
    {
      "value": "folder with spaces",
      "quoting": "escape|strong(单引号)|weak(双引号)"
    }
  ]
  ```

# 组合 Task

使用 `dependsOn` 建设依赖关系。如果设置了 `"dependsOrder": "sequence"` 则在 `dependsOn` 中的 Task 将单个有序执行。

# 用户维度的 Task

通过 `Tasks: Open User Tasks` 命令，你可以设置用户维度的命令，而不用绑定一个 Workspace。只能配置 `shell` 或 `process` 类型。

# 输出行为

你可以使用 `presentation` 控制终端面板的展示逻辑。它下级有如下配置项：

+ **reveal** ：控制面板弹出行为，可选`always/never/silent` 分别代表 "总是/从不/仅无错误时"
+ **focus** ：控制终端是否获取输入焦点，默认是 `false`
+ **echo** ：控制 Task 执行的命令是否输出到面板，默认是 `true`
+ **showReuseMessage** ：控制是否提示 "Terminal will be reused by tasks, press any key to close it"
+ **panel** ：控制 Task 间共享面板的行为，可选 `shared/dedicated/new` 分别代表 "所有 Task 混用终端/同类Task公用终端/全新终端"
+ **clear** ：控制 Task 运行前是否清空终端，默认 `false`
+ **group** ：输出分组，同一分组的输出将在同一面板的不同分区（split）下

# 执行行为

通过 `runOptions` 来配置Task执行行为：

+ **reevaluateOnRerun**：控制 "Rerun Last Task" 命令的变量解析行为，`true` 表示重新执行上次 Task 时重新计算参数变量。`false` 表示复用上此的参数变量
+ **runOn**：`default` 只能通过命令调用，`folderOpen` 当这个目录被打开时自动执行

# 定制自动检测的 Task

输入不执行 `Run Task` 命令，然后点击对应 Task 右边的齿轮图标来修改自动生成的 Task。

# 使用异常匹配器来处理 Task 输出

异常匹配器扫描 Task 输出文本中的已知警告或错误文本，并在编辑器和“Problem”面板中内联报告这些问题。有一些开箱即用的以后匹配器：

+ TypeScript：`$tsc`假定输出中的文件名是相对于打开的文件夹而言的。 
+ TypeScript Watch：在监视模式下执行时，`$tsc-watch`匹配从`tsc`编译器报告的问题。 
+ JSHint：`$jshint`假定文件名被报告为绝对路径。 
+ JSHint Stylish：`$jshint-stylish`假定文件名被报告为绝对路径。 
+ ESLint Compact：`$eslint-compact`假定输出中的文件名是相对于打开的文件夹而言的。 
+ ESLint Stylish：`$eslint-stylish`假定输出中的文件名是相对于打开的文件夹而言的。 
+ Go：`$go`匹配go编译器报告的问题。假设文件名是相对于打开的文件夹而言的。 
+ CSharp和VB编译器：`$mscompile`假定文件名被报告为绝对路径。 
+ Lessc编译器：`$lessc`假定文件名报告为绝对路径。 
+ Node Sass编译器：`$node-sass`假定文件名被报告为绝对路径。

# Task 绑定键盘快捷键

编辑 `keybindings.json` 文件 例如：

``` json
{
  "key": "ctrl+h",
  "command": "workbench.action.tasks.runTask",
  "args": "Run tests"
}
```

# 变量替换

全部[变量文档](https://code.visualstudio.com/docs/editor/variables-reference)。特别的，可以引用已有配置，或从输入获取参数。


# 操作系统相关属性

通过如下方式针对不同操作系统指定属性：

``` json
{
  "label": "Run Node",
  "type": "process",
  "windows": {
    "command": "C:\\Program Files\\nodejs\\node.exe"
  },
  "linux": {
    "command": "/usr/bin/node"
  }
}
```

也可以配置全局属性：

``` json
{
  "version": "2.0.0",
  "presentation": {
    "panel": "new"
  },
  "tasks": [
    {
      "label": "TS - Compile current file",
      "type": "shell",
      "command": "tsc ${file}",
      "problemMatcher": ["$tsc"]
    }
  ]
}
```

# 后台执行、监控文件的 Task

例如 `tsc --watch` 命令，会监控文件，并产生一些输出。通过正则表达式匹配命令输出内容来跟踪 Task 执行情况。如下是 `tsc` 的手动配置版本例子 ：

``` json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "watch",
      "command": "tsc",
      "args": ["--watch"],
      "isBackground": true,   # isBackground配置为true
      "problemMatcher": {
        "owner": "typescript",
        "background": {         # 用来配置跟踪后台执行监控文件的Task
          "activeOnStart": true,
          "beginsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - File change detected\\. Starting incremental compilation\\.\\.\\.",
          "endsPattern": "^\\s*\\d{1,2}:\\d{1,2}:\\d{1,2}(?: AM| PM)? - Compilation complete\\. Watching for file changes\\."
        }
      }
    }
  ]
}

```

# PowerShell 中的转义字符

# 配置 Task 输出内容的编码格式

如果Task需要处理磁盘文件，有时需要更改编码格式

# 定义一个异常匹配器

# 修改现有的异常匹配器