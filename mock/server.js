
let http = require('http');
let fs = require('fs');
let url = require('url');

let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
let mogourl = "mongodb://localhost:27017/";

let express = require('express');
let app = express();
 
//数据库实例
let dbo = '';
//连接数据库
 MongoClient.connect(mogourl, (err, db)=>{
    if (err) throw err;
    dbo = db.db("krry_shop");
    console.log('连接数据库成功');
});
const path = require('path');
app.use(express.static(path.join(__dirname, '../dist')));
app.use((req,res,next)=>{
	// //如果未登录
	// if (!req.session.user) {
	// 	//如果未登录想要访问个人中心，则跳转到登录页面
	// 	if(req.url=="/admin"){
	// 		res.redirect('/login');
	// 	}else{
	// 		next();
	// 	}
	// //如果已登录，进行下一个请求
	// }else if(req.session.user){
		next();
	// }
});


// 统一解决跨域
app.all('*', (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')

    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();


});

//查询最新数据 
app.get('/newshop', (req, res)=> {
    let newShop = "";

    //查询最新的8条数据
    dbo.collection("shop").find().toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        //将查询出来的数据翻转后，截取前8条，保存到变量中，查询最新的数据，最后的8条数据
        newShop = result.reverse().slice(0,8);
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(newShop));
    });
});

// 查询分类数据
app.get('/category', (req, res)=> {
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = parseInt(query.bid); //取出的是字符串，取出路径中的参数
	let cateShop = "";
	let queryCate = {"kindId":id};
	//如果是0，则查询全部数据
	if(id == 0){
	    queryCate = {};
	}
	dbo.collection("shop").find(queryCate).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        //将查询出来的数据保存到变量中，查询最新的数据，后面插入的数据越新
        cateShop = result.reverse();
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(cateShop));
    });
});

//根据id查询某一条商品数据
app.get('/detail', (req, res)=> {
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = query.bid; //取出的是字符串

    //根据id查询一条数据
    dbo.collection("shop").find({_id:ObjectID(id)}).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(result[0])); //取一个数据，只有一个数据
    });
});


//检测登录的用户是否将此商品加入购物车
app.get('/detectCar', (req, res)=> {
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let shopId = query.shopId; //商品id
    let userId = query.userId; //用户Id

    //根据商品id和用户id查询 是否有这条数据
    dbo.collection("shopCar").find({'shopId':shopId,'userId':userId}).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        //前台做一个判断 result.length == 0 表示查询无果，未加入购物车
		res.end(JSON.stringify(result));

    });

});


//点击加入购物车
app.post('/addShop', (req, res)=> {
	let body = '';
	//读取数据
	req.on('data',chunk=>{
		body += chunk; //读取请求体
	});
	//结束读取
	req.on('end',()=>{
		let cars = JSON.parse(body); //json解析post的数据

	    //设置响应头
	    res.setHeader('Content-Type','application/json;charset=utf-8');
	    //设置存储的购物车的信息
    	let myobj = {
	    	'userId':cars.userId, //用户Id
	    	'shopId':cars.shopId, //商品Id
	    	'isSelected':true, //默认选中
	    	'shopName':cars.shopName,//商品描述
	    	'shopPrice':cars.shopPrice, //商品单价
	    	'shopImg':cars.shopImg, //商品图片地址
	    	'shopCount':1, //商品个数
	    	'addTime':new Date().toLocaleDateString()
	    };
	    //插入一条数据进入购物车
	    dbo.collection("shopCar").insertOne(myobj, (err, suc)=>{
	        if (err) throw err;
	        //发送响应数据
			res.end('success');
	    });
	});
});


//进入个人中心，查询自己发表的商品
app.get('/myShop',(req,res)=>{
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let userId = query.userId; //取出的是字符串

    //查询自己发表的商品
    dbo.collection("shop").find({'userId':userId}).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(result.reverse()));
    });
});


//添加商品
app.post('/add', (req, res)=> {
	let body = '';
	//读取数据
	req.on('data',chunk=>{
		body += chunk; //读取请求体
	});
	//结束读取
	req.on('end',()=>{
		let shop = JSON.parse(body); //json解析post的数据

	    //设置响应头
	    res.setHeader('Content-Type','application/json;charset=utf-8');
	    //设置存储的购物车的信息
    	let myobj = {
	    	'userId':shop.userId, //用户Id
	    	'username':shop.username, //用户名
	    	'desc':shop.desc,//商品描述
	    	'kindId':shop.kindId, //商品分类Id
	    	'kind':shop.kind,//商品分类
	    	'price':shop.price, //商品单价
	    	'img':shop.img, //商品图片地址
	    	'createTime':new Date().toLocaleDateString()
	    };
	    //插入一条数据
	    dbo.collection("shop").insertOne(myobj, (err, suc)=>{
	        if (err) throw err;
	        //发送响应数据
			res.end('success');
	    });
	});
});


//删除自己发表的一件商品
app.get('/removeMyShop',(req,res)=>{
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = query.id; //取出的是字符串

    //删除购物车中的一件商品
    dbo.collection("shop").deleteOne({_id:ObjectID(id)}, (err, obj)=>{
        if (err) throw err;
        //删除购物车对应的商品信息
        dbo.collection("shopCar").deleteMany({'shopId':id}, (err2, obj2)=>{
        	if (err2) throw err2;
        	res.end('success');
        });
    });

});


//修改自己发表的商品信息
app.post('/modifyShop', (req, res)=> {
	let body = '';
	//读取数据
	req.on('data',chunk=>{
		body += chunk; //读取请求体
	});
	//结束读取
	req.on('end',()=>{
		let shop = JSON.parse(body); //json解析post的数据

	    //设置响应头
	    res.setHeader('Content-Type','application/json;charset=utf-8');
	    //设置存储的商品信息
    	let myobj = {$set:{
	    	'desc':shop.desc,//商品描述
	    	'kindId':shop.kindId, //商品分类Id
	    	'kind':shop.kind,//商品分类
	    	'price':shop.price, //商品单价
	    	'img':shop.img //商品图片地址
	    }};
	    //设置存储的购物车的信息
    	let myCar = {$set:{
	    	'shopName':shop.desc,//商品描述
	    	'shopPrice':shop.price, //商品单价
	    	'shopImg':shop.img //商品图片地址
	    }};
	    //根据id修改shop集合中的商品信息
	    dbo.collection("shop").updateOne({_id:ObjectID(shop.id)}, myobj, (err1, res1)=>{
	        if (err1) throw err1;
	    	//根据shopId全部修改shopCar中的商品信息
	        dbo.collection("shopCar").updateMany({'shopId':shop.id}, myCar, (err2, res2)=>{
		        if (err2) throw err2;
		        res.end('success');
		    });
	    });
	});
});



//进入购物车
app.get('/shopCar',(req,res)=>{
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let userId = query.userId; //取出的是字符串

    //查询购物车信息
    dbo.collection("shopCar").find({'userId':userId}).toArray((err, result)=>{ // 返回集合中所有数据
        if (err) throw err;
        res.setHeader('Content-Type','application/json;charset=utf-8');
		//发送响应数据
		res.end(JSON.stringify(result.reverse()));
    });

});


//删除购物车的某一个商品
app.get('/deleteShop',(req,res)=>{
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = query.id; //取出的是字符串

    //删除购物车中的一件商品
    dbo.collection("shopCar").deleteOne({_id:ObjectID(id)}, (err, obj)=>{
        if (err) throw err;
        res.end('success');
    });

});



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


//登录
app.post('/loginUser', (req, res)=> {
	let body = '';
	//读取数据
	req.on('data',chunk=>{
		body += chunk; //读取请求体
	});
	//结束读取
	req.on('end',()=>{
		let user = JSON.parse(body); //json解析post的数据，是user对象
	    //根据用户名查询一条数据
	    dbo.collection("user").find({'username':user.username}).toArray((err, result)=>{ // 返回集合中所有数据
	        if (err) throw err;
	        res.setHeader('Content-Type','application/json;charset=utf-8');
	        //若存在此用户名，验证密码是否正确
	        if(result.length != 0){
	        	//返回的result是一个数组对象，取出第一个数组元素
	        	result = result[0];
	        	//成功登录
	        	if(result.password == user.password) res.end(JSON.stringify({'id':result._id,'username':result.username}));
	        	//密码错误
	        	else res.end('errorCode');
	        }
	        //用户不存在  前台 result.length == 0 表示查询无果，用户不存在
	        res.end(JSON.stringify(result));
	    });
	});
})

let server = app.listen(3000, ()=>{
  let host = server.address().address;
  let port = server.address().port;

 
  console.log("应用实例，访问地址为 http://", host, port)
 
})



/**
 * 不使用这种建立服务器，上面使用的是express框架
 */
// http.createServer((req,res)=>{
// 	//解决跨域问题  开发时用到，上线时不用
// 	res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.setHeader("X-Powered-By",'3.2.1')
//     if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

// 	let {pathname,query} = url.parse(req.url,true);//true把query转化成对象


// 	//注册登录
// 	if(pathname === '/user'){
// 		let id = parseInt(query.id); //取出的是字符串
// 		switch (req.method){ // ?id = 1
// 			case 'GET':
				
// 				break;
// 			case 'POST':
// 				let body = '';
// 				//读取数据
// 				req.on('data',chunk=>{
// 					body += chunk; //读取请求体
// 				});
// 				//结束读取
// 				req.on('end',()=>{
// 					let user = JSON.parse(body);
					
// 					MongoClient.connect(mogourl, function(err, db) {
// 					    if (err) throw err;
// 					    var dbo = db.db("krry_shop");
// 					    var myobj = {username:user.username,phone:user.phone,password:user.password,createTime:new Date().toLocaleDateString()};
// 					    dbo.collection("user").insertOne(myobj, function(err, res) {
// 					        if (err) throw err;
// 					        //添加数据成功
// 					        db.close();
// 					    });
// 					});
// 				});
// 				break;
// 			case 'PUT':
// 				if(id){ //获取了当前要修改的id
					
// 				}
// 				break;
// 			case 'DELETE':
// 				//删除数据
				
// 				break;
// 		}
// 		return;
// 	}


// 	// 查询最新数据
// 	if(pathname === '/newshop'){
// 		let newShop = "";
// 		MongoClient.connect(mogourl, (err, db)=>{
// 		    if (err) throw err;
// 		    let dbo = db.db("krry_shop");
// 		    //查询最新的8条数据
// 		    dbo.collection("shop").find().toArray((err, result)=>{ // 返回集合中所有数据
// 		        if (err) throw err;
// 		        //将查询出来的数据翻转后，截取前8条，保存到变量中，查询最新的数据，最后的8条数据
// 		        newShop = result.reverse().slice(0,8);
// 		        res.setHeader('Content-Type','application/json;charset=utf-8');
// 				//发送响应数据
// 				res.end(JSON.stringify(newShop));
// 		        db.close();
// 		    });
// 		});
// 	}

// 	// 查询分类数据
// 	if(pathname === '/category'){
// 		let id = parseInt(query.bid); //取出的是字符串，取出路径中的参数
// 		let cateShop = "";
// 		let queryCate = "";
// 		//如果是0，则查询全部数据
// 		if(id == 0){
// 			MongoClient.connect(mogourl, (err, db)=>{
// 			    if (err) throw err;
// 			    let dbo = db.db("krry_shop");
// 			    //查询最新的8条数据
// 			    dbo.collection("shop").find().toArray((err, result)=>{ // 返回集合中所有数据
// 			        if (err) throw err;
// 			        //将查询出来的数据保存到变量中，查询最新的数据，后面插入的数据越新
// 			        cateShop = result.reverse();
// 			        res.setHeader('Content-Type','application/json;charset=utf-8');
// 					//发送响应数据
// 					res.end(JSON.stringify(cateShop));
// 			        db.close();
// 			    });
// 			});
// 		}else{
// 			//否则查询相关类别的数据
// 			MongoClient.connect(mogourl, (err, db)=>{
// 			    if (err) throw err;
// 			    let dbo = db.db("krry_shop");
// 			    //查询最新的8条数据
// 			    dbo.collection("shop").find({"kindId":id}).toArray((err, result)=>{ // 返回集合中所有数据
// 			        if (err) throw err;
// 			        //将查询出来的数据保存到变量中，查询最新的数据，后面插入的数据越新
// 			        cateShop = result.reverse();
// 			        res.setHeader('Content-Type','application/json;charset=utf-8');
// 					//发送响应数据
// 					res.end(JSON.stringify(cateShop));
// 			        db.close();
// 			    });
// 			});
// 		}
// 	}

// 	//根据id查询某一条数据
// 	if(pathname === '/detail'){
// 		let id = query.bid; //取出的是字符串
// 		MongoClient.connect(mogourl, (err, db)=>{
// 		    if (err) throw err;
// 		    let dbo = db.db("krry_shop");
// 		    //根据id查询一条数据
// 		    dbo.collection("shop").find({_id:ObjectID(id)}).toArray((err, result)=>{ // 返回集合中所有数据
// 		        if (err) throw err;
// 		        res.setHeader('Content-Type','application/json;charset=utf-8');
// 				//发送响应数据
// 				res.end(JSON.stringify(result[0])); //取一个数据，只有一个数据
// 		        db.close();
// 		    });
// 		});
// 	}

// }).listen(3000);