# krry_shop

> My shop

## 技术栈
- vue + node.js + express框架
- MongoDB数据库


## 项目截图
![](https://github.com/Krryxa/krry_shop/blob/master/cutImg/1.jpg)
![](https://github.com/Krryxa/krry_shop/blob/master/cutImg/2.jpg)
![](https://github.com/Krryxa/krry_shop/blob/master/cutImg/3.jpg)


## 记录开发过程中遇到的问题和解决方法

## vue搭建脚手架、工具
```
vue init webpack krry_shop
npm install axios vuex bootstrap 
```
- vue项目打包
```
npm run build
```

## 目录结构
- mock 服务端
- api 配置所有的接口
- assets 资源文件
- base 基础组件
- components 页面组件
- router 路由配置
- store vuex配置

## css的一些问题
- css3:nth-child()伪类选择器
- :nth-child(number) 直接匹配第number个元素。参数number必须为大于0的整数
- :nth-child(an) 匹配所有倍数为a的元素。其中参数an中的字母n不可缺省，它是倍数写法的标志，如3n、5n
- :nth-child(odd) 与 :nth-child(even) 分别匹配序号为奇数与偶数的元素。奇数(odd)与(2n+1)结果一样；偶数(even)与(2n+0)及(2n)结果一样

### 垂直居中
- 这个方法使用绝对定位的div，把它的top设置为50％，margin-top设置为负的content高度。这意味着对象必须在CSS中指定固定的高度。
- 因为有固定高度，或许你想给 content 指定 overflow:auto，这样如果 content 太多的话，就会出现滚动条，以免content 溢出。
```css
#content {
	margin: 0 auto;
	text-align: center;
    position: absolute;
    width:100%;
    top: 50%;
    height: 240px;
    margin-top: -120px; /* negative half of the height */
}
```

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


## node连接MongoDB
- 把连接放到外面，数据库实例作为全局参数
```javascript
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
let mogourl = "mongodb://localhost:27017/";
 
//数据库实例
let dbo = '';
//连接数据库
 MongoClient.connect(mogourl, (err, db)=>{
    if (err) throw err;
    dbo = db.db("krry_shop");
    console.log('连接数据库成功');
});
```


## 需要根据id查找时
- 需要再加入一个ObjectID
```javascript
//根据id查询一条数据
dbo.collection("shop").find({_id:ObjectID(id)}).toArray((err, result)=>{ // 返回集合中所有数据
    if (err) throw err;
    res.setHeader('Content-Type','application/json;charset=utf-8');
	//发送响应数据
	res.end(JSON.stringify(result[0])); //取一个数据，只有一个数据

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

	    //设置响应头
	    res.setHeader('Content-Type','application/json;charset=utf-8');
	    //根据用户名查询一条数据，看看是否数据库已经存在这个用户名
	    dbo.collection("user").find({'username':user.username}).toArray((err, result)=>{ // 返回集合中所有数据
	        if (err) throw err;
	        //若存在此用户名，响应重新输入用户名
	        if(result.length != 0){
	        	res.end('errorRepeat');
	        }else{
	        	//不存在此用户名，可注册
	        	let myobj = {
			    	'username':user.username,
			    	'phone':user.phone,
			    	'password':user.password,
			    	'createTime':new Date().toLocaleDateString()
			    };
			    dbo.collection("user").insertOne(myobj, (err, suc)=>{
			        if (err) throw err;
					//发送响应数据，发送登录用户id和用户名到前台，放进sessionStorage
					res.end(JSON.stringify({'id':suc.insertedId,'username':user.username}));
			    });
	        }
	    });
	});
});
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

## 解除用户一直点击提交事件
```html
<p @click="flag && clickEvent()"></p>
加上一个标志位来控制点击事件是否能触发，在进入后置为false，事件异步操作结束后置为true
```


## 获取商品详细信息，如果已经登录就测登录的用户是否已经将此商品加入购物车
- api中，使用all
```javascript
// 获取一条商品数据和检测是否加入购物车的封装all
export let getDeAll = (shopId,userId)=>{
	return axios.all([getDetail(shopId),detectCar(shopId,userId)]);
}
```

- 页面中的method
```javascript
// 获取商品详细信息，并且如果已经登录就检测登录的用户是否已经将此商品加入购物车
async getDeAll(){
	//检测是否登录、登录的用户是否已经将此商品加入购物车
	let user = JSON.parse(sessionStorage.getItem('user'));
	//如果已登录
	if(user){
		//两个都一起异步，1.获取商品信息，2.检测登录的用户是否已经将此商品加入购物车
		let [shop,result] = await getDeAll(this.bid,user.id);
		//商品信息赋值到this.shop
		this.shop = shop;
		//如果result有数据，表明已经加入购物车
		if(result.length != 0){
			this.flag = false; //阻止继续点击加入购物车事件
			this.intoShop = '车上等你';
		}
	}else{
		//如果没有登录，就只需要执行获取商品详细信息的操作
		this.shop = await getDetail(this.bid);
	}
	this.loading = false;
},
```


## MongoDB尽量避免关联数据，关联的数据量少的时候，可以这样做：
- 在shop集合中保存着userId、username，在查询shop表的数据时，直接全部查询出来（包括用户名），不做关联查询。
- 当user集合中的username修改时，修改后要把shop表中对应userId的全部username修改成当前修改的username。
- 这样可保持shop表中的username与user集合中的username一致，而不进行关联。
- 同样的，当shop集合中的商品信息修改时，要把shopCar集合中的商品信息对应shopId的全部数据同步修改成当前的商品信息数据


## 删除shop集合中的商品信息
- 根据id删除
- 然后还要在shopCar中删除与shopId对应的商品信息

## 修改shop集合中的商品信息
- 根据id修改
- 然后还要在shopCar中修改与shopId对应的商品信息


## 拦截器，未登录不能访问admin，登陆后只能访问自己的admin
在全局钩子设置
```javascript
//在进入路由之前， 每一次都会执行此方法  全局钩子
router.beforeEach(function(to,from,next){
  //设置网页标题
	document.title = to.meta.title;
  //设置是否已登录
  let userObj = JSON.parse(sessionStorage.getItem('user'));
  if(userObj){
    //执行方法，将用户名设置进全局参数  vuex
    //提交mutation的Types.SETUSERNAME方法
    //第二个参数是携带的参数
    //main.js使用vuex的提交方法，不需要this.$store.commit()，直接就store.commit()
    store.commit(Types.SETUSERNAME,userObj.username);
  }else{
    //如果未登录，想要进入admin目录，则自动跳回首页
    if(to.path.indexOf('admin') != -1){
      alert("进了");
      router.push({name:'home'});
    }
  }
	next(); //继续往下走
});
```

## 项目部署
- 运行npm run build打包生成dist文件夹
- 使用了express作为服务器，在server.js中添加下方代码，添加dist依赖
```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));
```
