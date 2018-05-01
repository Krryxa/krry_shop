import axios from 'axios';

//增加默认的请求路径 开发时用到，上线时不需要
axios.defaults.baseURL = 'http://localhost:3000';

//拦截器
axios.interceptors.response.use((res)=>{
	return res.data; //在这里统一拦截结果，把结果处理成res.data
});


// 获取轮播图数据，返回的是一个promise对象
export let getNewShop = ()=>{
	return axios.get('/newshop');
}
