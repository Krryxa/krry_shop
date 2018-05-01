import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path:'/',
      redirect:'/home'
    },//this.$route.meta.keepAlive
  	{
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,title:'首页'}
    },
  	{
      path:'*',
      redirect:'/home'
    }
  ]
})
