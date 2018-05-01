
let http = require('http');
let fs = require('fs');
let url = require('url');

let MongoClient = require('mongodb').MongoClient;
let mogourl = "mongodb://localhost:27017/";


http.createServer((req,res)=>{
	//解决跨域问题  开发时用到，上线时不用
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",'3.2.1')
    if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

	let {pathname,query} = url.parse(req.url,true);//true把query转化成对象


	if(pathname === '/newshop'){
		let newShop = "";
		MongoClient.connect(mogourl, (err, db)=>{
		    if (err) throw err;
		    let dbo = db.db("krry_shop");
		    dbo.collection("shop"). find({}).toArray((err, result)=>{ // 返回集合中所有数据
		        if (err) throw err;
		        //将查询出来的数据保存到变量中
		        newShop = result;
		        res.setHeader('Content-Type','application/json;charset=utf-8');
				//发送响应数据
				res.end(JSON.stringify(newShop));
		        db.close();
		    });
		});
	}

}).listen(3000);