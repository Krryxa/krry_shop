
import Vue from 'vue';
import App from './App';
import router from './router';


// 使用vuex
import store from './store';
import * as Types from './store/mutations-type.js';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// 导入弹窗插件
import './assets/js/layer.js';
import './assets/css/layer.css';

Vue.config.productionTip = false

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

//导入图片懒加载插件
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img2.imgtn.bdimg.com/it/u=4086565937,2874637497&fm=214&gp=0.jpg',
  loading: 'http://www.99114.com/static/wei/images/loading.gif',
  attempt: 1
})

Vue.mixin({
  created () {
    console.log('mixin的');
  },
});

new Vue({
  el: '#app',
  router,
  store, //名字一样，可以写一个 ,store被注册到实例上，所有组件都会有一个属性，this.$store
  components: { App },
  template: '<App/>'
})
