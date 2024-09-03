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
+ [pdf](https://li-qr.github.io/assets/pdf/progit_v2.1.53.pdf)

## 起步

### 配置

Git 自带一个 `git config` 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

1. /etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量。 （由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它。）
2. ~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 你可以传递 --global 选项让 Git 读写此文件，这会对你系统上所有的仓库生效。
3. 当前使用仓库的 Git 目录中的 config 文件（即 .git/config）：针对该仓库。 你可以传递 --local 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。 （当然，你需要进入某个 Git 仓库中才能让该选项生效。）

## Git基础

在使用 Git 完成各种工作时将会用到的各种基本命令。 配置并初始化一个仓库（repository）、开始或停止跟踪（track）文件、暂存（stage）或提交（commit）更改。配置 Git 来忽略指定的文件和文件模式、迅速而简单地撤销错误操作、浏览你的项目的历史版本以及不同提交（commits）之间的差异、向你的远程仓库推送（push）以及从你的远程仓库拉取（pull）文件。

### 初始化仓库

``` shell
git init
git add *.c
git commit -m 'commit meesage'
```

### 克隆现有的仓库

``` shell
git clone https://github.com/user/project project
```

### 记录每次更新到仓库

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

### 使用远程仓库

1. 查看配置的所有远程仓库 `git remote -v`
2. 添加远程仓库 `git add <shortname> <url>
3. 抓取远程仓库 `git fetch` ，拉取远程仓库 `git pull`
4. 推送到远程仓库 `git push <shortname> <branch>
5. 查看一个远程仓库信息 `git remote show <shortname>`
6. 重命名 `git remote rename`
7. 删除 `git remote remove`

### 使用标签

1. 查看标签列表 `git tag` 或 `git tag -l(--list) "filter"` 来过滤
2. 打标签 `git tag v1.0`，但是这只是轻量标签，使用`git tag -a v1.0 -m "version 1.0"` 可以打带注释信息的标签(anootated)。相比轻量标签只是一个提交的引用来说，附注标签在Git数据库中是一个完整的对象，可以包含更多信息。
3. 查看一个标签信息 `git show v1.0`
4. 给一次提交打tag `git tag v1.0 <提交部分校验和>`
5. 默认tag不会随着push推送到远程仓库，需要显示单独的推送`git push origin <tagname>`，使用`git push origin --tags`可以一次推送所有标签
6. 删除本地标签`git tag -d v1.0`，删除远程标签有两种方式`git push origin :refs/tags/v1.0` 和 `git push origin --delete <tagname>`
7. 检出一个标签 `git checkout <tagname>`，此时处于“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问。 因此，如果你需要进行更改，比如你要修复旧版本中的错误，那么通常需要创建一个新分支：`git checkout -b <branch> <tagname>`

### 给命令设置别名

给一个常用的命令设置别名`git config [--global] alias.cm 'commit -m'`，之后就可以使用`git cm 'commit message'` 来代替 `git commit -m 'commit message'`

## Git 分支

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

### 远程分支

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

### 变基(rebase)

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

## 服务器上的Git

一个远程仓库只是一个裸仓库，没有本地工作目录，只有`.git`目录下的内容。

Git 可以使用四种不同的协议来传输资料:本地协议(Local)，HTTP 协议，SSH(Secure Shell)协议及 Git 协议。

+ **本地协议**，使用本地文件系统或共享文件系统
+ **HTTP协议**，使用HTTP协议进行数据传输和权限验证，在Git的版本历史中出现了功能简单的Dumb HTTP 协议和功能更丰富Smart HTTP 协议
+ **SSH协议**，基于SSH协议，只是不支持匿名访问
+ **Git协议**，服务器端有Git守护进程，该协议权限验证低级，要么允许所有访问，要么不允许任何访问

### 搭建Git

见pdf：[progit_v2.1.53.pdf](https://li-qr.github.io/assets/pdf/progit_v2.1.53.pdf)

## 分布式Git

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

### 维护一个项目

见pdf：[progit_v2.1.53.pdf](https://li-qr.github.io/assets/pdf/progit_v2.1.53.pdf)

## GitHub

### 参与项目

1. 派生一个项目
2. 从 master 分支创建一个新分支
3. 提交一些修改来改进项目
4. 将这个分支推送到 GitHub 上
5. 创建一个拉取请求
6. 讨论，根据实际情况继续修改
7. 项目的拥有者合并或关闭你的拉取请求
8. 将更新后的 master 分支同步到你的派生中

### 更新Fork代码

1. 从upstream拉取更新
2. 合并
3. 推送到origin

GitHub支持配置一些服务，或者仓库变动时调用外部HTTP接口的钩子。同时还提供一些API来供外部使用。

## Git 工具

### 提交历史的选择、引用、过滤

+ 每个提交都可以用简短的SHA-1引用
+ 分支也有SHA-1，因此分支除了使用分支名，也能用SHA-1引用。可以使用`git rev-parse branch`命令查看分支的SHA-1
+ 使用`HEAD@{n}`可以引用HEAD的前 `n`次提交
+ 使用`master@{yesterday}`可以引用master昨天引用的提交，此点可以引申`HEAD@{2.months.ago}`
+ 使用`^`或`~`符号可以引用父提交，`HEAD^^`、`HEAD~2`、`HEAD^2`
+ `git log master..develop`表示“在develop分支，不在master分支中的提交
+ `git log origin/master..HEAD`可以查看即将要推送到远端的内容
+ `master..develop`等于`^master develop`等于`develop --not master`
+ `git log master...develop`表示”被两个引用之一包含但又不被两者同时包含“，可以加上`--left-right`显示来自于哪个分支

### 交互式暂存

`git add -i[--interactive]` 命令可以选择一个文件部分提交。进入交互式页面后可以选择的操作有：暂存文件、取消暂存文件、暂存文件的一部分、添加未被追踪的文件、显示暂存内容的区别。

`git add -p[--patch]`可以交互式主页面，直接开始暂存部分文件交互。同样的还有`git reset --patch`、`git checkout --patch`、`git stash save --patch`。

### 贮藏与清理

`git stash`命令将当前工作目录中的改动保存起来以备以后使用。是可以跨分支还原的。支持`--patch`交互。

+ `git stash [push]` 进行保存，`--include-untracked`包含未被跟踪文件
+ `git stash list` 列出保存历史
+ `git stash apply` 还原内容
+ `git stash drop` 删除某次保存历史
+ `git stash branch <new branchname>`从保存内容新建分支

`git clean`用于清理工作目录中所有未跟踪的文件，谨慎使用不可恢复。

+ `git clean --dry-run[-n]` 打印要清理的信息而不实际操作
+ `-f` 用于确认操作，`-d`移除空目录，`-x`用于移除被`.gitignore`排除跟踪的文件，`-i`进入交互界面

### 签署工作

用于验证提交是不是真正来自于可信来源。可以签署tag或一次提交。

### 搜索

`git grep`命令用于提交历史、工作目录、甚至索引中查找一个字符串或者正则表达式。

+ `-n` 输出行号
+ `-c` 输出概述信息和每个文件匹配数量
+ `-p[--show-function]`显示匹配项所在的方法或函数

+ `git log -S`查找包含的提交。`-G`使用正则表达式。
+ `git log -L 内容:文件`可以查看一行或者一个函数的历史。

### 重写历史

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

### 重置

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

### 高级合并

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

### Rerere

自动记录一次解决冲突的结果，当下次遇到相同的冲突时会被按照记录的方式自动解决。使用`git config --global rerere.enabled true` 开启。

### 找到bug是在哪次提交被引入的

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

### 子模块

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
## 将新的 URL 复制到本地配置中
git submodule sync --recursive
## 从新 URL 更新子模块
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

### 打包

+ `git bundle create <filename> HEAD master`打包master分支
+ `git clone <filename> <reponame>` 从文件clone出项目
如果你在打包时没有包含 HEAD 引用，你还需要在命令后指定一个 -b master 或者其他被引入的分支， 否则Git 不知道应该检出哪一个分支。
+ `git bundle create <filename> master ^9a466c5` 打包指定区间
+ `git bundle verify <filename-with-path>` 校验包是否可用
+ `git bundle list-heads <filename-with-path>` 查看包中包含哪些分支
+ `git fetch[pull] <filename-with-path> master:<本地分支>` 取出提交

### 替换

+ `git replace 81a708d c6e1e95`

`replace`命令可以让你在Git中指定某个对象并告诉Git：“每次遇到这个对象时，假装它是其它对象”。在你用一个不同的提交替换历史中的一个提交而不想以`git filter-branch`之类的方式重建完整的历史时，这会非常有用。

例如，你有一个大型的代码历史并想把自己的仓库分成一个短的历史和一个更大更长久的历史， 短历史供新的开发者使用，后者给喜欢数据挖掘的人使用。你可以通过用新仓库中最早的提交“替换”老仓库中最新的提交来连接历史，这种方式可以把一条历史移植到其他历史上。这意味着你不用在新历史中真正替换每一个提交。

### 凭证暂存

使用HTTP协议连接时需要用户名和密码。Git有一个凭证系统可以帮助缓存密码避免每次都输入。

+ 默认所有都不缓存
+ "cache"模式会放在内存中15分钟，不落盘  `git config --global credential.helper 'cache [--timeout <seconds>]'`
+ "store"模式会明文落盘在home目录下，永不过期  `git config --global credential.helper 'store [--file <path>]'`
+ 对于Mac，Git的osxkeychain模式会把凭证存到系统用户的钥匙串中
+ 对于Windows，可以使用“Git Credential Manager for Windows”辅助工具，和钥匙链类似。
+ 可以在配置文件中配置多个辅助工具，Git会按顺序调用

底层实现Git 凭证辅助工具系统的命令是 `git credential`。由于凭证辅助工具和Git是两个独立的应用，所以我们可以自定义自己的凭证辅助工具。

## 自定义Git

### 配置Git

+ `core.editor`：默认情况下，Git 会调用你通过环境变量 $VISUAL 或 $EDITOR 设置的文本编辑器， 如果没有设置，默认则会 调用 vi 来创建和编辑你的提交以及标签信息。 你可以使用 core.editor 选项来修改默认的编辑器
+ `commit.template`：如果把此项指定为你的系统上某个文件的路径，当你提交的时候， Git 会使用该文件的内容作为提交的默认初始化信息。
+ `core.pager`：该配置项指定 Git 运行诸如 log 和 diff 等命令所使用的分页器。 你可以把它设置成用 more 或者任何你喜欢的分页器（默认用的是 less），当然也可以设置成空字符串，关闭该选项
+ `user.signingkey`： GPG 签署密钥设置为配置项创建经签署的含附注的标签
+ `core.excludesfile`：设置全局生效的ignore文件路径
+ `help.autocorrect`：如果打错一个命令，Git只会提示看似相近的命令。如果把这个设置为1，那Git就会在打错命令的时候自动执行看似相近的命令
 
### Git 中的着色

`color.ui`默认是`auto`只有输出到终端才着色，可选`false`或`always`

`color.*`：具体到哪些命令输出需要被着色以及怎样着色，它们都能被置为 true、false 或 always。比如`color.branch`、`color.diff` 等等。上每个配置项都有子选项，它们可以被用来覆盖其父设置，以达到为输出的各个部分着色的目的。

例如，为了让 `diff` 的输出信息以蓝色前景、黑色背景和粗体显示，你可以运行

``` shell
git config --global color.diff.meta "blue black bold"
```

你能设置的颜色有：normal、black、red、green、yellow、blue、magenta、cyan 或 white。 正如以上例子设置的粗体属性，想要设置字体属性的话，可以选择包括：bold、dim、ul（下划线）、blink、reverse（交换前景色和背景色）。

### 外部的合并与比较工具

```
[merge]
  tool = extMerge
[mergetool "extMerge"]
  cmd = extMerge "$BASE" "$LOCAL" "$REMOTE" "$MERGED"
  trustExitCode = false    ## 返回值是否表示合并操作成功
[diff]
  external = extDiff
```

### 格式化与多余的空白字符

 `core.autocrlf`让Git在代码提交或检出时自动转换CRLF和LF，可配置项有`true`、`input`仅在提交时转换、`false`。

 `core.whitespace`，它的参数为一系列用英文逗号分隔控制空白符位置的开关。要想关闭某个选 项，你可以在输入设置选项时不指定它或在它前面加个 `-`。

 默认被打开的三个选项是：`blank-at-eol`行尾的空格；`blank-at-eof`文件尾部的空行；`space-before-tab`行头 tab 前面的空格。

 默认被关闭的三个选项是：`indent-with-non-tab`以空格而非 tab 开头的行；`tab-in-indent`行头表示缩进的 tab；`cr-at-eol`行尾的回车。

### 服务器端配置

+ `receive.fsckObjects`：在每次推送前都检查库的完整性
+ `receive.denyNonFastForwards`：关闭强制推送功能`push -f`
+ `receive.denyDeletes`：禁止通过推送删除分支和标签

## Git 属性

在不同目录下使用`.gitattributes`文件来针对特定的路径做一些设置。如果不想让这些属性文件与其它文件一同提交，你也可以在 .git/info/attributes 文件中进行设置。

+ 如果想把某个文本文件当做二进制文件处理，可以在`.gitattributes`文件配置` <filename> binary`
+ 如果想实现对二进制文件的diff比较，可以配置比较过滤器。例如docx文件`*.docx diff=word` 然后配置过滤器`git config diff.word.textconv <filter>`，然后创建该过滤器脚本。同样可以延伸到图片文件、pdf文件等
+ 在Git中可以使用过滤器来在提交和检出文件时处理文件。一个过滤器由检出过滤器"clean"和提交过滤器"smudge"两个子过滤器组成。首先在`.gitattributes`文件配置`<filename> filter=<filtername>`，然后设置`git config --global filter.<filetername>.clean <cleanfilter>`和`git config --global filter.<filetername>.smudge <smudgefilter>`
+ 如果在导出归档时想忽略一些文件或目录可以配置`<filepattern> export-ignore`
+ 将`git log`的格式化和关键字展开处理应用到标记了`export-subst`属性的部分文件。
+ 配置文件自定义合并策略`<filepattern> merge=<mergestrategy>`，然后配置`git config --global merge.<mergestrategy>.driver true`  什么是合并策略，为什么是true???

## 钩子

hook分为客户端的和服务器端的。 客户端钩子由诸如提交和合并这样的操作所调用，而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。位于 Git 目录下的`hooks`子目录中。 也即绝大部分项目中的`.git/hooks`。钩子有约定的命名并且不带扩展名。这个目录初始状态下会有一些示例文件。

客户端的钩子又分为提交工作流钩子、电子邮件工作流钩子和其他钩子。

提交工作流钩子：

+ `pre-commit` 钩子在键入提交信息前运行。 它用于检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 `git commit --no-verify` 来绕过这个环节。 利用该钩子，可以检查代码风格等。
+ `prepare-commit-msg` 钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 该钩子接收一些选项：存有当前提交信息的文件的路径、提交类型和修补提交的提交的 SHA-1 校验。
+ `commit-msg` 钩子接收存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。 
+ `post-commit` 钩子在整个提交过程完成后运行。 它不接收任何参数，但你可以很容易地通过运行 `git log-1 HEAD` 来获得最后一次的提交信息。 该钩子一般用于通知之类的事情。

电子邮件工作流钩子，这些钩子都是由 `git am` 命令调用的。可以通过电子邮件接收由 git format-patch 产生的补丁：

+ `applypatch-msg` 它接收单个参数：包含请求合并信息的临时文件的名字。如果脚本返回非零值，Git 将放弃该补丁。 你可以用该脚本来确保提交信息符合格式，或直接用脚本修正格式错误。
+ `pre-applypatch` 运行于应用补丁之后，产生提交之前，所以你可以用它在提交前检查快照。 你可以用这个脚本运行测试或检查工作区。 脚本以非零值退出会中断 `git am` 的运行，这样补丁就不会被提交。
+ `post-applypatch` 运行于提交产生之后，是在 `git am` 运行期间最后被调用的钩子。 可以用来发送通知。 但不能停止打补丁的过程。

其他客户端钩子：

+ `pre-rebase` 钩子运行于变基之前，以非零值退出可以中止变基的过程。 
+ `post-rewrite` 钩子被那些会替换提交记录的命令调用，比如 `git commit --amend` 和 `git rebase`（不过不包括 `git filter-branch`）。 它唯一的参数是触发重写的命令名，同时从标准输入中接受一系列重写的提交记录。 这个钩子的用途很大程度上跟`post-checkout` 和 `post-merge` 差不多
+ `git checkou`t 成功运行后，`post-checkout` 钩子会被调用。你可以根据你的项目环境用它调整你的工作目录。 其中包括放入大的二进制文件、自动生成文档或进行其他类似这样的操作。
+ 在 `git merge` 成功运行后，`post-merge` 钩子会被调用。 你可以用它恢复 Git 无法跟踪的工作区数据，比如权限数据。 这个钩子也可以用来验证某些在 Git 控制之外的文件是否存在，这样你就能在工作区改变时，把这些文件复制进来。
+ `pre-push` 钩子会在 `git push` 运行期间， 更新了远程引用但尚未传送对象时被调用。 它接受远程分支的名字和位置作为参数，同时从标准输入中读取一系列待更新的引用。 你可以在推送开始之前，用它验证对引用的更新操作（一个非零的退出码将终止推送过程）
+ Git 的一些日常操作在运行时，偶尔会调用 `git gc --auto` 进行垃圾回收。 `pre-auto-gc` 钩子会在垃圾回收开始之前被调用，可以用它来提醒你现在要回收垃圾了，或者依情形判断是否要中断回收。

服务器端钩子：

+ `pre-receive`处理来自客户端的推送操作时，最先被调用的脚本是 pre-receive。 它从标准输入获取一系列被推送的引用。如果它以非零值退出，所有的推送内容都不会被接受。 你可以用这个钩子阻止对引用进行非快进（non-fast-forward）的更新，或者对该推送所修改的所有引用和文件进行访问控制。
+ `update` 脚本和 `pre-receive` 脚本十分类似，不同之处在于它会为每一个准备更新的分支各运行一次。 假如推送者同时向多个分支推送内容，`pre-receive` 只运行一次，相比之下 `update` 则会为每一个被推送的分支各运行一次。 它不会从标准输入读取内容，而是接受三个参数：引用的名字（分支），推送前的引用指向的内容的SHA-1 值，以及用户准备推送的内容的 SHA-1 值。 如果 update 脚本以非零值退出，只有相应的那一个引用会被拒绝；其余的依然会被更新。
+ `post-receive` 钩子在整个过程完结以后运行，可以用来更新其他系统服务或者通知用户。 它接受与 `pre-receive` 相同的标准输入数据。 它的用途包括给某个邮件列表发信，通知持续集成（continous integration） 的服务器， 或者更新问题追踪系统（ticket-tracking system） —— 甚至可以通过分析提交信息来决定某个问题 （ticket）是否应该被开启，修改或者关闭。 该脚本无法终止推送进程，不过客户端在它结束运行之前将保持连接状态， 所以如果你想做其他操作需谨慎使用它，因为它将耗费你很长的一段时间。

## Git 内部原理

### 底层命令与上层命令

由于 Git 最初是一套面向版本控制系统的工具集，而不是一个完整的、用户友好的版本控制系统， 所以它还包含了一部分用于完成底层工作的子命令。 这些命令被设计成能以 UNIX 命令行的风格连接在一起，抑或藉由脚本调用，来完成工作。

.git目录的结构如下：

+ config    包含项目配置
+ description     仅供GitWeb程序使用
+ HEAD      指向当前被检出的分支
+ hooks/    客户端或服务器端的钩子脚本
+ info/     包含一个全局的exclude文件
+ objects/     所有数据内容
+ refs/     指向数据的提交对象指针
+ index     保存暂存区信息

### Git 对象

+ `git hash-object -w` 命令用于向对象系统（objects目录）存储对象
+ `git cat-file -p` 用于从对象系统取出对象数据
 
Git 根据某一时刻暂存区所表示的状态创建并记录一个树对象。

+ `git update-index --add --cacheinfo ` 创建并添加到对象到暂存区
+ `git write-tree` 将暂存区内容写入一个树对象
+ `git read-tree --prefix=<folder>` 把树对象读入暂存区
 
有了树对象、二进制对象之后，还需要使用提交对象记录谁在什么时候提交了什么内容

+ `git commit-tree` 创建一个提交对象

### 对象存储

Git 首先会以识别出的对象的类型（blob、tree、commit）作为开头来构造一个头部信息。 随后是一个空格和数据内容的字节数，最后是一个空字节(null byte)。然后计算头信息+原始数据的 SHA-1 校验和。最后把头信息+原始数据使用zlib压缩后存储到以校验和命令的文件中。

```
string store = header + content;
string fileName = sha-1(store);
string file = zlib(store);
```

### Git 引用

每个提交对象，或数对象都可以用一个 SHA-1 值来检索。但是 SHA-1 值又不方便记忆。引用可以帮助记录一次提交，或一个对象的 SHA-1 值。引用全部存储在`.git/refs`目录下。`git update-ref`命令用于查看或更新一个引用

`HEAD`文件是一个对引用的引用，也叫符号引用。它指向当前所在分支。存储的是当前分支的引用对象。`git symbolic-ref`命令用于查看或更新 HEAD 引用。

标签也是一种引用，位于`.git/refs/tags/`目录下。附注标签也会是一个对象。通常指向一个提交对象，但不像分支引用那样会移动。轻量标签如同一个引用一样指向一个提交对象。而附注标签指向一个标签对象，标签对象记录附注及提交对象。

远程引用位于`.git/refs/remotes`目录下。当其与本地分支对齐时内容与分支引用一致。但是远程引用只读不可手动修改。

### 包文件

运行 `git gc` 时会将松散的文件打包成 `.idx` 和 `.pack` 文件放在 `.git/object/pack` 目录下。 `.idx` 是包的索引，可是意思`git verify-pack` 命令查看索引内容。在`.pack`文件中最新版本会保存文件全部内容，而之前版本会以差异信息保存。

### 引用规范

使用`git remote add` 命令时会在你仓库中的 `.git/config` 文件中添加一个小节， 并在其中指定远程版本库的名称、URL 和一个用于获取操作的`引用规范(refspec)`:

```
[remote "origin"]
   url = https://github.com/XX/XX
   fetch = +refs/heads/*:refs/remotes/origin/*
```

引用规范的格式由一个可选的 `+` 号和紧随其后的 `<src>:<dst>` 组成， 其中 `<src> `是一个模式(pattern)， 代表远程版本库中的引用; `<dst>` 是本地跟踪的远程引用的位置。 `+` 号告诉 Git 即使在不能快进的情况下也要 (强制)更新引用。

如果想让 Git 每次只拉取远程的 `master` 分支，而不是所有分支， 可以把(引用规范的)`fetch` 那一行修改为只引用该分支`fetch = +refs/heads/master:refs/remotes/origin/master`。

我们不能在模式中使用部分通配符，所以像下面这样的引用规范是不合法的`fetch = +refs/heads/qa*:refs/remotes/origin/qa*`。但我们可以使用命名空间(或目录)来达到类似目的。如过QA想把 `master` 分支推送到远程服务器的 `qa/master` 分支上，可以修改引用规范`push = refs/heads/master:refs/heads/qa/master`。

删除引用可以使用:

+ `git push origin :topic`
+ Git v1.7.0 以后可以使用新语法 `git push origin --delete topic`

### 传输协议

dumb 协议是一个基于 HTTP 的只读协议。通过 GET 请求遍历工作目录。

smart 协议基于部署在客户端（send-pack）和服务端（receive-pack），用来上传和下载数据的两组进程。可以是 ssh 协议，也可以是 HTTP 协议。

### 维护与数据恢复

#### 压缩

`git gc` 会收集所有松散对象并将它们放置到包文件中，将多个包文件合并为一个大的包文件，移除与任何提交都不相关的陈旧对象。这个命令通常并不会产生效果。 需要松散对象或包文件达到一定数量才能让 Git 启动一次真正的 `gc` 命令。 你可以通过修改 `gc.auto` 与 `gc.autopacklimit` 的设置来改动这些数值。

也会打包引用到一个单独的文件，会把引用目录 `.git/refs` 下的所有目录和文件打包到 `.git/packed-refs` 文件中。为了获得指定引用的正确 SHA-1 值，Git 会首先在 `refs` 目录中查找指定的引用，然后再到 `packed-refs` 文件中查找。

#### 数据恢复

通常这是因为你强制删除了正在工作的分支，但是最后却发现你还需要这个分支， 亦或者硬重置了一个分支，放弃了你想要的提交。主要方式是通过 `git reflog` 命令或 `git log -g` 命令找到丢失的提交 SHA-1 值，然后在其上通过`git branch <branchname> <SHA-1>`重建分支。

如果连日志都已经被清空，可以通过 `git fsck --full` 命令来找到处于悬空状态的对象，然后识别出丢失的提交对象，在其上重建分支。

#### 移除文件

在所有的提交记录中移除一个大文件。使用`git filter-branch`

## 环境变量

### 全局行为

+ `GIT_EXEC_PATH` 决定Git到哪找它的子程序(像git-commit,git-diff等等)。你可以用 `git --exec -path` 来查看当前设置。
+ `PREFIX` 也类似，除了用于系统级别的配置。 Git 在 `$PREFIX/etc/gitconfig` 查找系统级别配置。
+ `GIT_CONFIG_NOSYSTEM` 禁用系统级别的配置文件。 这在系统配置影响了你的命令，而你又无权限修改的时候很有用。
+ `GIT_PAGER` 控制在命令行上显示多页输出的程序。 如果这个没有设置，就会用 `PAGER` 。
+ `GIT_EDITOR` 当用户需要编辑一些文本(比如提交信息)时， Git 会启动这个编辑器。 如果没设置，就会用 `EDITOR` 。

### 版本库位置

+ `GIT_DIR` 是 `.git` 目录的位置。 如果这个没有设置， Git 会按照目录树逐层向上查找 `.git` 目录，直到到达 `~` 或 `/`。
+ `GIT_CEILING_DIRECTORIES` 控制查找 `.git` 目录的行为。 如果你访问加载很慢的目录(如那些磁带机上的或通过网络连接访问的)，你可能会想让 Git 早点停止尝试，尤其是 shell 构建时调用了 Git 。
+ `GIT_WORK_TREE` 是非空版本库的工作目录的根路径。 如果指定了 `--git-dir` 或 `GIT_DIR` 但未指定 `--work -tree`、`GIT_WORK_TREE` 或 `core.worktree`，那么当前工作目录就会视作工作树的顶级目录。 
+ `GIT_INDEX_FILE` 是索引文件的路径(只有非空版本库有)。
+ `GIT_OBJECT_DIRECTORY` 用来指定 `.git/objects` 目录的位置。
+ `GIT_ALTERNATE_OBJECT_DIRECTORIES` 一个冒号分割的列表(格式类似 /dir/one:/dir/two:...)用来告 诉 Git 到哪里去找不在 `GIT_OBJECT_DIRECTORY` 目录中的对象。 如果你有很多项目有相同内容的大文件，这个可以用来避免存储过多备份。

### 路径规则

指你在 Git 中如何指定路径，包括通配符的使用。 它们会在 `.gitignore` 文件中用到， 命令行里也会用到(`git add *.c`)。

+ `GIT_GLOB_PATHSPECS` 和 `GIT_NOGLOB_PATHSPECS` 控制通配符在路径规则中的默认行为。 如果 `GIT_GLOB_PATHSPECS` 设置为 1, 通配符表现为通配符(这是默认设置); 如果 `GIT_NOGLOB_PATHSPECS` 设置为 1,通配符仅匹配字面。意思是 `*.c` 只会匹配文件名是 `*.c` 的文件，而不是以 `.c` 结尾的文件。 你可以在各个路径规范中用 :(glob) 或 :(literal) 开头来覆盖这个配置，如 :(glob)*.c 。 
+ `GIT_LITERAL_PATHSPECS` 禁用上面的两种行为;通配符将不能用，前缀覆盖也不能用。 
+ `GIT_ICASE_PATHSPECS` 让所有的路径规范忽略大小写。

### 提交

Git 提交对象的创建通常最后是由 `git-commit-tree` 来完成， `git-commit-tree` 用这些环境变量作主要的信息源。 仅当这些值不存在才回退到预置的值。

+ `GIT_AUTHOR_NAME` 是 “author” 字段的可读名字。
+ `GIT_AUTHOR_EMAIL` 是 “author” 字段的邮件。
+ `GIT_AUTHOR_DATE` 是 “author” 字段的时间戳。
+ `GIT_COMMITTER_NAME` 是 “committer” 字段的可读名字。
+ `GIT_COMMITTER_EMAIL` 是 “committer” 字段的邮件。
+ `GIT_COMMITTER_DATE` 是 “committer” 字段的时间戳。
 
如果 `user.email` 没有配置， 就会用到 `EMAIL` 指定的邮件地址。 如果这个也没有设置， Git 继续回退使用系统用户和主机名

### 网络

Git 使用 `curl` 库通过 HTTP 来完成网络操作。

+ `GIT_CURL_VERBOSE` 告诉 Git 显示所有由那个库产生的消息。 这跟在命令行执行 `curl -v` 差不多。
+ `GIT_SSL_NO_VERIFY` 告诉 Git 不用验证 SSL 证书。 这在有些时候是需要的， 例如你用一个自己签名的证书通过 HTTPS 来提供 Git 服务， 或者你正在搭建 Git 服务器，还没有安装完全的证书。
+ 如果 Git 操作在网速低于 `GIT_HTTP_LOW_SPEED_LIMIT` 字节/秒，并且持续 `GIT_HTTP_LOW_SPEED_TIME` 秒以上的时间，Git 会终止那个操作。 这些值会覆盖 `http.lowSpeedLimit` 和 `http.lowSpeedTime` 配置的值。
+ `GIT_HTTP_USER_AGENT` 设置 Git 在通过 HTTP 通讯时用到的 `user-agent`。 默认值类似于 git/2.0.0 。

### 比较和合并

+ `GIT_DIFF_OPTS` 这个有点起错名字了。 有效值仅支持 `-u<n>` 或 `--unified=<n>`，用来控制在 `git diff` 命令中显示的内容行数。
+ `GIT_EXTERNAL_DIFF` 用来覆盖 `diff.external` 配置的值。 如果设置了这个值， 当执行 `git diff` 时，Git 会调用该程序。
+ `GIT_DIFF_PATH_COUNTER` 和 `GIT_DIFF_PATH_TOTAL` 对于 `GIT_EXTERNAL_DIFF` 或 `diff.external` 指定的程序有用。 前者表示在一系列文件中哪个是被比较的(从 1 开始)，后者表示每批文件的总数。 `GIT_MERGE_VERBOSITY` 控制递归合并策略的输出。 允许的值有下面这些:
  + 0 什么都不输出，除了可能会有一个错误信息。 
  + 1 只显示冲突。
  + 2(默认值) 还显示文件改变。
  + 3 显示因为没有改变被跳过的文件。
  + 4 显示处理的所有路径。 
  + 5 显示详细的调试信息。

### 调试

+ `GIT_TRACE` 控制常规跟踪，它并不适用于特殊情况。 它跟踪的范围包括别名的展开和其他子程序的委托。
+ `GIT_TRACE_PACK_ACCESS` 控制访问打包文件的跟踪信息。 第一个字段是被访问的打包文件，第二个是文件的偏移量
+ `GIT_TRACE_PACKET` 打开网络操作包级别的跟踪信息
+ `GIT_TRACE_PERFORMANCE` 控制性能数据的日志打印。 输出显示了每个 git 命令调用花费的时间
+ `GIT_TRACE_SETUP` 显示 Git 发现的关于版本库和交互环境的信息

### 其他

+ 如果指定了 `GIT_SSH`， Git 连接 SSH 主机时会用指定的程序代替 ssh
+ `GIT_ASKPASS` 覆盖了 `core.askpass` 配置。 这是 Git 需要向用户请求验证时用到的程序，它接受一个文本提 示作为命令行参数，并在 `stdout` 中返回应答。 (查看凭证存储访问更多相关内容)
+ `GIT_NAMESPACE` 控制有命令空间的引用的访问，与 `--namespace` 标志是相同的。 这主要在服务器端有用， 如果你想在一个版本库中存储单个版本库的多个 fork, 只要保持引用是隔离的就可以
+ `GIT_FLUSH` 强制 Git 在向标准输出增量写入时使用没有缓存的 I/O。 设置为 1 让 Git 刷新更多， 设置为 0 则使 所有的输出被缓存。 默认值(若此变量未设置)是根据活动和输出模式的不同选择合适的缓存方案
+ `GIT_REFLOG_ACTION` 让你可以指定描述性的文字写到 `reflog` 中

## 在应用中嵌入 Git

+ 命令行方式
+ Libgit2 是一个 Git 的非依赖性的工具，它致力于为其他程序使用 Git 提供更好的 API。https://libgit2.org
+ JGit 是一个用 Java 写成的功能相对健全的 Git 的实现，它在 Java 社区中被广泛使用。 JGit 项目由 Eclipse 维护。https://www.eclipse.org/jgit 
+ go-git  golang编写。https://github.com/src-d/go-git/blob/master/COMPATIBILITY.md
+ Dulwich python编写。https://www.dulwich.io/

## Git 命令

你可以输入 `git commit --a`，它的行为与 `git commit --amend` 相同。 请在编写脚本时使用完整的选项。

### 设置与配置

+ `git config`
+ `git help <command>`

### 获取与创建项目

+ `git init` 将一个目录转变成一个Git仓库
+ `git clone` = `git init` + `git remote add` + `git fetch` + `git checkout`

### 快照

+ `git add` 将内容从工作目录添加到暂存区以备下次提交
+ `git status` 显示工作区及暂存区域中不同状态的文件
+ `git diff` 当需要查看任意两棵树的差异时，可以使用 `git diff` 命令。 此命令可以查看你工作环境与你的暂存区的差异 (`git diff`默认的做法)，你暂存区域与你最后提交之间的差异(`git diff --staged`)，或者比较两个 提交记录的差异(`git diff master branchB`)
+ `git difftool` 用来简单地启动一个外部工具来为你展示两棵树 之间的差异
+ `git commit` 将所有通过git add暂存的文件内容在数据库中创建一个持久的快照，然后将当前分支上的分支指针移到其之上
+ `git reset` 用来根据你传递给动作的参数来执行撤销操作
+ `git rm` 用来从工作区，或者暂存区移除文件的命令
+ `git mv` 用于移到一个文件并且在新文件上执行 `git add` 命令及在老文件上执行 `git rm` 命令
+ `git clean` 用来从工作区中移除不想要的文件的命令

### 分支与合并

+ `git branch` 列出你所有的分支、创建新分支、删除分支及 重命名分支
+ `git checkout` 用来切换分支，或者检出内容到工作目录
+ `git merge` 用来合并一个或者多个分支到你已经检出的分支中。 然后它将当前分支指针移动到合并结果上
+ `git mergetool` 启动一个外部的合并帮助工具
+ `git log`用来展示一个项目的可达历史记录，从最近的提交快照起。默认情况下，它只显示你当前所在分 支的历史记录，但是可以显示不同的甚至多个头记录或分支以供遍历。 此命令通常也用来在提交记录级别显示 两个或多个分支之间的差异
+ `git stash` 用来临时地保存一些还没有提交的工作，以便在分支上不需要提交未完成工作就可以清理工作目录
+ `git tag`用来为代码历史记录中的某一个点指定一个永久的书签。 一般来说它用于发布相关事项

### 项目分享与更新

+ `git fetch`将远程仓库中有但是在当前仓库的没有的所有信息拉取下来然后存储在你本地数据库中
+ `git pull` 是 `git fetch` 和 `git merge` 命令的组合体，Git从你指定的远程仓库中抓取内容， 然后马上尝试将其合并进你所在的分支中 
+ `git push`将差异推送到远程仓库
+ `git remote` 远程仓库记录的管理工具，将一个长的 URL 保存成一个简写的句柄，例如 `origin`，这样你就可以不用每次都输入他们了。你可以有多个这样的句柄，`git remote` 可以用来添加， 修改，及删除它们
+ `git archive` 用来创建项目一个指定快照的归档文件
+ `git submodule`用来管理一个仓库的其他外部仓库。 它可以被用在库或者其他类型的共享资源上。 `submodule` 命令有几个子命令, 如(add、update、sync 等等)用来管理这些资源

### 检查与比较

+ `git show` 以一种简单的人类可读的方式来显示一个Git对象。你一般使用此命令来显示一个标签或一 个提交的信息
+ `git shortlog`用来归纳 `git log` 的输出的命令。 它可以接受很多与 `git log` 相同的选项，但是此命令并不会列出所有的提交，而是展示一个根据作者分组的提交记录的概括性信息
+ `git describe` 用来接受任何可以解析成一个提交的东西，然后生成一个人类可读的字符串且不可变

### 调试

+ `git bisect`通过自动进行一个二分查找来找到哪一个特定的提交是导致 bug 或者问题的第一个提交
+ `git blame` 标注任何文件的行，指出文件的每一行的最后的变更的提交及谁是那一个提交的作者
+ `git grep`帮助在源代码中，甚至是你项目的老版本中的任意文件中查找任何字符串或者正则表达式

### 补丁

+ `git cherry-pick`用来获得在单个提交中引入的变更，然后尝试将作为一个新的提交引入到你当前分支上。 从一个分支单独一个或者两个提交而不是合并整个分支的所有变更是非常有用的
+ `git rebase` 基本是是一个自动化的 cherry-pick 命令。 它计算出一系列的提交，然后再以它们在其他 地方以同样的顺序一个一个的 cherry-picks 出它们
+ `git revert` 本质上就是一个逆向的 git cherry-pick 操作。 它将你提交中的变更的以完全相反的方式 的应用到一个新创建的提交中，本质上就是撤销或者倒转

### 邮件

+ `git apply` 命令应用一个通过 `git diff` 或者甚至使用 `GNU diff` 命令创建的补丁。 它跟补丁命令做了差不多的工作
+ `git am` 命令用来应用来自邮箱的补丁。特别是那些被 mbox 格式化过的。 这对于通过邮件接受补丁并将他们轻松地应用到你的项目中很有用
+ `git format-patch` 命令用来以mbox的格式来生成一系列的补丁以便你可以发送到一个邮件列表中
+ `git imap-send` 将一个由 `git format-patch` 生成的邮箱上传至 IMAP 草稿文件夹
+ `git send-mail` 命令用来通过邮件发送那些使用`git format-patch`生成的补丁
+ `git request-pull` 命令只是简单的用来生成一个可通过邮件发送给某个人的示例信息体

### 外部系统

+ `git svn` 可以使 Git 作为一个客户端来与 Subversion 版本控制系统通信
+ 对于其他版本控制系统或者从其他任何的格式导入，你可以使用 `git fast-import` 快速地将其他格式映射到 Git 可以轻松记录的格式

### 管理

+ `git gc` 命令在你的仓库中执行 “garbage collection”，删除数据库中不需要的文件和将其他文件打包成一种更有效的格式
+ `git fsck` 命令用来检查内部数据库的问题或者不一致性
+ `git reflog` 命令分析你所有分支的头指针的日志来查找出你在重写历史上可能丢失的提交
+ `git filter-branch` 命令用来根据某些规则来重写大量的提交记录，例如从任何地方删除文件，或者通过过滤一个仓库中的一个单独的子目录以提取出一个项目

## 附录

### git log 常用选项

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

### git log --pretty=format:格式

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