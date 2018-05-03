
let http = require('http');
let fs = require('fs');
let url = require('url');

let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
let mogourl = "mongodb://localhost:27017/";

let express = require('express');
let app = express();
 

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

// 查询最新数据 
app.get('/newshop', (req, res)=> {
    let newShop = "";
	MongoClient.connect(mogourl, (err, db)=>{
	    if (err) throw err;
	    let dbo = db.db("krry_shop");
	    //查询最新的8条数据
	    dbo.collection("shop").find().toArray((err, result)=>{ // 返回集合中所有数据
	        if (err) throw err;
	        //将查询出来的数据翻转后，截取前8条，保存到变量中，查询最新的数据，最后的8条数据
	        newShop = result.reverse().slice(0,8);
	        res.setHeader('Content-Type','application/json;charset=utf-8');
			//发送响应数据
			res.end(JSON.stringify(newShop));
	        db.close();
	    });
	});
});

// 查询分类数据
app.get('/category', (req, res)=> {
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = parseInt(query.bid); //取出的是字符串，取出路径中的参数
	let cateShop = "";
	let queryCate = "";
	//如果是0，则查询全部数据
	if(id == 0){
		MongoClient.connect(mogourl, (err, db)=>{
		    if (err) throw err;
		    let dbo = db.db("krry_shop");
		    //查询最新的8条数据
		    dbo.collection("shop").find().toArray((err, result)=>{ // 返回集合中所有数据
		        if (err) throw err;
		        //将查询出来的数据保存到变量中，查询最新的数据，后面插入的数据越新
		        cateShop = result.reverse();
		        res.setHeader('Content-Type','application/json;charset=utf-8');
				//发送响应数据
				res.end(JSON.stringify(cateShop));
		        db.close();
		    });
		});
	}else{
		//否则查询相关类别的数据
		MongoClient.connect(mogourl, (err, db)=>{
		    if (err) throw err;
		    let dbo = db.db("krry_shop");
		    //查询最新的8条数据
		    dbo.collection("shop").find({"kindId":id}).toArray((err, result)=>{ // 返回集合中所有数据
		        if (err) throw err;
		        //将查询出来的数据保存到变量中，查询最新的数据，后面插入的数据越新
		        cateShop = result.reverse();
		        res.setHeader('Content-Type','application/json;charset=utf-8');
				//发送响应数据
				res.end(JSON.stringify(cateShop));
		        db.close();
		    });
		});
	}
});

//根据id查询某一条数据
app.get('/detail', (req, res)=> {
	let {query} = url.parse(req.url,true);//true把query转化成对象
    let id = query.bid; //取出的是字符串
	MongoClient.connect(mogourl, (err, db)=>{
	    if (err) throw err;
	    let dbo = db.db("krry_shop");
	    //根据id查询一条数据
	    dbo.collection("shop").find({_id:ObjectID(id)}).toArray((err, result)=>{ // 返回集合中所有数据
	        if (err) throw err;
	        res.setHeader('Content-Type','application/json;charset=utf-8');
			//发送响应数据
			res.end(JSON.stringify(result[0])); //取一个数据，只有一个数据
	        db.close();
	    });
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


var server = app.listen(3000, ()=>{
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://", host, port)
 
})



/**
 * 不使用这种建立服务器，使用的是express框架
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