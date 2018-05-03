# krry_shop

> My shop

## 技术栈
- vue + node.js + express框架

## css的一些问题
- css3:nth-child()伪类选择器
- :nth-child(number) 直接匹配第number个元素。参数number必须为大于0的整数
- :nth-child(an) 匹配所有倍数为a的元素。其中参数an中的字母n不可缺省，它是倍数写法的标志，如3n、5n
- :nth-child(odd) 与 :nth-child(even) 分别匹配序号为奇数与偶数的元素。奇数(odd)与(2n+1)结果一样；偶数(even)与(2n+0)及(2n)结果一样

### 文本控制一行和多行，溢出省略
```css
/* 超出一行省略 */
.overflow1{ overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
/* 超出两行省略 */
.overflow2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
```

## vue路由跳转传参数
- 通过router-link进行跳转
```html
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
```javascript
watch:{
	'$route':["getCateShop"],
},
```


## node连接MongoDB，需要根据id查找时
- 需要再加入一个ObjectID
```javascript
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

## Node——express获取POST请求的参数
```javascript
//注册
app.post('/addUser', (req, res)=> {
	let body = '';
	//读取数据
	req.on('data',chunk=>{
		body += chunk; //读取请求体
	});
	//结束读取
	req.on('end',()=>{
		let user = JSON.parse(body); //json解析post的数据
		MongoClient.connect(mogourl, (err, db)=> {
		    if (err) throw err;
		    let dbo = db.db("krry_shop");
		    let myobj = {
		    	'username':user.username,
		    	'phone':user.phone,
		    	'password':user.password,
		    	'createTime':new Date().toLocaleDateString()
		    };
		    dbo.collection("user").insertOne(myobj, (err, suc)=>{
		        if (err) throw err;
		        //添加数据成功
		        res.setHeader('Content-Type','application/json;charset=utf-8');
				//发送响应数据
				res.end(JSON.stringify({'username':user.username}));
		        db.close();
		    });
		});
	});
})
```


## 登录的状态：使用vuex对数据状态统一管理
- 在登录、注册成功后：
```JavaScript
// 提交数据变化，使用户名保存在全局状态中
this.$store.commit(Types.SETUSERNAME,userObj.username); 
```
- 顶部栏的用户登录状态信息：state里面的变量有username，使用v-if来切换
```html
<div v-if="this.$store.state.username">
	<span>欢迎：</span>
	<router-link to="#" class="r_logins">{{this.$store.state.username}}</router-link>
	<span class="r_button">退出</span>
</div>
<div v-if="!this.$store.state.username">
	<router-link to="/login">登录</router-link>
	<router-link to="/register">注册</router-link>
</div>
```
- 由于页面刷新会导致vuex的状态清除，因为vuex主要是处理组件的通信问题
- 所以在main.js中的全局钩子beforeEach设置vuex的属性
```javascript

// 使用vuex
import store from './store';
import * as Types from './store/mutations-type.js';

//在进入路由之前， 每一次都会执行此方法  全局钩子
router.beforeEach(function(from,to,next){
   //设置标题
  document.title = from.meta.title;
  //设置是否已登录
  let userObj = JSON.parse(sessionStorage.getItem('user'));
  if(userObj){
    //执行方法，将用户名设置进全局参数  vuex
    //提交mutation的Types.SETUSERNAME方法
    //第二个参数是携带的参数
    //main.js使用vuex的提交方法，不需要this.$store.commit()，直接就store.commit()
    store.commit(Types.SETUSERNAME,userObj.username);
  }
   next(); //继续往下走
});
```

## 退出登录
```javascript
//清空缓存数据
sessionStorage.clear();
//全局状态的用户名设为false
this.$store.commit(Types.SETUSERNAME,false);
```
