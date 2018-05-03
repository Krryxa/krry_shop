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


// 获取最新数据，返回8条最新数据
export let getNewShop = ()=>{
	return axios.get('/newshop');
}

// 获取分类数据
export let getCateShop = (id)=>{
	return axios.get(`/category?bid=${id}`);
}

// 根据id获取某一条数据
export let getDetail = (id)=>{
	return axios.get(`/detail?bid=${id}`);
}
