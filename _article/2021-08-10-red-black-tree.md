---
title: 红黑树
categories:
- 数据结构
- algorithm
description: 红黑树是一种自平衡搜索二叉树。在红黑树中，每个节点都存储了其颜色（红色或黑色），用于帮助树在插入或删除过程中保持平衡。
permalink: "/posts/red-black-tree"
excerpt: 红黑树是一种自平衡搜索二叉树。在红黑树中，每个节点都存储了其颜色（红色或黑色），用于帮助树在插入或删除过程中保持平衡。
---

+[Wiki](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)

| 指标	| 平均 | 最差 |
| --- | --- | --- |
| 空间 | $$O(n)$$ | $$O(n)$$ |
| 搜索 | $$O(log  n)$$ | $$O(log  n)$$ | 
| 插入 | $$O(log  n)$$ | $$O(log  n)$$ |
| 删除 | $$O(log  n)$$ | $$O(log  n)$$ |

红黑树是一种自平衡搜索二叉树。在红黑树中，每个节点都存储了其颜色（红色或黑色），用于帮助树在插入或删除过程中保持平衡。当树节点发生修改时，会根据颜色作为帮助信息进行重平衡，并重新着色。红黑树的自平衡不是完美平衡，但是可以保证 $$O(log n)$$ 的查询时间复杂度，但也会额外带来 $$O(log n)$$ 的修改时间复杂度。红黑树与普通二叉树相比，只节点多保存颜色信息，一般只需要1bit的大小。因此一般几乎不会增加存储成本。

![红黑树](/assets/images/red-black-tree/Red-black_tree_example.svg)

## 红黑树的历史

1972年基于B树，出现了2-3-4树（也叫2-4树，对称二叉树）。这种树保持了从根到所有叶子节点路径上有相同数量的节点。这种树成为“对称二叉B树”

1978年，基于“对称二叉B树”，发明了红黑树（红黑两个颜色并没有什么特殊含义，可以理解为方便用红黑笔画出来）。

1993年，红黑树的“右倾树”概念被提出，简化了插入和删除操作。

2001年，红黑树从最初的8中不平衡情况，被简化到了6中不平衡情况。

2008年，红黑树的“左倾树”概念被提出，进一步简化了插入和删除操作。最终，红黑树的插入算法只需要33行代码。

## 相关术语

红黑树是一种特殊的二叉搜索树，在计算机科学中用于组织可比较的数据。携带键或数据的点为内部节点。叶子节点不含任何键或数据，甚至于叶子节点就是一个NULL指针。另一种实现中为了节省一些操作时间，这些叶子节点会被实现为一个单例的黑色哨兵节点。

一个节点的黑色深度，是指从根节点到该节点路径中出现的黑色节点数量。

一个节点的黑色高度，是指以该节点为根节点，到其叶子节点任意路径中出现的黑色节点数。因此，叶子节点（NULL节点）的黑色高度为0。

## 属性

红黑树满足以下限制：

1. 任何节点非黑即红
2. 所有叶子节点（NULL节点）都是黑色节点
3. 一个红色节点没有红色子节点
4. 从任何节点到其后代所有叶子节点（NULL节点）的每条路径都有相同数量的黑色节点

一棵只由黑色节点组成的红黑树称为“完美二叉树”。

只读操作，如搜索或树的遍历，并不影响任何限制。另一方面，插入和删除的修改操作很容易维持限制1和2，但是对于其他的限制，必须采取一些额外的操作，以避免引入违反要求3的情况，称为红违约，或违反要求4的情况，称为黑违约。

这些强制限制，维持了红黑树的一个关键属性：从根到最远叶子的路径不超过从根到最近叶子的路径的两倍。树是高度平衡的。操作的时间复杂度最坏情况下仍保持 $$O(log  n)$$ 。而普通的二进制搜索树最坏情况下操作的时间复杂度是 $$O(n)$$。

## 与2-4树对比

![等价B树](/assets/images/red-black-tree/Red-black_tree_example_B-tree_analogy.svg)

上图是一个与 图1 中的红黑树等价的2-4树。可以看到2-4树与红黑树在结构上很相似。只是把红黑树中的红色节点向上或向下移动到了与黑色节点一起，黑色节点尽量在中间位置。

根据2-4树的属性，每个节点包含1到3个值以及2到4个子指针。在这样的B树中，每个节点将只包含一个与红黑树的黑色节点中的值匹配的值，在同一个节点前或后有一个可选值，来匹配一个红黑树中等效的红色节点。

因此，红黑树与2-4一样，每簇数值的最小填充系数为33%，最大容量为3个值。

不过这种B树类型仍然比红黑树更通用，因为它允许红黑树转换中的模糊性————从一个等价的4阶B树可以产生多个红黑树。如果一个B树簇只包含1个值，它就是最小值，是黑色的，有两个子指针。如果一个簇包含3个值，那么中心值将是黑色的，存储在其两侧的每个值将是红色的。然而，如果集群包含两个值，任何一个都可以成为红黑树中的黑色节点（而另一个将是红色）。


## 红黑树的使用及相关数据结构

红黑树为操作的时间复杂度提供了最坏情况下的保证。这不仅使它适用于时间敏感的应用，更适用于组成其他数据结构。例如计算几何中使用的许多数据结构可以基于红黑树；Linux内核和epoll系统调用中的调度器也使用红黑树。

AVL树是另一种支持 $$O(log n)$$ 时间复杂度树结构。AVL树可以被染成红黑色，因此是红黑树的一个子集。最坏情况下的高度是红黑树的0.720倍，因此AVL树更平衡。

红黑树也被用于持久化的数据结构，如HashMap等。需要 $$O(log n)$$ 的空间复杂度。

对于每一棵2-4树，都有相应的红黑树其元素顺序相同。2-4树的插入和删除操作等于红黑树的翻色和旋转。因此尽管2-4树在实践中不常被使用，但成为了理解红黑树的前置工具。

探戈树是一种为快速搜索而优化的树，其原始描述特别使用红黑树作为其数据结构的一部分。


## 简述

1. 任何节点非黑即红
2. 所有叶子节点（NULL节点）都是黑色节点
3. 一个红色节点没有红色子节点
4. 从任何节点到其后代所有叶子节点（NULL节点）的每条路径都有相同数量的黑色节点


插入

所有插入操作都是在叶子结点进行的
1. 空树
2. key已存在
3. 父节点黑（由于插入节点是红色，直接插入不会影响平衡）
4. 父节点红
    1. 叔叔节点不存在或为黑色（有可能为黑色）
        1. 插入节点与父节点顺边
            父亲、祖父颜色反转，对祖父做旋转
        2. 插入节点与父节点反边
            旋转成顺边处理
    2. 叔叔节点为红色
        1. 父亲和叔叔设置为黑色，祖父设置为红色，并把祖父当成插入节点向上递归


删除，无子节点的直接删，有一个子节点的用子节点替换

* 删除中间节点可以用临近的叶子节点替代，所以可以转换为删除替代节点

1. 替换节点是红色节点（颜色变为删除节点的颜色）
2. 替换节点是黑色节点
    1. 兄弟节点是红节点（所以兄弟节点的父节点和子节点都为黑色）
        父节点变红，兄弟节点变黑，对父节点旋转得到 2-B-c 场景
    2. 兄弟节点是黑节点（尽量向兄弟那边借红节点，不行就交给父节点解决）
        1. 兄弟节点顺边是红，对边是任意颜色
            将父节点和兄弟的顺边子节点设置为黑，兄弟节点设置为父节点颜色，并向替换节点方向旋转兄弟节点
        2. 兄弟节点顺边是黑，对边是红
            将兄弟对边子节点设为黑，兄弟节点设为红，对兄弟节点顺边旋转得到 2-B-a 场景
        3. 兄弟节点顺边黑，对边也是黑
            将兄弟节点设置为红，把父亲节点作为新的替换节点递归

## 操作

搜索和遍历只读操作不需要对红黑树进行修改。插入和删除操作可能会违反红黑树的限制，需要对其再平衡。即便如此，其插入也仅需要近似与 $$O(log n)$$ 。

下面是一些基本操作示例。如：获取父节点、获取兄弟节点、向左旋转等

```c++
// 颜色定义:

enum color_t { BLACK, RED };

struct RBnode {     // 节点定义
  RBnode* parent;   // 如果是根节点parent为NULL
  RBnode* child[2]; // 如果无子节点child为NIL
    // 索引定义:
    //   左子树  := 0,  (key < parent->key)
    //   右子树 := 1,  (key > parent->key)
  enum color_t color;
  int key;
};

#define NIL   NULL // 一般表示叶子节点，空指针或者指向哨兵节点
#define LEFT  0
#define RIGHT 1
#define left  child[LEFT]
#define right child[RIGHT]

struct RBtree { // 红黑树定义
  RBnode* root; // 如果树是空的，root == NIL
};

// 获取一个节点 N（N非根节点且非NIL节点）是其父节点的左子树还是右子树(∈ { LEFT, RIGHT })
#define childDir(N) ( N == (N->parent)->right ? RIGHT : LEFT )

// 辅助方法:

RBnode* GetParent(RBnode* N) {
  // 根节点的父节点是NULL
  return N == NULL ? NULL : N->parent;
}

RBnode* GetGrandParent(RBnode* N) {
  // 根节点或根节点的子节点的祖父节点是NULL
  return GetParent(GetParent(N));
}

RBnode* GetSibling(RBnode* N) {
  RBnode* P = GetParent(N);
  // 如果没有父节点意味着也没有兄弟节点:
  assert(P != NULL);
  return P->child[1-childDir(N)];
}


RBnode* GetUncle(RBnode* N) {
  RBnode* P = GetParent(N);
  // 没有父节点意味着没有叔叔节点:
  assert(P != NULL);
  return GetSibling(P);
}

RBnode* GetCloseNephew(RBnode* N) {
  RBnode* P = GetParent(N);
  int dir;
  RBnode* S;
  assert(P != NULL);
  dir = childDir(N);
  S = P->child[1-dir]; // N 的兄弟节点
  assert(S != NIL);
  return S->child[dir]; // the nephew close to N
}

RBnode* GetDistantNephew(RBnode* N) {
  RBnode* P = GetParent(N);
  int dir;
  RBnode* S;
  assert(P != NULL);
  dir = childDir(N);
  S = P->child[1-dir]; // sibling of N
  assert(S != NIL);
  return S->child[1-dir]; // the nephew distant from N
}

RBnode* RotateDirRoot(
    RBtree* T,   // red–black tree
    RBnode* P,   // root of subtree (may be the root of T)
    int dir) {   // dir ∈ { LEFT, RIGHT }
  RBnode* G = P->parent;
  RBnode* S = P->child[1-dir];
  RBnode* C;
  assert(S != NIL); // pointer to true node required
  C = S->child[dir];
  P->child[1-dir] = C; if (C != NIL) C->parent = P;
  S->child[  dir] = P; P->parent = S;
  S->parent = G;
  if (G != NULL)
    G->child[ P == G->right ? RIGHT : LEFT ] = S;
  else
    T->root = S;
  return S; // new root of subtree
}

#define RotateDir(N,dir) RotateDirRoot(T,N,dir)
#define RotateLeft(N)    RotateDirRoot(T,N,LEFT)
#define RotateRight(N)   RotateDirRoot(T,N,RIGHT)
```

### 插入和删除操作示例

