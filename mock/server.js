
let http = require('http');
let fs = require('fs');
let url = require('url');

let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
let mogourl = "mongodb://localhost:27017/";

http.createServer((req,res)=>{
	//解决跨域问题  开发时用到，上线时不用
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",'3.2.1')
    if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

	let {pathname,query} = url.parse(req.url,true);//true把query转化成对象

	// 查询最新数据
	if(pathname === '/newshop'){
		let newShop = "";
		MongoClient.connect(mogourl, (err, db)=>{
		    if (err) throw err;
		    let dbo = db.db("krry_shop");
		    //查询最新的8条数据
		    dbo.collection("shop").find().limit(8).toArray((err, result)=>{ // 返回集合中所有数据
		        if (err) throw err;
		        //将查询出来的数据翻转后，保存到变量中，查询最新的数据，最后的8条数据
		        newShop = result.reverse();
		        res.setHeader('Content-Type','application/json;charset=utf-8');
				//发送响应数据
				res.end(JSON.stringify(newShop));
		        db.close();
		    });
		});
	}

	// 查询分类数据
	if(pathname === '/category'){
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
	}

	//根据id查询某一条数据
	if(pathname === '/detail'){
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
	}






}).listen(3000);