---
title: C++ Primer Plus
categories:
- c++
description: 
permalink: "/posts/cplusplus-primer-plus"
excerpt: C++是在C语言基础上开发的一种集面向对象编程、泛型编程和过程化编程于一体的编程语言，是C语言的超集。介绍C++程序的运行方式、基本数据类型、复合数据类型、循环和关系表达式、分支语句和逻辑运算符、函数重载和函数模板、内存模型和名称空间、类的设计和使用、多态、虚函数、动态内存分配、继承、代码重用、友元、异常处理技术、 string类和标准模板库、输入/输出、C++11新增功能等内容。
---

## C++简介

C++融合了3种不同的编程方式：C语言代表的过程性语言、C++在C语言基础上添加的类代表的面向对象语言、C+模板支持的泛型编程。一般来说，计算机语言要处理两个概念数据和算法。数据是程序使用和处理的信息，而算法是程序使用的方法。C语言是过程性（ procedural）语言，强调的是算，OOP强调的是数据。泛型强调独立于特定的数据类型。

名称C++来自C语言中的递增运算符++,表明它是C的补充版本。C提供了低级硬件访问，OOP提供了高级抽象。

程序如何运行：

1. 编写代码
2. 编译源代码，将源代码翻译为主机使用的机器语言，编译后就是目标代码
3. 将目标代码与其他代码链接起来

![编程步骤](/assets/images/cplusplus-primer-plus/编译步骤.png)

### 编译和连接

最初使用UNIX命令`CC`调用`cfront`编译器，将C++源代码翻译成C源代码，然后使用个标准C编译器对其进行编译。这种方法简化了向C的领域引入C++的过程。Linux系统中常用的是`g++`。Mac OS X系统中是`clang`。

+ Compile 通常意味着对当前打开的文件中的代码进行编译。
+ Build和Make通常意味着编译项目中所有源代码文件的代码。这通常是一个递增过程，也就是说，如果项目包含3个文件，而只有其中一个文件被修改，则只重新编译该文件。
+ Build All通常意味着重新编译所有的源代码文件
+ Link意味着将编译后的源代码与所需的库代码组合起来
+ Run或 Execute意味着运行程序。通常，如果您还没有执行前面的步骤，Run将在运行程序之前完成这些步骤
+ Debug意味着以步进方式执行程序。
+ 编译器可能让您选择要生成调试版还是发布版。调试版包含额外的代码，这会增大程序、降低执行速度，但可提供详细的调试信息。

### C++预处理器和头文件

C++引用的头文件由预处理在被编译之前添加到代码和程序中。

### 头文件名

C语言的头文件名由`.h`结尾，C++新风格的头文件没有扩展名。C++兼容C的头文件，同时C++重构C语言版本的头文件以`c`开头没有扩展名，如`cmath`。

### 名称空间

为了避免多厂商实现的同一个接口在使用时发生冲突，引入了名称空间概念。语法是`namespace::method`，如果`std::cout`。如果要省去每个方法都表明名称空间，可以使用`using namespace std`，如果只想生效部分方法，可以针对每个方法使用`using std::cout`，此后在使用`cout`方法时无需指定空间。可以在类上使用，也可以在方法中使用。

## 处理数据

### 字面量进制表示

如果第一位为1~9,则基数为10(十进制)；因此93是以10为基数的。如果第一位是0,第二位为1~7,则基数为八进制）；因此042的基数是8，它相当于十进制数34。如果前两位为0x或0X，则基数为16(十六进制)。

## 复合类型

### 数组初始化方法

``` c++
int array[4]={1,2,3,4};
int array[4];
int array[4] {1,2,3,4};
int array[4] {};
```

### 字符串string、char数组

``` c++
char name[10]="QuanLi";
char name[]="QuanLi";
```

c++98添加了`string`类。需要引用`#include <string>`。且其在`std`名称空间中，需要声明空间。`string`类相关的操作方法声明在`<cstring>`头文件中。

### 结构变量struct

声明自己的结构变量：

``` c++
struct persion  //在c++中，struct关键字可以省略
{
    string name;
    int age;
};

persion quanli={ "quanli", 25 };
persion list={
    {"leezw",25},
    {"quanli",25}
};
```

可以使用成员运算符`.`来访问各个成员，同样`.`也用来访问成员方法。

### 共用体union

结构体可以存储一组对象结构，共用体只能存储声明的其中一种变量，常用于节省空间。

```c++
/*只能存储一个int值或者一个long值*/
union ID{
    int int_val;
    long long_val;
}
```

用在结构体中是可以省略名称，则访问时可以省略一次成员访问：

```c++
struct product{
    union{
        int int_id;
        long long_id;
    }
} a_product;
a_product.int_id; //或a_product.long_id。
```

### 枚举enum

``` c++
enum colors {red,black,yellow};
colors red_color=red;
```
### 指针和自由存储空间

+ 指针声明`int * p`。
+ 取址运算符`&`，`p = &int_val`。
+ 取值符号`*`，`*p //int_val`。

使用指针可以在运行时分配内存，可以使用C语言的语法`malloc()`来分配内存，可以使用c++的语法`new`来分配内存`int * p = new int`。使用`delete`来释放内存`delete p`，但是同一个指针只可以调用一次。

数组指针的创建和使用：

```c++
int * array=new int [10];
delete [] array;
```

### 自动存储、静态存储和动态存储

1. 函数内的变量在函数调用是产生，结束后回收，是自动存储
2. 在函数外面定义或使用static定义的变量在整个程序运行期间都存在，是静态存储
3. 使用new生成delete释放的是动态存储

### 数组的替代品

模板类vector(c++98)：
``` c++
##include <vector>
using namespace std;
vector<int> a(3);
```

模板类array(c++11):
```c++
##include <array>
using namespace std;
array<int,5> a;
```

array和数组存储在栈中，而vector存储在堆中。

## 控制语句

### 基于范围的for循环(c++11)

```c++
int a[]{4,5,22};
for(int i:a){};
for(int i:{1,3,5}){};
```

### 逻辑运算符

`&& || !`逻辑运算符可以使用`and or not`代替，但是在C语言中需要引入`iso646.h`头文件，C++中可以直接使用。

## 函数

### 函数指针

+ 函数名既函数地址，传递函数`process(function)`。
+ 声明函数指针`int pow(int)`的指针声明方式为`int (*pf)(int)`
+ 使用函数指针调用函数`pow(2)`等同于`(*pf)(2)`等同于`pf(2)`
+ 同样可以使用`auto`功能，例如声明`int pow(2)`的函数指针`auto pf=pow`
+ 可使用`typedef`进行声明简化:
``` c++
typedef int (*intf)(int);
intf pf;
```

### 内联函数

声明函数时前面加上`inline`。和宏不同的是，宏只是简单的文本替换。而内联函数会有参数传递过程，特别表现在调用时使用`++`或`--`运算符时的表现。

### 引用变量

运算符`&`，用法`int & ref=val`变量的别名。引用变量的主要用途是用作函数的形参。通过将引用变量用作参数，函数将使用原始数据，而不是其副本。这样除指针之外，引用也为函数处理大型结构提供了一种非常方便的途径，同时对于设计类来说，引用也是必不可少的。

函数声明引用变量参数的方法：
```c++
int & method(int &a); //接收引用变量并返回引用变量
method(int_val); //调用声明了引用变量参数的方法
```

如果实参与引用参数不匹配，C++将生成临时变量。当前，仅当参数为`const`引用时，C+才允许这样做，如果引用参数是 `const`，则编译器将在下面两种情况下生成临时变量：
+ 实参的类型正确，但是匿名变量
+ 实参的类型不正确，但可以转换为正确的类型

将引用参数使用`const`修饰声明为常量数据的引用的理由有三个
+ 使用 `const`可以避免无意中修改数据的编程错误
+ 使用 `const`使函数能够处理 `const`和非 `const`实参，否则将只能接受非 `const`数据
+ 使用 `const`引用使函数能够正确生成并使用临时变量

返回引用而不是值，可以只传递引用，从而避免一次值拷贝。但是不要返回方法内临时变量的引用，方法执行完后会被销毁。返回引用也可以使用`const`修饰，这样在调用方法位置不能对返回值进行修改。

函数`const Foo & fun(const Foo & f) const;`隐式访问一个对象(this)，显示访问另一个对象(f)，并返回一个对象的引用。括号中的 const表明，该函数不会修改被显式地访问的对象：而括号后的 const表明，该函数不会修改被隐式地访问的对象。由于该函数返回了两个 const对象之一的引用，因此返回类型也应为 const引用。

### 模板函数

```c++
template <typename T> //typename可以替换为class，class用于向后兼容。建议使用typename
void swap(T &a,T &b){};
```

当需要模板函数适应特殊类型变量时，使用显示具体化。对于给定的函数名，可以有非模板函数、模板函数和显式具体化模板函数以及它们的重载版本。这样当调用模板方法，且匹配到显示的类型时将调用显示模板方法：
```c++
template <> void swap<int>(int &a,int &b){};
```

显示实例化和显示具体化的语法相近`template void swap<int>(int &a,int &b){}`，告诉编译器直接实例化一个方法，而不是在运行时通过模板实例化。

### 编译器选择使用哪个函数版

1. 创建候选函数列表。其中包含与被调用函数的名称相同的函数和模板函数。
2. 使用候选函数列表创建可行函数列表。这些都是参数数目正确的函数，为此有一个隐式转换序列，其中包括实参类型与相应的形参类型完全匹配的情况。例如，使用float参数的函数调用可以将该参数转换为 double，从而与 double形参匹配，而模板可以为oat生成一个实例。
3. 确定是否有最佳的可行函数。如果有，则使用它，否则该函数调用出错

## 内存模型和名称空间

### 存储说明符和cv-限定符

存储说明符：
+ register （用于在声明中指示寄在器存储）
+ static
+ extern（引用声明，即声明引用在其他地方定义的变量）
+ thread_loacl（之于线程，犹如常规静态变量之于整个程序）
+ mutable（即使结构（或类）变量为 const，其某个成员也可以被修改）

cv-限定符：
+ const（内存被初始化后，程序便不能再对它进行修改）
+ volatile（即使程序代码没有对内存单元进行修改，其值也可能发生变化）

static使用：

+ 在函数外部没有static修饰的变量可在程序的其他文件中使用
+ 在函数外部有static修饰的变量可在程序的引用它的文件中使用
+ 在函数内部有static修饰的变量只能在函数内部使用，但是他是全局静态的
+ 用于方法时，该函数只在文件中可见，将覆盖外部定义

### 定位new运算符

new可以指定地址位置，这时将不受delete控制。

```c++
char buffer1[50];
char buffer2[500];
a_struct *p1 = new (buffer1) a_struct;
int *p2 = new (buffer2) int[20];
```
## 名称空间

C++中的名称空间除了全局和方法内，还可以自定义名称空间。名称空间可以是全局的也可以位于另一个名称空间中(嵌套：OuterNameSpace::InnerNameSpace::field)及在另一个名称空间中使用，但不能位于代码块中。

```c++
// 声明一个名称空间
namespace MyNameSpace{
    double filed1;
    void method1();
}
// 向名称空间中添加名称
namespace MyNameSpace{
    struct struct1{ ... }
}
// 对名称空间中的方法原型进行实现
namespace MyNameSpce{
    void method1()
    {
        ...
    }
}
```

using 声明(using MyNameSpace::field1)将名称添加到using所属的声明区域中，以便于不用每次都使用空间限定符`::`；using编译指令(using namespace MyNameSpace)使空间中所有名称都可用。

当局部变量隐藏同名的全局变量时，如果想要调用全局变量可以使用不带命名空间的限定符`::var`。命令空间可以创建别名`namespace MNS = MyNameSpace`


## 对象

### 构造函数和析构函数

+ 构造函数结构`Foo(const string & f1,long f2=0, double f3 = 0.0);`
+ 使用构造函数创建并初始化对象`Foo *foo = new Foo("foo",19,17.0);`
+ 使用构造函数初始化对象`Foo foo = Foo("foo",1,2.0);`或`Foo foo("foo",1,2.0);`
+ 使用列表初始化对象`Foo foo = {"foo",1,2.0};`
+ 使用列表初始化对象`Foo foo {"foo",1,2.0};`
+ 如果没有提供显示构造函数，则自动生成默认构造函数。默认构造函数可以是没有参数的，也可以是所有参数都有默认值的，但是不能两种同时存在
+ 析构函数`~Foo();`



## 使用类

### 运算符重载

运算符重载分为成员函数重载和非成员函数重载，需要使用成员函数访问符`object.method()`访问的是成员函数，不需要的是非成员函数。`operator*op*(arglist)`重载运算符，比如`operator+()`重载+运算符。运算符重载只能重载已有的运算符，不能创造新的运算符。不能违反运算符原来的语法规则和优先级。

`B + 2.7`将调用B重载运算符的成员函数，但是反过来`2.7 + B`将行不通，这时需要使用友元来重载`operator+(double d,const B & b)`

### 友元

+ 友元函数
+ 友元类
+ 友元成员函数

创建友元函数需要将函数原型放在类声明中，并在原型声明前加关键字friend `friend Foo operator*(int m,const Foo & f);`。这意味着虽然函数是在类声明中声明的，但不是成员函数；虽然不是成员函数但与成员函数的访问权限相同。

### 类的自动类型转换和强制类型转换

如果一个类有只有一个参数的构造函数，或构造函数中除了第一个参数其他参数都有默认值，则可以将参数类型显示或隐式转化为该类对象。这将生效与赋值、函数调用、传参、返回值类型中。`Foo(int i,double d=1.0);`

在构造函数前面加上`explicit`可以关闭改类改构造函数类型的隐式类型转换，但仍可以使用强制类型转换。`explicit Foo(int i,double d=1.0);`

构造函数可以实现类型转换，但是如果想要反向转换类型，就需要用到转换函数。转换函数的函数原型为`operator *typeName*();`。比如Foo转换成int类型就是`operator int();`。转换函数必须是类方法；不能指定返回类型（但是也要返回所需的值）；不能有参数。转换函数同样可以加`explicit`修饰禁止隐式转换。

## 类和动态内存分配

### 特殊成员函数

C++会自动生成一些类的成员函数：

+ 默认构造函数，如果没有定义构造函数
+ 默认析构函数，如果没有定义
+ 复制构造函数（函数原型`Foo(const Foo &);`），如果没有定义
+ 赋值运算符（函数原型`Foo & Foo::operator=(const Foo &);`），如果没有定义
+ 地址运算符，如果没有定义

### 在构造函数中使用new时应注意的事项

+ 如果有多个构造函数，则必须以相同的方式使用new，要么都带中括号，要么都不带。因为只能有一个析构函数，所有构造函数都必须与它兼容。
+ 应定义一个复制构造函数，通过深度复制将一个对象初始化为另一个对象
+ 应定义一个赋值运算符，通过深度复制将一个对象赋值给另一个对象

### 返回对象的说明

1. 返回指向const对象的引用，返回引用可以提高效率避免对象复制
2. 返回指向非const对象的引用，常见于重载赋值运算符和<<运算符
3. 返回对象，函数中的局部变量会在函数结束后消失，需要返回一个新对象
4. 返回const对象

### 使用指向对象的指针

对象中的new和delete：

+ 如果对象是动态变量，在程序块结束时将被销毁
+ 如果对象是静态变量（外部、静态、静态外部或来自名称空间），则在程序结束时将被销毁
+ 如果对象是用new创建，将在显示使用delete时被销毁

指向对象的指针：

+ 使用常规表示法来生命指向对象的指针`Foo * foo;`
+ 可以将指针初始化为指向已有的对象`Foo * foo1 = &foo2;`
+ 可以使用new来通过构造函数初始化指针`Foo * foo = new Foo();`
+ 使用`->`运算符来通过指针访问类方法
+ 对对象指针应用解除引用运算符`*`来获得对象

### 成员初始化列表

由于const和引用类型的对象必须在创建时进行初始化，所以在构造函数执行之前被创建，无法在构造函数中进行赋值。此时需要使用成员初始化列表语法：
```c++
Foo::Foo(int n,int m) :const_int_field(n),ref_int_field(m),another_const_field(1)
{
//...
}
```

+ 只能用于构造函数
+ 非静态const数据成员如果在构造函数中必须用初始化列表初始化
+ 引用数据成员如果在构造函数中必须用初始化列表初始化
+ 非const数据成员也可以使用初始化列表，但是没必要
+ 初始化列表语法的赋值可以覆盖直接赋值`const int a=1;`

## 类继承

类继承可以重用测试通过的代码，也可以对已有的代码提供方便的功能扩展。

### 基类

从一个类派生出另一个类时，原始类称为基类，继承类称为派生类。派生类不能直接访问基类的私有成员，而必须通过基类方法进行访问。创建派生类对象时，程序首先创建基类对象。

+ 派生类对象存储了基类的数据成员(派生类继承了基类的实现)
+ 派生类对象可以使用基类的方法(派生类继承了基类的接口)
+ 派生类需要自己的构造函数
+ 派生类可以根据需要添加额外的数据成员和成员函数

```c++
//继承语法
class ClassB : public ClassA
{
    
}

//派生类的构造函数
ClassB::ClassB(int a,const string & b) : Class A(c,d)
{

}
```

### 继承是 is-a 的关系

继承是 is-a 的关系，及派生类是一个基类；相应的还有 has-a ，及一个对象包含另一个对象；is-like-a 关系，一个对象在数据和行为上很像另一个对象；is-implemented-as-a 关系，使用一个对象来实现另一个对象。

### 多态共有继承

当派生类和基类实现同一个方法，方法的行为取决于调用方法的对象，成为多态——多种形态。可以有两种方式实现：

+ 在派生类中重新定义基类的方法
+ 使用虚方法

它们俩的区别在于指针和引用的情况下，重新定义基类方法的行为取决于生命的类型；虚方法的行为取决于实际类型。在基类中声明成虚方法则派生类自动是虚方法。建议使用虚方法继承。

### 静态联编和动态联编

在C语言中，将源代码中的函数调用解释为执行特定函数代码块成为函数名联编（binding）；在编译过程根据函数参数以及函数名确定调用的函数叫静态联编（static binding）或早期联编（early binding），然而这不适用于虚方法；在运行过程中同时根据对象类型选择调用的方法叫动态联编（dynamic binding）或晚期联编（late binding）。

将派生类引用或指针转换为基类引用或指针被称为向上强制转换(upcasting)。由于动态联编会产生一些额外的空间和时间开销，所以默认是静态联编。只有遇到虚函数才使用动态联编。虚函数是在对象中存储一个虚函数地址表来实现运行时调用实现对象的方法的，这将增加存储空间以及运行时查表的时间。

构造函数不能是虚函数；使用了虚方法的类，应该提供需析构函数。以防止内存泄漏；友元不能是虚函数，因为友元不是类成员；虚方法不适用于方法重载，会隐藏掉基类方法。因此如果基类声明被重载了，则应在派生类中重新定义所有的基类版本。

### 访问控制：protected

protected对于派生类和public一致。对外部类和private一致。

### 抽象基类

如果从多个对象中抽象出一个不被用于创建对象的基类。则可以使用抽象基类。包含抽象方法的类就是抽象基类，不能被用于创建实例。抽象方法是指在抽象基类中声明但没有具体实现的方法。其语法为在方法声明结尾加上`= 0`，例如`virtual void Move() =0;`

### 继承和动态内存分配

如果派生类中自己的成员对象只有基本数据类型，不含有需要使用`new`进行动态内存分配的数据类型比如`string`，则派生类不需要实现自己的复制构造函数、析构函数或重载运算操作符。

如果派生类中自己的成员对象包含需要动态内存分配的数据类型。则需要实现自己的复制构造函数、析构函数或重载运算操作符。

如果派生类和基类中包含友元函数，因为友元函数不属于成员函数，无法使用所用域解析运算符来确定方法。所以需要使用强制类型转换，通过对象类型来指定要调用的友元函数。比如`os << (BaseClass &) object;`

## 类回顾

### 类方法

+ 编译器会生成默认构造函数、复制构造函数、赋值运算符。
+ 构造函数不同于其他类方法，因为它创建新的对象，而其他类方法只是被现有的对象调用。
+ 要显示定义析构函数来回收由 `new` 分配的内存。
+ 复制构造函数的参数之有一个改类型变量。
+ 传递引用可以减少对象创建；返回对象可以避免方法块执行后自动对象回收。
+ 使用const来确保方法不修改参数

### 共有继承需要考虑的因素

+ 要遵循 `is-a` 的关系
+ 构造函数和析构函数不能被继承
+ 派生类中有需要动态内存分配的成员时需要提供赋值运算符重载
+ 对派生类来讲，保护成员等于共有成员，对外部来讲保护成员等于私有成员
+ 如果希望派生类能够重新定义方法，基类中将方法声明为虚方法
+ 基类中的析构函数应该声明成虚方法
+ 友元函数的调用需要强制类型转换来转换对象类型来调用


## C++中的代码重用

### 包含对象成员的类

在类中包含各种成员对象以达到代码重用的目的

### 私有继承

共有继承中派生类会继承基类的接口，所以是`is-a`的关系；在私有继承的不完全继承中类继承的是实现，是`has-a`的关系，派生类`has-a`基类。使用私有继承和包含对象成员的不同是省略了显示的对象名称。

``` c++
class Student : private std::string, private std::valarray<double>
{
    public:
    ...
}
```

私有继承和成员对象不同的是没有变量名，因此在构造函数中使用成员初始化列表语法时，使用类名来初始化基类：

``` c++
Student(const char * str,const double * pd, int m)
    :std::string(str), std::valarray<double>(pd, n)
    {
        ...
    }
```

同样由于没有变量名，在调用基类方法时使用类名和作用于解析运算符来调用方法：

``` c++
double Student::Average() const
{
    if(std::valarray<double>::size() > 0)
        return std::valarray<double>::sum();
    else
        return 0;
}
```

或者重新声明私有基类方法：

```c++
double Student::sum() const
{
    return std::valarray<double>::sum();
}
```

或者使用 using 声明来指出派生类可以使用特定的基类成员,注意没有圆括号、函数特征标识和返回类型：

``` c++
using std::valarray<double>::sum; 
```

访问基类的对象时，由于没有对象成员声明，所以使用强制类型转换：

``` c++
const string & Student::Name() const
{
    return (const string &) *this;
}
```

因为友元函数不属于类，因此不能用类名加作用于限定符限定函数名，所以需要显示的转换为基类来调用正确的函数：

``` c++
ostream & operator<<(ostream & os, const Student & stu)
{
    os << (const string &)stu;
}
```

### 多重继承

多重继承（multiple inheritance，MI）。相比于单继承更为复杂，其主要表现为：1.从两个不同的基类继承同名方法；2.从两个基类继承同一个类的多个实例。需要额外使用一些规则和语法来解决这些问题。

``` c++
class A {...};
class B1 : public A {...};
class B2 : public A {...};
class C : public B1, public B2 {...};
```

对于第2个问题，可以使用虚基类来解决。虚基类使得从多个基类相同的类派生出的对象只继承一个基类对象。虚基类使用关键字`virtual`修饰：

``` c++
class B1 : virtual public A {...};
class B2 : public virtual A {...};
class C : public B1, public B2 {...};
```

使用了虚基类后，对象 C 将只包含 A 对象的一个副本。也就是继承的 B1 和 B2 对象共享一个 A 对象。使用了虚基类的继承，在构造函数的初始化列表将使用新的方式：

``` c++
C(int a, int b, int c) 
    : A(a), B(b), C(c)  //这时会先初始化 A 对象
{...};
```

对于第1个问题，可以使用作用域解析符来避免方法名二义性：

``` c++
C c = new C();
c.B1::show();
```

但是最好的方法是在派生类中重写同名方法。

### 类模板

类模板将类型作为参数初始化对象。在容器类中最为常见。定义类模板有两种方式，一种是使用 `typedef` ，这种方式最大的问题是每个程序只能生成一种类型的类。第二种是使用 `template`。

``` c++
typedef unsigend long Item;

class Stack
{
    private: 
        Item items[10];
    public:
        bool push(const Item & item);
}
```

``` c++
template <class Type>
//template <typename Type>

class Stack
{
    private:
        Type items[10];
    public:
        bool push(const Type &item);
};

// 在方法中使用模板
template <typename Type>
bool Stack<Type>::push(const Type & item)
{
    ...
}

//使用模板声明对象
Stack<int> it;
Stack<string> st;
```

模板类中的类变量可以为指针，但是要注意合理使用。

#### 非类型参数

模板参数也可以为非类型参数，也就是值参数。值参数带有参数类型，且可以有默认值。值参数可以为整型、枚举、引用或指针。模板代码不能修改参数的值，也不能使用参数的地址。在实例化模板时，用作表达式参数的值必须是常量表达式。

``` c++
template <typename T = string,int n = 10>
class Stack
{
    private:
        T items[n];
}

Stack<T,n>::Stack(const T & v)
{
    for(int i=0; i<n; i++);
}
```

#### 模板的多功能性

可以将用于常规类的技术用于模板类。模板类可用作基类，也可用作组件类，还可用作其他模板的类型参数。

``` c++
Array<Stack<int>> ast;
```

#### 模板的具体化

类模板与函数模板都有隐式实例化、显式实例化和显示具体化。模板以泛型的方式描述类，而具体化是使用具体的类型生成类声明。

隐式实例化是指声明对象时指出所需的类型，而编译器使用通用模板生成具体的类定义。隐式实例化编译器在需要对象之前，不会根据模板生成该类型的隐式实例化。

```c++
Array<int> o;       //隐式实例化
Array<int> * p;     //仅是一个指针，还没有生成类实例化
p = new Array<int>; //生成类实例化
```

显式实例化需要使用关键字 `template` 指出所需类型来声明类，这时编译器会根据模板生成该类声明的显式实例化。

``` c++
template class Array<int>;  //编译器会声明一个Array<int>类
```

显式具体化是指对一个模板类兼容的不同类型，如果有一个特定类型需要定制，就写一个特定类型的模板类。类似于模板类的多态

``` c++
//显式具体化语法
//当使用非string声明模板时，使用通用模板类
//当使用string声明模板时，则使用该特定类型模板类
template <> class Array<string>{...};  

```

部分具体化，相对于显式具体化是指给类型参数之一指定具体的类型。

```c++
//普通的类模板
template <class T1, class T2> class Pair {...};
//部分具体化指定T2为int的类模板
template <class T1> class Pair<T1, int> {...};  //关键字template后面的<>声明的是没有被具体化的类型参数。
```

#### 将模板用作参数

模板可以包含类型参数(typename T)和非类型参数(int n)。模板还可以包含本身就是模板的参数。

``` c++
//其意思为参数T2的类型为一个模板，其慢板声明符合`template <typename T1> class`
template <template <typename T1> class T2> class TemplateWapper{...};
```

#### 模板类和友元

模板类声明也可以有友元，模板的友元分3类：

+ 非模板友元
+ 约束模板友元，友元的类型取决于类实例化时的类型
+ 非约束模板友元，友元的所有具体化都是类的每一个具体化的友元

非模板友元在模板中生命一个常规函数的友元，友元函数将成为所有实例化的友元。非模板友元可以使用方法重载，来重载模板的多实例化参数,带`Array<int>`参数的友元函数将成为`Array<int>`类的友元。

当友元函数本身成为模板时就是模板友元。

//TODO 模板类和友元

#### 模板别名

为模板指定别名：

``` c++
template<typename T> using arrayType = std::array<T,12>;
arrayType<double> t1;   //等于std::array<double,12>
arrayType<int> t2;      //等于std::array<int,12>

//c++11 也允许使用语法 `using =` 用于非模板
using i = int;    //等于typedef int i;
```

## 友元、异常和其他

### 友元

类并非只能拥有友元函数，也可以将类作为友元。这时友元类的所有方法都可以访问原始类的私有成员和保护成员。另外，也可以做更严格的限制，只将特定的成员函数指定为另一个类的友元。哪些函数、成员函数或类为友元是又类定义的，而不能从外部强加友情。

例如对于电视机和遥控器，可以这样声明友元类：

``` c++
//声明遥控器类
class Remote
{
    public:
        void set_chan(Tv & t,int c){t.channel = c;}
        ...
}
//声明电视机类
class Tv
{
    public:
        friend class Remote;   //Remote类的所有方法都将是Tv类的友元
        ...
}
```

当然也可以选择仅让特定的类成员成为另一个类的友元，而不必让整个类成为友元。这时会有一些麻烦，在代码上需要小心排列各种声明和定义的顺序，下面介绍原因：

让 `Remote::set_chan()` 成为Tv类的友元方法是在Tv类声明中将其声明为友元:

```c++
class Tv
{
    friend void Remote::set_chan(Tv & t, int c);
}
```

然而要使编译器能处理这条语句，它必须知道Remote的定义，否则编译器无法知道Remote是一个类，set_chan是这个类的方法。这意味着需要将 Remote 的定义放到 Tv 的定义前面。 Remote的方法提到了Tv对象，而这意味着Tv的定义应当在Remote前面。这时就有了循环依赖。

这种情况需要使用前向声明预先声明一个类，再声明类的定义。Tv类需要知道Remote类的详情，而Remote类只需要Tv类的存在。因此使用下面定义顺序：

```c++
class Tv;                                                   //1.先声明Tv类
class Remote {void set_chan(Tv& t,int c){...}}              //2.再声明Remote类的定义
class Tv {friend void Remote::set_chan(Tv& t,int c){...}}   //3.再声明Tv类的定义
```

友元类型还有互相友元和共同友元，相互友元和共同友元都需要注意类声明和类定义的顺序。都需要前向定义方式。

### 嵌套类

将类声明放在另一个类中，成为嵌套类。嵌套类通过使用作用域来避免名称混淆。包含类的成员函数可以创建和使用被嵌套类的对象；而仅当声明位于公有部分，才能在包含类的外面使用嵌套类,而且必须使用作用域解析运算符。

#### 嵌套类和访问权限

有两种访问权限适合于嵌套类。首先，嵌套类的声明位置决定了嵌套类的作用域，即它决定了程序的哪些部分可以创建这种类的对象。其次，和其他类一样，嵌套类的公有部分、保护部分和私有部分控制了对类成员的访问。在哪些地方可以使用嵌套类以及如何使用嵌套类，取决于作用域和访问控制。

#### 模板中的嵌套

模板类中的类嵌套语法：

```c++
template <class Item>
class QueueTP
{
    class Node
    {
        ...
    }
}
```
Node是利用通用类型Item来定义的。所以，下面的声明将导致Node被定义成用于存储double值:
```c++
QueueTp<double> dq;
```
而下面的声明将导致Node被定义成用于存储char值:
```c++
QueueTp<char> cq;
```
这两个Node类将在两个独立的QueueTP类中定义，因此不会发生名称冲突。即一个节点的类型为`QueueTP<double>::Node`，另一个节点的类型为`QueueTP<char>::Node`。

### 异常

#### 调用abort()

C++ 处理异常的方式之一是调用`abort( )`函数。`abort()`函数的原型位于头文件`cstdlib (或stdlib.h)`中，其典型实现是向标准错误流(即cerr使用的错误流)发送消息`abnormal program termination (程序异常终止)`，然后终止程序。它还返回一个随实现而异的值，告诉操作系统或父进程处理失败。`abort( )`是否刷新文件缓冲区取决于实现。如果愿意，也可以使用`exit( )`，该函数刷新文件缓冲区，但不显示消息。

#### 返回错误码

另一种比异常终止更灵活的方法是，使用函数的返回值来指出问题。

#### 异常机制

最好的方案是使用C++的异常捕获机制，其语法为：

``` c++

int main(){
    try{
        methodThrowException();
    }catch(const char * e){
        cout<<e<<endl;
    }
}

void methodThrowException(){
    throw "这是一个异常";
}
```

执行throw语句类似于执行返回语句，因为它也将终止函数的执行。但throw不是将控制权返回给调用程序，而是导致程序沿函数调用序列后退，直到找到包含try块的函数。如果函数引发了异常，而没有try块或没有匹配的处理程序时，程序最终将调用`abort( )`函数，但可以修改这种行为。

通常异常使用对象来传递。

#### 异常规范

c++98中新增异常规范语法，随后在c++11中被摒弃。其格式为`void method() throw(bad_thing)`，含义为这个方法可能会抛出异常。c++11中同样也提供了异常规范语法`void method() noexcept;`，其含义是这个方法不会抛出异常。

#### 栈解退

C++通常通过将信息放在栈中来处理函数调用。具体地说，程序将调用函数的指令的地址(返回地址)放到栈中。当被调用的函数执行完毕后，程序将使用该地址来确定从哪里开始继续执行。另外，函数调用将函数参数放到栈中。在栈中，这些函数参数被视为自动变量。如果被调用的函数创建了新的自动变量，则这些变量也将被添加到栈中。如果被调用的函数调用了另一个函数，则后者的信息将被添加到栈中，依此类推。当函数结束时，程序流程将跳到该函数被调用时存储的地址处，同时栈顶的元素被释放。因此，函数通常都返回到调用它的函数，依此类推，同时每个函数都在结束时释放其自动变量。如果自动变量是类对象，则类的析构函数(如果有的话)将被调用。现在假设函数由于出现异常(而不是由于返回)而终止，则程序也将释放栈中的内存，但不会在释放栈的第一个返回地址后停止，而是继续释放栈，直到找到一个位于try块中的返回地址。随后，控制权将转到块尾的异常处理程序，而不是函数调用后面的第一条语句。 这个过程被称为栈解退。引发机制的一个
非常重要的特性是，和函数返回一样，对于栈中的自动类对象，类的析构函数将被调用。然而，函数返回仅仅处理该函数放在栈中的对象，而throw语句则处理try块和throw之间整个函数调用序列放在栈中的对象。

#### 其他异常特性

引发异常时编译器会创建异常对象的一个临时拷贝。之后异常对象将不复存在。

在捕获异常对象时通常使用引用`catch(problem & p)`。这样基类引用可以执行派生类对象。假设有一组通过继承关联起来的异常类型，则在异常规范中只需列出一个基类引用，它将与任何派生类对象匹配。

#### exception 类

c++还提供了所有异常的基类`exception`类，其位于exception头文件（以前为exception.h或except.h）。这个类有一个名为`what()`的虚拟成员函数，它返回一个字符串，可以在派生类中重新定义它。

```c++
class bad : public std::exception
{
    const char * whar() {return "bad";}
}
```

同时c++库定义了很多基于exception的异常类型。头文件`stdexcept`定义了`logic_error`和`runtime_error`类。同时基于这两个类派生出其他类：

异常类系列`logic_error`描述了典型的逻辑错误：

+ invalid_argument 参数错误
+ length_error 超长
+ out_of_bounds 超出索引范围

异常类系列`runtime_error`描述可能在运行期间发生但难以预防的错误:

+ range_error 数值超出范围
+ overflow_error 溢出

对于使用new导致的内存分配问题，C++的最新处理方式是让new引发`bad_alloc`异常。头文件new包含`bad_alloc`类的声明它是从exception类公有派生而来的。但在以前，当无法分配请求的内存量时，new返回一个空指针。

很多代码都是在new在失败时返回空指针时编写的，有些编译器提供了一个标记开关，让用户选择所需的行为：

``` c++
int * pi = new (std::nothrow) int;
```

#### 异常、类和继承

异常、类和继承以三种方式相互关联。首先，可以从一个异常类派生出另一个。其次，可以在类定义中嵌套异常类声明来组合异常，第三这种嵌套声明本身可被继承，还可用作基类。

#### 未知异常的处理

对于带规范列表的函数，抛出了不在规范列表中的异常称为意外异常。如果函数不带规范列表抛出的异常称为未捕获异常。

未捕获异常不会导致程序立刻异常终止。相反，程序将首先调用函数`terminate( )`。在默认情况下,`terminate( )`调用`abort( )`函数。可以指定`terminate( )`应调用的函数来修改`terminate( )`的这种行为。为此，可调用`set_terminate( )`函数。`set_terminate( )`和`terminate( )`都是在头文件`exception`中声明的:

```c++
typedef void (*terminate_ handler) ();
terminate_handler set_terminate (terminate_handler f) throw();   // C++98
terminate_handler set_terminate (terminate_handler f) noexcept;  // C++11
void terminate() ;          // C++98
void terminate{) noexcept ; // C++11
```
其中的`typedef`使`terminate_handler`成为这样一种类型的名称：指向没有参数和返回值的函数的指针。`set_terminate( )`函数将不带任何参数且返回类型为`void`的函数的名称(地址)作为参数，并返回该函数的地址。如果调用了`set_terminate( )`函数多次，则`terminate( )`将调用最后一次 `set_terminate( )`调用设置的函数。

如果发生意外异常，程序将调用`unexpected( )`函数。这个函数将调用`terminate( )`,也有一个可用于修改`unexpected( )`的行为的`set_unexpected( )`函数。这些新函数也是在头文件exception中声明的:

```c++
typedef void (*unexpected_handler) ();
unexpected_handler set_unexpected (unexpected_handler f) throw() ;  // C++98
unexpected_handler set_unexpected (unexpected_handler f) noexcept;  // C++11
void unexpected() ;         // C++98
void unexpected() noexcept; // C++11
```
然而，与提供给`set_terminate( )`的函数的行为相比，提供给`set_unexpected( )`的函数的行为受到更严格的限制。具体地说，`unexpected_handler`函数可以: 

+ 通过调用`terminate() (默认行为)`、`abort( )`或`exit( )`来终止程序
+ 引发异常。

引发异常的结果取决于`unexpected_handler`函数所引发的异常以及引发意外异常的函数的异常规范:

+ 如果新引发的异常与原来的异常规范匹配，则程序将从那里开始进行正常处理，即寻找与新引发的异常匹配的catch块。基本上，这种方法将用预期的异常取代意外异常
+ 如果新引发的异常与原来的异常规范不匹配，且异常规范中没有包括`std::bad_exception` 类型，则程序将调用`terminate( )`。`bad_exception` 是从`exception`派生而来的，其声明位于头文件exception中
+ 如果新引发的异常与原来的异常规范不匹配，且原来的异常规范中包含了`std::bad_exception` 类型，则不匹配的异常将被`std::bad_exception`异常所取代

### RTTI

RTTI是运行阶段类型识别(Runtime Type Identification) 的简称。RTTI旨在为程序在运行阶段确定对象的类型提供一种标准方式。在类的多重继承当中，RTTI可以帮助确定对象是否安全的转换成另一个类（基类转换成派生类），或判断一个对象当前的类型。

#### dynamic_cast 运算符

如果可能的话，`dynamic_cast`运算符将使用一个基类指针转换成派生类指针。否则返回0（空指针）

```c++
class Base{}                //基类
class Impl : public Base{}  //派生类
Impl ip = new Impl();
Base bp = new Base();
if(ip = dynamic_cast<Base *>(bp))   //尝试把基类指针转换成派生类指针
    ip->callMethod();
```
也可以将 `dynamic_ cast` 用于引用，其用法稍微有点不同：没有与空指针对应的引用值，因此无法使用特殊的引用值来指示失败。当请求不正确时，`dynamic_ cast` 将引发类型为`bad_ _cast` 的异常，这种异常是从`exception`类派生而来的，它是在头文件`typeinfo`中定义的。因此，可以像下面这样使用该运算符:

``` c++
#include <typeinfo> // for bad_cast
try {
 Impl & ir = dynamic_cast<Impl &>(br) ;
}
catch(bad_ cast &) {
};
```

#### typeid 运算符和 type_info 类

`typeid`运算符能够确定两个对象是否为同种类型。其返回一个对`type_info`对象的引用，`type_info`是在头文件`typeinfo`中定义的一个类，其重载了 `==` 和 `!=` 运算符。`type_info`类包含一个`name()`成员，改函数返回类名称。

``` c++
typeid(Impl) == typeid(*bp);
//如果bp是一个空指针，程序将引发bad_typeid异常，改异常从exception类派生而来，在头文件typeinfo中声明。
```

### 类型转换运算符

#### dynamic_cast

仅当Base是Impl的可访问基类时，才允许转换一个实现类指针到一个基类指针。

```c++
Impl impl;
Base * pb = dynamic_cast<Base *> impl;
```

#### const_cast

将一个原本非常量，后被转换成不可修改的常量指针转换为可以修改指针时使用。

```c++
Base b;
const Base * pb1 = &b;
Base * pb2 = const_cast<Base *>(pb1);
```

#### static_cast

用于转换两个可以隐式转换的类型的指针

```c++
Base base;
Impl impl;

Base * pb = static_cast<Base *>(&impl);
Impl * pi = static_cast<Impl *>(&base);
```

#### reinterpret_cast

一种依赖于底层实现的内存转换

```c++
struct dat {short a; short b;};
long value = 0xA224B118;
dat * pd = reinterpret_cast< dat * > (&value);
cout << hex << pd->a;   //value的前两个字节
```

## string类和标准模板库

string 类是由头文件 `string` 支持的(头文件 `string.h` 和 `cstring` 支持对C风格字符串进行操纵的C库字符串函数，但不支持string类)。

string 实际上是模板具体化 `basic_string<char>` 的一个typedef,同时省略了与内存管理相关的参数。同时`basic_stirng`有4个具体化：

``` c++
typedef basic_string<char> string;
typedef basic_string<wchar_t> wstring;
typedef basic_string<char16_t> ul6string; // C++11
typedef basic_string<char32_t> u32string;  // C++11
```

### 智能指针模板类

智能指针模板类可以帮助管理动态内存分配。当方法正常或异常终止时，自动释放临时变量指针指向的内存。

智能指针对象位于`memory`头文件中。通过定义类似指针的对象，将new获得的地址赋给对象，当智能指针过期时，析构函数使用delete来释放内存。c++98中提供了`auto_ptr`，但c++11将其弃用并提供了`unique_ptr`,`shared_ptr`模板类。

智能指针和普通指针之间使用如下方式进行赋值：

```c++
shared_ptr<double> tpd;
double * pd = new double;
tpd = pd;                       //不可以
tpd = shared_ptr<double>(pd);   //可以
shared_ptr<double> tpd1 = pd;   //不可以
shared_ptr<double> tpd1(pd);    //可以
```

当同类型智能指针互相赋值时，使同一个对象被智能指针释放两次。使用`auto_ptr`无法避免这种情况，因此会导致行为不确定，而`shared_ptr`通过引用计数可以避免对象被提前释放。`unique_ptr`会通过在编译时报错来避免发生，但作为返回对象时却允许通过编译，因为返回语句表明临时指针指针将不再访问对象。

标准库函数`std::move()`用于将一个`unique_ptr`智能指针赋给另一个`unique_ptr`智能指针。当`unique_ptr`为右值时，可将其赋给`shared_ptr`。

`auto_ptr`不支持`new []`，而`unique_ptr`同时支持`new`和`new []`。

当程序需要多个指向同一个对象的智能指针时，推荐使用`shared_ptr`。当程序不需要多个时，使用`unique_ptr`。

### 标准模板库

STL提供了一组表示容器、迭代器、函数对象和算法的模板。函数对象是类似于函数的对象，可以是类对象或函数指针（包括函数名，因为函数名被用作指针）。

STL中提供的模板基本都接受指定分配器来管理内存，例如`vector`模板：

```c++
//如果省略模板参数的值，将默认使用allocator分配器，它使用new和delete来管理内存
template <class T, class Allocator = allocator<T>>
```

在计算中，矢量(vector)对应数组。在头文件`vector`或`vector.h`中。

``` c++
#include vector
using namespace std;
vector<int> v(5);
cout << v[2];
```

对`vector`进行迭代:

```c++
vector<double>::iterator iter;
vector<double> scores;
auto iter2 = scores.begin();
for(iter=scores.begin();iter!=scores.end();iter++);
```

但是STL中的容器实现并不使用成员函数实现搜索、排序、随机排序能算法。而是使用非成员函数来实现，从而避免算法的重复造轮子。比如`for_each()`方法`sort()`方法。

建议优先使用`for(auto i:list)`其次`for_each()`等STL函数，其次才是使用迭代器。

### 泛型编程

#### 迭代器

模板使得算法独立于存储的数据类型，而迭代器使算法独立于使用的容器类型。因此迭代器是STL通用方法的重要组成部分。

STL 定义了5种迭代器：

+ 输入迭代器：从容器读取数据。单向迭代，可以递增，不能倒退。不能保证每次顺序一样。
+ 输出迭代器：修改容器内数据，但不能读。
+ 正向迭代器：只使用 `++` 运算符遍历容器。总是按相同的顺序遍历。可以读取和修改。
+ 双向迭代器：支持 `--` 运算符。
+ 随机访问迭代器
+ reverse_iterator：执行递增操作会反向迭代
+ back_iterator：将元素插入到容器尾部
+ front_insert_iterator：将元素插入到容器前端
+ insert_iterator：将元素插入到构造函数指定的位置前面

#### 容器

STL中提供的容器有：deque、list、queue、priority_queue、stack、vector、map、multimap、set、multiset、bitset，及C++11新增的：forward_list、unordered_map、unordered_multimap、unordered_set、unordered_multiset

+ vector：数组实现
+ deque：双端队列，在首位和末位添加删除时间都是固定的
+ list：链表实现，不支持随机访问
+ forward_list：单向链表，只支持正向迭代，不可翻转
+ queue：deque的适配器类，不允许随机访问队列和遍历队列。从队尾添加元素，从队首删除元素。查看队首和队尾的元素
+ priority_queue：vector的适配类，支持的操作与queue相同。最大的元素会被移到队首。
+ stack：vector的适配器类，不允许随机访问和遍历。只支持操作栈顶的值。
+ array：非STL容器，长度固定，不支持会调整容器大小的操作如insert。

关联容器将值与键关联，通过键来查找值。map和multimap使用`pair<const keytype,datatype>`来管理数据。

+ set：值与键相同，键唯一，可反转和排序，一个键对应一个值
+ multiset：值与键相同，键唯一，可反转和排序，一个键可对应多个值
+ map：值与键不同，键唯一，可反转和排序，一个键对应一个值
+ multimap：值与键不同，键唯一，可反转和排序，一个键对应多个值

### 函数对象

