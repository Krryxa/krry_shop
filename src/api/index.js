import axios from 'axios';

//增加默认的请求路径 开发时用到，上线时不需要
axios.defaults.baseURL = 'http://localhost:3000';

//拦截器
axios.interceptors.response.use((res)=>{
	return res.data; //在这里统一拦截结果，把结果处理成res.data
});

//注册
export let addUser = (data)=>{
	return axios.post('/addUser',data);
}

//注册
export let loginUser = (data)=>{
	return axios.post('/loginUser',data);
}


// 获取最新数据，返回8条最新数据
export let getNewShop = ()=>{
	return axios.get('/newshop');
}

// 获取分类数据
export let getCateShop = (id)=>{
	return axios.get(`/category?bid=${id}`);
}

// 根据id获取某一条商品数据
export let getDetail = (id)=>{
	return axios.get(`/detail?bid=${id}`);
}

//检测登录的用户是否将此商品加入购物车
export let detectCar = (shopId,userId)=>{
	return axios.get(`/detectCar?shopId=${shopId}&userId=${userId}`);
}

// 获取一条商品数据和检测是否加入购物车的封装all
export let getDeAll = (shopId,userId)=>{
	return axios.all([getDetail(shopId),detectCar(shopId,userId)]);
}


//点击加入购物车
export let addShop = (data)=>{
	return axios.post('/addShop',data);
}

//进入购物车查询购物车信息
export let shopCar = (userId)=>{
	return axios.get(`/shopCar?userId=${userId}`);
}

//删除购物车中的一个商品（参数：购物车中数据id）
export let deleteShop = (id)=>{
	return axios.get(`/deleteShop?id=${id}`);
}
