
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.config.productionTip = false

//在进入路由之前， 每一次都会执行此方法  全局钩子
router.beforeEach(function(from,to,next){
	document.title = from.meta.title;
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


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
