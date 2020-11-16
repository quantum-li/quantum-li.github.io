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