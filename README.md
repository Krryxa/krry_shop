# krry_shop

> My shop

## css的一些问题
- 可通过.items:nth-child(4n)来定位到每第4个孩子的样式（4的倍数）
- 文本控制一行和多行，溢出省略
```
/* 超出一行省略 */
.overflow1{ overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
/* 超出两行省略 */
.overflow2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
```
