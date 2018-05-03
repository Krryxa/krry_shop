
import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger'; //logger是一个日志插件

Vue.use(Vuex);
//这里定义的属性都是全局属性，管理全局的数据状态
//状态，存放数据
const state = {username:false};
//计算属性
//返回已登录的用户名
const getters = {
	val:(state)=>state.username,
};

import mutations from './mutations.js'

// 容器是唯一的
export default new Vuex.Store({
	state,
	mutations,
	plugins:[logger()], //导入日志插件
	strict:true,  //只能通过mutation(管理员)来更改状态，mutation不支持异步
});
