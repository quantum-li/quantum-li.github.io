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

# sed

**stream editor流式编辑器**  
sed options script file

sed命令操作文件流程：

1. 一次从输入中读取一行数据
2. 根据提供的编辑器命令匹配数据
3. 根据命令修改流中的数据
4. 将新的数据输出到SEDOUT

可用选项：

| 选项 | 描述 |
| --- | --- |
| -e script | 在处理输入时，将script中指定的命令添加到已有的命令中 |
| -f file | 在处理输入时，将file中指定的命令添加到已有的命令中 |
| -n | 不产生命令输出，使用print命令来完成输出 |

script参数指定了应用于流数据上的单个命令。如果需要用多个命令，要么使用-e选项在 命令行中指定，要么使用-f选项在单独的文件中指定。

从管道获取输入流

``` shell
echo "This is a test" | sed 's/test/big test/'
```

在命令行使用多个编辑器命令

``` shell
sed -e 's/brown/green/; s/dog/cat/' data1.txt

sed -e '
> s/brown/green/
> s/fox/elephant/
> s/dog/cat/' data1.txt
```

从文件中读取编辑器命令

``` shell
cat script1.sed
s/brown/green/
s/fox/elephant/
s/dog/cat/

sed -f script1.sed data1.txt
```

替换命令 *s/pattern/repac* 默认只替换第一个匹配。s命令有替换标记。 *s/pattern/repac/flags* ：

+ 数字，表明替换第几处匹配
+ g，全局替换
+ p，打印替换前文本
+ w file，将替换的结果写到文件中

由于正斜线通常用作字符串分隔符，当它出现在模式文本中时选择其他字符来作为替换命令中的字符串分隔符:

``` shell
sed 's!/bin/bash!/bin/csh!' /etc/passwd
```
默认情况下，在sed编辑器中使用的命令会作用于文本数据的所有行。如果只想将命令作用于特定行或某些行，则必须用行寻址。以数字形式表示行区间或用文本模式来过滤出行。

两种形式都使用相同的格式来指定地址:

``` shell
[address]command 
```

也可以将特定地址的多个命令分组:

``` shell
address {
command1
command2
command3 
}
```

## 区间操作

指定行号

``` shell
sed '2s/dog/cat/' data1.txt
```

行地址区间

``` shell
sed '2,3s/dog/cat/' data1.txt
```

某行开始的所有行

``` shell
sed '2,$s/dog/cat/' data1.txt
```
 
使用文本模式过滤器， */pattern/command*

``` shell
> grep Samantha /etc/passwd 
Samantha:x:502:502::/home/Samantha:/bin/bash
> sed '/Samantha/s/bash/csh/' /etc/passwd
```

## 命令组合

``` shell
sed '3,${
> s/fox/elephant/
> s/dog/cat/
> }' data1.txt
```

删除行命令 *d* 

``` shell
sed '3d' data6.txt
sed '2,3d' data6.txt
sed '3,$d' data6.txt
sed '/pattern/d' data6.txt
```
也可以使用两个文本模式来删除某个区间内的行，你指定的第一个模式会“打开”行删除功能，第二个模式会“关闭”行删除功能。sed编辑器会删除两个指定行之间的所有行(包括指定的行)。注意每一次匹配都会toggle打开和关闭

``` shell
>cat data.txt
1
2
3
4
>sed '/1/,/3/d' data.txt
4
```

插入文本命令 *i* ,附加文本命令 *a*，修改行命令 *c*，字符转换命令 *y：[address]y/inchars/outchars/*

``` shell
> echo "Test Line 2" | sed 'i\Test Line 1'
Test Line 1
Test Line 2
> echo "Test Line 2" | sed 'a\Test Line 1' 
Test Line 2
Test Line 1
> sed '3i\new line' data6.txt  #将一个新行插入到数据流第三行前。
> sed '$a\new line' data6.txt  #将一个新行插入到文件尾。
```

``` shell
> sed '3c\This is a changed line of text.' data6.txt 
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.

修改行时如果指定的是区间，会整个替换区间内容而不是替换每行。

> sed '/number 3/c\This is a changed line of text.' data6.txt 
This is line number 1.
This is line number 2.
This is a changed line of text.
This is line number 4.
```

转换命令会对inchars和outchars值进行一对一的映射。如果inchars和outchars的长度不同，则sed编辑器会产生一条错误消息。而且转换命令是一个全局命令，不能指定区间。

``` shell
> cat data.txt
This is line number 1.
This is line number 2.
This is line number 3.
This is line number 4.
This is line number 1 again.
> sed 'y/123/789/' data.txt 
This is line number 7.
This is line number 8.
This is line number 9.
This is line number 4.
This is line number 7 again.
```

打印命令 p命令用来打印文本行; 等号(=)命令用来打印行号;l(小写的L)命令用来列出行。

``` shell
> echo "this is a test" | sed 'p' 
this is a test
this is a test
> sed -n '/number 3/p' data.txt 
This is line number 3.
> sed -n '2,3p' data.txt 
This is line number 2. 
This is line number 3.
```

与替换或修改命令一起使用。可以创建一个脚本在修改行之前显示该行。

``` shell
> sed -n '/3/{p; s/line/test/p;}' data6.txt
This is line number 3. 
This is test number 3.
```

打印行号

``` shell
> sed '=' data.txt
1
The quick brown fox jumps over the lazy dog. 
2
The quick brown fox jumps over the lazy dog. 
3
The quick brown fox jumps over the lazy dog.

> sed -n '/number 4/{=; p;}' data.txt
4
This is line number 4.
```

列出(list)命令(l)可以打印数据流中的文本和不可打印的ASCII字符。

``` shell
> cat data.txt
This line contains tabs. $
> sed -n 'l' data.txt 
This\tline\tcontains\ttabs.$
```

使用w命令写入文件

``` shell
> sed '1,2w test.txt' data.txt 
> sed -n '/pattern/w test.txt' data.txt
```

读取命令 *r:[address]r filename* 。filename参数指定了数据文件的绝对路径或相对路径。你在读取命令中使用地址区间，只
能指定单独一个行号或文本模式地址。sed编辑器会将文件中的文本插入到指定地址后。

``` shell
> cat data1.txt
data1 line.
> sed '3r data1.txt' data2.txt 
data2 line1.
data2 line2.
data2 line3.
data1 line.
> sed '/line2/r data1.txt' data2.txt
> sed '$r data1.txt' data2.txt
```

和删除命令配合使用会产生替换效果。

``` shell
> sed '/line2/{r data1.txt; d;}' data2.txt
```

## 操作多行

使用sed对跨多行的数据执行特定操作。如果你想匹配的文本跨了多行，每行各包含其中一部分语句，需要使用多行文本命令。

+ N：将数据流中的下一行加进来创建一个多行组（multiline group）来处理。
+ D：删除多行组中的一行。
+ P：打印多行组中的一行。

单行的next命令 *n* ，会告诉sed编辑器移动到数据流中的下一文本行。

``` shell
> cat data1.txt
This is the header line.

This is a data line.

This is the last line.
> sed '/header/{n ; d}' data1.txt
This is the header line.
This is a data line.

This is the last line.
```

多行版本的next命令 *N* 会将下一行文本添加到模式空间中已有的文本后，注意会包含换行符。这样的作用是将数据流中的两个文本行合并到同一个模式空间中。

但是 *N* 命令只会执行到倒数第二行然后和最后一行合并操作，不会再继续操作第一行。如果最后一行有需要匹配的文本就需要注意命令的顺序：

``` shell
> sed '{s/System Administrator/Desktop User/; N; s/System\nAdministrator/Desktop\nUser/}' data.txt
On Tuesday, the Linux Desktop
User's group meeting will be held.
All Desktop Users should attend.
```

当 *N* 和 *d* 一起使用时，会删除模式空间中的两行。当 *N* 和 *D* 一起使用时，会删除模式空间中的第一行。

``` shell
> cat data.txt

This is the header line.
This is a data line.

This is the last line.
> sed '/^$/{N ; /header/D}' data.txt
This is the header line.
This is a data line.

This is the last line.
```

当 *N* 和 *p* 一起使用时，会打印模式空间中的两行。当 *N* 和 *P* 一起使用时，会打印模式空间中的第一行。

## 模式空间和保持空间

模式空间（pattern space）是一块活跃的缓冲区，在sed编辑器执行命令时它会保存待检查的文本。但它并不是sed编辑器保存文本的唯一空间。sed编辑器有另一块称作保持空间（hold space）的缓冲区域。在处理模式空间中的某些行时，可以用保持空间来临时保存一些行。保持空间的命令：

+ h，将模式空间复制到保持空间
+ H，将模式空间附加到保持空间
+ g，将保持空间复制到模式空间
+ G，将保持空间附加到模式空间
+ x，交换模式空间和保持空间的内容

可以使用 *!* 命令用来排除地址或地址区间。

``` shell
> sed -n '/header/!p' data2.txt
This is the first data line.
This is the second data line.
This is the last line.
```

普通p命令只打印data2文件中包含单词header的那行。加了感叹号之后，情况就相反了：除了包含单词header那一行外，文件中其他所有的行都被打印出来了。

## 分支流程

通常，sed编辑器会从脚本的顶部开始，一直执行到脚本的结尾。sed编辑器提供了一个方法来改变命令脚本的执行流程，其结果与结构化编程类似。

分支（branch）命令b的格式如下： *[address]b [label]* ,address参数决定了哪些行的数据会触发分支命令。label参数定义了要跳转到的位置。如果没有加label参数，跳转命令会跳转到 *脚本的结尾* 。

``` shell
> cat data.txt
This is the header line.
This is the first data line.
This is the second data line.
This is the last line.
> sed '{2,3b ; s/This is/Is this/ ; s/line./test?/}' data.txt
Is this the header test?
This is the first data line.
This is the second data line.
Is this the last test?
```

要指定标签，将它加到b命令后即可。使用标签允许你跳过地址匹配处的命令，但仍然执行脚本中的其他命令。

``` shell
> sed '{/first/b jump1 ; s/This is the/No jump on/
> :jump1
> s/This is the/Jump here on/}' data.txt
No jump on header line
Jump here on first data line
No jump on second data line
No jump on last line
```

也可以跳转到脚本中靠前面的标签上，这样就达到了循环的效果。

``` shell
> echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> b start
> }'
This is, a, test, to, remove, commas.
This is a, test, to, remove, commas.
This is a test, to, remove, commas.
This is a test to, remove, commas.
This is a test to remove, commas.
This is a test to remove commas.
```

但是这个脚本永远不会结束，因此需要为分支命令指定一个地址模式来查找

``` shell
> echo "This, is, a, test, to, remove, commas." | sed -n '{
> :start
> s/,//1p
> /,/b start
> }'
```

测试（test）命令（t）也可以用来改变sed编辑器脚本的执行流程。测试命令会根据替换命令的结果跳转到某个标签，而不是根据地址进行跳转。如果替换命令成功匹配并替换了一个模式，测试命令就会跳转到指定的标签。如果替换命令未能匹配指定的模式，测试命令就不会跳转。

``` shell
> sed '{
> s/first/matched/
> t
> s/This is the/No match on/
> }' data2.txt
No match on header line
This is the matched data line
No match on second data line
No match on last line
```
第一个替换命令会查找模式文本first。如果匹配了行中的模式，它就会替换文本，而且测试命令会跳过后面的替换命令。如果第一个替换命令未能匹配模式，第二个替换命令就会被执行。

## 匹配模式

*&* 符号可以用来代表替换命令中的匹配的模式。不管模式匹配的是什么样的文本，你都可以在替代模式中使用&符号来使用这段文本。

``` shell
> echo "The cat sleeps in his hat." | sed 's/.at/"&"/g'
The "cat" sleeps in his "hat".
```

&符号会提取匹配替换命令中指定模式的整个字符串。sed编辑器用圆括号来定义替换模式中的子模式。你可以在替代模式中使用特殊字符来引用每个子模式。替代字符由反斜线和数字组成。数字表明子模式的位置。sed编辑器会给第一个子模式分配字符\1，给第二个子模式分配字符\2，依此类推。当在替换命令中使用圆括号时，必须用转义字符将它们标示为分组字符而不是普通的圆括号。这跟转义其他特殊字符正好相反。

``` shell
> echo "The System Administrator manual" | sed '
> s/\(System\) Administrator/\1 User/'
The System User manual

> echo "That furry cat is pretty" | sed 's/furry \(.at\)/\1/'
That cat is pretty
>

> echo "1234567" | sed '{
> :start
> s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/p
> t start
> }'
1234,567    # 注意！之所以这里从后往前匹配是因为使用了 .* ,它是贪婪模式，会尽量匹配更多的字符！
1,234,567
1,234,567
```

# gawk

gawk options program file

+ 定义变量来保存数据
+ 使用算术和字符串操作符来处理数据
+ 使用结构化编程概念（比如if-then语句和循环）来为数据处理增加处理逻辑
+ 通过提取数据文件中的数据元素，将其重新排列或格式化，生成格式化报告

可用选项

| 选项 | 描述 |
| --- | --- |
| -F fs | 指定行中划分数据字段的字段分隔符 |
| -f file | 从指定的文件中读取程序 |
| -v var=value | 定义gawk程序中的一个变量及其默认值 |
| -mf N | 指定要处理的数据文件中的最大字段数 |
| -mr N | 指定数据文件中的最大数据行数 |
| -W keyword | 指定gawk的兼容模式或警告等级 |

从命令行读取程序脚本

``` shell
gawk '(print "Hello World!"}'
```

使用数据字段变量，它会自动给一行中的每个数据元素分配一个变量。在文本行中，每个数据字段都是通过字段分隔符划分的。默认的字段分隔符是任意的空白字符。

+ $0代表整个文本行
+ $1代表文本行中的第1个数据字段
+ $n代表文本行中的第n个数据字段

如果你要读取采用了其他字段分隔符的文件，可以用-F选项指定。

``` shell
gawk -F: '{print $1}' /etc/passwd
```

在程序脚本中使用多个命令，只要在命令之间放个分号即可。

``` shell
echo "My name is Rich" | gawk '{$4="Christine"; print $0}'
My name is Christine
```

从文件中读取程序

``` shell
$ cat script3.gawk
{
text = "'s home directory is "
print $1 text $6
}
$ gawk -F: -f script3.gawk /etc/passwd
```

在处理数据前运行脚本，在读取数据前执行BEGIN关键字后指定的程序脚本。

``` shell
gawk 'BEGIN {print "The data3 File Contents:"} {print $0}' data3.txt
```

在处理数据后运行脚本，END关键字允许你指定一个程序脚本，gawk会在读完数据后执行它。

``` shell
gawk 'BEGIN {print "The data3 File Contents:"} {print $0} END {print "End of File"}' data3.txt
```

## 使用变量

内建变量

| 变量 | 描述 |
| --- | --- |
| FIELDWIDTHS | 由空格分隔的一列数字，定义了每个数据字段确切宽度 |
| FS | 输入字段分隔符 |
| RS | 输入记录分隔符 |
| OFS | 输出字段分隔符 |
| ORS | 输出记录分隔符 |

数据变量

| 变量 | 描述 |
| --- | --- |
| ARGC | 当前命令行参数个数 |
| ARGIND | 当前文件在ARGV中的位置 |
| ARGV | 包含命令行参数的数组 |
| CONVFMT | 数字的转换格式（参见printf语句），默认值为%.6 g |
| ENVIRON | 当前shell环境变量及其值组成的关联数组 |
| ERRNO | 当读取或关闭输入文件发生错误时的系统错误号 |
| FILENAME | 用作gawk输入数据的数据文件的文件名 |
| FNR | 当前数据文件中的数据行数 |
| IGNORECASE | 设成非零值时，忽略gawk命令中出现的字符串的字符大小写 |
| NF | 数据文件中的字段总数 |
| NR | 已处理的输入记录数 |
| OFMT | 数字的输出格式，默认值为%.6 g |
| RLENGTH | 由match函数所匹配的子字符串的长度 |
| RSTART | 由match函数所匹配的子字符串的起始位置 |

自定义变量

``` shell
> gawk '
> BEGIN{
> testing="This is a test"
> print testing
> testing=45
> print testing
> }'
This is a test
45
```

在命令行上给变量赋值

``` shell
> cat script1
BEGIN{FS=","}
{print $n}
> gawk -f script1 n=2 data1
data12
data22
data32
```
使用命令行参数来定义变量值会有一个问题。在你设置了变量后，这个值在代码的BEGIN部分不可用。可以用-v命令行参数来解决这个问题。它允许你在BEGIN代码之前设定变量。在命令行上，-v命令行参数必须放在脚本代码之前。

``` shell
> gawk -v n=3 -f script2 data1
The starting value is 3
data13
data23
data33
```

## 使用数组

gawk中的数组不是使用数字引用成员。

``` shell
> gawk 'BEGIN{
> capital["Illinois"] = "Springfield"
> print capital["Illinois"]
> }'
Springfield

> gawk 'BEGIN{
> var[1] = 34
> var[2] = 3
> total = var[1] + var[2]
> print total
> }'
37
```

遍历数组元素

``` shell
> gawk 'BEGIN{
> var["a"] = 1
> var["g"] = 2
> var["m"] = 3
> var["u"] = 4
> for (test in var)
> {
> print "Index:",test," - Value:",var[test]
> }
> }'
Index: u - Value: 4
Index: m - Value: 3
Index: a - Value: 1
Index: g - Value: 2
```

删除数组元素

``` shell
> gawk 'BEGIN{
> var["a"] = 1
> var["g"] = 2
> for (test in var)
> {
> print "Index:",test," - Value:",var[test]
> }
> delete var["g"]
> print "---"
> for (test in var)
> print "Index:",test," - Value:",var[test]
> }'
Index: a - Value: 1
Index: g - Value: 2
---
Index: a - Value: 1
```

## 模式匹配

使用模式匹配时正则表达式必须出现在它要控制的程序脚本的左花括号前。

``` shell
> gawk 'BEGIN{FS=","} /11/{print $1}' data
data11
```

匹配操作符（matching operator）允许将正则表达式限定在记录中的特定数据字段。匹配操作符是波浪线（~）。可以指定匹配操作符、数据字段变量以及要匹配的正则表达式。

``` shell
> gawk 'BEGIN{FS=","} $2 ~ /^data2/{print $0}' data
data21,data22,data23,data24,data25
```

你也可以用!符号来排除正则表达式的匹配。

``` shell
> gawk –F: '$1 !~ /rich/{print $1,$NF}' /etc/passwd
root /bin/bash
daemon /bin/sh
bin /bin/sh
sys /bin/sh
```
## 数学表达式

除了正则表达式，你也可以在匹配模式中用数学表达式。这个功能在匹配数据字段中的数字值时非常方便。举个例子，如果你想显示所有属于root用户组（组ID为0）的系统用户，可以用这个脚本。

``` shell
> gawk -F: '$4 == 0{print $1}' /etc/passwd
root
sync
shutdown
halt
operator
```

可以使用任何常见的数学比较表达式。

+ x == y：值x等于y。
+ x <= y：值x小于等于y。
+ x < y：值x小于y。
+ x >= y：值x大于等于y。
+ x > y：值x大于y。

## 结构化命令

if 语句

``` shell
> gawk '{if ($1 > 20) print $1}' data

> gawk '{if ($1 > 20) print $1 * 2; else print $1 / 2}' data

> gawk '{
> if ($1 > 20)
> {
> x = $1 * 2
> print x
> } else
> {
> x = $1 / 2
> print x
> }}' data
```

while 语句，while语句支持使用break和continue语句。

``` shell
> gawk '{
> total = 0
> i = 1
> while (i < 4)
> {
> total += $i
> if (i == 2)
> break
> i++
> }
> avg = total / 2
> print "The average of the first two data elements is:",avg
> }' data
```

do-while语句

``` shell
> gawk '{
> total = 0
> i = 1
> do
> {
> total += $i
> i++
> } while (total < 150)
> print total }' data
```

for 语句

``` shell
> gawk '{
> total = 0
> for (i = 1; i < 4; i++)
> {
> total += $i
> }
> avg = total / 3
> print "Average:",avg
> }' data5
```

## 格式化打印

*printf "format string", var1, var2 . . .* 

格式化指定符

| 控制字母 | 描述 |
| --- | --- |
| c | 将一个数作为ASCII字符显示 |
| d | 显示一个整数值 |
| i | 显示一个整数值（跟d一样） |
| e | 用科学计数法显示一个数 |
| f | 显示一个浮点值 |
| g | 用科学计数法或浮点数显示（选择较短的格式） |
| o | 显示一个八进制值 |
| s | 显示一个文本字符串 |
| x | 显示一个十六进制值 |
| X | 显示一个十六进制值，但用大写字母A~F |

``` shell
> gawk 'BEGIN{
> x = 10 * 100
> printf "The answer is: %e\n", x
> }'
The answer is: 1.000000e+03
```

除了控制字母外，还有3种修饰符可以用来进一步控制输出。
+ width：指定了输出字段最小宽度的数字值。如果输出短于这个值，printf会将文本右对齐，并用空格进行填充。如果输出比指定的宽度还要长，则按照实际的长度输出。
+ prec：这是一个数字值，指定了浮点数中小数点后面位数，或者文本字符串中显示的最大字符数。
+ -（减号）：指明在向格式化空间中放入数据时采用左对齐而不是右对齐。

``` shell
> gawk 'BEGIN{FS="\n"; RS=""} {printf "%-16s %s\n", $1, $4}' data2
Riley Mullen   (312)555-1234
Frank Williams (317)555-9876
Haley Snell    (313)555-4938

# 可以使用%5.1f格式指定符来强制printf命令将浮点值近似到小数点后一位。
> gawk '{printf "%5.1f\n",128.33}' data
128.3
```

## 函数

数学函数

| 函 数 | 描 述 |
| --- | --- |
| atan2(x, y) | x/y的反正切，x和y以弧度为单位 |
| cos(x) | x的余弦，x以弧度为单位 |
| exp(x) | x的指数函数 |
| int(x) | x的整数部分，取靠近零一侧的值 |
| log(x) | x的自然对数 |
| rand( ) | 比0大比1小的随机浮点值 |
| sin(x) | x的正弦，x以弧度为单位 |
| sqrt(x) | x的平方根 |
| srand(x) | 为计算随机数指定一个种子值 |

位操作

| 函数 | 描述 |
| --- | --- |
| and(v1, v2) | 执行值v1和v2的按位与运算。 |
| compl(val) | 执行val的补运算。 |
| lshift(val, count) | 将值val左移count位。 |
| or(v1, v2) | 执行值v1和v2的按位或运算。 |
| rshift(val, count) | 将值val右移count位。 |
| xor(v1, v2) | 执行值v1和v2的按位异或运算。 |

字符串函数

| 函数 | 描述 |
| --- | --- |
| asort(s [,d]) | 将数组s按数据元素值排序。索引值会被替换成表示新的排序顺序的连续数字。另外，如果指定了d，则排序后的数组会存储在数组d中 |
| asorti(s [,d]) | 将数组s按索引值排序。生成的数组会将索引值作为数据元素值，用连续数字索引来表明排序顺序。另外如果指定了d，排序后的数组会存储在数组d中 |
| gensub(r, s, h [, t]) | 查找变量$0或目标字符串t（如果提供了的话）来匹配正则表达式r。如果h是一个以g或G开头的字符串，就用s替换掉匹配的文本。如果h是一个数字，它表示要替换掉第h处r匹配的地方 |
| gsub(r, s [,t]) | 查找变量$0或目标字符串t（如果提供了的话）来匹配正则表达式r。如果找到了，就全部替换成字符串s |
| index(s, t) | 返回字符串t在字符串s中的索引值，如果没找到的话返回0 |
| length([s]) | 返回字符串s的长度；如果没有指定的话，返回$0的长度 |
| match(s, r [,a]) | 返回字符串s中正则表达式r出现位置的索引。如果指定了数组a，它会存储s中匹配正则表达式的那部分 |
| split(s, a [,r]) |  将s用FS字符或正则表达式r（如果指定了的话）分开放到数组a中。返回字段的总数 |
| sprintf(format,variables) | 用提供的format和variables返回一个类似于printf输出的字符串 |
| sub(r, s [,t]) |  在变量$0或目标字符串t中查找正则表达式r的匹配。如果找到了，就用字符串s替换掉第一处匹配 |
| substr(s, i [,n])  | 返回s中从索引值i开始的n个字符组成的子字符串。如果未提供n，则返回s剩下的部分 |
| tolower(s) |  将s中的所有字符转换成小写 |
| toupper(s)  | 将s中的所有字符转换成大写 |

``` shell
> gawk 'BEGIN{
> var["a"] = 1
> var["g"] = 2
> var["m"] = 3
> var["u"] = 4
> asort(var, test)
> for (i in test)
> print "Index:",i," - value:",test[i]
> }'
Index: 4 - value: 4
Index: 1 - value: 1
Index: 2 - value: 2
Index: 3 - value: 3

> gawk 'BEGIN{ FS=","}{
> split($0, var)
> print var[1], var[5]
> }' data1
data11 data15
data21 data25
data31 data35
```

时间函数

| 函 数 | 描 述 |
| --- | --- |
| mktime(datespec) | 将一个按YYYY MM DD HH MM SS [DST]格式指定的日期转换成时间戳值 |
| strftime(format [,timestamp]) | 将当前时间的时间戳或timestamp（如果提供了的话）转化格式化日期（采用shell函数date()的格式） |
| systime( ) |  返回当前时间的时间戳 |

自定义函数，在定义函数时，它必须出现在所有代码块之前（包括BEGIN代码块）。

``` shell
> gawk '
> function myprint()
> {
> printf "%-16s - %s\n", $1, $4
> }
> BEGIN{FS="\n"; RS=""}
> {
> myprint()
> }' data2
Riley Mullen - (312)555-1234
Frank Williams - (317)555-9876
Haley Snell - (313)555-4938
```

创建函数库

``` shell
> cat funclib
function myprint()
{
printf "%-16s - %s\n", $1, $4
}
function myrand(limit)
{
return int(limit * rand())
}
function printthird()
{
print $3
}
```

funclib文件含有三个函数定义。需要使用-f命令行参数来使用它们。很遗憾，不能将-f命令行参数和内联gawk脚本放到一起使用，不过可以在同一个命令行中使用多个-f参数。因此，要使用库，只要创建一个含有你的gawk程序的文件，然后在命令行上同时指定库文件和程序文件就行了。

``` shell
> cat script4
BEGIN{ FS="\n"; RS=""}
{
myprint()
}
> gawk -f funclib -f script4 data
Riley Mullen - (312)555-1234
Frank Williams - (317)555-9876
Haley Snell - (313)555-4938
```

gawk 高级使用案例

``` shell
> cat scores.txt
Rich Blum,team1,100,115,95
Barbara Blum,team1,110,115,100
Christine Bresnahan,team2,120,115,118
Tim Bresnahan,team2,125,112,116

> cat bowling.sh
#!/bin/bash
for team in $(gawk –F, '{print $2}' scores.txt | uniq)
do
gawk –v team=$team 'BEGIN{FS=","; total=0}
{
if ($2==team)
{
total += $3 + $4 + $5;
}
}
END {
avg = total / 6;
print "Total for", team, "is", total, ",the average is",avg
}' scores.txt
done

> ./bowling.sh
Total for team1 is 635, the average is 105.833
Total for team2 is 706, the average is 117.667
```

# shell中的特殊环境变量

| 变更 | 说明 |
| --- | --- | 
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
| --- | --- |
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
| --- | --- |
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
| --- | --- |
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
