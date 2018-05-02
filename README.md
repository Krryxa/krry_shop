# krry_shop

> My shop

## css的一些问题
- css3:nth-child()伪类选择器
- :nth-child(number) 直接匹配第number个元素。参数number必须为大于0的整数
- :nth-child(an) 匹配所有倍数为a的元素。其中参数an中的字母n不可缺省，它是倍数写法的标志，如3n、5n
- :nth-child(odd) 与 :nth-child(even) 分别匹配序号为奇数与偶数的元素。奇数(odd)与(2n+1)结果一样；偶数(even)与(2n+0)及(2n)结果一样

### 文本控制一行和多行，溢出省略
```
/* 超出一行省略 */
.overflow1{ overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
/* 超出两行省略 */
.overflow2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
```

## vue路由跳转传参数
- 通过router-link进行跳转
```
<router-link 
    :to="{
        path: 'yourPath', 
        params: { 
            name: 'name', 
            dataObj: data
        },
        query: {
            name: 'name', 
            dataObj: data
        }
    }">
</router-link>
```
- 1. path -> 是要跳转的路由路径,也可以是路由文件里面配置的 name 值,两者都可以进行路由导航
- 2. params -> 是要传送的参数,参数可以直接key:value形式传递
- 3. query -> 是通过 url 来传递参数的同样是key:value形式传递


## vue-router 如何在相同路由下切换不同参数，从而实现异步刷新
- 在组件的watch里面通过$route查询字符串监视变化，有变化就调用定义的获取数据方法
```
watch:{
	'$route':["getCateShop"],
},
```


## node连接MongoDB，需要根据id查找时
- 需要再加入一个ObjectID
```
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
let mogourl = "mongodb://localhost:27017/";
MongoClient.connect(mogourl, (err, db)=>{
    if (err) throw err;
    let dbo = db.db("krry_shop");
    //根据id查询一条数据
    dbo.collection("shop").find({_id:ObjectID(id)}).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(result[0])); //取一个数据，根据id查询的只有一个数据
        db.close();
    });
});
```
