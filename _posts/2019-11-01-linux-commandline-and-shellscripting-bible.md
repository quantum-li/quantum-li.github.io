---
title: Linux命令行与Shell脚本编程大全
description: 《Linux命令行与Shell脚本编程大全》,shell,linux,编程,shell基础
excerpt: Linux命令行与shell脚本编程基础。包括Linux命令行，shell脚本基础，高级shell脚本编程。涵盖shell语法、常用命令、逻辑控制等。
categories:
- shell
- linux
- program
permalink: "/posts/linux-commandline-and-shellscripting-bible"
---

# 常用命令
## sort
# 理解shell
## 进程列表
命令用分号隔开，会依次执行。但并不是进程列表。

``` shell
pwd ; ps ; cd - ; ls
```

进程列表需要被括弧包围

``` shell
(pwd ; ps)
```

## 后台命令
在命令后面加 & 进入后台

``` shell
jobs 查看后台命令
coproc  协程命令
```

## 内建命令外部命令
外部命令位于/bin /usr/bin /sbin /usr/sbin
执行外部命令会创建子进程执行

``` shell
which 查找命令
type 查看命令
alias 创建别名
```

## 环境变量
```shell
unset删除环境变量
定义变量 variable=value 等号两边没有空格
数组变量 var=(one two)
${var[0]} ${var[*]}
```

## 全局变量
``` shell
env或printenv查看全局变量
export 会把变量升级为全局
```

## 局部变量
``` shell
local var=var
set显示所有环境变量
```

## 登陆的shell会依次启动文件
``` shell
/etc/profile
~/.bash_profile
~/.bash_login
~/.profile
```

## 交互式（在命令行中启动bash )
只会检查~/.bashrc
## 非交互式shell （脚本）
不会检查变量文件，但大多数都是从子shell中执行所有会继承交互式shell变量

升级系统的时候/etc/profile会被更新，所以建议在/etc/profile.d 目录下 建.sh脚本

# 文件权限

/etc/passwd文件

>用户名  
密码  
账户uid  
账户的分组uid  
账户文本描述  
home目录位置  
默认shell  

/etc/shadow文件
只有root账户能访问
>与/etc/passwd文件中的登录名字段对应的登录名  
加密后的密码  
自上次修改密码后过去的天数密码(自1970年1月1日开始计  
多少天后才能更改密码  
多少天后必须更改密码  
密码过期前提前多少天提醒用户更改密码  
过期后多久禁用账户  
用户账户被禁用的日期  
预留  

## 用户
useradd 如果不指定参数会使用默认值

默认值存在/etc/default/useradd可以使用useradd -D查看默认值
``` shell
userdel删除用户
usermod
passwd 修改密码
chsh 修改默认登陆shell
```
## 组
/etc/group文件
>组名  
密码  
gid  
用户列表  
groupadd  
groupmod  

## 文件权限
``` shell
权 限 二进制值 八进制值 描 述 
--- 000 0 没有任何权限 
--x 001 1 只有执行权限 
-w- 010 2 只有写入权限 
-wx 011 3 有写入和执行权限 
r-- 100 4 只有读取权限 
r-x 101 5 有读取和执行权限 
rw- 110 6 有读取和写入权限 
rwx 111 7 有全部权限
```
``` shell
umask 设置默认新建文件权限
```
## 文件系统
``` shell
fdisk  创建分区
mkefs 创建一个ext文件系统 
mke2fs 创建一个ext2文件系统 
mkfs.ext3 创建一个ext3文件系统 
mkfs.ext4 创建一个ext4文件系统 
mkreiserfs 创建一个ReiserFS文件系统 
jfs_mkfs 创建一个JFS文件系统 
mkfs.xfs 创建一个XFS文件系统 
mkfs.zfs 创建一个ZFS文件系统 
mkfs.btrfs 创建一个Btrfs文件系统
mount 挂载文件系统
fsck 修复文件系统
```
# 软件包管理
## 基于debian系统
``` shell
dpkg 
apt-get
aptitude
apt
```

## 基于RedHat系统

``` shell
yum
```
## 从源码安装

``` shell
tar
./configure
make 
make install  
```
# 编辑器
## vim
## nano
## emacs
# 脚本
## 命令替换
``` shell
`` 
$()  
```
## 重定向

``` shell
> 输出重定向
< 输入重定向
<< 内联输入重定向 用于命令行输入重定向
```
## 管道
``` shell
|
``` 
## 数学计算
``` shell
expr 1 + 5
$[1 + 5]
bc 命令用于浮点计算
$(echo "options; expression" | bc)
$(echo "scale=4; 3.44 / 5" | bc)
```
## 退出脚本
``` shell
exit
```
# 结构化命令

## 命令

### if-then

**if 命令只能检测条件的返回状态码**
``` shell
if command 
then
 commands 
fi
```
``` shell
if command; then
 commands 
fi
```
``` shell
if command 
then
 commands 
else
 commands 
fi
```
``` shell
if command1
then
 commands
elif command2
then
 more commands
fi 
```

**高级条件需要在if后面使用比较命令test或 [  ]**
``` shell
if test condition
then
 commands
fi 
```
```shell
if [ condition ]
then
 commands
fi 
```
#### 复合条件

``` shell
[ condition1 ] && [ condition2 ]
[ condition1 ] || [ condition2 ]
```
#### 数值比较
``` shell
n1 -eq n2 检查n1是否与n2相等 
n1 -ge n2 检查n1是否大于或等于
n1 -gt n2 检查n1是否大于n2 
n1 -le n2 检查n1是否小于或等于n2 
n1 -lt n2 检查n1是否小于n2 
n1 -ne n2 检查n1是否不等于n2
```
#### 双括号
**提供更高级的数学运算**  
**(( expression ))**

>val++ 后增  
val-- 后减  
++val 先增  
--val 先减  
! 逻辑求反  
~ 位求反  
** 幂运算  
<< 左位移  
\>\> 右位移  
& 位布尔和  
| 位布尔或  
&& 逻辑和  
|| 逻辑或

#### 双方括号
**提供更高级的字符串比较**  
**[[ expression ]]**

``` shell
str1 = str2 检查str1是否和str2相同 
str1 != str2 检查str1是否和str2不同 
str1 < str2 检查str1是否比str2小 
str1 > str2 检查str1是否比str2大 
-n str1 检查str1的长度是否非0 
-z str1 检查str1的长度是否为0
```
>大于号小于号的转义  \>   \<

双方括号 提供字符串比较高级特性，它提供了test命 令未提供的另一个特性——模式匹配（pattern matching）

``` shell
if [[ $USER == r* ]]
```
#### 文件比较
``` shell
-d file 检查file是否存在并是一个目录 
-e file 检查file是否存在 
-f file 检查file是否存在并是一个文件 
-r file 检查file是否存在并可读 
-s file 检查file是否存在并非空 
-w file 检查file是否存在并可写 
-x file 检查file是否存在并可执行 
-O file 检查file是否存在并属当前用户所有 
-G file 检查file是否存在并且默认组与当前用户相同 
file1 -nt file2 检查file1是否比file2新 
file1 -ot file2 检查file1是否比file2旧
```
#### case

``` shell
case variable in 
pattern1 | pattern2) commands1;; 
pattern3) commands2;; 
*) default commands;; 
esac
```
#### for

``` shell
for var in list 
do 
 commands 
done
```
``` shell
for (( a=1, b=10; a <= 10; a++, b-- )) 
do 
 echo "$a - $b" 
done
```
#### 更改字符串分隔符

``` shell
IFS.OLD=$IFS 
IFS=$'\n' 
<在代码中使用新的IFS值> 
IFS=$IFS.OLD
```
#### 遍历文件

``` shell
for file in /home/rich/.b* /home/rich/badtest 
do 
    if [ -d "$file" ] 
    then 
        echo "$file is a directory" 
    elif [ -f "$file" ] 
    then 
        echo "$file is a file" 
    else 
    echo "$file doesn't exist" 
    fi 
done 
# 会把文件列表自动合并
$ ./test7 
/home/rich/.backup.timestamp is a file 
/home/rich/badtest doesn't exist
```

#### while

while命令允许你在while语句行定义多个测试命令。只有最后一个测试命令的退出状态码 会被用来决定什么时候结束循环。

``` shell
while test command 
do 
 other commands 
done
```

#### until

``` shell
until test commands 
do
 other commands 
done
```

#### 控制循环

``` shell
break;  break n;//跳出n层循环
continue;  continue n;//跳过n层循环
```
#### 处理循环的输出

通过在done命令 之后添加一个处理命令来实现。

```shell
for state in "North Dakota" Connecticut Illinois Alabama Tennessee 
do 
    echo "$state is the next place to go" 
done | sort 
echo "This completes our travels"
```

# 处理用户输入

## 命令行参数

``` shell
$1 $2 ${10}
# basename命令会返回不包含路径的脚本名。
$(basename $0)
#判断是否有参数
if [ -n "$1" ]
#特殊参数
$#     #参数的个数
${!#}  #最后一个参数
$*和$@   #变量可以用来轻松访问所有的参数。
$*    #变量会将命令行上提供的所有参数当作一个单词保存。
$@     #变量会将命令行上提供的所有参数当作同一字符串中的多个独立的单词。
shift shift n   #参数前移，舍弃第一个参数
```

## 命令行选项

### 使用shift命令来处理

``` shell
echo
while [ -n "$1" ]
do
 case "$1" in
 -a) echo "Found the -a option";;
 -b) param="$2"
 echo "Found the -b option, with parameter value $param"
 shift ;;
 -c) echo "Found the -c option";;
 --) shift
 break ;;
 *) echo "$1 is not an option";;
 esac
 shift
done 
```
### 使用getopt命令

``` shell
getopt ab:cd -a -b test1 -cd test2 test3
#忽略错误参数可以使用 getopt -q
```
optstring定义了四个有效选项字母：a、b、c和d。冒号（:）被放在了字母b后面，因为b 选项需要一个参数值。当getopt命令运行时，它会检查提供的参数列表（-a -b test1 -cd test2 test3），并基于提供的optstring进行解析。注意，它会自动将-cd选项分成两个单独的选项，并插入双破折线来分隔行中的额外参数。

``` shell
set -- $(getopt -q ab:cd "$@")
```

set命令的选项之一是双破折线（--），它会将命令行参数替换成set命令的命令行值。

### 更高级的getopts命令

getopt命令不能处理 command -a "var1 var2" 的情况。
```
#getopts命令会用到两个环境变量。如果选项需要跟一个参数值，
#OPTARG环境变量就会保 存这个值。
#OPTIND环境变量保存了参数列表中getopts正在处理的参数位置。
echo
while getopts :ab:c opt    #要去掉错误消息的话，可以在optstring之前加一个 冒号。
do
 case "$opt" in
 a) echo "Found the -a option" ;;
 b) echo "Found the -b option, with value $OPTARG";;
 c) echo "Found the -c option" ;;
 *) echo "Unknown option: $opt";;
 esac
done 
```

常用的linux选项含义

```
-a 显示所有对象
-c 生成一个计数
-d 指定一个目录
-e 扩展一个对象
-f 指定读入数据的文件
-h 显示命令的帮助信息
-i 忽略文本大小写
-l 产生输出的长格式版本
-n 使用非交互模式（批处理）
-o 将所有输出重定向到的指定的输出文件
-q 以安静模式运行
-r 递归地处理目录和文件
-s 以安静模式运行
-v 生成详细输出
-x 排除某个对象
-y 对所有问题回答yes
```

## 获得用户输入

输入的每一个变量都会分配给变量列表中的变量，如果变量数量不够，剩下的数据就全部分配给最后一个变量。

``` shell
 echo -n "please input:"
 read var
 echo $var
```
如果在read命令中不指定变量，会存入环境变量REPLY中

``` shell
read -p "input :" var
echo $var
```

read的参数

```
-t 指定超时时间。
-n 接收字符数。
-s 隐藏方式读取。
```

read命令读取文件

``` shell
cat test | while read var
```

# 呈现数据

## 标准文件描述符

```
0   STDIN
1   STDOUT
2   STDERR
```

重定向错误输出
``` shell
cat "hello" 2> file
```
重定向标准输出
``` shell
cat "hello" 1> file  #1和>挨着
```
重定向错误和输出
``` shell
cat "hello" &> file
```
## 脚本中重定向输出
临时
``` shell
#这种方式会继承命令行中的重定向
echo "hello" >&2  #>和&和2挨着
```
永久
``` shell
exec 1>file
echo "hello"
```
## 脚本中重定向输入
``` shell
exec 0< file
while read var
do
 echo $var
done
```

## 创建读写文件描述符
## 关闭文件描述符

## /dev/null
```
echo "hello" >/dev/null
cat /dev/null > file # 清空文件
```

## 临时文件临时目录
```
mktemp file.XXXXXX  #.加6X是规定
mktemp -t file.XXXXXX
mktemp -d dir.XXXXXX
```
## 同时输出到STDOUT和文件
```
echo "hello" | tee file
#使用追加
echo "hello" | tee -a file
```
```
cat >> file << EOF 
aaa bbb ccc
EOF
```

# 控制脚本

## 后台任务控制
```
jobs
fg  前台模式重启任务
bg  后台模式重启任务
```
优先级
nice  nice -10 ./test4.sh    启动时设置优先级
renice renice -n 10 -p 5055 更改优先级

## 定时任务
```
at   
atrm 删除等待作业
atq 列出等待的队列
```
```
corn
#min hour dayofmonth month dayofweek command

#设置每个月最后一天执行
00 12 * * * if [`date +%d -d tomorrow` = 01 ] ; then ; command
```
**corn目录**

/etc/cron.*ly

\*  ： hourly、daily、monthly和weekly

>corn不会执行已经错过的作业，因此有个命令anacron

# 高阶
## 函数

函数需要先定义再使用
``` shell
function name {
 commands
} 

name() {
commands
}
```
## 返回值
可以获取函数最后一条命令的退出状态码
``` shell
func1 
echo 
"The exit status is: $?"
```
使用return
``` shell
return 1
```

>函数一结束就要取返回值
返回状态码不能超过256

使用函数输出  
read 命令输出了一条简短的消息来向用户询问输入值。bash shell脚本并不将其作为STDOUT 输出的一部分，并且忽略掉它。如果你用echo语句生成这条消息来向用户查询，那么它会与输 出值一起被读进shell变量中。
``` shell
function dbl {
 read -p "Enter a value: " value
 echo $[ $value * 2 ]
}
result=$(dbl)
echo "The new value is $result"
$
$ ./test5b
Enter a value: 200
The new value is 400 
```

## 函数参数

函数可以像脚本一样通过 $0  $1使用参数

## 函数变量

### 全局变量

默认声明使用就是全局变量

### 局部变量
``` shell
local temp=$[ $value + 5 ]
```
## 将数组作为出参入参

还未整理

## 创建函数库

在脚本中引用另一个脚本的函数和变量
``` shell
source a.sh
. ./a.sh
```

把函数或包含函数的脚本放在.bashrc文件中，就能在命令行使用函数

# shell中的多线程
## & wait

``` shell
for num in `seq 1 10`
do
{
    sleep 1
    echo ${num}
} &
done
wait
commands
```

## fd mkfifo

## 令牌桶

``` shell
tempfifo="my_temp_fifo"
mkfifo ${tempfifo}     #创建名字管道
# 使文件描述符为非阻塞式
exec 6<>${tempfifo}     #把fd 6指向名字管道（任意大于3 小于 ulimit -n 的fd）
rm -f ${tempfifo}     #此时可以先删除管道文件，还可以通过fd读写

# 为文件描述符创建占位信息
for ((i=1;i<=${thread_num};i++))
do
{
    echo 
}
done >&6  #向fd输入thread_num行


# 
for num in `seq 1 ${all_num}`
do
{
    read -u6   #从fd读取一行，如果暂时没有令牌会阻塞
    {
        sleep 1
        echo ${num}
        echo "" >&6   #放回令牌
    } & 
} 
done 

wait

# 关闭fd6管道
exec 6>&-
```

## xargs

``` shell
seq 1 ${all_num} | xargs -n 1 -I {} -P ${thread_num} sh -c "sleep 1;echo {}"
```

## parallel

``` shell
parallel -j 5 "sleep 1;echo {}" ::: `seq 1 10`
```

## 脚本库

GNU shtool库的下载安装使用

## 图形库

dialog

## sed

**stream editor流式编辑器**  
sed options script file

## gawk

gawk options program file

# shell中的特殊环境变量

| 变更 | 说明 |
| `$$` | Shell本身的PID（ProcessID）|
| |这个变量经常用来构造一个"unique"的临时文件名，通常比调用`mktemp`来得简单 |
| `$!` | Shell最后运行的后台Process的PID |
| `$?` | 最后运行的命令的结束代码（返回值）|
| `$-` | 使用Set命令设定的Flag一览 |
| `"$\*"` | 所有参数列表。如`"\(\*"`用`「"」`括起来的情况、以`"\)1 \(2 … \)n"`的形式输出所有参数。 |
| |所有的位置参数,被作为一个单词，注意:`"$*"`必须被`""`引用。 |
| `"$@"` | 与`$*`同义,但是每个参数都是一个独立的`""`引用字串,这就意味着参数被完整地传递,
| |并没有被解释和扩展.这也意味着,每个参数列表中的每个参数都被当成一个独立的单词。
| |注意:`"$@"`必须被`""`引用。 |
| `$#` | 添加到Shell的参数个数 |
| `$0` | Shell本身的文件名 |
| `$n` | 添加到Shell的各参数值。`n`为数字1-9,只能表示前9个参数，使用`shift`命令可以改变这个限制 |
| `$_` | 保存之前执行的命令的最后一个参数 |
| `${#*}` | 传递到脚本中的命令行参数的个数 |
| `${#@}` | 传递到脚本中的命令行参数的个数 |

## 参数替换和扩展

| 表达式 | 含义 |
| `${var}` | 变量`var`的值, 与`$var`相同 |
| `${var-DEFAULT}` | 如果`var`没有被声明, 那么就以`$DEFAULT`作为其值 * |
| `${var:-DEFAULT}` | 如果`var`没有被声明, 或者其值为空, 那么就以`$DEFAULT`作为其值 * |
| `${var=DEFAULT}` | 如果`var`没有被声明, 那么就以`$DEFAULT`作为其值 * |
| `${var:=DEFAULT}` | 如果`var`没有被声明, 或者其值为空, 那么就以`$DEFAULT`作为其值 * |
| `${var+OTHER}` | 如果`var`声明了, 那么其值就是`$OTHER`, 否则就为`null`字符串 |
| `${var:+OTHER}` | 如果`var`被设置了, 那么其值就是`$OTHER`, 否则就为`null`字符串 |
| `${var?ERR_MSG}` | 如果`var`没被声明, 那么就打印`$ERR_MSG` * |
| `${var:?ERR_MSG}` | 如果`var`没被设置, 那么就打印`$ERR_MSG` * |
| `${!varprefix*}` | 匹配之前所有以`varprefix`开头进行声明的变量 |
| `${!varprefix@}` | 匹配之前所有以`varprefix`开头进行声明的变量 |

## 字符串操作

| 表达式 | 含义 |
| `${#string}` | `$string`的长度 |
| `${string:position}` | 在`$string`中, 从位置`$position`开始提取子串 |
| `${string:position:length}` | 在`$string`中, 从位置`$position`开始提取长度为`$length`的子串 |
| `${string#substring}` | 从变量`$string`的开头, 删除最短匹配`$substring`的子串 |
| `${string##substring}` | 从变量`$string`的开头, 删除最长匹配`$substring`的子串 |
| `${string%substring}` | 从变量`$string`的结尾, 删除最短匹配`$substring`的子串 |
| `${string%%substring}` | 从变量`$string`的结尾, 删除最长匹配`$substring`的子串 |
| `${string/substring/replacement}` | 使用`$replacement`, 来代替第一个匹配的`$substring` |
| `${string//substring/replacement}` | 使用`$replacement`, 代替所有匹配的`$substring` |
| `${string/#substring/replacement}` | 如果`$string`的前缀匹配`$substring`, 那么就用`$replacement`来代替匹配到的`$substring` |
| `${string/%substring/replacement}` | 如果`$string`的后缀匹配`$substring`, 那么就用`$replacement`来代替匹配到的`$substring` |
| `expr match "$string" '$substring'` | 匹配`$string`开头的`$substring`*的长度 |
| `expr "$string" : '$substring'` | 匹配`$string`开头的`$substring`*的长度 |
| `expr index "$string" $substring` | 在`$string`中匹配到的`$substring`的第一个字符出现的位置 |
| `expr substr $string $position$length` | 在`$string`中从位置`$position`开始提取长度为`$length`的子串 |
| `expr match "$string"'\($substring\)'` | 从`$string`的开头位置提取`$substring`* |
| `expr "$string" : '\($substring\)'` | 从`$string`的开头位置提取`$substring`* |
| `expr match "$string"'.\*\($substring\)'` | 从`$string`的结尾提取`$substring`* |
| `expr "$string" :'.\*\($substring\)'` | 从`$string`的结尾提取`$substring`* |

--------------------------------------------------------------------------------
*$substring*是一个正则表达式.

## 括号

| **中括号** | |
| `if[ CONDITION ]` | 测试结构 |
| `if[[ CONDITION ]]` | 扩展的测试结构 |
| `Array[1]=element1` | 数组初始化 |
| `[a-z]` | 正则表达式的字符范围 |
| **大括号** |  |
| `${variable}` | 参数替换 |
| `${!variable}` | 间接变量引用 |
| `{command1; command2; . . . commandN; }` | 代码块 |
| `{string1,string2,string3,...`} | 大括号扩展 |
| **圆括号** |  |
| `(command1; command2 )` | 子shell中执行的命令组 |
| `Array=(element1 element2 element3)` | 数组初始化 |
| `result=$(COMMAND)` | 在子shell中执行命令, 并将结果赋值给变量 |
| `>(COMMAND`) | 进程替换 |
| `<(COMMAND)` | 进程替换 |
| **双圆括号** |  |
| `((var = 78 ))` | 整型运算 |
| `var=$(( 20 + 5 ))` | 整型运算, 并将结果赋值给变量 |
| **引号** |  |
| `"$variable"` | "弱"引用 |
| `'string'` | "强"引用 |
| `后置引用` |  |
| ``result=`COMMAND` `` | 在子shell中运行命令, 并将结果赋值给变量 |