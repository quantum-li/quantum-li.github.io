---
title: Git Reference
categories:
- git
description: 
permalink: "/posts/git-reference"
excerpt: Branching and Merging、Small and Fast、Distributed、Data Assurance、Staging Area、Free and Open Source、Trademark。
---

+ [About](https://git-scm.com/about)
+ [docs](https://git-scm.com/docs)
+ [pdf](https://leezw.net/assets/pdf/progit_v2.1.53.pdf)

# 起步

## 配置

Git 自带一个 `git config` 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

1. /etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量。 （由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。）
2. ~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 你可以传递 --global 选项让 Git 读写此文件，这会对你系统上所有的仓库生效。
3. 当前使用仓库的 Git 目录中的 config 文件（即 .git/config）：针对该仓库。 你可以传递 --local 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。 （当然，你需要进入某个 Git 仓库中才能让该选项生效。）

# Git基础

在使用 Git 完成各种工作时将会用到的各种基本命令。 配置并初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）或提交（commit）更改。配置 Git 来忽略指定的文件和文件模式、迅速而简单地撤销错误操作、浏览你的项目的历史版本以及不同提交（commits）之间的差异、向你的远程仓库推送（push）以及从你的远程仓库拉取（pull）文件。

## 初始化仓库

``` shell
git init
git add *.c
git commit -m 'commit meesage'
```

## 克隆现有的仓库

``` shell
git clone https://github.com/user/project project
```

## 记录每次更新到仓库

目录下的每一个文件都不外乎这两种状态：已跟踪 或 未跟踪。 已跟踪的文件是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后， 它们的状态可能是未修改，已修改或已放入暂存区。简而言之，已跟踪的文件就是 Git 已经知道的文件。

工作目录中除已跟踪文件外的其它所有文件都属于未跟踪文件，它们既不存在于上次快照的记录中，也没有被放入暂存区。 初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态，因为 Git 刚刚检出了它们， 而你尚未编辑过它们。

编辑过某些文件之后，由于自上次提交后你对它们做了修改，Git 将它们标记为已修改文件。 在工作时，你可以选择性地将这些修改过的文件放入暂存区，Git会使用SHA-1算法为每个文件计算一次校验和，然后提交所有已暂存的修改，如此反复。

![文件的变化周期](/assets/images/git-reference/文件状态变化周期.jpg)

1. 检查当前文件状态 `git status`
2. 跟踪新文件 `git add filename`
3. 忽略跟踪文件，使用 `.gitignore`
   + 所有空行或者以 # 开头的行都会被 Git 忽略
   + 可以使用标准的 glob(简化的正则表达式) 模式匹配，它会递归地应用在整个工作区中
   + 匹配模式可以以（/）开头防止递归
   + 匹配模式可以以（/）结尾指定目录
   + 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（!）取反
4. 查看工作目录与暂存区之间的差异 `git diff` ，使用`git diff --staged`查看暂存区与上次提交的差异
   + 可以使用 `git difftool` 命令来调用外部diff工具
5. 提交暂存区内容 `git commit` 。或直接提交工作区内容 `git commit -a` 
6. 删除已经跟踪的文件 `git rm` ，或删除暂存区内容 `git rm --cached` ，但保留工作目录内容
7. 使用 `git mv` 来代替修改，暂存，提交
8. 查看提交历史 `git log` ，使用`git log -p(--patch)` 查看diff差异，使用`git log --stat` 查看stat差异，使用 `git log --pretty=[oneline|short|full|fuller]` 查看不同格式，`--pretty=format:"%h - %an, %ar : %s"`自定义格式及常用选项见附录，使用`--graph`查看分支变基历史
9. 修改上一次提交信息或补充提交文件 `git commit --amend`，效果看起来只有一次完整的提交
10. 撤销暂存 `git reset HEAD <file>...`
11. 放弃工作目录变更 `git checkout -- <file>...`

## 使用远程仓库

1. 查看配置的所有远程仓库 `git remote -v`
2. 添加远程仓库 `git add <shortname> <url>
3. 抓取远程仓库 `git fetch` ，拉取远程仓库 `git pull`
4. 推送到远程仓库 `git push <shortname> <branch>
5. 查看一个远程仓库信息 `git remote show <shortname>`
6. 重命名 `git remote rename`
7. 删除 `git remote remove`

## 使用标签

1. 查看标签列表 `git tag` 或 `git tag -l(--list) "filter"` 来过滤
2. 打标签 `git tag v1.0`，但是这只是轻量标签，使用`git tag -a v1.0 -m "version 1.0"` 可以打带注释信息的标签(anootated)。相比轻量标签只是一个提交的引用来说，附注标签在Git数据库中是一个完整的对象，可以包含更多信息。
3. 查看一个标签信息 `git show v1.0`
4. 给一次提交打tag `git tag v1.0 <提交部分校验和>`
5. 默认tag不会随着push推送到远程仓库，需要显示单独的推送`git push origin <tagname>`，使用`git push origin --tags`可以一次推送所有标签
6. 删除本地标签`git tag -d v1.0`，删除远程标签有两种方式`git push origin :refs/tags/v1.0` 和 `git push origin --delete <tagname>`
7. 检出一个标签 `git checkout <tagname>`，此时处于“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问。 因此，如果你需要进行更改，比如你要修复旧版本中的错误，那么通常需要创建一个新分支：`git checkout -b <branch> <tagname>`

## 给命令设置别名

给一个常用的命令设置别名`git config [--global] alias.cm 'commit -m'`，之后就可以使用`git cm 'commit message'` 来代替 `git commit -m 'commit message'`

# Git 分支

Git的分支模型相比于其他版本控制系统非常的轻量级。

当使用 git commit 进行提交操作时，Git 会先计算每一个子目录（本例中只有项目根目录）的校验和， 然后在 Git 仓库中这些校验和保存为树对象。随后，Git 便会创建一个提交对象， 它除了包含上面提到的那些信息外，还包含指向这个树对象（项目根目录）的指针。 如此一来，Git 就可以在需要的时候重现此次保存的快照。

一次提交的提交对象、树对象和blob对象结构

![提交对象及树结构](/assets/images/git-reference/一次提交对象结构.jpg)

多次提交时提交对象的引用关系

![多次提交对象引用关系](/assets/images/git-reference/多次提交.jpg)

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。

1. 创建分支使用`git branch <branchname>`，会在当前所在的提交对象上创建一个指针
2. 切换分支 `git checkout <branchname>`，使用`git checkout -b <branchname>` 创建并切换新分支
3. 合并分支使用 `git merge <branchname>`，合并后的分支有不止一个父提交
4. 删除分支使用`git branch -d <branchname>`
5. 查看所有分支`git branch`，当前分支前会有`*`标志。如果使用`git branch -v`，可以查看每个分支最后的提交。`--merged`和`--no-merged`过滤查看已合并或未合并到当前分支的其他分支。

当合并分支有冲突时，Git会停下自动合并，等待人工解决冲突。人工解决完冲突文件后，使用`git add`命令把解决冲突后的文件提交，Git就知道冲突已经解决。使用`git mergetool`可以调用图形化的工具来解决冲突。

Git中有一个特殊的指针`HEAD`，它指向当前所在的本地分支，表示当前分支。

## 远程分支

远程引用是对远程仓库的引用（指针），包括分支、标签等等。可以通过 `git ls-remote <remote>` 来显式地获得远程引用的完整列表， 或者通过 `git remote show <remote>` 获得远程分支的更多信息。

远程跟踪分支以 `<remote>/<branch>`的方式命名，例如 `origin/master`。使用 `git clone -o` 可以在clone时自定义远程仓库的名字。远程仓库不会自动与本地索引进行同步，需要显示使用抓取命令`git fetch <remote>`。

可以添加多个远程仓库引用到当前项目，使用`git remote add <remote> <url>`。

推送本地索引到远程分支使用`git push <remote> <branch>`，例如`git push origin develop`。Git会自动将分支名字`develop`展开为`refs/heads/develop:refs/heads/develop`，意味着”推送本地的 `develop` 分支来更新远程仓库上的 `develop` 分支。”。可以把展开的名字简写为`git push origin develop:develop`。完全可以推送到不同的远程分支，只需要修改远程端的名字，比如`git push origin develop:master`。

每次抓取到新的远程跟踪分支，只是拉取到一个远程分支的指针到本地索引。并没有可编辑的本地分支。可以把远程跟踪分支的指针`merge`到本地其他分支，或使用`git checkout -b develop origin/develop`来使用远程跟踪分支的指针创建本地分支。

从一个远程跟踪分支检出一个本地分支会自动创建所谓的“跟踪分支”（它跟踪的分支叫做“上游分支”）。跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 `git pull`，Git 能自动地识别去哪个服务器上抓取、合并到哪个分支。

当克隆一个仓库时，它通常会自动地创建一个跟踪 `origin/master` 的 `master` 分支。设置跟踪分支`git checkout -b <branch> <remote>/<branch>` 等效于 `git checkout --track <remote>/<branch>` ，如果本地不存在且远程只有一个名字匹配的分支则等效于 `git checkout <branch>`。

如果要为即将新建的本地分支换名字，则使用`git checkout -b <new-name> <remote>/<branch>`。

设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支， 可以在任意时间使用 `-u` 或 `--set-upstream-to` 选项运行 `git branch` 来显式地设置。`git branch -u origin/develop`。

当设置好跟踪分支后，可以通过简写 `@{upstream}` 或 `@{u}` 来引用它的上游分支。 所以在 `master` 分支时并且它正在跟踪 `origin/master` 时，可以使用 `git merge @{u}` 来取代 `git merge origin/master`。

查看所有跟踪分支 `git branch -vv`。

删除远程分支使用带有 `--delete` 选项的 `git push` 命令，`git push origin --delete develop`。基本上这个命令做的只是从服务器上移除这个指针。 Git 服务器通常会保留数据一段时间直到垃圾回收运行，所以如果不小心删除掉了，通常是很容易恢复的。

## 变基(rebase)

使用`merge`时会基于两个分支生成一次新的提交，如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。

![merge分支阶段1](/assets/images/git-reference/merge分支阶段1.png)

![merge分支阶段2](/assets/images/git-reference/merge分支阶段2.png)

而使用`rebase`，会把当前分支的变更提交连接到目标分支的所有提交后面，这样做看起来历史更简洁:

``` shell
git checkout experiment
git rebase master
```

![rebase分支阶段2](/assets/images/git-reference/rebase分支阶段2.png)

之后就可以回到 `master` 分支，进行一次快进合并。

``` shell
git checkout master
git merge experiment
```
![rebase分支阶段3](/assets/images/git-reference/rebase分支阶段3.png)

如果在一个签出的分支上再签出新分支，比如从`master`签出`server`分支，又从`server`分支签出`client`分支。只想把`client`分支上的修改合并回`master`分支的话，使用`git rebase --onto master server client`。这个命令的意思是“取出 `client` 分支，找出它从 `server` 分支分歧之后的补丁， 然后把这些补丁在 `master` 分支上重放一遍，让 `client` 看起来像直接基于 `master` 修改一样”

![3分支rebase阶段1](/assets/images/git-reference/3分支rebase阶段1.png)

![3分支rebase阶段2](/assets/images/git-reference/3分支rebase阶段2.png)

只有就可以快速合并`master`分支

``` shell
git checkout master
git merge client
```

![3分支rebase阶段3](/assets/images/git-reference/3分支rebase阶段3.png)

`rebase`命令也可以不用切换分支进行，比如现在在`master`分支，之后想把`server`分支也变基到`master`上，可以使用`git rebase master server`

![3分支rebase阶段4](/assets/images/git-reference/3分支rebase阶段4.png)

然后使用`git branch -d`命令删除`server`和`client`分支

![3分支rebase阶段5](/assets/images/git-reference/3分支rebase阶段5.png)

执行`pull`命令时也可以使用`rebase`，`git pull --rebase`。

如果你基于一次`merge`的结果执行`merge`，之后远程又把`merge`回滚改用`rebase`。那么你的下次推送会把远程回滚内容再次带上去，这种情况可以改用`merge`为`rebase`，它会：

+ 检查哪些提交是我们的分支上独有的(C2，C3，C4，C6，C7)
+ 检查其中哪些提交不是合并操作的结果(C2，C3，C4)
+ 检查哪些提交在对方覆盖更新时并没有被纳入目标分支(只有 C2 和 C3，因为 C4 其实就是 C4') + 把查到的这些提交应用在 origin/master 上面

# 服务器上的Git

一个远程仓库只是一个裸仓库，没有本地工作目录，只有`.git`目录下的内容。

Git 可以使用四种不同的协议来传输资料:本地协议(Local)，HTTP 协议，SSH(Secure Shell)协议及 Git 协议。

+ **本地协议**，使用本地文件系统或共享文件系统
+ **HTTP协议**，使用HTTP协议进行数据传输和权限验证，在Git的版本历史中出现了功能简单的Dumb HTTP 协议和功能更丰富Smart HTTP 协议
+ **SSH协议**，基于SSH协议，只是不支持匿名访问
+ **Git协议**，服务器端有Git守护进程，该协议权限验证低级，要么允许所有访问，要么不允许任何访问

## 搭建Git

见pdf：[progit_v2.1.53.pdf](https://leezw.net/assets/pdf/progit_v2.1.53.pdf)

# 分布式Git

学习使用Git为一个开源项目贡献代码或管理管理很多开发者参与的项目。

传统的集中式版本控制系统(CVCS)每个开发者连接到服务端工作。而在Git中每个开发者都有自己的本地和远程仓库。

![集中式工作流](/assets/images/git-reference/集中式工作流.jpg)

Git集成管理者的工作流是开发者Fork出自己的远程仓库后提交代码，由管理者拉取开发者的远程仓库进行合并。

![集成管理者工作流](/assets/images/git-reference/集成管理者工作流.jpg)

1. 项目维护者推送到主仓库。
2. 贡献者克隆此仓库，做出修改。
3. 贡献者将数据推送到自己的公开仓库。
4. 贡献者给维护者发送邮件，请求拉取自己的更新。
5. 维护者在自己本地的仓库中，将贡献者的仓库加为远程仓库并合并修改。
6. 维护者将合并后的修改推送到主仓库。

![小型团队工作流程](/assets/images/git-reference/小型团队多人工作流程.jpg)

如果小型团队多分支上进行合作，工作流程看起来像：

![小型团队多分支工作流程](/assets/images/git-reference/小型团队多分支合作.jpg)

当维护一个超大型的项目比如Linux时，使用一个多仓库的工作流程主管与副主管工作流。副主管负责集成项目中的部分，主管负责统筹。主管维护的仓库作为参考仓库，供左右协作者拉取。

![主管与副主管](/assets/images/git-reference/主管与副主管.jpg)

1. 普通开发者在自己的主题分支上工作，并根据 master 分支进行变基。 这里是主管推送的参考仓库的 master 分支。
2. 副主管将普通开发者的主题分支合并到自己的 master 分支中。
3. 主管将所有副主管的 master 分支并入自己的 master 分支中。
4. 最后，主管将集成后的 master 分支推送到参考仓库中，以便所有其他开发者以此为基础进行变基。

## 维护一个项目

见pdf：[progit_v2.1.53.pdf](https://leezw.net/assets/pdf/progit_v2.1.53.pdf)

# GitHub

## 参与项目

1. 派生一个项目
2. 从 master 分支创建一个新分支
3. 提交一些修改来改进项目
4. 将这个分支推送到 GitHub 上
5. 创建一个拉取请求
6. 讨论，根据实际情况继续修改
7. 项目的拥有者合并或关闭你的拉取请求
8. 将更新后的 master 分支同步到你的派生中

## 更新Fork代码

1. 从upstream拉取更新
2. 合并
3. 推送到origin

GitHub支持配置一些服务，或者仓库变动时调用外部HTTP接口的钩子。同时还提供一些API来供外部使用。

# Git 工具

## 提交历史的选择、引用、过滤

+ 每个提交都可以用简短的SHA-1引用
+ 分支也有SHA-1，因此分支除了使用分支名，也能用SHA-1引用。可以使用`git rev-parse branch`命令查看分支的SHA-1
+ 使用`HEAD@{n}`可以引用HEAD的前 `n`次提交
+ 使用`master@{yesterday}`可以引用master昨天引用的提交，此点可以引申`HEAD@{2.months.ago}`
+ 使用`^`或`~`符号可以引用父提交，`HEAD^^`、`HEAD~2`、`HEAD^2`
+ `git log master..develop`表示“在develop分支，不在master分支中的提交
+ `git log origin/master..HEAD`可以查看即将要推送到远端的内容
+ `master..develop`等于`^master develop`等于`develop --not master`
+ `git log master...develop`表示”被两个引用之一包含但又不被两者同时包含“，可以加上`--left-right`显示来自于哪个分支

## 交互式暂存

`git add -i[--interactive]` 命令可以选择一个文件部分提交。进入交互式页面后可以选择的操作有：暂存文件、取消暂存文件、暂存文件的一部分、添加未被追踪的文件、显示暂存内容的区别。

`git add -p[--patch]`可以交互式主页面，直接开始暂存部分文件交互。同样的还有`git reset --patch`、`git checkout --patch`、`git stash save --patch`。

## 贮藏与清理

`git stash`命令将当前工作目录中的改动保存起来以备以后使用。是可以跨分支还原的。支持`--patch`交互。

+ `git stash [push]` 进行保存，`--include-untracked`包含未被跟踪文件
+ `git stash list` 列出保存历史
+ `git stash apply` 还原内容
+ `git stash drop` 删除某次保存历史
+ `git stash branch <new branchname>`从保存内容新建分支

`git clean`用于清理工作目录中所有未跟踪的文件，谨慎使用不可恢复。

+ `git clean --dry-run[-n]` 打印要清理的信息而不实际操作
+ `-f` 用于确认操作，`-d`移除空目录，`-x`用于移除被`.gitignore`排除跟踪的文件，`-i`进入交互界面

## 签署工作

用于验证提交是不是真正来自于可信来源。可以签署tag或一次提交。

## 搜索

`git grep`命令用于提交历史、工作目录、甚至索引中查找一个字符串或者正则表达式。

+ `-n` 输出行号
+ `-c` 输出概述信息和每个文件匹配数量
+ `-p[--show-function]`显示匹配项所在的方法或函数

+ `git log -S`查找包含的提交。`-G`使用正则表达式。
+ `git log -L 内容:文件`可以查看一行或者一个函数的历史。

## 重写历史

千万不要修改已经push到远程的提交历史！

`git commit --amend`修改最后一次提交信息，如果暂存了新的修改内容，将会用修改后的提交来替换上一次的提交。加上`--no-edit`不修改提交信息，只修改提交内容。

`git rebase -i <想要修改提交的父提交,e.g:HEAD~3>`，将得到一个类似于下面内容的文本编辑器的提交列表（注意这里排序是从旧提交到新提交）：
```
pick f7f3f6d 三次之前提交
pick 310154e 上上次提交
pick a5f4a0d 上一次提交
```
修改列表内容选择需要的操作修改或拆分提交(edit)、重新排序、移除提交(直接删除或者drop)、压缩提交(squash)等。例如修改三次之前的提交`f7f3f6d`:
```
edit f7f3f6d 三次之前提交
pick 310154e 上上次提交
pick a5f4a0d 上一次提交
```
之后根据你要修改的提交次数，循环使用：
``` shell
git commit --amend
git rebase --continue
```

历史改写脚本：`filter-branch`或`git-filter-repo`

## 重置

重置有两个命令，`reset`和`checkout`。区别在于`reset`重置`HEAD`指向的分支的内容，这意味着如果 HEAD 设置为`master` 分支(例如，你正在 `master` 分支上)， 运行 `git reset 9e5e6a4`将会使`master`指向`9e5e6a4`。而`checkout`重置`HEAD`的指向，同时`checkout`更安全，它会在工作目录试图执行合并操作，而`reset --hard`只做替换。他们都支持`--patch`交互。

他们之间的区别如图：

![reset和checkout区别](/assets/images/git-reference/reset-checkout-diff.png)

假设当前仓库的状态如图：

![当前仓库状态01](/assets/images/git-reference/当前仓库状态01.png)

执行带`--soft`的`reset`后：

![使用soft](/assets/images/git-reference/soft-reset.png)

执行带`--mixed`的`reset`后（`--mixed`是`reset`的默认行为）：

![使用mixed](/assets/images/git-reference/mixed-reset.png)

执行带`--hard`的`reset`会强制覆盖了工作目录中的文件。Git 数据库中的一个提交内还留有该文件的 v3 版本，可以通过 `reflog` 来找回它。但是若该文件还未提交，Git 仍会覆盖它从而导致无法恢复：

![使用hard](/assets/images/git-reference/hard-reset.png)

还可以指定`reset`的作用路径，指定了路径后不会更新`HEAD`指针，而是会从`HEAD`拉取数据更新暂存区或工作目录的指定文件。也可以同时指定一次提交，这样会从指定的提交拉取数据更新暂存区：

![指定文件](/assets/images/git-reference/reset-file-指定提交.png)

使用`reset`命令可以实现提交的压缩或`--amend`命令，假设当前仓库状态如图：

![使用reset压缩提交](/assets/images/git-reference/reset压缩前.png)

执行`git reset --soft HEAD~2`后：

![执行reset](/assets/images/git-reference/reset-执行.png)

再次执行`commit`：

![reset压缩后](/assets/images/git-reference/reset压缩后.png)

## 高级合并

在做一次可能有冲突的合并前尽可能保证工作目录是干净的。如果你有正在做的工作，要么提交到一个临时分支要么储藏它。

使用`git merge --abort`可以中断一次合并。

处理空白变更，`git merge`的时候关于空格的处理参数一共有5个，使用时`git merge -Xignore-space-change 合并过来的分支`，变更结果将直接以发生了实质性更改的分支为准，而不进行合并：

1. 无配置：这时候任何空格都不会被忽略，包括尾部的空格数量不同，都会导致冲突的产生
2. ignore-space-at-eol：忽略尾部空格的改变
3. ignore-space-change：当两边在同一位置都有空格，只是空格数量不一样会被忽略；当非末尾位置一边有空白另一边没有，认为发生冲突
4. ignore-all-space：忽略任何空格，这意味着"a b c"和"abc"将等效
5. ignore-cr-at-eol：忽略结尾的回车换行符

手动合并文件：

```shell
git show :1:hello.rb > hello.common.rb
git show :2:hello.rb > hello.ours.rb
git show :3:hello.rb > hello.theirs.rb
*** do something with files ***
git merge-file -p hello.ours.rb hello.common.rb hello.theirs.rb > hello.rb
```

当合并进行中并出现冲突时，使用`git checkout` 可以带参数比如：

+ --conflict=diff3：显示检出冲突样式为ours、base、theirs
+ --conflict=merge：默认
+ --ours：留下我们的修改
+ --theirs：留下外部的修改

查看冲突发生的历史日志：

+ `git log --oneline --left-right HEAD...MERGE_HEAD`
+ `git log --oneline --left-right --merge` 只显示带有冲突文件的提交
+ `git log --oneline --left-right -p` 得到所有冲突文件的区别

如果误合并一个分支之后，想要还原合并操作：
+ 如果还没有推送到远程，可以使用 `git reset --hard HEAD~`
+ 否则使用`git revert`命令。注意此命令如果想要再次执行合并会出现`Already up-to-date.`，这种情况需要对revert进行revert来重新合并

如果合并解决冲突的方式只是简单的保留一边代码，可以使用` git merge -Xours[-Xtheirs] <branch>`。其底层命令是`git merge-file --ours[--theirs]`。

如果根本不想发生代码上的合并，只是记录一次合并动作，可以使用`git merge -s ours <branch>`。这样只是把当前代码当成合并结果进行提交。这在bugfix分支同时合并进入master和release后，release又合并会master的情况下会避免冲突。

当一个项目的子目录映射到另一个项目时，可以使用子树合并功能，其类似于子模块。

```shell
git remote add rack_remote https://****/rack
git fetch rack_remote
git checkout -b rack_branch rack_remote/master
git checkout master
git read-tree --prefix=rack/ -u rack_branch
```

更新子目录代码可以使用：

```shell
git checkout rack_branch
git pull
git checkout master
git merge --squash -s recursive -Xsubtree=rack rack_branch
```

子目录的差异查看不是使用diff命令，需要使用
```shell
git diff-tree -p rack_branch 和目标分支比较
git diff-tree -p rack_remote/master 和最近一次抓取的其他分支比较
```

## Rerere

自动记录一次解决冲突的结果，当下次遇到相同的冲突时会被按照记录的方式自动解决。使用`git config --global rerere.enabled true` 开启。

## 找到bug是在哪次提交被引入的

`git blame`查看每一行的提交信息。

在提交历史中进行二分查找bug何时被引入：

```shell
git bisect start //启动
git bisect bad  //标记当前所在提交是有问题的
git bisect good v1.0  //告诉git已知的最后一次正常状态的提交
```

之后循环测试当前代码，并告诉git是`git bisect good`还是`git bisect bad`。当git能确定问题是在哪次提交被引入时，会显示引入错误的那次提交的一些说明。当知道错误是被哪次提交引入后，使用`git bisect reset`来恢复到开始状态。

如果提交历史过多，也可以使用使用检测脚本来让git自己测试出问题是在哪次提交被引入：

```shell
git bisect start HEAD v1.0  //git bisect start <出现问题的提交> <最后一次已知的正常的提交>
git bisect run test-error.sh
```

## 子模块

+ 添加子模块` git submodule add https://github.com/<>/<>`，同时会生成`.gitmodules`子模块配置文件
+ `git diff --submodule`查看子模块的详细diff信息
+ `clone`主项目时默认不拉取子模块，需要使用`git submodule init`先初始化本地配置文件，再使用`git submodule update`拉取子模块数据(此命令不会创建可用的本地分支，子模块会处于游离态的HEAD)，或使用`git submodule update --init [ --recursive(更新嵌套子模块)]`简化操作。甚至可以使用`git clone --recurse-submodules <url>`来一步到位。
+ 更新子模块进入子模块目录使用`git fetch`或`git merge`等命令
+ 或者不进入子模块执行`git submodule update --remote [module(可选，默认所有子模块)]`，这会默认更新检出`master`分支，如果需要指定子模块的其他分支，使用`git config [-f(修改并更新到文件)] .gitmodules submodule.<project>.branch <branch>`配置`.gitmodules`文件
+ 配置`git config --global diff.submodule log`可以省去每次diff都传递`--submodule`
+ 配置`git config status.submodulesummary 1`使`git status`显示子模块更详细的更改信息
+ 在pull主项目后，需要使用`git submodule update`，可以使用`git pull --recurse-submodules`简化操作，如果需要这个是默认行为，可以将配置选项 `submodule.recurse` 设置为 `true`，会让 Git 为所有支持 `--recurse-submodules` 的命令使用该选项（除 `clone`以外）
+ 当子模块的远端URL发生变化时(通常因为改变托管平台)， `git pull --recurse-submodules` 或`git submodule update` 会失败，需要执行：

```shell
# 将新的 URL 复制到本地配置中
git submodule sync --recursive
# 从新 URL 更新子模块
git submodule update --init --recursive
```

当我们运行 `git submodule update` 从子模块仓库中抓取修改时，Git将会获得这些改动并更新子目录中的文件，但是会将子仓库留在一个称作“游离的 HEAD”的状态。 这意味着没有本地工作分支（例如“master” ）跟踪改动，所有本地变更都会丢失。如果想要像普通Git项目那样使用，进入每个子模块并检出其相应的工作分支。接着，若你做了更改就需要告诉 Git 它该做什么，然后运行 `git submodule update --remote --merge[--rebase]` 来从上游拉取新工作。 

+ 在主项目上`git push --recurse-submodules=check`会检查，如果有没有推送的子模块会推送主项目失败，可以通过设置`git config push.recurseSubmodules check`使他变成`push`的默认行为
+ 在主项目上`git push --recurse-submodules=on-demand`会在推送主项目时尝试推送子模块，如果子模块有冲突会推送失败，可以通过设置`git config push.recurseSubmodules on-demand`使他变成`push`的默认行为
+ 合并子模块改动
  1. 在主项目`git pull`
  2. 进入子模块，解决冲突
  3. 返回主项目，执行`git add <submodule>`
  4. `git commit -am 'message'`
+ `git submodule foreach 'git stash`，foreach命令可以对所有子模块执行指定的命令

当不是所有的分支都有子模块时，在不同的分支切换，Git 2.13之前的版本无法正常处理子模块及其文件目录，需要每次手动处理。比如从有子模块的分支切换到没有子模块的分支时会有一个没有被跟踪的子模块目录。从没有子模块的分支切换的有子模块的分支时，子模块需要重新初始化并拉取。在Git 2.13及其之后版本中，可以给checkout命令传递` --recurse-submodules`来解决此问题`git checkout --recurse-submodules <with_submodule_branch>`。当然，可以设置`git config submodule.recurse true`来让这个行为成为所有支持这个命令的默认选项。

## 打包










# 附录

## git log 常用选项

| 选项 | 说明 |
| --- | --- |
| -p | 按补丁格式显示每个提交引入的差异。 |
| --stat | 显示每次提交的文件修改统计信息。 |
| --shortstat | 只显示 --stat 中最后的行数修改添加移除统计。 |
| --name-only | 仅在提交信息后显示已修改的文件清单。 |
| --name-status | 显示新增、修改、删除的文件清单。 |
| --abbrev-commit | 仅显示 SHA-1 校验和所有 40 个字符中的前几个字符。 |
| --relative-date | 使用较短的相对时间而不是完整格式显示日期（比如“2 weeks ago”）。 |
| --graph | 在日志旁以 ASCII 图形显示分支与合并历史。 |
| --pretty | 使用其他格式显示历史提交信息。可用的选项包括 oneline、short、full、fuller 和format（用来定义自己的格式）。 |
| --oneline | --pretty=oneline --abbrev-commit 合用的简写。 |
| -<n> | 仅显示最近的 n 条提交。 |
| --since, --after | 仅显示指定时间之后的提交。 |
| --until, --before | 仅显示指定时间之前的提交。 |
| --author | 仅显示作者匹配指定字符串的提交。 |
| --committer | 仅显示提交者匹配指定字符串的提交。 |
| --grep | 仅显示提交说明中包含指定字符串的提交。 |
| -S | 仅显示添加或删除内容匹配指定字符串的提交。 |

## git log --pretty=format:格式

| 选项 | 说明 |
| --- | --- |
|%H | 提交的完整哈希值 |
| %h | 提交的简写哈希值 |
| %T | 树的完整哈希值 |
| %t | 树的简写哈希值 |
| %P | 父提交的完整哈希值 |
| %p | 父提交的简写哈希值 |
| %an | 作者名字 |
| %ae | 作者的电子邮件地址 |
| %ad | 作者修订日期（可以用 --date=选项 来定制格式） |
| %ar | 作者修订日期，按多久以前的方式显示 |
| %cn | 提交者的名字 |
| %ce | 提交者的电子邮件地址 |
| %cd | 提交日期 |
| %cr | 提交日期（距今多长时间） |
| %s | 提交说明 |