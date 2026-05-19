---
title: C++ Primer Plus
categories:
- c++
description: 
permalink: "/posts/cplusplus-primer-plus"
excerpt: C++是在C语言基础上开发的一种集面向对象编程、泛型编程和过程化编程于一体的编程语言。本文系统介绍C++程序的运行机制、基本数据类型、复合数据类型、控制流语句、函数重载与函数模板、内存模型与命名空间、类的设计与使用、多态与虚函数、动态内存分配、继承机制、代码重用技术、友元函数、异常处理、string类与标准模板库、输入输出系统以及C++11/14/17/20新特性等内容。
---

## C++简介

C++融合了三种不同的编程范式：C语言代表的过程式编程、C++新增的类所支持的面向对象编程，以及模板技术支持的泛型编程。计算机语言需要处理两个核心概念：数据和算法。数据是程序操作和处理的信息，而算法是解决问题的具体方法和步骤。C语言作为过程式语言，主要关注算法的实现；面向对象编程（OOP）则更侧重于数据的组织和封装；泛型编程强调代码与特定数据类型的解耦。

C++的名称源自C语言中的递增运算符`++`，象征着它是C语言的增强版本和自然演进。C语言提供了底层的硬件访问能力，而面向对象编程则提供了更高层次的抽象机制。

### C++程序执行流程

C++程序的执行过程包含以下主要阶段：

1. **源代码编写**：使用文本编辑器创建C++源文件（通常为`.cpp`扩展名）
2. **编译阶段**：编译器将源代码翻译成目标机器代码，生成目标文件（`.obj`或`.o`文件）
3. **链接阶段**：链接器将目标文件与所需的库文件链接，生成可执行文件

![编程步骤](/assets/images/cplusplus-primer-plus/编译步骤.png)

### 编译和链接

早期的C++实现使用UNIX命令`CC`调用`cfront`编译器，将C++源代码转换为C源代码，然后使用标准C编译器进行编译。这种过渡方案简化了C++在C生态系统中的推广过程。在现代开发环境中，Linux系统通常使用`g++`编译器，而macOS系统主要使用`clang`编译器。

#### 开发环境术语说明

- **Compile（编译）**：通常指对当前打开的源文件进行编译操作
- **Build/Make（构建）**：编译项目中所有需要重新编译的源文件。这是一个增量过程，仅编译修改过的文件及其依赖文件
- **Build All（全部构建）**：重新编译项目中的所有源文件，无论是否已修改
- **Link（链接）**：将编译生成的目标文件与所需的库文件组合成可执行文件
- **Run/Execute（运行）**：执行程序。通常会在运行前自动完成编译和链接步骤
- **Debug（调试）**：以单步方式执行程序，支持断点设置和变量监视
- **编译配置**：编译器通常提供调试版本和发布版本的构建选项。调试版本包含额外的调试信息，程序体积较大且执行效率较低，但便于问题诊断；发布版本经过优化，体积小且执行效率高

### C++预处理器和头文件

C++中的头文件通过预处理器在实际编译之前被包含到源代码中。预处理器处理以`#`开头的指令，如`#include`、`#define`等。

### 头文件命名规范

C++的头文件命名遵循特定的规范：

- **C语言头文件**：以`.h`为扩展名，如`stdio.h`、`stdlib.h`
- **C++标准头文件**：没有扩展名，如`iostream`、`string`、`vector`
- **C兼容头文件**：C++提供了C语言标准库的C++版本，去掉`.h`扩展名并在前面加上`c`，如`cstdio`、`cstdlib`、`cmath`

### 命名空间

命名空间（Namespace）是C++为避免名称冲突而引入的机制。当多个库或模块定义了相同名称的标识符时，命名空间可以确保每个标识符的唯一性。

#### 命名空间使用方式

```cpp
// 完全限定名称
std::cout << "Hello World" << std::endl;

// using声明 - 引入特定名称
using std::cout;
using std::endl;
cout << "Hello World" << endl;

// using指令 - 引入整个命名空间
using namespace std;
cout << "Hello World" << endl;
```

#### 最佳实践建议

- 优先使用完全限定名称，提高代码可读性
- 在函数内部使用using声明，限制作用域
- 避免在头文件中使用using指令，防止命名空间污染

## 数据类型与字面量

### 整数字面量的进制表示

C++支持多种进制的整数字面量表示：

- **十进制**：以非零数字（1-9）开头，如`93`、`123`
- **八进制**：以数字0开头，后跟0-7的数字，如`042`（相当于十进制的34）
- **十六进制**：以`0x`或`0X`开头，后跟0-9和A-F的字符，如`0xFF`（相当于十进制的255）
- **二进制**（C++14新增）：以`0b`或`0B`开头，后跟0或1，如`0b1010`（相当于十进制的10）

#### 示例

```cpp
int decimal = 93;      // 十进制：93
int octal = 042;       // 八进制：34（十进制）
int hexadecimal = 0x5F; // 十六进制：95（十进制）
int binary = 0b1011;   // 二进制：11（十进制，C++14）
```

## 复合类型

### 数组初始化方法

C++提供了多种数组初始化方式：

```cpp
// 传统初始化方式
int array1[4] = {1, 2, 3, 4};

// 默认初始化（包含随机值）
int array2[4];

// C++11统一初始化
int array3[4] {1, 2, 3, 4};

// 值初始化（所有元素初始化为0）
int array4[4] {};

// 省略大小的初始化（编译器自动推断大小）
int array5[] = {1, 2, 3, 4, 5};

// 部分初始化（剩余元素初始化为0）
int array6[5] = {1, 2, 3}; // array6[3]和array6[4]为0
```

#### 注意事项

- 数组大小必须是常量表达式
- 初始化列表中的元素数量不能超过数组大小
- 未完全初始化的数组，剩余元素会被零初始化

### 字符串处理：C风格字符串与string类

#### C风格字符数组

```cpp
// 固定大小的字符数组
char name1[10] = "QuanLi";

// 编译器自动推断大小的字符数组
char name2[] = "QuanLi";  // 自动添加空字符'\0'

// 注意：需要预留空间给空字符
char name3[8] = "QuanLi";  // 正确：7个字符 + 1个空字符
// char name4[7] = "QuanLi";  // 错误：空间不足
```

#### C++ string类

C++98标准引入了`std::string`类，提供了更安全和便捷的字符串操作：

```cpp
#include <string>
#include <iostream>

int main() {
    // string对象的创建和初始化
    std::string str1 = "Hello";
    std::string str2("World");
    std::string str3(5, 'A');  // "AAAAA"

    // 字符串操作
    str1 += " " + str2;  // 拼接
    std::cout << str1.length() << std::endl;  // 获取长度

    return 0;
}
```

#### 头文件说明

- `<string>`：包含`std::string`类的定义
- `<cstring>`：包含C风格字符串操作函数（如`strlen`、`strcpy`等）

#### 优势对比

| 特性 | C风格字符数组 | std::string |
|------|-------------|------------|
| 内存管理 | 手动管理 | 自动管理 |
| 大小限制 | 固定大小 | 动态调整 |
| 操作便利性 | 需要函数调用 | 支持运算符重载 |
| 安全性 | 容易出现缓冲区溢出 | 边界检查，更安全 |

### 结构体（struct）

结构体是用户自定义的复合数据类型，用于将不同类型的数据组合成一个整体：

```cpp
#include <string>

struct Person {  // 在C++中，struct关键字可以省略
    std::string name;
    int age;
    double height;
};

// 结构体变量的声明和初始化
Person person1 = {"张三", 25, 175.5};        // 传统初始化
Person person2{"李四", 30, 180.0};          // C++11统一初始化
Person person3{.name = "王五", .age = 28};   // 指定成员初始化（C++20）

// 结构体数组
Person people[] = {
    {"赵六", 22, 170.0},
    {"钱七", 35, 182.5},
    {"孙八", 28, 176.8}
};
```

#### 成员访问

使用成员运算符`.`访问结构体成员：

```cpp
Person p = {"周九", 32, 178.2};
std::cout << "姓名: " << p.name << std::endl;
std::cout << "年龄: " << p.age << std::endl;
std::cout << "身高: " << p.height << std::endl;

// 通过指针访问结构体成员
Person* ptr = &p;
std::cout << "姓名: " << ptr->name << std::endl;  // 等价于 (*ptr).name
```

#### 结构体特点

- 结构体成员默认为`public`访问权限
- 支持成员函数（方法）
- 可以包含构造函数、析构函数
- 支持继承和多态

### 共用体（union）

共用体是一种特殊的数据结构，允许多个不同类型的变量共享同一块内存空间。在任何时刻，共用体只能存储其成员中的一个值，主要用于节省内存空间或实现类型转换。

#### 基本用法

```cpp
union ID {
    int int_val;
    long long_val;
    double double_val;
};

ID id;
id.int_val = 42;        // 存储整数值
std::cout << id.int_val << std::endl;  // 输出：42

id.long_val = 1000000;  // 现在存储长整数值
std::cout << id.long_val << std::endl;  // 输出：1000000
```

#### 匿名共用体

在结构体中使用匿名共用体可以简化访问：

```cpp
struct Product {
    int type;
    union {
        int int_id;
        long long_id;
        char char_id;
    };
};

Product product;
product.type = 1;
product.int_id = 12345;     // 直接访问，无需union名称

product.type = 2;
product.long_id = 67890;     // 直接访问
```

#### 应用场景

- **类型转换**：在不同数值类型间进行转换
- **内存优化**：当多个成员互斥使用时节省空间
- **硬件编程**：访问硬件寄存器的不同位域

#### 注意事项

- 共用体大小等于其最大成员的大小
- 同时只能访问一个成员，访问其他成员可能导致未定义行为
- 不能包含引用类型的成员
- 不能作为基类使用（C++11前），C++11后支持某些成员函数

### 枚举（enum）

枚举类型定义了一组命名的整型常量，用于表示有限的离散值集合。

#### 传统枚举（C风格）

```cpp
enum Color {red, black, yellow};  // red=0, black=1, yellow=2
enum Weekday {Monday=1, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday};

Color red_color = red;
Weekday today = Wednesday;  // Wednesday=3
```

#### 强类型枚举（C++11）

C++11引入了强类型枚举（`enum class`），提供了更好的类型安全：

```cpp
enum class Color {red, black, yellow};
enum class TrafficLight {red, yellow, green};

Color c = Color::red;              // 必须使用作用域解析运算符
TrafficLight light = TrafficLight::red;

// 不同枚举类型之间不能隐式转换
// if (c == light) { }  // 编译错误：类型不匹配

// 可以显式转换为整型
int color_value = static_cast<int>(c);  // 0
```

#### 枚举特性

```cpp
// 指定底层类型和初始值
enum class Status : uint8_t {
    OK = 0,
    ERROR = 1,
    WARNING = 2
};

// 前向声明
enum class Direction : int;  // C++11支持

// 定义
enum class Direction : int {
    NORTH = 0,
    EAST = 90,
    SOUTH = 180,
    WEST = 270
};
```

#### 优势对比

| 特性 | 传统枚举 | 强类型枚举 |
|------|---------|-----------|
| 作用域 | 全局作用域 | 枚举作用域 |
| 类型安全 | 可以隐式转换为int | 必须显式转换 |
| 前向声明 | 不支持 | 支持 |
| 底层类型 | 由实现定义 | 可指定 |
### 指针与动态内存管理

#### 指针基础

指针是存储内存地址的变量，是C++中强大的特性之一：

```cpp
int value = 42;
int* ptr;           // 指针声明
ptr = &value;       // 取址运算符：获取变量的地址
int result = *ptr;  // 解引用运算符：访问指针指向的值
```

#### 动态内存分配

C++提供了`new`和`delete`运算符进行动态内存管理：

```cpp
// 单个变量的动态分配
int* ptr = new int(42);    // 分配并初始化
delete ptr;                // 释放内存

// 数组的动态分配
int* array = new int[10];   // 分配数组
delete[] array;            // 释放数组（必须使用delete[]）

// 对象的动态分配
Person* person = new Person("张三", 25);
delete person;              // 自动调用析构函数
```

#### 内存存储类别

C++中的变量根据存储类别分为三类：

1. **自动存储（Automatic Storage）**
   - 函数内部的局部变量
   - 函数调用时创建，返回时销毁
   - 通常存储在栈上

2. **静态存储（Static Storage）**
   - 全局变量、静态变量
   - 程序启动时创建，结束时销毁
   - 存储在数据段中

3. **动态存储（Dynamic Storage）**
   - 使用`new`分配的内存
   - 显式控制生命周期
   - 存储在堆上

#### 智能指针（现代C++推荐）

现代C++推荐使用智能指针管理动态内存：

```cpp
#include <memory>

// unique_ptr：独占所有权
std::unique_ptr<int> uptr = std::make_unique<int>(42);

// shared_ptr：共享所有权
std::shared_ptr<Person> sptr = std::make_shared<Person>("李四", 30);

// 自动内存管理，无需手动delete
```

### 现代数组替代方案

#### std::vector（C++98）

`std::vector`是动态数组容器，提供自动内存管理和丰富的操作：

```cpp
#include <vector>
#include <iostream>

int main() {
    // 创建和初始化
    std::vector<int> vec1;                    // 空向量
    std::vector<int> vec2(5);                 // 5个元素，默认值0
    std::vector<int> vec3(5, 42);            // 5个元素，值都是42
    std::vector<int> vec4 = {1, 2, 3, 4, 5}; // 初始化列表

    // 基本操作
    vec1.push_back(10);    // 添加元素
    vec1.pop_back();       // 删除最后一个元素
    vec1.size();          // 获取元素数量
    vec1.capacity();      // 获取容量
    vec1.resize(10);      // 调整大小

    // 访问元素
    vec2[0] = 100;      // 不进行边界检查
    vec2.at(0) = 200;    // 进行边界检查

    return 0;
}
```

#### std::array（C++11）

`std::array`是固定大小数组的封装，提供栈存储和STL接口：

```cpp
#include <array>
#include <iostream>

int main() {
    // 创建和初始化
    std::array<int, 5> arr1 = {1, 2, 3, 4, 5};
    std::array<int, 5> arr2;              // 未初始化
    std::array<int, 5> arr3{};             // 值初始化（全为0）

    // 基本操作
    arr1.size();        // 获取大小（编译时常量）
    arr1.max_size();   // 获取最大大小
    arr1.empty();      // 检查是否为空
    arr1.fill(42);     // 填充所有元素

    // 访问元素
    arr1[0] = 100;     // 不进行边界检查
    arr1.at(0) = 200;   // 进行边界检查

    // 迭代器支持
    for (const auto& val : arr1) {
        std::cout << val << " ";
    }

    return 0;
}
```

#### 对比分析

| 特性 | std::vector | std::array | C数组 |
|------|-----------|-----------|--------|
| 存储位置 | 堆 | 栈 | 栈 |
| 大小 | 动态可变 | 固定（编译时） | 固定（编译时） |
| 性能 | 稍低（堆分配） | 高（栈分配） | 最高 |
| 安全性 | 边界检查可选 | 边界检查可选 | 无边界检查 |
| STL兼容 | 完全兼容 | 完全兼容 | 有限兼容 |

#### 使用建议

- **std::vector**：需要动态大小或大量数据时使用
- **std::array**：大小固定且需要STL接口时使用
- **C数组**：性能要求极高且大小固定时使用

## 控制流语句

### 范围for循环（C++11）

C++11引入的范围for循环简化了容器和数组的遍历：

```cpp
#include <vector>
#include <iostream>

int main() {
    // 遍历数组
    int arr[] = {4, 5, 22};
    for (int value : arr) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    // 遍历初始化列表
    for (int value : {1, 3, 5, 7, 9}) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    // 遍历vector
    std::vector<std::string> words = {"Hello", "World", "C++"};
    for (const std::string& word : words) {
        std::cout << word << " ";
    }
    std::cout << std::endl;

    // 使用auto简化类型声明
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

#### 语法要点

```cpp
// 基本语法
for (declaration : range_expression) {
    // 循环体
}

// 常用形式
for (auto value : container)           // 按值拷贝
for (const auto& value : container)    // 常量引用（推荐）
for (auto& value : container)          // 可修改引用
```

### 逻辑运算符

C++支持两种逻辑运算符表示法：

#### 符号表示法（传统）

```cpp
bool result1 = (a > 0) && (b < 10);  // 逻辑与
bool result2 = (a == 0) || (b == 0);  // 逻辑或
bool result3 = !(a > 0);              // 逻辑非
```

#### 关键字表示法（可读性更强）

```cpp
#include <iso646.h>  // C语言需要，C++可选

bool result1 = (a > 0) and (b < 10);  // 等价于 &&
bool result2 = (a == 0) or (b == 0);   // 等价于 ||
bool result3 = not (a > 0);             // 等价于 !
```

#### 完整逻辑运算符列表

| 运算符 | 符号 | 关键字 | 含义 |
|--------|------|--------|------|
| 逻辑与 | `&&` | `and` | 两边都为真时结果为真 |
| 逻辑或 | `||` | `or` | 两边至少一个为真时结果为真 |
| 逻辑非 | `!` | `not` | 操作数的逻辑值取反 |
| 位与 | `&` | `bitand` | 按位与运算 |
| 位或 | `|` | `bitor` | 按位或运算 |
| 位异或 | `^` | `xor` | 按位异或运算 |
| 位非 | `~` | `compl` | 按位取反运算 |

#### 短路求值

逻辑与和逻辑或具有短路求值特性：

```cpp
// 短路求值示例
if (ptr != nullptr and *ptr > 0) {
    // 如果ptr为nullptr，不会执行*ptr
}

// 函数调用短路
if (condition1() or condition2()) {
    // 如果condition1()返回true，不会调用condition2()
}
```

## 函数

### 函数指针

函数指针是指向函数的指针变量，允许在运行时动态选择要调用的函数。

#### 函数指针的基本概念

```cpp
#include <iostream>

// 目标函数
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    // 函数指针声明
    int (*operation)(int, int);

    // 函数指针赋值
    operation = add;           // 函数名自动转换为函数指针
    std::cout << operation(5, 3) << std::endl;  // 输出：8

    operation = multiply;
    std::cout << operation(5, 3) << std::endl;  // 输出：15

    // 直接调用（三种方式等价）
    std::cout << (*operation)(5, 3) << std::endl;  // 传统方式
    std::cout << operation(5, 3) << std::endl;     // 现代方式

    return 0;
}
```

#### 函数指针的类型推导（C++11）

```cpp
// 使用auto自动推导函数指针类型
auto operation = add;  // operation的类型为 int(*)(int, int)

// 使用decltype获取函数类型
decltype(add) *ptr = add;
```

#### typedef和using简化声明

```cpp
// 传统typedef方式
typedef int (*OperationFunc)(int, int);
OperationFunc op1 = add;

// 现代using方式（C++11）
using OperationFunc2 = int(*)(int, int);
OperationFunc2 op2 = multiply;
```

#### 函数指针作为参数

```cpp
#include <algorithm>
#include <vector>

// 接受函数指针的函数
void processNumbers(const std::vector<int>& nums,
                  int (*operation)(int)) {
    for (int num : nums) {
        std::cout << operation(num) << " ";
    }
    std::cout << std::endl;
}

// 辅助函数
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    processNumbers(numbers, square);  // 1 4 9 16 25
    processNumbers(numbers, cube);    // 1 8 27 64 125

    return 0;
}
```

#### 函数指针数组

```cpp
#include <iostream>

// 定义函数类型
typedef int (*MathOperation)(int, int);

// 目标函数
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main() {
    // 函数指针数组
    MathOperation operations[] = {add, subtract, multiply, divide};

    for (int i = 0; i < 4; ++i) {
        std::cout << "10 op 5 = " << operations[i](10, 5) << std::endl;
    }

    return 0;
}
```

### 内联函数

内联函数是一种编译器优化技术，通过在调用点直接展开函数体来消除函数调用的开销。

#### 内联函数的基本用法

```cpp
#include <iostream>

// 内联函数定义
inline int square(int x) {
    return x * x;
}

inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int result = square(5);      // 可能被展开为：int result = 5 * 5;
    int maximum = max(10, 20); // 可能被展开为：int maximum = (10 > 20) ? 10 : 20;

    std::cout << "Square: " << result << std::endl;
    std::cout << "Maximum: " << maximum << std::endl;

    return 0;
}
```

#### 内联函数与宏的对比

| 特性 | 内联函数 | 宏 |
|------|---------|-----|
| 类型安全 | 是 | 否 |
| 调试支持 | 支持 | 不支持 |
| 参数求值 | 正确求值一次 | 可能多次求值 |
| 作用域规则 | 遵循 | 不遵循 |
| 错误检查 | 编译器检查 | 预处理器检查 |

#### 宏的问题示例

```cpp
// 宏定义
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int x = 5;
    int result1 = SQUARE(++x);  // 展开为：((++x) * (++x))，结果可能不是36
    std::cout << "Macro result: " << result1 << std::endl;

    int y = 10, z = 20;
    int result2 = MAX(y++, z++);  // 副作用：y和z被多次递增
    std::cout << "Macro max: " << result2 << std::endl;

    return 0;
}
```

#### 内联函数的正确实现

```cpp
// 内联函数版本
inline int squareInline(int x) {
    return x * x;
}

inline int maxInline(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 5;
    int result1 = squareInline(++x);  // 参数只求值一次，结果正确为36
    std::cout << "Inline result: " << result1 << std::endl;

    int y = 10, z = 20;
    int result2 = maxInline(y++, z++);  // 无意外副作用
    std::cout << "Inline max: " << result2 << std::endl;

    return 0;
}
```

#### 内联函数的注意事项

1. **编译器决定权**：`inline`只是建议，编译器可以忽略
2. **函数定义位置**：内联函数通常在头文件中定义
3. **适用场景**：适合短小、频繁调用的函数
4. **调试影响**：调试时可能禁用内联
5. **代码膨胀**：过度使用可能导致代码体积增大

#### 现代C++替代方案

```cpp
// constexpr函数（C++11）：编译时常量表达式
constexpr int squareConstexpr(int x) {
    return x * x;
}

// Lambda表达式（C++11）：局部内联函数
auto squareLambda = [](int x) { return x * x; };

// 模板函数：泛型内联
template<typename T>
inline T squareGeneric(T x) {
    return x * x;
}
```

### 引用（Reference）

引用是C++中重要的特性，为已存在的变量提供别名。引用必须在声明时初始化，且不能重新绑定到其他变量。

#### 引用的基本语法

```cpp
#include <iostream>

int main() {
    int value = 42;
    int& ref = value;  // ref是value的引用（别名）

    std::cout << "value: " << value << std::endl;  // 42
    std::cout << "ref: " << ref << std::endl;      // 42

    ref = 100;  // 修改引用会影响原变量
    std::cout << "value after modification: " << value << std::endl;  // 100

    return 0;
}
```

#### 引用作为函数参数

引用参数允许函数直接操作原始数据，避免拷贝开销：

```cpp
#include <iostream>
#include <string>

// 交换两个整数
void swapInt(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 处理大对象
void processString(std::string& str) {
    str += " (processed)";
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before swap: x=" << x << ", y=" << y << std::endl;
    swapInt(x, y);
    std::cout << "After swap: x=" << x << ", y=" << y << std::endl;

    std::string text = "Hello";
    processString(text);
    std::cout << "Processed: " << text << std::endl;

    return 0;
}
```

#### const引用参数

`const`引用提供了更灵活的参数传递：

```cpp
#include <iostream>

// 接受const引用，可以处理多种实参类型
void printValue(const int& value) {
    std::cout << "Value: " << value << std::endl;
}

int main() {
    int x = 42;
    const int y = 100;

    printValue(x);        // 普通变量
    printValue(y);        // const变量
    printValue(123);      // 字面量（生成临时变量）
    printValue(x + 10);   // 表达式结果（生成临时变量）

    return 0;
}
```

#### const引用的优势

1. **防止意外修改**：编译器确保函数不会修改参数
2. **接受多种实参**：变量、const变量、字面量、表达式
3. **临时变量生成**：自动处理类型转换和临时对象
4. **性能优化**：避免不必要的拷贝操作

#### 引用作为返回值

返回引用可以避免拷贝，但需要注意生命周期：

```cpp
#include <iostream>

class DataHolder {
private:
    int data[5] = {10, 20, 30, 40, 50};
public:
    // 正确：返回成员的引用
    int& getElement(int index) {
        return data[index];
    }

    // 错误：返回局部变量的引用
    int& getWrongValue() {
        int local = 999;
        return local;  // 危险：局部变量即将被销毁
    }

    // 正确：返回静态变量的引用
    static int& getStaticValue() {
        static int static_value = 888;
        return static_value;
    }
};

int main() {
    DataHolder holder;

    // 正确使用
    holder.getElement(2) = 300;  // 修改第三个元素
    std::cout << "Element 2: " << holder.getElement(2) << std::endl;

    return 0;
}
```

#### const成员函数中的const

```cpp
class MyClass {
private:
    int value;
public:
    // const成员函数：不修改对象状态
    const int& getValue() const {
        return value;  // 返回const引用
    }

    // 非const成员函数：可以修改对象
    int& getValue() {
        return value;  // 返回可修改引用
    }
};
```

#### 引用的应用场景

- **函数参数传递**：避免大型对象拷贝
- **函数返回值**：返回对象成员的引用
- **范围for循环**：使用`const auto&`避免拷贝
- **运算符重载**：实现链式操作
- **STL容器访问**：如`vector::operator[]`返回引用

### 函数模板

函数模板是C++泛型编程的基础，允许编写与类型无关的函数。

#### 基本函数模板语法

```cpp
#include <iostream>

// 基本函数模板
template<typename T>  // typename可替换为class，建议使用typename
void swap(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

// 多参数模板
template<typename T, typename U>
T add(T a, U b) {
    return a + b;
}

int main() {
    int x = 10, y = 20;
    double d1 = 3.14, d2 = 2.86;

    swap(x, y);  // 自动推导为swap<int>
    std::cout << "x: " << x << ", y: " << y << std::endl;

    auto result = add(d1, d2);  // 自动推导返回类型
    std::cout << "Sum: " << result << std::endl;

    return 0;
}
```

#### 模板特化

当模板对特定类型需要特殊处理时，可以使用模板特化：

```cpp
#include <iostream>
#include <cstring>

// 通用模板
template<typename T>
bool compare(const T& a, const T& b) {
    return a < b;
}

// 对const char*的特化
template<>
bool compare<const char*>(const char* const& a, const char* const& b) {
    return strcmp(a, b) < 0;
}

int main() {
    int x = 10, y = 20;
    std::cout << "10 < 20: " << compare(x, y) << std::endl;

    const char* str1 = "apple";
    const char* str2 = "banana";
    std::cout << "apple < banana: " << compare(str1, str2) << std::endl;

    return 0;
}
```

#### 模板实例化

```cpp
// 显式实例化：告诉编译器生成特定版本的函数
template int max<int>(int, int);
template double max<double>(double, double);

// 显式特化：为特定类型提供专门实现
template<>
int max<int>(int a, int b) {
    std::cout << "Using int specialization" << std::endl;
    return (a > b) ? a : b;
}
```

#### 函数模板重载解析

编译器按以下步骤选择最佳函数版本：

1. **创建候选函数列表**
   - 所有同名的非模板函数
   - 所有可以实例化的模板函数
   - 所有显式特化的函数

2. **筛选可行函数**
   - 参数数量匹配
   - 存在隐式转换序列
   - 考虑类型转换的可能性

3. **选择最佳匹配**
   - 精确匹配优于需要转换的匹配
   - 特化版本优于通用模板版本
   - 非模板函数优于模板函数（其他条件相同时）

#### 重载解析示例

```cpp
#include <iostream>

// 非模板函数
void process(int value) {
    std::cout << "Non-template: " << value << std::endl;
}

// 模板函数
template<typename T>
void process(T value) {
    std::cout << "Template: " << value << std::endl;
}

// 特化版本
template<>
void process<double>(double value) {
    std::cout << "Specialized: " << value << std::endl;
}

int main() {
    process(42);        // 调用非模板函数
    process(3.14);      // 调用特化版本
    process("Hello");     // 调用通用模板

    return 0;
}
```

#### 模板参数推导规则

```cpp
template<typename T>
void func(T param);

int main() {
    int x = 42;
    const int cx = x;
    int& rx = x;

    func(x);   // T推导为int
    func(cx);  // T推导为int（忽略const）
    func(rx);  // T推导为int（忽略引用）

    // 如果需要保持const和引用
    template<typename T>
    void func2(const T& param);

    func2(x);   // T推导为int
    func2(cx);  // T推导为int
    func2(rx);  // T推导为int
}
```

## 内存模型与命名空间

### 存储说明符与cv限定符

#### 存储说明符

存储说明符决定了变量的生命周期、作用域和存储位置：

```cpp
#include <iostream>

void demonstrateStorage() {
    // auto存储说明符（默认，可省略）
    auto int localVar = 42;  // 等价于：int localVar = 42;

    // register存储说明符（建议存储在寄存器中）
    register int counter = 0;  // 现代编译器可能忽略

    // static存储说明符
    static int staticVar = 100;  // 函数调用间保持值

    // thread_local存储说明符（C++11）
    thread_local int threadVar = 200;  // 每个线程独立实例
}

// extern存储说明符（在其他文件中定义）
extern int globalVariable;  // 声明外部变量

// static全局变量（文件作用域）
static int fileStatic = 300;  // 只在当前文件中可见
```

#### cv限定符（const-volatile限定符）

```cpp
// const限定符：定义常量
const int MAX_SIZE = 100;
const double PI = 3.14159;

// volatile限定符：防止编译器优化
volatile int hardwareRegister;  // 硬件寄存器
volatile bool flag = false;      // 可能被其他线程修改

// const volatile组合
const volatile int timeCounter;  // 只读但可能被外部修改
```

#### mutable限定符

用于类的成员变量，允许在const成员函数中修改：

```cpp
class DataCache {
private:
    mutable int accessCount = 0;  // 可在const方法中修改
    mutable bool cached = false;
    mutable double cachedValue;

    double expensiveCalculation() const {
        if (!cached) {
            cachedValue = performHeavyCalculation();
            cached = true;
        }
        accessCount++;
        return cachedValue;
    }
};
```

#### static关键字的多种用途

```cpp
#include <iostream>

// 1. 全局静态变量（内部链接）
static int globalCounter = 0;  // 只在当前文件中可见

void functionWithStatic() {
    // 2. 局部静态变量
    static int localStatic = 0;  // 函数调用间保持值
    localStatic++;
    std::cout << "Local static: " << localStatic << std::endl;
}

class MyClass {
private:
    // 3. 类静态成员（所有对象共享）
    static int classCounter;

public:
    // 4. 静态成员函数
    static void staticMethod() {
        std::cout << "Class counter: " << classCounter << std::endl;
    }

    // 5. 静态局部变量（成员函数中）
    void methodWithStatic() const {
        static int methodStatic = 0;
        methodStatic++;
        std::cout << "Method static: " << methodStatic << std::endl;
    }
};

// 初始化静态成员
int MyClass::classCounter = 0;

int main() {
    functionWithStatic();  // Local static: 1
    functionWithStatic();  // Local static: 2

    MyClass obj1, obj2;
    obj1.methodWithStatic();  // Method static: 1
    obj2.methodWithStatic();  // Method static: 2

    MyClass::staticMethod();  // Class counter: 0

    return 0;
}
```

### 定位new运算符

定位new（Placement new）允许在预分配的内存地址上构造对象，这种内存不受`delete`直接控制。

#### 定位new的基本用法

```cpp
#include <iostream>
#include <new>

class MyClass {
private:
    int value;
public:
    MyClass(int v) : value(v) {
        std::cout << "Constructor called with value: " << value << std::endl;
    }
    ~MyClass() {
        std::cout << "Destructor called for value: " << value << std::endl;
    }
    void display() const {
        std::cout << "Value: " << value << std::endl;
    }
};

int main() {
    // 预分配内存缓冲区
    char buffer1[sizeof(MyClass)];
    char buffer2[sizeof(MyClass) * 3];

    // 在指定位置构造单个对象
    MyClass* p1 = new (buffer1) MyClass(42);
    p1->display();

    // 在指定位置构造数组对象
    MyClass* p2 = new (buffer2) MyClass[3];
    for (int i = 0; i < 3; ++i) {
        p2[i].display();
    }

    // 注意：不能直接使用delete释放定位new的对象
    // 需要显式调用析构函数
    p1->~MyClass();
    for (int i = 0; i < 3; ++i) {
        p2[i].~MyClass();
    }

    return 0;
}
```

#### 定位new的应用场景

```cpp
#include <iostream>
#include <vector>
#include <new>

// 1. 内存池管理
class MemoryPool {
private:
    char* pool;
    size_t poolSize;
    size_t offset;
public:
    MemoryPool(size_t size) : poolSize(size), offset(0) {
        pool = new char[poolSize];
    }

    ~MemoryPool() {
        delete[] pool;
    }

    void* allocate(size_t size) {
        if (offset + size > poolSize) {
            return nullptr;
        }
        void* ptr = pool + offset;
        offset += size;
        return ptr;
    }
};

// 2. 自定义容器中的对象构造
template<typename T>
class CustomContainer {
private:
    char* data;
    size_t capacity;
    size_t size;
public:
    CustomContainer(size_t cap) : capacity(cap), size(0) {
        data = new char[capacity * sizeof(T)];
    }

    T& emplace_back(const T& value) {
        T* ptr = new (data + size * sizeof(T)) T(value);
        ++size;
        return *ptr;
    }

    T& operator[](size_t index) {
        return *reinterpret_cast<T*>(data + index * sizeof(T));
    }
};

int main() {
    // 内存池示例
    MemoryPool pool(1024);
    int* pooledInt = new (pool.allocate(sizeof(int))) int(100);
    std::cout << "Pooled int: " << *pooledInt << std::endl;

    // 自定义容器示例
    CustomContainer<int> container(5);
    container.emplace_back(10);
    container.emplace_back(20);
    container.emplace_back(30);

    for (size_t i = 0; i < 3; ++i) {
        std::cout << "Container[" << i << "]: " << container[i] << std::endl;
    }

    return 0;
}
```

#### 定位new的注意事项

1. **内存管理责任**：程序员负责内存分配和释放
2. **析构函数调用**：必须显式调用析构函数
3. **对齐要求**：确保内存地址满足类型对齐要求
4. **异常安全**：构造函数抛出异常时的处理
5. **数组版本**：需要额外的空间存储数组大小信息

#### 异常安全的定位new使用

```cpp
#include <iostream>
#include <new>
#include <stdexcept>

class SafeConstructor {
private:
    int* data;
public:
    SafeConstructor(int size) {
        if (size <= 0) {
            throw std::invalid_argument("Size must be positive");
        }
        data = new int[size];
        std::cout << "SafeConstructor successful" << std::endl;
    }

    ~SafeConstructor() {
        delete[] data;
        std::cout << "SafeConstructor destructor" << std::endl;
    }
};

int main() {
    char buffer[sizeof(SafeConstructor)];

    try {
        // 可能抛出异常的构造
        SafeConstructor* obj = new (buffer) SafeConstructor(-1);
        // 如果成功，需要手动调用析构函数
        obj->~SafeConstructor();
    } catch (const std::exception& e) {
        std::cout << "Exception caught: " << e.what() << std::endl;
        // 构造失败，无需调用析构函数
    }

    return 0;
}
```
## 命名空间

命名空间（Namespace）是C++用于组织代码和避免名称冲突的机制。命名空间可以在全局作用域中定义，也可以嵌套在其他命名空间中，但不能在函数内部定义。

#### 命名空间的定义与使用

```cpp
#include <iostream>

// 基本命名空间定义
namespace MyNamespace {
    double PI = 3.14159;
    int counter = 0;

    void increment() {
        counter++;
    }

    int getCounter() {
        return counter;
    }
}

// 扩展现有命名空间
namespace MyNamespace {
    struct Point {
        double x, y;
    };

    Point createPoint(double x, double y) {
        return {x, y};
    }
}

// 嵌套命名空间
namespace OuterNamespace {
    int outerValue = 100;

    namespace InnerNamespace {
        int innerValue = 200;
        void display() {
            std::cout << "Inner: " << innerValue << std::endl;
            std::cout << "Outer: " << outerValue << std::endl;
        }
    }
}

// 命名空间实现
namespace MyNamespace {
    void increment() {
        counter++;
        std::cout << "Counter incremented to: " << counter << std::endl;
    }
}

int main() {
    // 完全限定名称访问
    std::cout << "PI: " << MyNamespace::PI << std::endl;
    MyNamespace::increment();
    std::cout << "Counter: " << MyNamespace::getCounter() << std::endl;

    // 访问嵌套命名空间
    OuterNamespace::InnerNamespace::display();

    return 0;
}
```

#### using声明与using指令

```cpp
#include <iostream>
#include <string>

namespace Graphics {
    void drawLine() {
        std::cout << "Drawing line" << std::endl;
    }

    void drawCircle() {
        std::cout << "Drawing circle" << std::endl;
    }

    namespace Colors {
        std::string RED = "#FF0000";
        std::string BLUE = "#0000FF";
    }
}

void demonstrateUsing() {
    // using声明：引入特定名称
    using Graphics::drawLine;
    drawLine();  // 直接使用，无需限定符

    // using指令：引入整个命名空间
    using namespace Graphics;
    drawCircle();  // 直接使用

    // 使用嵌套命名空间的名称
    using Graphics::Colors::RED;
    std::cout << "Red color: " << RED << std::endl;
}
```

#### 全局作用域访问

```cpp
#include <iostream>

int globalVar = 100;

void accessGlobal() {
    int globalVar = 200;  // 局部变量隐藏全局变量

    std::cout << "Local: " << globalVar << std::endl;      // 200
    std::cout << "Global: " << ::globalVar << std::endl;     // 100
}
```

#### 命名空间别名

```cpp
// 创建命名空间别名
namespace NS = MyNamespace;
namespace GraphicsNS = Graphics;
namespace ColorNS = Graphics::Colors;

// 使用别名
NS::increment();
auto red = ColorNS::RED;
```

#### 匿名命名空间

```cpp
namespace {
    // 匿名命名空间中的名称具有内部链接属性
    int internalCounter = 0;
    void internalFunction() {
        std::cout << "Internal function" << std::endl;
    }
}

// 在同一文件中可以直接访问
void useAnonymousNamespace() {
    internalFunction();
    internalCounter++;
}
```

#### 命名空间最佳实践

1. **合理组织**：按功能模块组织命名空间
2. **避免污染**：优先使用using声明而非using指令
3. **头文件谨慎**：避免在头文件中使用using指令
4. **命名规范**：使用描述性的命名空间名称
5. **嵌套控制**：避免过深的命名空间嵌套

#### 实际应用示例

```cpp
// 数学计算命名空间
namespace Math {
    namespace Constants {
        const double PI = 3.14159265359;
        const double E = 2.71828182846;
    }

    namespace Geometry {
        struct Circle {
            double radius;
            double area() const {
                return Constants::PI * radius * radius;
            }
        };
    }
}

// 网络编程命名空间
namespace Network {
    namespace HTTP {
        enum class Method { GET, POST, PUT, DELETE };

        class Request {
        public:
            Method method;
            std::string url;

            Request(Method m, const std::string& u)
                : method(m), url(u) {}
        };
    }
}

int main() {
    using namespace Math::Constants;
    using Math::Geometry::Circle;

    Circle circle{5.0};
    std::cout << "Circle area: " << circle.area() << std::endl;
    std::cout << "PI value: " << PI << std::endl;

    return 0;
}
```


## 类与对象

### 构造函数与析构函数

构造函数负责对象的初始化，析构函数负责对象的清理工作。

#### 构造函数的基本语法

```cpp
#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;
    double height;

public:
    // 默认构造函数
    Person() : name("Unknown"), age(0), height(0.0) {
        std::cout << "Default constructor called" << std::endl;
    }

    // 参数化构造函数
    Person(const std::string& n, int a, double h)
        : name(n), age(a), height(h) {
        std::cout << "Parameterized constructor called" << std::endl;
    }

    // 委托构造函数（C++11）
    Person(const std::string& n, int a)
        : Person(n, a, 0.0) {
        std::cout << "Delegating constructor called" << std::endl;
    }

    // 拷贝构造函数
    Person(const Person& other)
        : name(other.name), age(other.age), height(other.height) {
        std::cout << "Copy constructor called" << std::endl;
    }

    // 析构函数
    ~Person() {
        std::cout << "Destructor called for: " << name << std::endl;
    }

    void display() const {
        std::cout << "Name: " << name << ", Age: " << age
                  << ", Height: " << height << std::endl;
    }
};

int main() {
    Person p1;                                    // 默认构造函数
    Person p2("Alice", 25, 165.5);              // 参数化构造函数
    Person p3("Bob", 30);                          // 委托构造函数
    Person p4 = p2;                                // 拷贝构造函数

    p1.display();
    p2.display();
    p3.display();
    p4.display();

    return 0;
}
```

#### 对象创建方式

```cpp
class MyClass {
private:
    int value;
public:
    MyClass(int v = 0) : value(v) {}
    void display() const { std::cout << "Value: " << value << std::endl; }
};

int main() {
    // 1. 直接初始化
    MyClass obj1(42);

    // 2. 拷贝初始化
    MyClass obj2 = obj1;

    // 3. 赋值初始化
    MyClass obj3;
    obj3 = obj1;

    // 4. C++11统一初始化
    MyClass obj4{100};

    // 5. 动态分配
    MyClass* ptr = new MyClass(200);
    ptr->display();
    delete ptr;

    // 6. 临时对象
    MyClass(300).display();  // 临时对象，表达式结束后销毁

    return 0;
}
```

#### 特殊成员函数

```cpp
class SpecialFunctions {
private:
    int* data;
    size_t size;

public:
    // 默认构造函数
    SpecialFunctions() : data(nullptr), size(0) {}

    // 参数化构造函数
    explicit SpecialFunctions(size_t s) : size(s) {
        data = new int[size];
        std::cout << "Parameterized constructor" << std::endl;
    }

    // 析构函数
    ~SpecialFunctions() {
        delete[] data;
        std::cout << "Destructor called" << std::endl;
    }

    // 拷贝构造函数
    SpecialFunctions(const SpecialFunctions& other) : size(other.size) {
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = other.data[i];
        }
        std::cout << "Copy constructor" << std::endl;
    }

    // 移动构造函数（C++11）
    SpecialFunctions(SpecialFunctions&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        std::cout << "Move constructor" << std::endl;
    }

    // 拷贝赋值运算符
    SpecialFunctions& operator=(const SpecialFunctions& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (size_t i = 0; i < size; ++i) {
                data[i] = other.data[i];
            }
        }
        std::cout << "Copy assignment" << std::endl;
        return *this;
    }

    // 移动赋值运算符（C++11）
    SpecialFunctions& operator=(SpecialFunctions&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        std::cout << "Move assignment" << std::endl;
        return *this;
    }

    void display() const {
        std::cout << "Size: " << size << ", Data: [";
        for (size_t i = 0; i < size; ++i) {
            std::cout << data[i];
            if (i < size - 1) std::cout << ", ";
        }
        std::cout << "]" << std::endl;
    }
};
```

#### 构造函数规则

1. **默认构造函数**：如果没有定义任何构造函数，编译器会生成默认构造函数
2. **拷贝构造函数**：如果没有定义，编译器会生成默认拷贝构造函数
3. **析构函数**：如果没有定义，编译器会生成默认析构函数
4. **`= default`和`= delete`（C++11）**：
   ```cpp
   class MyClass {
   public:
       MyClass() = default;                    // 使用默认实现
       MyClass(const MyClass&) = delete;           // 禁用拷贝构造
       MyClass& operator=(const MyClass&) = delete; // 禁用拷贝赋值
   };
   ```

#### 构造函数初始化列表

```cpp
class InitializationExample {
private:
    const int constValue;
    int& refValue;
    int member1, member2;

public:
    InitializationExample(int cv, int& rv, int m1, int m2)
        : constValue(cv),           // 必须：const成员
          refValue(rv),             // 必须：引用成员
          member1(m1),             // 推荐：所有成员
          member2(m2) {
        // 构造函数体
    }
};
```

#### 析构函数注意事项

```cpp
class DestructorExample {
private:
    int* dynamicData;

public:
    DestructorExample(size_t size) {
        dynamicData = new int[size];
        std::cout << "Constructor: allocated " << size << " integers" << std::endl;
    }

    ~DestructorExample() {
        delete[] dynamicData;
        std::cout << "Destructor: deallocated memory" << std::endl;
    }

    // 析构函数应该是虚函数（用于多态）
    virtual ~DestructorExample() {
        // 虚析构函数确保通过基类指针删除派生类对象时
        // 派生类的析构函数会被正确调用
    }
};
```



## 运算符重载

运算符重载允许为自定义类型定义运算符的行为，使代码更加直观和自然。

### 运算符重载的基本语法

```cpp
#include <iostream>

class Vector2D {
private:
    double x, y;

public:
    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    // 成员函数方式重载加法运算符
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }

    // 成员函数方式重载减法运算符
    Vector2D operator-(const Vector2D& other) const {
        return Vector2D(x - other.x, y - other.y);
    }

    // 成员函数方式重载乘法运算符（标量乘法）
    Vector2D operator*(double scalar) const {
        return Vector2D(x * scalar, y * scalar);
    }

    // 重载输出运算符（必须为友元函数）
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& vec);

    void display() const {
        std::cout << "(" << x << ", " << y << ")" << std::endl;
    }
};

// 友元函数实现输出运算符
std::ostream& operator<<(std::ostream& os, const Vector2D& vec) {
    os << "(" << vec.x << ", " << vec.y << ")";
    return os;
}

int main() {
    Vector2D v1(3.0, 4.0);
    Vector2D v2(1.0, 2.0);

    Vector2D sum = v1 + v2;  // 调用成员函数operator+
    Vector2D diff = v1 - v2; // 调用成员函数operator-
    Vector2D scaled = v1 * 2.0; // 调用成员函数operator*

    std::cout << "v1: " << v1 << std::endl;
    std::cout << "v2: " << v2 << std::endl;
    std::cout << "sum: " << sum << std::endl;
    std::cout << "diff: " << diff << std::endl;
    std::cout << "scaled: " << scaled << std::endl;

    return 0;
}
```

### 非成员函数运算符重载

当运算符的左操作数不是类类型时，需要使用非成员函数重载：

```cpp
class Vector2D {
    // ... (同上)
public:
    // 成员函数重载（当左操作数是Vector2D时）
    Vector2D operator+(const Vector2D& other) const;

    // 友元函数声明（允许访问私有成员）
    friend Vector2D operator+(double scalar, const Vector2D& vec);
};

// 非成员函数实现（当左操作数是double时）
Vector2D operator+(double scalar, const Vector2D& vec) {
    return Vector2D(scalar + vec.x, scalar + vec.y);
}

int main() {
    Vector2D v(3.0, 4.0);

    Vector2D result1 = v + 2.0;  // 调用成员函数
    Vector2D result2 = 2.0 + v;  // 调用非成员函数

    return 0;
}
```

### 可重载的运算符

| 运算符类别 | 可重载运算符 | 示例 |
|------------|-------------|------|
| 算术运算符 | `+ - * / %` | 向量运算、矩阵运算 |
| 关系运算符 | `== != < > <= >=` | 字符串比较、对象比较 |
| 逻辑运算符 | `&& || !` | 布尔向量运算 |
| 位运算符 | `& | ^ ~ << >>` | 位集合操作 |
| 赋值运算符 | `= += -= *= /= %= &= |= ^= <<= >>=` | 链式操作 |
| 自增自减 | `++ --`（前缀和后缀）| 迭代器实现 |
| 下标运算符 | `[]` | 容器访问 |
| 函数调用 | `()` | 函数对象、仿函数 |
| 成员访问 | `-> ->*` | 智能指针 |
| 内存管理 | `new delete` | 自定义内存分配 |

### 运算符重载规则和限制

1. **不能创造新运算符**：只能重载现有的运算符
2. **不能改变运算符优先级**：保持原有的优先级和结合性
3. **不能改变运算符的操作数数量**：一元运算符保持一元，二元运算符保持二元
4. **至少一个操作数必须是用户定义类型**：防止重载基本类型的运算符
5. **某些运算符必须为成员函数**：`= [] () ->`
6. **某些运算符必须为非成员函数**：通常是对称运算符

### 复合赋值运算符重载

```cpp
class Complex {
private:
    double real, imag;
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    // 重载+=运算符
    Complex& operator+=(const Complex& other) {
        real += other.real;
        imag += other.imag;
        return *this;  // 返回引用支持链式操作
    }

    // 基于+=实现+运算符
    Complex operator+(const Complex& other) const {
        Complex result = *this;
        result += other;
        return result;
    }

    void display() const {
        std::cout << real << " + " << imag << "i" << std::endl;
    }
};
```

### 前缀和后缀运算符重载

```cpp
class Counter {
private:
    int value;
public:
    Counter(int v = 0) : value(v) {}

    // 前缀++：先增加，返回新值
    Counter& operator++() {
        ++value;
        return *this;
    }

    // 后缀++：先返回旧值，再增加
    Counter operator++(int) {
        Counter temp = *this;
        ++value;
        return temp;
    }

    int getValue() const { return value; }
};

int main() {
    Counter c(5);

    ++c;  // 前缀：c变为6
    c++;  // 后缀：c变为7，但返回的是6

    return 0;
}
```

### 友元（Friend）

友元机制允许外部函数或类访问类的私有和保护成员，打破了类的封装性，但在某些情况下提供了必要的灵活性。

#### 友元函数

```cpp
#include <iostream>
#include <cmath>

class Vector2D {
private:
    double x, y;
    double magnitude() const {
        return std::sqrt(x * x + y * y);
    }

public:
    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    // 声明友元函数
    friend double dotProduct(const Vector2D& v1, const Vector2D& v2);
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& vec);
    friend Vector2D operator*(double scalar, const Vector2D& vec);
};

// 友元函数实现
double dotProduct(const Vector2D& v1, const Vector2D& v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

// 输出运算符重载
std::ostream& operator<<(std::ostream& os, const Vector2D& vec) {
    os << "(" << vec.x << ", " << vec.y << ")";
    return os;
}

// 标量乘法（左操作数是标量）
Vector2D operator*(double scalar, const Vector2D& vec) {
    return Vector2D(scalar * vec.x, scalar * vec.y);
}

int main() {
    Vector2D v1(3.0, 4.0);
    Vector2D v2(1.0, 2.0);

    double dot = dotProduct(v1, v2);
    std::cout << "v1: " << v1 << std::endl;
    std::cout << "v2: " << v2 << std::endl;
    std::cout << "Dot product: " << dot << std::endl;

    Vector2D scaled = 2.0 * v1;  // 调用友元函数
    std::cout << "Scaled: " << scaled << std::endl;

    return 0;
}
```

#### 友元类

```cpp
#include <iostream>

class Television;  // 前向声明

class Remote {
private:
    int channel;
    int volume;

public:
    Remote(int ch = 1, int vol = 10) : channel(ch), volume(vol) {}

    // Television类是Remote的友元类
    friend class Television;
};

class Television {
private:
    bool powerOn;
    int currentChannel;
    int currentVolume;
    Remote* remote;  // 关联的遥控器

public:
    Television() : powerOn(false), currentChannel(1), currentVolume(10), remote(nullptr) {}

    void setRemote(Remote* r) { remote = r; }

    void displayStatus() const {
        std::cout << "TV Status - Power: " << (powerOn ? "ON" : "OFF")
                  << ", Channel: " << currentChannel
                  << ", Volume: " << currentVolume << std::endl;
    }

    // Remote类的方法可以直接访问Television的私有成员
    void powerToggle() {
        powerOn = !powerOn;
        std::cout << "TV power " << (powerOn ? "ON" : "OFF") << std::endl;
    }

    void changeChannel(int newChannel) {
        currentChannel = newChannel;
        std::cout << "Channel changed to " << currentChannel << std::endl;
    }
};

// Remote类的方法（作为Television的友元类可以访问私有成员）
void Remote::powerToggle() {
    if (remote) {
        remote->powerOn = !remote->powerOn;
        std::cout << "Remote: TV power " << (remote->powerOn ? "ON" : "OFF") << std::endl;
    }
}

void Remote::changeChannel(int newChannel) {
    if (remote) {
        remote->currentChannel = newChannel;
        std::cout << "Remote: Channel changed to " << remote->currentChannel << std::endl;
    }
}

int main() {
    Television tv;
    Remote remote;

    tv.setRemote(&remote);
    tv.displayStatus();

    // 通过友元类关系访问
    remote.powerToggle();
    remote.changeChannel(5);
    tv.displayStatus();

    return 0;
}
```

#### 友元成员函数

```cpp
#include <iostream>

class DataProcessor;

class DataStorage {
private:
    int* data;
    size_t size;

public:
    DataStorage(size_t s) : size(s) {
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = 0;
        }
    }

    ~DataStorage() {
        delete[] data;
    }

    // 特定成员函数作为友元
    friend void DataProcessor::processData(const DataStorage& storage);

    void display() const {
        std::cout << "Data: [";
        for (size_t i = 0; i < size; ++i) {
            std::cout << data[i];
            if (i < size - 1) std::cout << ", ";
        }
        std::cout << "]" << std::endl;
    }
};

class DataProcessor {
public:
    // 友元成员函数
    void processData(const DataStorage& storage) {
        std::cout << "Processing data..." << std::endl;
        std::cout << "Size: " << storage.size << std::endl;

        double sum = 0;
        for (size_t i = 0; i < storage.size; ++i) {
            sum += storage.data[i];
        }
        std::cout << "Sum: " << sum << std::endl;
        std::cout << "Average: " << sum / storage.size << std::endl;
    }
};

// 友元成员函数实现
void DataProcessor::processData(const DataStorage& storage) {
    // 可以直接访问DataStorage的私有成员
    std::cout << "Friend function accessing private data:" << std::endl;
    std::cout << "Size: " << storage.size << std::endl;

    double sum = 0;
    for (size_t i = 0; i < storage.size; ++i) {
        sum += storage.data[i];
    }
    std::cout << "Sum: " << sum << std::endl;
}

int main() {
    DataStorage storage(5);
    DataProcessor processor;

    processor.processData(storage);
    storage.display();

    return 0;
}
```

#### 友元的注意事项

1. **单向关系**：友元关系是单向的，A是B的友元不意味着B是A的友元
2. **不可传递**：友元关系不能传递
3. **访问控制**：友元可以访问所有private和protected成员
4. **继承影响**：基类的友元不能访问派生类的私有成员
5. **使用谨慎**：过度使用友元会破坏封装性

#### 友元的最佳实践

```cpp
// 运算符重载优先使用友元函数
class Complex {
private:
    double real, imag;
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    // 运算符重载通常声明为友元函数
    friend Complex operator+(const Complex& c1, const Complex& c2);
    friend std::ostream& operator<<(std::ostream& os, const Complex& c);
};

// 当需要访问多个类的私有成员时，使用友元函数
friend void processMultipleClasses(ClassA& a, ClassB& b);
```

### 类型转换

C++支持多种类型转换机制，包括隐式转换、显式转换和用户定义的转换。

#### 转换构造函数

只有一个参数的构造函数（或除第一个参数外其他参数都有默认值）可以作为转换构造函数：

```cpp
#include <iostream>
#include <string>

class MyString {
private:
    std::string data;

public:
    // 转换构造函数：从const char*转换
    MyString(const char* str) : data(str) {
        std::cout << "Conversion constructor called" << std::endl;
    }

    // explicit转换构造函数：禁止隐式转换
    explicit MyString(int num) : data(std::to_string(num)) {
        std::cout << "Explicit conversion constructor called" << std::endl;
    }

    void display() const {
        std::cout << "String: " << data << std::endl;
    }
};

void processString(const MyString& str) {
    str.display();
}

int main() {
    // 隐式转换
    MyString str1 = "Hello";        // 调用转换构造函数
    processString("World");        // 隐式转换const char*到MyString

    // 显式转换
    MyString str2 = static_cast<MyString>(42);  // 必须显式转换
    // MyString str3 = 42;  // 编译错误：不能隐式转换

    str1.display();
    str2.display();

    return 0;
}
```

#### 转换函数（类型转换运算符）

转换函数允许将类对象转换为其他类型：

```cpp
#include <iostream>

class Rational {
private:
    int numerator;
    int denominator;

public:
    Rational(int num = 0, int den = 1)
        : numerator(num), denominator(den) {}

    // 转换函数：转换为double
    operator double() const {
        std::cout << "Converting Rational to double" << std::endl;
        return static_cast<double>(numerator) / denominator;
    }

    // explicit转换函数：转换为int
    explicit operator int() const {
        std::cout << "Converting Rational to int" << std::endl;
        return numerator / denominator;
    }

    void display() const {
        std::cout << numerator << "/" << denominator << std::endl;
    }
};

void processDouble(double value) {
    std::cout << "Double value: " << value << std::endl;
}

void processInt(int value) {
    std::cout << "Int value: " << value << std::endl;
}

int main() {
    Rational r(3, 2);
    r.display();

    // 隐式转换为double
    double d = r;  // 调用operator double()
    processDouble(r);  // 隐式转换

    // 显式转换为int
    int i = static_cast<int>(r);  // 必须显式转换
    processInt(i);
    // processInt(r);  // 编译错误：不能隐式转换

    return 0;
}
```

#### 转换函数规则

1. **必须是成员函数**：转换函数必须是类的成员函数
2. **无参数**：转换函数不能有参数
3. **无返回类型声明**：不指定返回类型，但必须返回目标类型的值
4. **不能转换为数组或函数类型**：这些类型不允许作为转换目标
5. **避免二义性**：避免定义可能导致二义性的转换函数

#### explicit关键字的使用

```cpp
class SafeString {
private:
    std::string data;

public:
    // explicit防止意外隐式转换
    explicit SafeString(const char* str) : data(str) {}
    explicit SafeString(int size) : data(size, ' ') {}

    void display() const {
        std::cout << "[" << data << "]" << std::endl;
    }
};

void processString(const SafeString& str) {
    str.display();
}

int main() {
    SafeString str1("Hello");  // 直接初始化

    // 必须显式转换
    SafeString str2 = SafeString(10);  // 正确
    // SafeString str3 = "World";   // 编译错误：不能隐式转换
    // processString("Test");       // 编译错误：不能隐式转换

    // 正确的显式转换方式
    processString(SafeString("Test"));  // 创建临时对象
    processString(static_cast<SafeString>("Test"));  // C风格转换

    str1.display();
    str2.display();

    return 0;
}
```

#### 转换序列和用户定义转换

```cpp
#include <iostream>

class MyNumber {
private:
    int value;

public:
    MyNumber(int v) : value(v) {}

    // 转换为int
    operator int() const { return value; }

    void display() const { std::cout << "Value: " << value << std::endl; }
};

void processNumber(int num) {
    std::cout << "Processing: " << num << std::endl;
}

int main() {
    MyNumber num(42);

    // 转换序列：MyNumber -> int -> int
    processNumber(num);  // 隐式转换

    // 直接转换
    int direct = num;  // 隐式转换
    std::cout << "Direct: " << direct << std::endl;

    return 0;
}
```

#### 转换的注意事项

1. **避免过度转换**：过多的隐式转换可能导致意外行为
2. **使用explicit**：对单参数构造函数使用explicit
3. **考虑性能**：转换可能涉及临时对象的创建
4. **避免二义性**：确保转换路径唯一
5. **文档说明**：明确标注支持的转换类型

## 类与动态内存分配

### 特殊成员函数

C++编译器会根据类的定义自动生成某些特殊成员函数：

```cpp
class Example {
private:
    int* data;
    size_t size;

public:
    // 构造函数
    Example(size_t s = 0) : size(s) {
        data = (s > 0) ? new int[s] : nullptr;
        std::cout << "Constructor called" << std::endl;
    }

    // 析构函数
    ~Example() {
        delete[] data;
        std::cout << "Destructor called" << std::endl;
    }

    // 如果未定义，编译器会自动生成以下函数：
    // 1. 默认构造函数
    // 2. 拷贝构造函数
    // 3. 拷贝赋值运算符
    // 4. 移动构造函数（C++11）
    // 5. 移动赋值运算符（C++11）

    // 显式禁用默认函数
    Example(const Example&) = delete;              // 禁用拷贝
    Example& operator=(const Example&) = delete;     // 禁用拷贝赋值
    Example(Example&&) = delete;                 // 禁用移动
    Example& operator=(Example&&) = delete;        // 禁用移动赋值
};
```

### 三/五法则（Rule of Three/Five）

```cpp
class RuleOfThree {
private:
    int* data;
    size_t size;

public:
    // 构造函数
    RuleOfThree(size_t s = 0) : size(s) {
        data = new int[s];
    }

    // 1. 析构函数
    ~RuleOfThree() {
        delete[] data;
    }

    // 2. 拷贝构造函数
    RuleOfThree(const RuleOfThree& other) : size(other.size) {
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = other.data[i];
        }
    }

    // 3. 拷贝赋值运算符
    RuleOfThree& operator=(const RuleOfThree& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new int[size];
            for (size_t i = 0; i < size; ++i) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }

    // C++11扩展：移动语义（五法则）
    // 4. 移动构造函数
    RuleOfThree(RuleOfThree&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }

    // 5. 移动赋值运算符
    RuleOfThree& operator=(RuleOfThree&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};
```

### 深拷贝与浅拷贝

```cpp
#include <iostream>
#include <cstring>

class DeepCopyExample {
private:
    char* buffer;
    size_t length;

public:
    // 浅拷贝构造函数（有问题的版本）
    DeepCopyExample(const char* str) : length(std::strlen(str)) {
        buffer = new char[length + 1];
        std::strcpy(buffer, str);
        std::cout << "Constructor" << std::endl;
    }

    // 正确的深拷贝构造函数
    DeepCopyExample(const DeepCopyExample& other) : length(other.length) {
        buffer = new char[length + 1];
        std::strcpy(buffer, other.buffer);
        std::cout << "Deep copy constructor" << std::endl;
    }

    // 有问题的赋值运算符（浅拷贝）
    DeepCopyExample& operator=(const DeepCopyExample& other) {
        if (this != &other) {
            delete[] buffer;  // 释放原有内存
            length = other.length;
            buffer = other.buffer;  // 浅拷贝：两个对象指向同一内存
        }
        return *this;
    }

    // 正确的深拷贝赋值运算符
    DeepCopyExample& deepCopyAssign(const DeepCopyExample& other) {
        if (this != &other) {
            delete[] buffer;
            length = other.length;
            buffer = new char[length + 1];
            std::strcpy(buffer, other.buffer);
        }
        return *this;
    }

    ~DeepCopyExample() {
        delete[] buffer;
        std::cout << "Destructor" << std::endl;
    }

    void display() const {
        std::cout << "Buffer: " << buffer << std::endl;
    }
};

int main() {
    DeepCopyExample obj1("Hello");
    DeepCopyExample obj2 = obj1;  // 拷贝构造
    DeepCopyExample obj3("World");

    obj3 = obj1;  // 浅拷贝赋值
    obj1.display();  // 可能已损坏，因为obj1和obj3共享buffer

    return 0;
}
```

### 成员初始化列表的最佳实践

```cpp
class BestPractices {
private:
    const int constValue;      // 必须在初始化列表中初始化
    int& refValue;          // 必须在初始化列表中初始化
    std::string stringValue;   // 推荐在初始化列表中初始化
    int normalValue;          // 可以在构造函数体中初始化

public:
    BestPractices(int cv, int& rv, const std::string& str, int nv = 0)
        : constValue(cv),           // const成员：必须
          refValue(rv),             // 引用成员：必须
          stringValue(str),         // 推荐所有成员
          normalValue(nv) {       // 可以在构造函数体中
        std::cout << "Best practices constructor" << std::endl;
    }

    // C++11委托构造函数
    BestPractices(int cv, int& rv) : BestPractices(cv, rv, std::string("Default"), 0) {
        std::cout << "Delegating constructor" << std::endl;
    }
};
```

### 返回对象的最佳实践

函数返回对象时，选择正确的返回方式对性能和正确性至关重要。

#### 返回引用的情况

```cpp
#include <iostream>
#include <string>

class DataContainer {
private:
    std::string data;
    int value;

public:
    DataContainer(const std::string& d, int v) : data(d), value(v) {}

    // 正确：返回成员的引用
    const std::string& getData() const {
        return data;  // 返回const引用，避免拷贝
    }

    // 正确：返回可修改的引用（用于链式操作）
    DataContainer& setValue(int v) {
        value = v;
        return *this;  // 支持链式调用
    }

    // 错误：返回局部变量的引用
    const std::string& getWrongData() const {
        std::string local = data + "_local";
        return local;  // 危险：局部变量即将被销毁
    }
};

int main() {
    DataContainer container("Hello", 42);

    // 正确使用引用返回
    const std::string& ref = container.getData();
    std::cout << "Data: " << ref << std::endl;

    // 链式操作
    container.setValue(100).setValue(200);
    std::cout << "Final value: " << container.getValue() << std::endl;

    return 0;
}
```

#### 返回对象的情况

```cpp
class Calculator {
private:
    int result;

public:
    Calculator(int a, int b) : result(a + b) {}

    // 返回对象（拷贝语义）
    Calculator add(int value) const {
        return Calculator(result + value);
    }

    // 返回对象（移动语义，C++11）
    Calculator addMove(int value) const {
        return Calculator(result + value);
    }
};

int main() {
    Calculator calc1(10, 20);
    Calculator calc2 = calc1.add(5);      // 拷贝构造
    Calculator calc3 = calc1.addMove(5);  // 移动构造（更高效）

    return 0;
}
```

#### 返回值的选择指南

| 返回类型 | 适用场景 | 性能 | 安全性 |
|---------|---------|------|--------|
| `const T&` | 返回类成员，不修改 | 高 | 安全 |
| `T&` | 返回类成员，可修改 | 高 | 安全 |
| `T` | 返回局部变量或新对象 | 中等 | 安全 |
| `T&&` | 返回局部变量（C++11） | 高 | 安全 |
| `const T*` | 返回动态分配对象 | 高 | 需要手动delete |

#### 常见返回模式

```cpp
class ReturnPatterns {
private:
    int* data;
    size_t size;

public:
    ReturnPatterns(size_t s) : size(s) {
        data = new int[size];
    }

    ~ReturnPatterns() {
        delete[] data;
    }

    // 模式1：返回const引用
    const int& at(size_t index) const {
        if (index >= size) throw std::out_of_range("Index out of range");
        return data[index];
    }

    // 模式2：返回对象（拷贝）
    ReturnPatterns copy() const {
        ReturnPatterns result(size);
        for (size_t i = 0; i < size; ++i) {
            result.data[i] = data[i];
        }
        return result;
    }

    // 模式3：返回对象（移动语义）
    ReturnPatterns move() {
        ReturnPatterns result(0);
        result.data = data;
        result.size = size;
        data = nullptr;
        size = 0;
        return result;
    }

    // 模式4：返回指针（不推荐）
    int* getRawData() const {
        return data;  // 危险：调用者需要管理内存
    }
};
```

#### RVO和NRVO优化

编译器会进行返回值优化（RVO和NRVO），避免不必要的拷贝：

```cpp
class OptimizedReturn {
private:
    int value;

public:
    OptimizedReturn(int v) : value(v) {}

    // 编译器可能进行RVO优化
    static OptimizedReturn create(int v) {
        return OptimizedReturn(v);  // 可能直接在调用者栈上构造
    }
};

int main() {
    // RVO：返回值优化
    auto obj = OptimizedReturn::create(42);  // 可能没有拷贝构造
    return 0;
}
```

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

## 类继承与多态

继承是面向对象编程的核心机制，允许代码重用和建立类型层次结构。

### 继承的基本概念

当一个类（派生类）继承另一个类（基类）时，派生类会获得基类的所有非私有成员。

#### 继承语法和基本示例

```cpp
#include <iostream>
#include <string>

// 基类
class Animal {
protected:  // protected成员可被派生类访问
    std::string name;
    int age;

public:
    Animal(const std::string& n, int a) : name(n), age(a) {}

    void eat() {
        std::cout << name << " is eating" << std::endl;
    }

    void sleep() {
        std::cout << name << " is sleeping" << std::endl;
    }

    virtual void makeSound() = 0;  // 纯虚函数
    virtual ~Animal() {
        std::cout << "Animal destructor" << std::endl;
    }
};

// 派生类
class Dog : public Animal {
private:
    std::string breed;

public:
    // 派生类构造函数：调用基类构造函数
    Dog(const std::string& n, int a, const std::string& b)
        : Animal(n, a), breed(b) {
        std::cout << "Dog constructor" << std::endl;
    }

    // 重写基类的虚函数
    void makeSound() override {
        std::cout << name << " barks: Woof!" << std::endl;
    }

    // 添加派生类特有的方法
    void wagTail() {
        std::cout << name << " is wagging tail" << std::endl;
    }

    ~Dog() {
        std::cout << "Dog destructor" << std::endl;
    }
};

int main() {
    Dog dog("Buddy", 3, "Golden Retriever");

    // 派生类对象可以使用基类方法
    dog.eat();
    dog.sleep();

    // 派生类对象可以使用自己的方法
    dog.makeSound();
    dog.wagTail();

    return 0;
}
```

### 继承访问控制

继承支持三种访问控制：

```cpp
class Base {
public:
    int publicVar;
protected:
    int protectedVar;
private:
    int privateVar;
};

// public继承：public成员保持public，protected成员保持protected，private成员不可访问
class PublicDerived : public Base {
public:
    void accessBase() {
        publicVar = 1;        // 可访问
        protectedVar = 2;     // 可访问
        // privateVar = 3;      // 不可访问
    }
};

// protected继承：public和protected成员都变成protected，private成员不可访问
class ProtectedDerived : protected Base {
public:
    void accessBase() {
        publicVar = 1;        // 变成protected，可访问
        protectedVar = 2;     // 变成protected，可访问
        // privateVar = 3;      // 不可访问
    }
};

// private继承：所有成员都变成private，private成员不可访问
class PrivateDerived : private Base {
public:
    void accessBase() {
        // publicVar = 1;        // 变成private，不可访问
        // protectedVar = 2;     // 变成private，不可访问
        // privateVar = 3;      // 不可访问
    }
};
```

### 构造函数和析构函数

#### 构造函数调用顺序

```cpp
#include <iostream>

class Base {
private:
    int baseValue;

public:
    Base() : baseValue(100) {
        std::cout << "Base constructor" << std::endl;
    }

    Base(int v) : baseValue(v) {
        std::cout << "Base parameterized constructor" << std::endl;
    }

    virtual ~Base() {
        std::cout << "Base destructor" << std::endl;
    }
};

class Derived : public Base {
private:
    int derivedValue;

public:
    Derived() : derivedValue(200) {
        std::cout << "Derived constructor" << std::endl;
    }

    Derived(int b, int d) : Base(b), derivedValue(d) {
        std::cout << "Derived parameterized constructor" << std::endl;
    }

    ~Derived() {
        std::cout << "Derived destructor" << std::endl;
    }
};

int main() {
    // 构造顺序：Base -> Derived
    Derived obj;

    // 析构顺序：Derived -> Base
    return 0;
}
```

### 多重继承

```cpp
#include <iostream>

// 第一个基类
class Drawable {
public:
    virtual void draw() = 0;
    virtual ~Drawable() {}
};

// 第二个基类
class Movable {
public:
    virtual void move(int x, int y) = 0;
    virtual ~Movable() {}
};

// 多重继承的派生类
class Shape : public Drawable, public Movable {
private:
    int posX, posY;

public:
    Shape(int x, int y) : posX(x), posY(y) {}

    void draw() override {
        std::cout << "Drawing shape at (" << posX << ", " << posY << ")" << std::endl;
    }

    void move(int x, int y) override {
        posX = x;
        posY = y;
        std::cout << "Moving shape to (" << x << ", " << y << ")" << std::endl;
    }
};
```

### 虚继承

虚继承用于解决"钻石问题"（菱形继承）：

```cpp
#include <iostream>

// 菱形继承的顶层基类
class Animal {
public:
    Animal() { std::cout << "Animal constructor" << std::endl; }
    virtual ~Animal() { std::cout << "Animal destructor" << std::endl; }
    virtual void speak() = 0;
};

// 虚继承：确保只有一个Animal子对象
class Mammal : virtual public Animal {
public:
    Mammal() { std::cout << "Mammal constructor" << std::endl; }
    ~Mammal() { std::cout << "Mammal destructor" << std::endl; }
    void speak() override { std::cout << "Mammal sound" << std::endl; }
};

class Bird : virtual public Animal {
public:
    Bird() { std::cout << "Bird constructor" << std::endl; }
    ~Bird() { std::cout << "Bird destructor" << std::endl; }
    void speak() override { std::cout << "Bird sound" << std::endl; }
};

// 钻石类：同时继承自Mammal和Bird
class Platypus : public Mammal, public Bird {
public:
    Platypus() { std::cout << "Platypus constructor" << std::endl; }
    ~Platypus() { std::cout << "Platypus destructor" << std::endl; }
    void speak() override {
        std::cout << "Platypus sound" << std::endl;
        Mammal::speak();  // 显式调用特定版本
    }
};
```

### 继承的设计原则

1. **is-a关系**：派生类应该真正是基类的一种特殊类型
2. **接口隔离**：继承最小接口，避免不必要的方法
3. **里氏替换原则**：派生类对象应该能替换基类对象
4. **组合优于继承**：优先使用组合而不是继承
5. **避免深度继承**：过深的继承层次会增加复杂性

### 继承的最佳实践

```cpp
// 好的继承设计示例
class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const override {
        return width * height;
    }

    double perimeter() const override {
        return 2 * (width + height);
    }
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return 3.14159 * radius * radius;
    }

    double perimeter() const override {
        return 2 * 3.14159 * radius;
    }
};
```

### 多态的实现机制

多态允许通过基类接口调用派生类的实现，是面向对象编程的重要特性。

#### 虚函数和动态绑定

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Animal {
protected:
    std::string name;

public:
    Animal(const std::string& n) : name(n) {}

    // 虚函数：支持动态绑定
    virtual void makeSound() {
        std::cout << name << " makes a generic animal sound" << std::endl;
    }

    virtual void move() {
        std::cout << name << " moves" << std::endl;
    }

    virtual ~Animal() {
        std::cout << "Animal destructor" << std::endl;
    }
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}

    // 重写虚函数
    void makeSound() override {
        std::cout << name << " barks: Woof!" << std::endl;
    }

    void move() override {
        std::cout << name << " runs" << std::endl;
    }
};

class Cat : public Animal {
public:
    Cat(const std::string& n) : Animal(n) {}

    void makeSound() override {
        std::cout << name << " meows: Meow!" << std::endl;
    }

    void move() override {
        std::cout << name << " walks gracefully" << std::endl;
    }
};

// 非虚函数：静态绑定
class NonVirtualAnimal {
protected:
    std::string name;

public:
    NonVirtualAnimal(const std::string& n) : name(n) {}

    void makeSound() {  // 非虚函数，静态绑定
        std::cout << name << " makes a generic sound" << std::endl;
    }
};

class NonVirtualDog : public NonVirtualAnimal {
public:
    NonVirtualDog(const std::string& n) : NonVirtualAnimal(n) {}

    void makeSound() {  // 隐藏基类函数，非多态
        std::cout << name << " barks" << std::endl;
    }
};

int main() {
    Dog dog("Buddy");
    Cat cat("Whiskers");
    NonVirtualDog nvDog("Rex");

    // 多态：通过基类指针调用
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Dog>("Buddy"));
    animals.push_back(std::make_unique<Cat>("Whiskers"));

    std::cout << "=== 多态调用 ===" << std::endl;
    for (const auto& animal : animals) {
        animal->makeSound();  // 动态绑定
        animal->move();
    }

    std::cout << "\n=== 非多态调用 ===" << std::endl;
    Animal* nvPtr = &nvDog;
    nvPtr->makeSound();  // 静态绑定：调用基类版本

    return 0;
}
```

#### 纯虚函数

纯虚函数是没有实现的虚函数，用于定义抽象基类：

```cpp
#include <iostream>

// 抽象基类
class Shape {
protected:
    std::string name;

public:
    Shape(const std::string& n) : name(n) {}

    // 纯虚函数
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual void display() const = 0;

    virtual ~Shape() {
        std::cout << "Shape destructor" << std::endl;
    }
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r), Shape("Circle") {}

    double area() const override {
        return 3.14159 * radius * radius;
    }

    double perimeter() const override {
        return 2 * 3.14159 * radius;
    }

    void display() const override {
        std::cout << name << ": radius=" << radius
                  << ", area=" << area()
                  << ", perimeter=" << perimeter() << std::endl;
    }
};

class Rectangle : public Shape {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h), Shape("Rectangle") {}

    double area() const override {
        return width * height;
    }

    double perimeter() const override {
        return 2 * (width + height);
    }

    void display() const override {
        std::cout << name << ": width=" << width
                  << ", height=" << height
                  << ", area=" << area()
                  << ", perimeter=" << perimeter() << std::endl;
    }
};

int main() {
    // 不能实例化抽象类
    // Shape shape;  // 编译错误

    Circle circle(5.0);
    Rectangle rect(4.0, 6.0);

    std::vector<Shape*> shapes = {&circle, &rect};

    for (const auto& shape : shapes) {
        shape->display();
    }

    return 0;
}
```

#### 抽象类和接口

```cpp
#include <iostream>

// 接口类（纯虚函数）
class IDrawable {
public:
    virtual ~IDrawable() = default;
    virtual void draw() = 0;
    virtual void setColor(const std::string& color) = 0;
};

class IResizable {
public:
    virtual ~IResizable() = default;
    virtual void resize(double factor) = 0;
    virtual double getSize() const = 0;
};

// 实现多个接口
class Shape : public IDrawable, public IResizable {
private:
    double size;
    std::string color;

public:
    Shape(double s, const std::string& c) : size(s), color(c) {}

    void draw() override {
        std::cout << "Drawing " << color << " shape, size: " << size << std::endl;
    }

    void setColor(const std::string& newColor) override {
        color = newColor;
    }

    void resize(double factor) override {
        size *= factor;
    }

    double getSize() const override {
        return size;
    }
};

int main() {
    Shape shape(10.0, "red");
    shape.draw();  // Drawing red shape, size: 10

    shape.resize(1.5);
    shape.draw();  // Drawing red shape, size: 15

    return 0;
}
```

#### 虚析构函数

```cpp
#include <iostream>

class Base {
public:
    Base() { std::cout << "Base constructor" << std::endl; }
    virtual ~Base() {
        std::cout << "Base destructor" << std::endl;
    }
};

class Derived : public Base {
private:
    int* data;

public:
    Derived() : data(new int[10]) {
        std::cout << "Derived constructor" << std::endl;
    }

    ~Derived() {
        delete[] data;
        std::cout << "Derived destructor" << std::endl;
    }
};

int main() {
    std::cout << "=== 创建对象 ===" << std::endl;
    Base* base = new Derived();

    std::cout << "=== 删除对象 ===" << std::endl;
    delete base;  // 正确：调用Derived析构函数

    return 0;
}
```

#### final和override关键字

```cpp
#include <iostream>

class Base {
public:
    virtual void method() {
        std::cout << "Base::method()" << std::endl;
    }

    virtual void finalMethod() final {
        std::cout << "Base::finalMethod()" << std::endl;
    }
};

class Derived : public Base {
public:
    void method() override {  // 正确：重写基类虚函数
        std::cout << "Derived::method()" << std::endl;
    }

    // void finalMethod() override { }  // 编译错误：不能重写final函数
};

class FinalClass final {  // 不能被继承
public:
    void someMethod() {
        std::cout << "FinalClass::someMethod()" << std::endl;
    }
};

// class DerivedFromFinal : public FinalClass { };  // 编译错误：不能继承final类

int main() {
    Derived derived;
    Base* base = &derived;

    base->method();      // 调用Derived::method()
    base->finalMethod();  // 调用Base::finalMethod()

    FinalClass finalObj;
    finalObj.someMethod();

    return 0;
}
```

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

也叫函数符（functor），在 c++11 中提供了lambda表达式来替代函数符。包括函数名、指向函数的指针和重载了`()`运算符的类对象。例如：

```c++
class Linear
{
    private:
        double a;
        double b;
    public:
        double operator()(double x){return a+(B*x);}
}

Linear f;
double y = f(2);
```

不同的函数符概念：

+ 生成器：是不用参数就可以调用的函数符
+ 一元函数：是用一个参数可以调用的函数符
+ 二元函数：是用两个参数可以调用的函数符
+ 谓词：返回bool值的一元函数
+ 二元谓词：返回bool值得二元函数

STL 预定义了多个基本函数符。头文件 `functional(function.h)`定义了多个模板类函数对象。

| 运算符 | 函数符 |
| --- | --- |
| + | plus |
| - | minus |
| * | multiplies |
| / | divides |
| ... |

STL 提供了多种函数适配器用于适配上面这些自适应函数符。例如想要把列表所有元素值减3，则可以使用函数适配器绑定`minus`函数符的一个参数为3。    

### 算法

STL 包含很多处理容器的非成员函数，前面已经介绍过其中的一些：sort()、copy()、find()、transform()。他们总体设计是相同的，都使用迭代器来标识要处理的数据区间和结果的放置位置。都使用模板来提供泛型。

STL 将算法库分成4组：

+ 非修改式序列操作：对区间中的每个元素进行操作，但不修改元素内容。例如find() 和 for_each()
+ 修改式序列操作：对区间中的每个元素进行操作，但是会修改元素内容。例如transform() 和 copy()
+ 排序和相关操作：排序 sort() 或集合操作
+ 通用数字运算：区间的内容累积、计算两个容器的内部乘积等

前3组都在头文件 `algorithm(algo.h)` 中。第4组在 `numeric(algo.h)` 中。

像 sort() 这种结果替换原始数据，是就地算法。copy() 这种结果发送到其他位置，是复制算法。有些算法有两个版本即可以是就地计算，也可以复制计算，STL 约定复制版本以 `_copy()` 结尾，接受一个额外的输出迭代器参数。

还有根据应于到元素的函数结果来执行操作的，通常以 `_if` 结尾，例如 replace_if() 函数。

有些算法同时存在于对象的内置方法，或STL的非成员函数中。这种通常调用对象的方法是更好的选择。因为一般STL的非成员函数无法管理对象内存。

### 其他库

复数计算类 complex 位于头文件 `complex` 中。头文件 `random` 提供了更多的随机数功能。

模板 `initializer_list` 是 c++11 中新增的，用于实现使用初始化列表语法将 STL 容器初始化为一系列值：`vector<double> dlist {11.2, 34.5};`。这之所以可行，就是因为容器类包含将 `initializer_list<T>` 作为参数的构造函数。因此上述代码等价于 `vector<double> dlist ({11.2, 34.5});`。

`initializer_list` 模板除了在 STL 中使用，我们也可以在自己的代码中使用：

```c++
#include <iostream>
#include <initializer_list>

double sum(std::initializer_list<double> i1);
double average(const std::initializer_list<double> & ri1);

int main()
{
    sum({2,3,4});
    average({2,3,4});
    std::initializer_list<double> dl = {1.1,2.2,3.3};
    sum(dl);
    average(dl);
}

...
...

```

## 输入、输出和文件

C++的输入输出系统基于一个继承的类层次结构，它位于iostream库中。

### iostream类层次结构

C++的输入输出系统基于两个基类：`ostream`（输出流）和`istream`（输入流）。`iostream`类同时继承自这两个类，支持输入和输出操作。

主要的流类包括：

- `ios`：基础类，包含流状态和格式化标志
- `istream`：输入流类
- `ostream`：输出流类
- `iostream`：输入输出流类
- `ifstream`：文件输入流类
- `ofstream`：文件输出流类
- `fstream`：文件输入输出流类

### 标准流对象

C++预定义了几个标准流对象：

- `cin`：标准输入流（通常连接键盘）
- `cout`：标准输出流（通常连接显示器）
- `cerr`：标准错误流（通常连接显示器，无缓冲）
- `clog`：标准日志流（通常连接显示器，有缓冲）

### 输出格式化

#### 控制符

使用`<iomanip>`头文件中的控制符来格式化输出：

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double num = 123.4567;

    // 设置字段宽度
    std::cout << std::setw(10) << num << std::endl;

    // 设置精度
    std::cout << std::fixed << std::setprecision(2) << num << std::endl;

    // 设置填充字符
    std::cout << std::setfill('*') << std::setw(10) << num << std::endl;

    // 设置对齐方式
    std::cout << std::left << std::setw(10) << num << std::endl;
    std::cout << std::right << std::setw(10) << num << std::endl;

    return 0;
}
```

#### 格式标志

使用`setf()`和`unsetf()`方法设置格式标志：

```cpp
#include <iostream>

int main() {
    double num = 123.4567;

    // 设置科学计数法
    std::cout.setf(std::ios::scientific, std::ios::floatfield);
    std::cout << num << std::endl;

    // 设置定点表示法
    std::cout.setf(std::ios::fixed, std::ios::floatfield);
    std::cout << num << std::endl;

    // 显示小数点和末尾零
    std::cout.setf(std::ios::showpoint);
    std::cout << num << std::endl;

    // 显示正号
    std::cout.setf(std::ios::showpos);
    std::cout << num << std::endl;

    return 0;
}
```

### 文件输入输出

#### 写入文件

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ofstream outFile("data.txt");  // 创建输出文件流

    if (!outFile) {
        std::cerr << "无法打开文件" << std::endl;
        return 1;
    }

    outFile << "Hello, World!" << std::endl;
    outFile << 123 << std::endl;
    outFile << 45.67 << std::endl;

    outFile.close();  // 关闭文件
    return 0;
}
```

#### 读取文件

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream inFile("data.txt");  // 创建输入文件流

    if (!inFile) {
        std::cerr << "无法打开文件" << std::endl;
        return 1;
    }

    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << line << std::endl;
    }

    inFile.close();  // 关闭文件
    return 0;
}
```

#### 二进制文件操作

```cpp
#include <iostream>
#include <fstream>
#include <vector>

struct Person {
    char name[50];
    int age;
    double salary;
};

int main() {
    // 写入二进制文件
    std::ofstream outFile("people.bin", std::ios::binary);
    if (!outFile) {
        std::cerr << "无法打开输出文件" << std::endl;
        return 1;
    }

    Person p1 = {"张三", 30, 5000.5};
    Person p2 = {"李四", 25, 4500.75};

    outFile.write(reinterpret_cast<char*>(&p1), sizeof(Person));
    outFile.write(reinterpret_cast<char*>(&p2), sizeof(Person));
    outFile.close();

    // 读取二进制文件
    std::ifstream inFile("people.bin", std::ios::binary);
    if (!inFile) {
        std::cerr << "无法打开输入文件" << std::endl;
        return 1;
    }

    Person person;
    while (inFile.read(reinterpret_cast<char*>(&person), sizeof(Person))) {
        std::cout << "姓名: " << person.name
                  << ", 年龄: " << person.age
                  << ", 薪水: " << person.salary << std::endl;
    }

    inFile.close();
    return 0;
}
```

#### 文件模式标志

- `std::ios::in`：输入模式（默认）
- `std::ios::out`：输出模式（默认）
- `std::ios::binary`：二进制模式
- `std::ios::ate`：打开文件时定位到文件末尾
- `std::ios::app`：追加模式
- `std::ios::trunc`：如果文件存在，清空文件内容

```cpp
// 追加模式写入
std::ofstream outFile("log.txt", std::ios::app);

// 二进制读写模式
std::fstream ioFile("data.bin", std::ios::in | std::ios::out | std::ios::binary);
```

### 字符串流

字符串流允许对内存中的字符串进行格式化输入输出：

```cpp
#include <iostream>
#include <sstream>
#include <string>

int main() {
    // 输出字符串流
    std::ostringstream oss;
    oss << "姓名: " << "张三" << ", 年龄: " << 30 << ", 成绩: " << 95.5;
    std::string result = oss.str();
    std::cout << result << std::endl;

    // 输入字符串流
    std::string data = "张三 30 95.5";
    std::istringstream iss(data);

    std::string name;
    int age;
    double score;

    iss >> name >> age >> score;
    std::cout << "姓名: " << name << ", 年龄: " << age << ", 成绩: " << score << std::endl;

    return 0;
}
```

### 流状态

每个流都有一个状态标志，可以用来检测操作是否成功：

```cpp
#include <iostream>
#include <fstream>

int main() {
    std::ifstream inFile("data.txt");

    if (!inFile) {
        std::cerr << "无法打开文件" << std::endl;
        return 1;
    }

    int value;
    while (inFile >> value) {
        std::cout << value << std::endl;
    }

    // 检查流状态
    if (inFile.eof()) {
        std::cout << "到达文件末尾" << std::endl;
    } else if (inFile.fail()) {
        std::cout << "读取失败" << std::endl;
        inFile.clear();  // 清除错误状态
    }

    inFile.close();
    return 0;
}
```

### 输入输出操作符重载

可以为自定义类型重载输入输出操作符：

```cpp
#include <iostream>

class Point {
private:
    int x, y;
public:
    Point(int x = 0, int y = 0) : x(x), y(y) {}

    // 重载输出操作符
    friend std::ostream& operator<<(std::ostream& os, const Point& p) {
        os << "(" << p.x << ", " << p.y << ")";
        return os;
    }

    // 重载输入操作符
    friend std::istream& operator>>(std::istream& is, Point& p) {
        is >> p.x >> p.y;
        return is;
    }
};

int main() {
    Point p1(10, 20);
    std::cout << "点1: " << p1 << std::endl;

    Point p2;
    std::cout << "请输入点的坐标(x y): ";
    std::cin >> p2;
    std::cout << "点2: " << p2 << std::endl;

    return 0;
}
```

## C++11新特性

C++11标准是C++语言发展史上的重要里程碑，引入了众多革命性特性，极大地提升了语言的现代化程度、易用性和表达能力。

### auto关键字与类型推导

`auto`关键字实现了自动类型推导，简化了复杂类型声明并提高了代码可维护性：

```cpp
#include <vector>
#include <map>
#include <string>
#include <iostream>

int main() {
    // 基本类型推导
    auto i = 42;              // 推导为int
    auto d = 3.14;            // 推导为double
    auto s = "hello";         // 推导为const char*

    // 复杂类型推导
    std::vector<int> vec = {1, 2, 3};
    auto it = vec.begin();    // 推导为std::vector<int>::iterator

    std::map<std::string, int> m = {% raw %}{{"a", 1}, {"b", 2}}{% endraw %};
    auto iter = m.begin();    // 推导为std::map<std::string, int>::iterator

    // 函数返回类型推导
    auto multiply = [](auto a, auto b) { return a * b; };
    auto result = multiply(3, 4.5);  // result推导为double

    // 范围for循环中的类型推导
    for (const auto& item : m) {
        std::cout << item.first << ": " << item.second << std::endl;
    }

    return 0;
}
```

#### auto的使用注意事项

1. **必须初始化**：auto变量必须在声明时初始化
2. **引用和const**：auto会忽略顶层const和引用，除非显式指定
3. **函数模板**：在函数模板返回类型中使用auto需要C++14支持

```cpp
const int x = 42;
auto y = x;           // y是int，不是const int
const auto z = x;     // z是const int
auto& ref = x;       // ref是const int&

// C++14：auto返回类型推导
auto add(auto a, auto b) {  // C++20概念
    return a + b;
}
```

### 范围for循环

基于范围的for循环提供了简洁、安全的容器遍历方式：

```cpp
#include <vector>
#include <array>
#include <map>
#include <string>
#include <iostream>

int main() {
    // 数组遍历
    int arr[] = {1, 2, 3, 4, 5};

    // 只读遍历（拷贝）
    for (auto val : arr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // 只读遍历（const引用，避免拷贝）
    for (const auto& val : arr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // 修改遍历（非const引用）
    std::vector<int> vec = {1, 2, 3, 4, 5};
    for (auto& val : vec) {
        val *= 2;  // 修改元素值
    }

    // 不同容器的遍历
    std::map<std::string, int> scores = {% raw %}{{"Alice", 95}, {"Bob", 87}}{% endraw %};
    for (const auto& [name, score] : scores) {  // C++17结构化绑定
        std::cout << name << ": " << score << std::endl;
    }

    return 0;
}
```

#### 范围for循环的内部机制

范围for循环等价于使用迭代器的传统for循环：

```cpp
// 这两种写法等价：
for (auto x : container) {
    // 使用x
}

for (auto it = container.begin(); it != container.end(); ++it) {
    auto x = *it;
    // 使用x
}
```

### Lambda表达式

Lambda表达式提供了匿名函数功能，是函数式编程的重要工具：

```cpp
#include <vector>
#include <algorithm>
#include <iostream>
#include <numeric>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // 基本lambda表达式
    auto square = [](int x) { return x * x; };
    std::cout << "5的平方: " << square(5) << std::endl;

    // 带参数列表的lambda
    auto add = [](int a, int b) -> int {  // 显式指定返回类型
        return a + b;
    };

    // 捕获列表的使用
    int factor = 3;
    auto multiply = [factor](int x) { return x * factor; };  // 值捕获
    auto multiply_ref = [&factor](int x) { return x * factor; };  // 引用捕获

    // 混合捕获
    int offset = 10;
    auto complex_lambda = [factor, &offset](int x) {
        offset += factor;
        return x * factor + offset;
    };

    // 与STL算法结合使用
    std::transform(numbers.begin(), numbers.end(), numbers.begin(),
                 [](int x) { return x * 2; });

    // 使用std::for_each
    std::for_each(numbers.begin(), numbers.end(),
                 [](int& x) { x += 1; });

    // 使用std::accumulate和lambda
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0,
                           [](int acc, int val) { return acc + val; });

    std::cout << "总和: " << sum << std::endl;

    return 0;
}
```

#### Lambda表达式语法详解

```cpp
[捕获列表](参数列表) mutable(可选) -> 返回类型 {
    函数体
}

// 捕获列表的多种形式：
[capture]          // 默认捕获方式
[=]               // 按值捕获所有外部变量
[&]               // 按引用捕获所有外部变量
[x, &y]           // x按值捕获，y按引用捕获
[=, &z]           // 除z外都按值捕获，z按引用捕获
[&, x]            // 除x外都按引用捕获，x按值捕获
[this]             // 捕获当前类的this指针
[*this]            // C++17：按值捕获当前对象
```

### 智能指针革新

C++11引入了新的智能指针体系，替代了有问题的`auto_ptr`：

```cpp
#include <memory>
#include <iostream>
#include <vector>
#include <string>

class Resource {
public:
    Resource(const std::string& name = "Resource") : name_(name) {
        std::cout << name_ << " 构造" << std::endl;
    }

    ~Resource() {
        std::cout << name_ << " 析构" << std::endl;
    }

    void doSomething() const {
        std::cout << name_ << " 正在工作" << std::endl;
    }

private:
    std::string name_;
};

int main() {
    // unique_ptr：独占所有权
    std::cout << "=== unique_ptr演示 ===" << std::endl;
    {
        auto ptr1 = std::make_unique<Resource>("资源1");  // C++14
        ptr1->doSomething();

        // 转移所有权
        auto ptr2 = std::move(ptr1);
        if (ptr1) {
            std::cout << "ptr1仍然有效" << std::endl;
        } else {
            std::cout << "ptr1已转移所有权" << std::endl;
        }

        ptr2->doSomething();
        // ptr1和ptr2离开作用域时自动释放资源
    }

    // shared_ptr：共享所有权
    std::cout << "\n=== shared_ptr演示 ===" << std::endl;
    {
        auto ptr1 = std::make_shared<Resource>("共享资源");
        std::cout << "引用计数: " << ptr1.use_count() << std::endl;

        {
            auto ptr2 = ptr1;  // 拷贝构造，增加引用计数
            std::cout << "引用计数: " << ptr1.use_count() << std::endl;

            ptr1->doSomething();
            ptr2->doSomething();
        }

        std::cout << "ptr2离开作用域后，引用计数: " << ptr1.use_count() << std::endl;
    }

    // weak_ptr：弱引用，解决循环引用
    std::cout << "\n=== weak_ptr演示 ===" << std::endl;
    {
        auto shared = std::make_shared<Resource>("弱引用资源");
        std::weak_ptr<Resource> weak = shared;

        std::cout << "shared引用计数: " << shared.use_count() << std::endl;
        std::cout << "weak是否过期: " << weak.expired() << std::endl;

        if (auto locked = weak.lock()) {  // 尝试获取shared_ptr
            locked->doSomething();
            std::cout << "成功锁定，引用计数: " << locked.use_count() << std::endl;
        }

        shared.reset();
        std::cout << "shared重置后，weak是否过期: " << weak.expired() << std::endl;
    }

    return 0;
}
```

#### 智能指针最佳实践

1. **优先使用std::make_unique和std::make_shared**
2. **避免原始指针和智能指针混用**
3. **注意循环引用问题，使用weak_ptr解决**
4. **自定义删除器**

```cpp
// 自定义删除器示例
auto file_deleter = [](FILE* f) {
    if (f) fclose(f);
};
std::unique_ptr<FILE, decltype(file_deleter)> file(fopen("test.txt", "w"), file_deleter);
```

### 右值引用与移动语义

右值引用(`&&`)和移动语义是C++11最重要的性能优化特性：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <utility>

class MyString {
private:
    char* data_;
    size_t size_;

public:
    // 构造函数
    MyString(const char* str = "") : size_(strlen(str)) {
        data_ = new char[size_ + 1];
        strcpy(data_, str);
        std::cout << "构造函数: " << data_ << std::endl;
    }

    // 拷贝构造函数（深拷贝）
    MyString(const MyString& other) : size_(other.size_) {
        data_ = new char[size_ + 1];
        strcpy(data_, other.data_);
        std::cout << "拷贝构造函数: " << data_ << std::endl;
    }

    // 移动构造函数（转移资源）
    MyString(MyString&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
        std::cout << "移动构造函数: " << (data_ ? data_ : "nullptr") << std::endl;
    }

    // 拷贝赋值运算符
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            delete[] data_;
            size_ = other.size_;
            data_ = new char[size_ + 1];
            strcpy(data_, other.data_);
            std::cout << "拷贝赋值运算符" << std::endl;
        }
        return *this;
    }

    // 移动赋值运算符
    MyString& operator=(MyString&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
            std::cout << "移动赋值运算符" << std::endl;
        }
        return *this;
    }

    // 析构函数
    ~MyString() {
        std::cout << "析构函数: " << (data_ ? data_ : "nullptr") << std::endl;
        delete[] data_;
    }

    const char* data() const { return data_; }
};

int main() {
    std::cout << "=== 移动语义演示 ===" << std::endl;

    MyString str1("Hello");
    MyString str2 = str1;           // 拷贝构造
    MyString str3 = std::move(str1); // 移动构造，str1变为空

    MyString str4("World");
    str4 = str2;                    // 拷贝赋值
    str4 = MyString("C++");          // 移动赋值（临时对象）

    std::cout << "\n=== 容器中的移动语义 ===" << std::endl;
    std::vector<MyString> vec;
    vec.reserve(3);  // 预分配空间避免重新分配

    MyString temp1("第一个");
    vec.push_back(temp1);           // 拷贝构造
    vec.push_back(MyString("第二个")); // 移动构造（临时对象）
    vec.push_back(std::move(temp1));  // 移动构造

    return 0;
}
```

#### 完美转发

完美转发结合右值引用实现参数的完美传递：

```cpp
#include <iostream>
#include <utility>
#include <string>

class Wrapper {
public:
    // 完美转发构造函数
    template<typename T>
    Wrapper(T&& arg) : data_(std::forward<T>(arg)) {
        std::cout << "完美转发构造函数" << std::endl;
    }

    void print() const {
        std::cout << "数据: " << data_ << std::endl;
    }

private:
    std::string data_;
};

// 工厂函数
template<typename T, typename... Args>
std::unique_ptr<T> make_unique_wrapper(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

int main() {
    std::string str = "Hello";

    // 传递左值
    Wrapper w1(str);        // T推导为string&

    // 传递右值
    Wrapper w2("World");    // T推导为string

    // 完美转发工厂函数
    auto ptr = make_unique_wrapper<Wrapper>("C++");
    ptr->print();

    return 0;
}
```

### nullptr与强类型空指针

`nullptr`提供了类型安全的空指针表示：

```cpp
#include <iostream>

void func(int) {
    std::cout << "调用func(int)" << std::endl;
}

void func(char*) {
    std::cout << "调用func(char*)" << std::endl;
}

void func(bool) {
    std::cout << "调用func(bool)" << std::endl;
}

int main() {
    func(0);          // 调用func(int)
    func(nullptr);    // 调用func(char*)，明确意图

    int* ptr = nullptr;
    if (ptr == nullptr) {
        std::cout << "ptr是空指针" << std::endl;
    }

    // nullptr的类型安全
    // func(nullptr);  // 不会调用func(bool)，避免意外转换

    // 模板中的nullptr
    auto lambda = [](auto* ptr) {
        if (ptr == nullptr) {
            std::cout << "接收到空指针" << std::endl;
        } else {
            std::cout << "接收到有效指针" << std::endl;
        }
    };

    int x = 42;
    lambda(&x);       // 有效指针
    lambda(nullptr);  // 空指针

    return 0;
}
```

### constexpr与编译时计算

`constexpr`支持编译时常量表达式和函数：

```cpp
#include <iostream>
#include <array>

// constexpr函数
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

constexpr bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

// constexpr类
class Point {
public:
    constexpr Point(double x, double y) : x_(x), y_(y) {}

    constexpr double x() const { return x_; }
    constexpr double y() const { return y_; }

    constexpr double distance() const {
        return x_ * x_ + y_ * y_;  // 距离的平方
    }

private:
    double x_, y_;
};

int main() {
    // 编译时计算
    constexpr int fact5 = factorial(5);
    constexpr bool prime7 = isPrime(7);

    std::cout << "5! = " << fact5 << std::endl;
    std::cout << "7是质数吗? " << std::boolalpha << prime7 << std::endl;

    // 编译时数组大小
    int arr[factorial(4)];  // 编译时确定大小
    std::array<int, factorial(3)> arr2;  // STL容器

    // constexpr对象
    constexpr Point p(3.0, 4.0);
    constexpr double dist = p.distance();

    std::cout << "点(" << p.x() << ", " << p.y() << ")的距离平方: " << dist << std::endl;

    return 0;
}
```

### 统一初始化与初始化列表

大括号初始化提供了统一的初始化语法：

```cpp
#include <vector>
#include <map>
#include <string>
#include <iostream>
#include <initializer_list>

class Point {
private:
    double x_, y_;

public:
    // 构造函数支持初始化列表
    Point(std::initializer_list<double> init) {
        if (init.size() >= 2) {
            auto it = init.begin();
            x_ = *it++;
            y_ = *it;
        }
    }

    void print() const {
        std::cout << "(" << x_ << ", " << y_ << ")" << std::endl;
    }
};

int main() {
    // 基本类型初始化
    int a{10};           // 直接初始化
    int b = {20};        // 拷贝初始化
    int c{};             // 值初始化（0）

    double d{3.14};
    char ch{'A'};

    // 数组初始化
    int arr[]{1, 2, 3, 4, 5};
    int arr2[3]{1, 2, 3};  // 指定大小

    // 容器初始化
    std::vector<int> vec{1, 2, 3, 4, 5};
    std::map<std::string, int> scores{
        {"Alice", 95},
        {"Bob", 87},
        {"Charlie", 92}
    };

    // 类对象初始化
    Point p1{3.0, 4.0};  // 使用初始化列表构造函数
    Point p2{1, 2, 3};   // 多余的元素被忽略

    // 防止窄化转换
    // int x{3.14};      // 编译错误：不能从double窄化到int
    // char y{1000};     // 编译错误：超出char范围

    // 允许的转换
    int z{3.0};         // OK：3.0可以安全转换为3

    p1.print();
    p2.print();

    return 0;
}
```

### 委托构造函数

构造函数可以调用同一类的其他构造函数：

```cpp
#include <iostream>
#include <string>
#include <vector>

class Employee {
private:
    std::string name_;
    int age_;
    std::string department_;
    double salary_;
    std::vector<std::string> skills_;

public:
    // 主构造函数
    Employee(const std::string& name, int age,
            const std::string& department, double salary,
            const std::vector<std::string>& skills = {})
        : name_(name), age_(age), department_(department),
          salary_(salary), skills_(skills) {
        std::cout << "主构造函数被调用" << std::endl;
    }

    // 委托构造函数1
    Employee(const std::string& name, int age, const std::string& department)
        : Employee(name, age, department, 30000.0) {  // 委托到主构造函数
        std::cout << "委托构造函数1被调用" << std::endl;
    }

    // 委托构造函数2
    Employee(const std::string& name, int age)
        : Employee(name, age, "待分配") {
        std::cout << "委托构造函数2被调用" << std::endl;
    }

    // 委托构造函数3
    explicit Employee(const std::string& name)
        : Employee(name, 25) {
        std::cout << "委托构造函数3被调用" << std::endl;
    }

    void display() const {
        std::cout << "姓名: " << name_ << ", 年龄: " << age_
                  << ", 部门: " << department_
                  << ", 薪资: " << salary_ << std::endl;
        if (!skills_.empty()) {
            std::cout << "技能: ";
            for (const auto& skill : skills_) {
                std::cout << skill << " ";
            }
            std::cout << std::endl;
        }
    }
};

int main() {
    Employee emp1("张三", 30, "技术部", 50000.0, {"C++", "Python"});
    Employee emp2("李四", 28, "产品部");
    Employee emp3("王五", 25);
    Employee emp4("赵六");  // explicit构造函数需要显式调用

    emp1.display();
    emp2.display();
    emp3.display();
    emp4.display();

    return 0;
}
```

### override和final关键字

这两个关键字提供了更明确的虚函数控制：

```cpp
#include <iostream>
#include <memory>

class Shape {
public:
    // 纯虚函数
    virtual double area() const = 0;
    virtual double perimeter() const = 0;

    // 虚函数
    virtual void draw() const {
        std::cout << "绘制形状" << std::endl;
    }

    // final函数，不能被重写
    virtual void finalize() const final {
        std::cout << "完成形状处理" << std::endl;
    }

    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius_;

public:
    explicit Circle(double radius) : radius_(radius) {}

    // 使用override明确表示重写
    double area() const override {
        return 3.14159 * radius_ * radius_;
    }

    double perimeter() const override {
        return 2 * 3.14159 * radius_;
    }

    void draw() const override {
        std::cout << "绘制圆形，半径: " << radius_ << std::endl;
    }

    // 错误：不能重写final函数
    // void finalize() const override { }

    // 错误：基类中没有这个虚函数
    // void resize() const override { }
};

// final类，不能被继承
class Rectangle final : public Shape {
private:
    double width_, height_;

public:
    Rectangle(double width, double height) : width_(width), height_(height) {}

    double area() const override {
        return width_ * height_;
    }

    double perimeter() const override {
        return 2 * (width_ + height_);
    }

    void draw() const override {
        std::cout << "绘制矩形，宽: " << width_ << ", 高: " << height_ << std::endl;
    }
};

// 错误：不能继承final类
// class Square : public Rectangle { };

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));

    for (const auto& shape : shapes) {
        shape->draw();
        std::cout << "面积: " << shape->area() << std::endl;
        std::cout << "周长: " << shape->perimeter() << std::endl;
        shape->finalize();
        std::cout << "---" << std::endl;
    }

    return 0;
}
```

### 可变参数模板

可变参数模板支持任意数量和类型的参数：

```cpp
#include <iostream>
#include <string>
#include <tuple>

// 递归终止条件
void print() {
    std::cout << std::endl;
}

// 可变参数模板函数
template<typename T, typename... Args>
void print(T first, Args... args) {
    std::cout << first << " ";
    print(args...);  // 递归调用
}

// 计算参数个数
template<typename... Args>
constexpr size_t countArgs(Args... args) {
    return sizeof...(args);
}

// 折叠表达式求和（C++17）
template<typename... Args>
auto sum(Args... args) {
    return (args + ... + ...);  // 左折叠
}

// 条件折叠表达式（C++17）
template<typename... Args>
bool allPositive(Args... args) {
    return (args > 0 && ...);  // 左折叠
}

// 编译时参数包展开
template<typename... Types>
class TypeList {
public:
    static constexpr size_t size = sizeof...(Types);

    template<size_t N>
    using type = typename std::tuple_element<N, std::tuple<Types...>>::type;
};

int main() {
    // 基本使用
    print(1, 2.5, "Hello", 'A', true);

    // 参数个数
    std::cout << "参数个数: " << countArgs(1, 2, 3, 4, 5) << std::endl;

    // 求和
    std::cout << "求和: " << sum(1, 2, 3, 4, 5) << std::endl;

    // 条件判断
    std::cout << "全部为正: " << std::boolalpha << allPositive(1, 2, 3) << std::endl;
    std::cout << "全部为正: " << std::boolalpha << allPositive(1, -2, 3) << std::endl;

    // 类型列表
    using MyTypes = TypeList<int, double, std::string>;
    std::cout << "类型列表大小: " << MyTypes::size << std::endl;

    // 完美转发可变参数
    auto forwarder = [](auto&&... args) {
        print(std::forward<decltype(args)>(args)...);
    };

    forwarder("转发", 42, 3.14);

    return 0;
}
```

### 新容器类型：std::array和std::tuple

C++11引入了新的容器类型：

```cpp
#include <array>
#include <tuple>
#include <iostream>
#include <string>
#include <utility>

// tuple辅助函数
template<typename T>
void printTuple(const T& t) {
    std::cout << "{ ";
    std::apply([](const auto&... args) {
        ((std::cout << args << " "), ...);  // C++17折叠表达式
    }, t);
    std::cout << "}" << std::endl;
}

int main() {
    // std::array：固定大小数组
    std::cout << "=== std::array演示 ===" << std::endl;

    std::array<int, 5> arr = {1, 2, 3, 4, 5};

    std::cout << "数组大小: " << arr.size() << std::endl;
    std::cout << "第一个元素: " << arr.front() << std::endl;
    std::cout << "最后一个元素: " << arr.back() << std::endl;

    // 访问元素
    std::cout << "第二个元素: " << arr[1] << std::endl;
    std::cout << "第三个元素: " << arr.at(2) << std::endl;

    // 迭代器支持
    std::cout << "所有元素: ";
    for (const auto& val : arr) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // std::tuple：元组
    std::cout << "\n=== std::tuple演示 ===" << std::endl;

    // 创建元组
    std::tuple<int, std::string, double> person(25, "张三", 175.5);
    auto employee = std::make_tuple("李四", 30, "工程师", 45000.0);

    // 访问元组元素
    std::cout << "年龄: " << std::get<0>(person) << std::endl;
    std::cout << "姓名: " << std::get<1>(person) << std::endl;
    std::cout << "身高: " << std::get<2>(person) << std::endl;

    // 使用std::tie解包元组
    int age;
    std::string name;
    double height;
    std::tie(age, name, height) = person;

    std::cout << "解包后 - 年龄: " << age << ", 姓名: " << name << ", 身高: " << height << std::endl;

    // C++17结构化绑定（更简洁）
    auto [empName, empAge, empDept, empSalary] = employee;
    std::cout << "结构化绑定 - 姓名: " << empName << ", 年龄: " << empAge
              << ", 部门: " << empDept << ", 薪资: " << empSalary << std::endl;

    // 元组比较和连接
    auto person2 = std::make_tuple(25, "张三", 175.5);
    if (person == person2) {
        std::cout << "两个元组相等" << std::endl;
    }

    auto combined = std::tuple_cat(person, employee);
    std::cout << "连接后的元组: ";
    printTuple(combined);

    // 元组大小
    std::cout << "元组大小: " << std::tuple_size<decltype(person)>::value << std::endl;

    return 0;
}
```

### 正则表达式库

C++11引入了强大的正则表达式支持：

```cpp
#include <iostream>
#include <regex>
#include <string>
#include <vector>
#include <map>

int main() {
    // 基本正则表达式匹配
    std::cout << "=== 基本匹配演示 ===" << std::endl;

    std::string text = "我的电话号码是13812345678，邮箱是example@email.com，身份证号110101199001011234";

    // 电话号码匹配（11位数字）
    std::regex phone_pattern(R"(\d{11})");
    std::smatch phone_match;
    if (std::regex_search(text, phone_match, phone_pattern)) {
        std::cout << "找到电话号码: " << phone_match.str() << std::endl;
    }

    // 邮箱匹配
    std::regex email_pattern(R"([\w\.-]+@[\w\.-]+\.\w+)");
    std::smatch email_match;
    if (std::regex_search(text, email_match, email_pattern)) {
        std::cout << "找到邮箱: " << email_match.str() << std::endl;
    }

    // 身份证号匹配（18位）
    std::regex id_pattern(R"(\d{17}[\dXx])");
    std::smatch id_match;
    if (std::regex_search(text, id_match, id_pattern)) {
        std::cout << "找到身份证号: " << id_match.str() << std::endl;
    }

    // 查找所有匹配
    std::cout << "\n=== 查找所有匹配 ===" << std::endl;

    std::vector<std::string> words = {"apple", "banana", "cherry", "date", "elderberry"};
    std::regex vowel_pattern(R"([aeiou])");

    std::cout << "包含元音字母的单词: ";
    for (const auto& word : words) {
        if (std::regex_search(word, vowel_pattern)) {
            std::cout << word << " ";
        }
    }
    std::cout << std::endl;

    // 使用迭代器查找所有匹配
    std::string data = "价格: 100元, 200元, 300元, 400元";
    std::regex price_pattern(R"(\d+元)");

    std::cout << "所有价格: ";
    auto words_begin = std::sregex_iterator(data.begin(), data.end(), price_pattern);
    auto words_end = std::sregex_iterator();
    for (auto it = words_begin; it != words_end; ++it) {
        std::cout << it->str() << " ";
    }
    std::cout << std::endl;

    // 替换操作
    std::cout << "\n=== 替换操作演示 ===" << std::endl;

    std::string input = "Hello World Hello C++ Hello Programming";
    std::string result = std::regex_replace(input, std::regex("Hello"), "Hi");
    std::cout << "简单替换: " << result << std::endl;

    // 使用格式化替换
    std::string name_text = "姓名: 张三, 年龄: 25, 城市: 北京";
    std::regex format_pattern(R"((\w+): (\w+))");
    std::string formatted = std::regex_replace(name_text, format_pattern, "[$1]=$2");
    std::cout << "格式化替换: " << formatted << std::endl;

    // 分割字符串
    std::cout << "\n=== 字符串分割演示 ===" << std::endl;

    std::string csv_data = "apple,banana,cherry,date";
    std::regex split_pattern(R"(,)");
    std::sregex_token_iterator tokens_begin(csv_data.begin(), csv_data.end(), split_pattern, -1);
    std::sregex_token_iterator tokens_end;

    std::cout << "分割结果: ";
    for (auto it = tokens_begin; it != tokens_end; ++it) {
        std::cout << "[" << it->str() << "] ";
    }
    std::cout << std::endl;

    return 0;
}
```

### 线程库

C++11首次引入了标准线程库：

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <future>
#include <chrono>
#include <atomic>
#include <vector>

std::mutex g_mutex;
std::condition_variable g_cv;
bool g_ready = false;
std::atomic<int> g_counter{0};

// 工作线程函数
void worker_thread(int id) {
    std::unique_lock<std::mutex> lock(g_mutex);
    g_cv.wait(lock, []{ return g_ready; });

    std::cout << "工作线程 " << id << " 开始执行" << std::endl;

    // 模拟工作
    for (int i = 0; i < 5; ++i) {
        g_counter++;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    std::cout << "工作线程 " << id << " 完成，计数器: " << g_counter << std::endl;
}

// 异步函数
std::future<int> async_compute() {
    return std::async(std::launch::async, []() {
        std::cout << "异步计算开始..." << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(2));

        int result = 0;
        for (int i = 1; i <= 100; ++i) {
            result += i;
        }

        std::cout << "异步计算完成，结果: " << result << std::endl;
        return result;
    });
}

int main() {
    std::cout << "=== 线程库演示 ===" << std::endl;

    // 创建多个工作线程
    std::vector<std::thread> workers;
    for (int i = 1; i <= 3; ++i) {
        workers.emplace_back(worker_thread, i);
    }

    // 准备工作
    std::this_thread::sleep_for(std::chrono::milliseconds(500));

    {
        std::lock_guard<std::mutex> lock(g_mutex);
        g_ready = true;
        std::cout << "准备工作完成，通知所有工作线程" << std::endl;
    }

    g_cv.notify_all();

    // 等待所有工作线程完成
    for (auto& worker : workers) {
        worker.join();
    }

    std::cout << "所有工作线程完成，最终计数器: " << g_counter << std::endl;

    // 异步操作演示
    std::cout << "\n=== 异步操作演示 ===" << std::endl;

    auto future_result = async_compute();

    std::cout << "主线程继续执行其他工作..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1));

    // 等待异步操作完成
    int result = future_result.get();
    std::cout << "主线程获得异步结果: " << result << std::endl;

    // packaged_task演示
    std::cout << "\n=== packaged_task演示 ===" << std::endl;

    std::packaged_task<int(int, int>> task([](int a, int b) {
        std::cout << "执行 packaged_task: " << a << " + " << b << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        return a + b;
    });

    auto future_sum = task.get_future();
    std::thread task_thread(std::move(task), 10, 20);

    std::cout << "等待 packaged_task 完成..." << std::endl;
    int sum = future_sum.get();
    std::cout << "packaged_task 结果: " << sum << std::endl;

    task_thread.join();

    return 0;
}
```

这些C++11新特性极大地提升了C++的现代化程度，使代码更加简洁、安全和高效。从类型推导到Lambda表达式，从智能指针到并发编程，C++11为开发者提供了强大的工具集，标志着C++语言进入了新的发展阶段。

## C++14/17/20新增特性

在C++11的基础上，后续的标准继续扩展和完善C++语言特性。

### C++14主要特性

#### 泛型Lambda

C++14允许Lambda表达式使用`auto`参数：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // C++11的Lambda
    auto add1 = [](int x, int y) { return x + y; };

    // C++14的泛型Lambda
    auto add2 = [](auto x, auto y) { return x + y; };

    std::cout << add1(3, 4) << std::endl;        // 7
    std::cout << add2(3.5, 2.5) << std::endl;    // 6.0
    std::cout << add2(std::string("Hello "), std::string("World")) << std::endl; // Hello World

    return 0;
}
```

#### 二进制字面量和数字分隔符

```cpp
#include <iostream>

int main() {
    // 二进制字面量
    int binary = 0b101010;  // 42
    std::cout << binary << std::endl;

    // 数字分隔符
    long long big_number = 1'000'000'000'000;
    double pi = 3.141'592'653'589;

    std::cout << big_number << std::endl;
    std::cout << pi << std::endl;

    return 0;
}
```

#### 返回类型推导

```cpp
#include <iostream>
#include <vector>

// C++11: 必须指定返回类型
auto add1(int x, int y) -> int {
    return x + y;
}

// C++14: 可以推导返回类型
auto add2(int x, int y) {
    return x + y;
}

// 更复杂的推导
auto createVector() {
    return std::vector<int>{1, 2, 3, 4, 5};
}

int main() {
    std::cout << add2(10, 20) << std::endl;

    auto vec = createVector();
    for (const auto& val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

#### constexpr扩展

C++14放宽了constexpr的限制：

```cpp
#include <iostream>

// C++14中constexpr可以有更复杂的逻辑
constexpr int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

constexpr bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    constexpr int fact5 = factorial(5);
    constexpr bool prime7 = isPrime(7);

    std::cout << "5! = " << fact5 << std::endl;
    std::cout << "7是质数吗? " << std::boolalpha << prime7 << std::endl;

    return 0;
}
```

### C++17主要特性

#### 结构化绑定

结构化绑定让从元组、结构体或数组中提取值变得更加简洁：

```cpp
#include <iostream>
#include <tuple>
#include <map>
#include <unordered_map>

struct Point {
    double x, y;
};

int main() {
    // 元组结构化绑定
    auto [age, name, height] = std::make_tuple(25, std::string("张三"), 175.5);
    std::cout << "年龄: " << age << ", 姓名: " << name << ", 身高: " << height << std::endl;

    // 结构体结构化绑定
    Point p{3.14, 2.71};
    auto [x, y] = p;
    std::cout << "x: " << x << ", y: " << y << std::endl;

    // 数组结构化绑定
    int arr[] = {10, 20, 30};
    auto [a, b, c] = arr;
    std::cout << a << ", " << b << ", " << c << std::endl;

    // map遍历
    std::map<std::string, int> scores = {% raw %}{{"Alice", 95}, {"Bob", 87}, {"Charlie", 92}}{% endraw %};
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << std::endl;
    }

    return 0;
}
```

#### if constexpr

编译时if语句：

```cpp
#include <iostream>
#include <type_traits>

template<typename T>
auto process(T value) {
    if constexpr (std::is_integral_v<T>) {
        std::cout << "处理整数: " << value << std::endl;
        return value * 2;
    } else if constexpr (std::is_floating_point_v<T>) {
        std::cout << "处理浮点数: " << value << std::endl;
        return value * 1.5;
    } else {
        std::cout << "处理其他类型" << std::endl;
        return value;
    }
}

int main() {
    process(42);          // 整数
    process(3.14);        // 浮点数
    process("Hello");     // 其他类型

    return 0;
}
```

#### std::optional

表示可能不存在的值：

```cpp
#include <iostream>
#include <optional>
#include <string>

std::optional<int> divide(int a, int b) {
    if (b == 0) {
        return std::nullopt;  // 表示没有值
    }
    return a / b;
}

std::optional<std::string> findUser(int id) {
    if (id == 1) {
        return std::string("Alice");
    } else if (id == 2) {
        return std::string("Bob");
    }
    return std::nullopt;
}

int main() {
    // 使用optional
    auto result1 = divide(10, 2);
    auto result2 = divide(10, 0);

    if (result1) {
        std::cout << "10 / 2 = " << *result1 << std::endl;
    }

    if (!result2) {
        std::cout << "除零错误" << std::endl;
    }

    // 使用value_or提供默认值
    auto user = findUser(3).value_or("未知用户");
    std::cout << "用户: " << user << std::endl;

    return 0;
}
```

#### std::variant

类型安全的联合体：

```cpp
#include <iostream>
#include <variant>
#include <string>
#include <vector>

int main() {
    // variant可以存储多种类型中的任意一种
    std::variant<int, double, std::string> data;

    data = 42;
    std::cout << std::get<int>(data) << std::endl;

    data = 3.14;
    std::cout << std::get<double>(data) << std::endl;

    data = std::string("Hello");
    std::cout << std::get<std::string>(data) << std::endl;

    // 使用访问者模式
    std::vector<std::variant<int, double, std::string>> values = {
        42, 3.14, std::string("Hello"), 100, 2.718
    };

    for (const auto& value : values) {
        std::visit([](const auto& v) {
            std::cout << v << " (类型: " << typeid(v).name() << ") ";
        }, value);
    }
    std::cout << std::endl;

    return 0;
}
```

#### std::any

可以存储任意类型的值：

```cpp
#include <iostream>
#include <any>
#include <vector>
#include <string>

int main() {
    std::vector<std::any> data;

    data.push_back(42);
    data.push_back(3.14);
    data.push_back(std::string("Hello"));

    for (const auto& item : data) {
        if (item.type() == typeid(int)) {
            std::cout << "整数: " << std::any_cast<int>(item) << std::endl;
        } else if (item.type() == typeid(double)) {
            std::cout << "浮点数: " << std::any_cast<double>(item) << std::endl;
        } else if (item.type() == typeid(std::string)) {
            std::cout << "字符串: " << std::any_cast<std::string>(item) << std::endl;
        }
    }

    return 0;
}
```

#### std::string_view

非拥有性的字符串视图：

```cpp
#include <iostream>
#include <string>
#include <string_view>

void printString(std::string_view sv) {
    std::cout << "字符串视图: " << sv << " (长度: " << sv.length() << ")" << std::endl;
}

int main() {
    std::string str = "Hello, World!";

    // string_view避免拷贝
    std::string_view view1(str);
    std::string_view view2(str.substr(0, 5));

    printString(str);      // 从string构造
    printString("C++17");  // 从字符串字面量构造
    printString(view1);    // 从另一个string_view构造

    // 字面量后缀
    using namespace std::string_view_literals;
    auto view3 = "String literal"sv;

    std::cout << view3 << std::endl;

    return 0;
}
```

#### 并行算法

STL算法支持并行执行：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>
#include <chrono>

int main() {
    std::vector<int> vec(10'000'000);

    // 初始化向量
    for (size_t i = 0; i < vec.size(); ++i) {
        vec[i] = i;
    }

    auto start = std::chrono::high_resolution_clock::now();

    // 使用并行算法
    std::sort(std::execution::par, vec.begin(), vec.end());

    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);

    std::cout << "并行排序耗时: " << duration.count() << " 毫秒" << std::endl;

    // 也可以使用其他执行策略
    // std::execution::seq - 顺序执行
    // std::execution::par - 并行执行
    // std::execution::par_unseq - 并行+向量化执行

    return 0;
}
```

### C++20主要特性

#### Concepts

约束模板参数，提供更好的编译时错误信息：

```cpp
#include <iostream>
#include <concepts>
#include <type_traits>

// 定义concept
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

// 使用concept约束模板参数
template<Numeric T>
T add(T a, T b) {
    return a + b;
}

// 更复杂的concept
template<typename T>
concept Container = requires(T t) {
    typename T::value_type;
    typename T::iterator;
    { t.begin() } -> std::same_as<typename T::iterator>;
    { t.end() } -> std::same_as<typename T::iterator>;
    { t.size() } -> std::convertible_to<typename T::size_type>;
};

template<Container C>
void printContainer(const C& container) {
    for (const auto& item : container) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    std::cout << add(3.14, 2.86) << std::endl;

    // add("Hello", "World");  // 编译错误，不满足Numeric concept

    std::vector<int> vec{1, 2, 3, 4, 5};
    printContainer(vec);

    return 0;
}
```

#### Ranges

提供更强大的范围操作：

```cpp
#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // 使用ranges进行过滤和转换
    auto result = numbers
        | std::views::filter([](int n) { return n % 2 == 0; })  // 只保留偶数
        | std::views::transform([](int n) { return n * n; })   // 平方
        | std::views::take(3);                                  // 只取前3个

    for (int n : result) {
        std::cout << n << " ";  // 输出: 4 16 36
    }
    std::cout << std::endl;

    // 其他有用的views
    auto even_numbers = std::views::iota(1) | std::views::filter([](int n) {
        return n % 2 == 0;
    }) | std::views::take(5);

    for (int n : even_numbers) {
        std::cout << n << " ";  // 输出: 2 4 6 8 10
    }
    std::cout << std::endl;

    return 0;
}
```

#### 协程（Coroutines）

支持异步编程：

```cpp
#include <iostream>
#include <coroutine>
#include <future>

// 简单的协程返回类型
struct Task {
    struct promise_type {
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
    };

    std::coroutine_handle<promise_type> coro;
    Task(std::coroutine_handle<promise_type> h) : coro(h) {}
    ~Task() { if (coro) coro.destroy(); }
};

// 简单的awaitable类型
struct Sleeper {
    int duration;
    bool await_ready() { return false; }
    void await_suspend(std::coroutine_handle<> handle) {
        // 在实际应用中，这里会设置定时器或异步操作
        std::this_thread::sleep_for(std::chrono::seconds(duration));
    }
    void await_resume() {}
};

Task asyncFunction() {
    std::cout << "开始异步操作..." << std::endl;
    co_await Sleeper{2};  // 模拟异步等待
    std::cout << "异步操作完成!" << std::endl;
}

int main() {
    asyncFunction();
    std::cout << "主线程继续执行..." << std::endl;

    return 0;
}
```

#### Modules

模块系统替代头文件：

```cpp
// mymodule.ixx (C++20模块文件)
export module mymodule;

export int add(int a, int b) {
    return a + b;
}

export void greet(const std::string& name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}

// main.cpp
import mymodule;
import <iostream>;

int main() {
    int result = add(5, 3);
    std::cout << "5 + 3 = " << result << std::endl;

    greet("World");

    return 0;
}
```

#### 三路比较运算符（Spaceship Operator）

```cpp
#include <iostream>
#include <compare>
#include <string>

struct Point {
    int x, y;

    // 自动生成三路比较运算符
    auto operator<=>(const Point&) const = default;
};

struct Person {
    std::string name;
    int age;

    // 自定义比较逻辑
    std::strong_ordering operator<=>(const Person& other) const {
        if (auto cmp = age <=> other.age; cmp != 0) {
            return cmp;
        }
        return name <=> other.name;
    }
};

int main() {
    Point p1{1, 2}, p2{1, 2}, p3{2, 3};

    std::cout << "p1 == p2: " << (p1 == p2) << std::endl;
    std::cout << "p1 < p3: " << (p1 < p3) << std::endl;

    Person alice{"Alice", 25};
    Person bob{"Bob", 30};
    Person charlie{"Charlie", 25};

    std::cout << "alice < bob: " << (alice < bob) << std::endl;
    std::cout << "alice < charlie: " << (alice < charlie) << std::endl;

    return 0;
}
```

#### std::format

格式化字符串库：

```cpp
#include <iostream>
#include <format>
#include <string>
#include <vector>

int main() {
    // 基本格式化
    std::string name = "Alice";
    int age = 25;
    double score = 95.5;

    std::string result = std::format("姓名: {}, 年龄: {}, 分数: {:.1f}", name, age, score);
    std::cout << result << std::endl;

    // 位置参数
    std::string result2 = std::format("{2} {1} {0}", "first", "second", "third");
    std::cout << result2 << std::endl;

    // 格式化容器
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    std::string numbers_str = std::format("{}", numbers);
    std::cout << numbers_str << std::endl;

    return 0;
}
```

这些新特性展示了C++语言的持续演进，使其在保持性能的同时，变得更加现代化、安全和易用。从C++11开始，C++已经从一个相对传统的系统编程语言发展成为一个功能强大、表达力丰富的现代编程语言。

## C++编程最佳实践与总结

通过系统学习C++ Primer Plus的内容，我们不仅掌握了C++语言的核心概念和现代特性，更重要的是理解了如何编写高质量、可维护的C++代码。本部分将总结关键知识点，并提供在实际开发中遵循的最佳实践指南。

### 核心编程能力

#### 基础语法与类型系统

**掌握要点**：
- 理解C++的类型系统，包括基本类型、复合类型和用户自定义类型
- 熟练掌握控制流语句，特别是现代C++的范围for循环
- 正确使用函数，包括函数重载、默认参数和函数模板

**最佳实践**：
```cpp
// 使用constexpr进行编译时计算
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// 优先使用范围for循环
std::vector<int> data = {1, 2, 3, 4, 5};
for (const auto& item : data) {  // const引用避免拷贝
    process(item);
}

// 使用auto简化复杂类型声明
std::map<std::string, std::vector<int>> complex_map;
for (const auto& [key, value] : complex_map) {  // C++17结构化绑定
    // 处理键值对
}
```

#### 面向对象编程

**掌握要点**：
- 理解类的封装、继承和多态三大特性
- 掌握构造函数、析构函数和特殊成员函数
- 熟练运用虚函数实现运行时多态

**最佳实践**：
```cpp
// 遵循RAII原则
class ResourceManager {
public:
    ResourceManager() {
        // 获取资源
        resource_ = acquireResource();
    }

    ~ResourceManager() {
        // 自动释放资源
        if (resource_) {
            releaseResource(resource_);
        }
    }

    // 禁用拷贝，支持移动
    ResourceManager(const ResourceManager&) = delete;
    ResourceManager& operator=(const ResourceManager&) = delete;
    ResourceManager(ResourceManager&& other) noexcept
        : resource_(other.resource_) {
        other.resource_ = nullptr;
    }

private:
    Resource* resource_;
};

// 使用override关键字明确虚函数重写
class Derived : public Base {
public:
    void process() override {  // 明确表示重写
        // 实现
    }

    void finalize() const final {  // 防止进一步重写
        // 最终处理
    }
};
```

#### 泛型编程与STL

**掌握要点**：
- 理解模板编程的基本概念和高级技术
- 熟练使用STL容器、算法和迭代器
- 掌握函数对象和Lambda表达式

**最佳实践**：
```cpp
// 使用模板实现泛型算法
template<typename Container, typename Predicate>
auto find_if(const Container& container, Predicate pred) {
    return std::find_if(container.begin(), container.end(), pred);
}

// 优先使用STL算法而非手写循环
std::vector<int> numbers = {1, 2, 3, 4, 5};

// 好的做法
auto even_count = std::count_if(numbers.begin(), numbers.end(),
                               [](int n) { return n % 2 == 0; });

// 避免
int even_count_manual = 0;
for (int n : numbers) {
    if (n % 2 == 0) ++even_count_manual;
}

// 使用智能指针管理动态分配
auto data = std::make_unique<Data[]>(size);  // C++14
// 而不是：Data* data = new Data[size];
```

### 现代C++特性应用

#### C++11核心特性

**auto类型推导**：
```cpp
// 复杂类型声明简化
std::map<std::string, std::function<int(int, int)>> operations;
auto it = operations.find("add");  // 简化迭代器类型

// 函数返回类型推导（C++14）
auto createCalculator() {
    return [](int a, int b) { return a + b; };
}
```

**Lambda表达式**：
```cpp
// 在STL算法中使用Lambda
std::vector<std::string> words = {"hello", "world", "cpp"};
std::sort(words.begin(), words.end(),
          [](const std::string& a, const std::string& b) {
              return a.length() < b.length();
          });

// 捕获外部变量
int factor = 2;
auto multiply = [factor](int x) { return x * factor; };
```

**智能指针**：
```cpp
// unique_ptr：独占所有权
auto ptr = std::make_unique<MyClass>();

// shared_ptr：共享所有权
auto shared = std::make_shared<MyClass>();

// weak_ptr：解决循环引用
class Node {
public:
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> parent;  // 避免循环引用
};
```

**移动语义**：
```cpp
// 实现移动构造函数和移动赋值运算符
class MyString {
public:
    MyString(MyString&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    MyString& operator=(MyString&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_;
            size_ = other.size_;
            other.data_ = nullptr;
            other.size_ = 0;
        }
        return *this;
    }
};
```

#### C++14/17/20进阶特性

**C++14泛型Lambda**：
```cpp
auto generic_lambda = [](auto a, auto b) {
    return a + b;  // 支持不同类型
};

int result1 = generic_lambda(3, 4);        // 7
double result2 = generic_lambda(3.5, 2.5);  // 6.0
```

**C++17结构化绑定**：
```cpp
std::map<std::string, int> scores = {% raw %}{{"Alice", 95}, {"Bob", 87}}{% endraw %};

for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << std::endl;
}

// 也可以用于元组和数组
auto [x, y, z] = std::make_tuple(1, 2, 3);
int arr[] = {10, 20, 30};
auto [a, b, c] = arr;
```

**C++17可选类型**：
```cpp
std::optional<int> divide(int a, int b) {
    if (b == 0) return std::nullopt;
    return a / b;
}

auto result = divide(10, 2);
if (result) {
    std::cout << "结果: " << *result << std::endl;
} else {
    std::cout << "除零错误" << std::endl;
}

// 使用value_or提供默认值
int value = divide(10, 0).value_or(-1);  // -1
```

**C++20概念**：
```cpp
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<Numeric T>
T add(T a, T b) {
    return a + b;
}

template<typename T>
concept Container = requires(T t) {
    typename T::value_type;
    typename T::iterator;
    { t.begin() } -> std::same_as<typename T::iterator>;
    { t.end() } -> std::same_as<typename T::iterator>;
};

template<Container C>
void process(const C& container) {
    // 处理容器
}
```

### 代码质量与性能优化

#### 内存管理最佳实践

**RAII原则**：
```cpp
class FileHandler {
public:
    FileHandler(const std::string& filename)
        : file_(fopen(filename.c_str(), "r")) {
        if (!file_) {
            throw std::runtime_error("Cannot open file");
        }
    }

    ~FileHandler() {
        if (file_) {
            fclose(file_);
        }
    }

    // 禁用拷贝，允许移动
    FileHandler(const FileHandler&) = delete;
    FileHandler& operator=(const FileHandler&) = delete;
    FileHandler(FileHandler&& other) noexcept : file_(other.file_) {
        other.file_ = nullptr;
    }

    FILE* get() const { return file_; }

private:
    FILE* file_;
};

// 使用
void processFile(const std::string& filename) {
    FileHandler file(filename);  // 自动管理文件资源
    // 使用file.get()进行操作
    // 文件在函数结束时自动关闭
}
```

**智能指针选择指南**：
```cpp
// 1. 独占所有权：使用unique_ptr
auto unique_data = std::make_unique<Data>();

// 2. 共享所有权：使用shared_ptr
auto shared_data = std::make_shared<Data>();

// 3. 循环引用场景：使用weak_ptr
class Parent {
public:
    std::shared_ptr<Child> child;
};

class Child {
public:
    std::weak_ptr<Parent> parent;  // 避免循环引用
};

// 4. 自定义删除器
auto file_deleter = [](FILE* f) { if (f) fclose(f); };
std::unique_ptr<FILE, decltype(file_deleter)> file(fopen("test.txt", "w"), file_deleter);
```

#### 性能优化策略

**移动语义优化**：
```cpp
// 在容器操作中利用移动语义
std::vector<MyString> strings;
strings.reserve(100);  // 预分配避免重新分配

MyString temp("Hello");
strings.push_back(std::move(temp));  // 移动而非拷贝

// 返回值优化
MyString createString() {
    return MyString("World");  // RVO/移动语义
}
```

**算法优化**：
```cpp
// 使用适当的容器
std::vector<int> vec;           // 随机访问，缓存友好
std::list<int> lst;             // 频繁插入删除中间元素
std::unordered_map<int, std::string> umap;  // 快速查找，非有序

// 使用合适的算法
bool found = std::binary_search(sorted_vec.begin(), sorted_vec.end(), target);  // 二分查找
auto it = std::lower_bound(sorted_vec.begin(), sorted_vec.end(), target);    // 下界查找

// 并行算法（C++17）
std::sort(std::execution::par, vec.begin(), vec.end());  // 并行排序
```

#### 异常安全

**基本保证**：
```cpp
class SafeClass {
public:
    SafeClass() : data_(new int[100]) {}

    ~SafeClass() {
        delete[] data_;  // 析构函数中清理资源
    }

    // 提供基本保证：不泄漏资源，对象可能处于有效但未指定状态
    void riskyOperation() {
        auto temp = std::make_unique<int[]>(100);  // RAII管理临时资源

        // 可能抛出异常的操作
        process(temp.get());

        // 如果异常抛出，temp自动清理，data_保持不变
    }

private:
    int* data_;
};
```

**强异常安全**：
```cpp
class StrongSafe {
public:
    void update(const Data& new_data) {
        // 先创建副本
        auto temp_data = data_;  // 拷贝当前状态
        temp_data.apply(new_data);  // 可能抛出异常

        // 只有在所有操作成功后才修改对象状态
        data_ = std::move(temp_data);  // noexcept操作
    }

private:
    Data data_;
};
```

### 代码设计与架构

#### 类设计原则

**单一职责原则**：
```cpp
// 好的设计：职责分离
class DatabaseConnection {
public:
    void connect(const std::string& conn_str);
    void execute(const std::string& query);
    void disconnect();
};

class DataValidator {
public:
    bool isValid(const Data& data) const;
    std::vector<std::string> getErrors() const;
};

class UserService {
public:
    bool createUser(const UserData& user);
    bool updateUser(int id, const UserData& user);
    bool deleteUser(int id);

private:
    DatabaseConnection db_;
    DataValidator validator_;
};
```

**依赖注入**：
```cpp
// 接口抽象
class ILogger {
public:
    virtual ~ILogger() = default;
    virtual void log(const std::string& message) = 0;
};

class ConsoleLogger : public ILogger {
public:
    void log(const std::string& message) override {
        std::cout << message << std::endl;
    }
};

class FileLogger : public ILogger {
public:
    explicit FileLogger(const std::string& filename) : file_(filename) {}
    void log(const std::string& message) override;

private:
    std::ofstream file_;
};

// 依赖注入
class Application {
public:
    explicit Application(std::unique_ptr<ILogger> logger)
        : logger_(std::move(logger)) {}

    void run() {
        logger_->log("Application started");
        // 应用逻辑
    }

private:
    std::unique_ptr<ILogger> logger_;
};
```

#### 模板设计模式

**策略模式**：
```cpp
template<typename SortStrategy>
class DataProcessor {
public:
    void processData(std::vector<int>& data) {
        // 数据预处理
        preprocess(data);

        // 使用策略排序
        SortStrategy sorter;
        sorter.sort(data);

        // 后处理
        postprocess(data);
    }

private:
    void preprocess(std::vector<int>& data) {
        // 预处理逻辑
    }

    void postprocess(std::vector<int>& data) {
        // 后处理逻辑
    }
};

// 具体策略
class QuickSortStrategy {
public:
    void sort(std::vector<int>& data) {
        std::sort(data.begin(), data.end());  // 使用快速排序
    }
};

class MergeSortStrategy {
public:
    void sort(std::vector<int>& data) {
        // 实现归并排序
    }
};

// 使用
DataProcessor<QuickSortStrategy> processor1;
DataProcessor<MergeSortStrategy> processor2;
```

### 测试与调试

#### 单元测试

**测试框架使用**：
```cpp
#include <cassert>
#include <vector>

class Calculator {
public:
    static int add(int a, int b) { return a + b; }
    static int subtract(int a, int b) { return a - b; }
};

// 简单的测试框架
class TestRunner {
public:
    static void runTest(const std::string& testName, std::function<void()> test) {
        try {
            test();
            std::cout << "[PASS] " << testName << std::endl;
        } catch (const std::exception& e) {
            std::cout << "[FAIL] " << testName << ": " << e.what() << std::endl;
        }
    }
};

// 测试用例
int main() {
    TestRunner::runTest("Calculator::add", []() {
        assert(Calculator::add(2, 3) == 5);
        assert(Calculator::add(-1, 1) == 0);
        assert(Calculator::add(0, 0) == 0);
    });

    TestRunner::runTest("Calculator::subtract", []() {
        assert(Calculator::subtract(5, 3) == 2);
        assert(Calculator::subtract(1, 5) == -4);
    });

    return 0;
}
```

#### 调试技巧

**断言使用**：
```cpp
#include <cassert>

class Array {
public:
    Array(size_t size) : data_(new int[size]), size_(size) {}

    int& operator[](size_t index) {
        assert(index < size_ && "Index out of bounds");
        return data_[index];
    }

    const int& operator[](size_t index) const {
        assert(index < size_ && "Index out of bounds");
        return data_[index];
    }

private:
    int* data_;
    size_t size_;
};
```

**日志记录**：
```cpp
enum class LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR
};

class Logger {
public:
    static void log(LogLevel level, const std::string& message) {
        auto now = std::chrono::system_clock::now();
        auto time_t = std::chrono::system_clock::to_time_t(now);

        std::cout << "[" << std::put_time(std::localtime(&time_t), "%Y-%m-%d %H:%M:%S") << "]";

        switch (level) {
            case LogLevel::DEBUG:   std::cout << " [DEBUG] "; break;
            case LogLevel::INFO:    std::cout << " [INFO] "; break;
            case LogLevel::WARNING: std::cout << " [WARNING] "; break;
            case LogLevel::ERROR:   std::cout << " [ERROR] "; break;
        }

        std::cout << message << std::endl;
    }
};

// 使用示例
Logger::log(LogLevel::INFO, "Application started");
Logger::log(LogLevel::ERROR, "Failed to connect to database");
```

### 项目管理与工具链

#### 构建系统

**CMake现代用法**：
```cmake
cmake_minimum_required(VERSION 3.12)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

# 设置C++标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找依赖
find_package(Threads REQUIRED)

# 添加可执行文件
add_executable(my_app
    src/main.cpp
    src/calculator.cpp
    src/utils.cpp
)

# 链接库
target_link_libraries(my_app PRIVATE Threads::Threads)

# 设置包含目录
target_include_directories(my_app PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# 编译选项
target_compile_options(my_app PRIVATE
    -Wall -Wextra -Werror
    $<$<IF:$<CONFIG:Debug>,-g,-O3>>
)

# 安装规则
install(TARGETS my_app DESTINATION bin)
```

#### 代码格式化

**.clang-format配置**：
```yaml
# .clang-format
BasedOnStyle: Google
IndentWidth: 4
UseTab: Never
ColumnLimit: 100
AllowShortFunctionsOnASingleLine: Empty
AllowShortIfStatementsOnASingleLine: false
AllowShortLoopsOnASingleLine: false
```

### 持续学习与社区资源

#### 学习路径

1. **基础阶段**：掌握C++语法基础、面向对象编程
2. **进阶阶段**：学习STL、模板编程、异常处理
3. **现代C++**：掌握C++11/14/17/20新特性
4. **专业领域**：并发编程、性能优化、特定领域应用

#### 推荐资源

**书籍**：
- 《C++ Primer》- Stanley Lippman
- 《Effective Modern C++》- Scott Meyers
- 《C++ Concurrency in Action》- Anthony Williams

**在线资源**：
- cppreference.com - C++参考文档
- github.com/isocpp/CppCoreGuidelines - C++核心指南
- stackoverflow.com - 技术问答社区

**实践项目**：
- 开源项目贡献
- 个人项目实践
- 算法竞赛练习

### 总结

C++ Primer Plus为我们提供了全面的C++知识体系，从基础语法到现代特性，从理论概念到实践应用。要成为一名优秀的C++开发者，需要：

1. **扎实的基础**：深入理解语言核心概念
2. **现代思维**：积极采用现代C++特性和最佳实践
3. **持续学习**：跟进语言发展和社区动态
4. **大量实践**：通过实际项目巩固理论知识
5. **代码质量**：重视代码的可读性、可维护性和性能

C++作为一门强大而复杂的语言，其学习确实需要时间和耐心。但通过系统性的学习和持续的实践，您将能够充分发挥C++的性能优势，编写出高质量、高效率的代码，在软件开发领域建立自己的竞争优势。

随着C++23、C++26等新标准的持续推进，C++语言仍在不断演进。保持学习的态度，跟上技术发展的步伐，将使您在快速变化的技术环境中始终保持竞争力。



