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
      path:'/login',
      component:()=>import('../components/Login.vue'),
      meta:{title:'登录'}
    },
    {
      path:'/register',
      component:()=>import('../components/Register.vue'),
      meta:{title:'注册'}
    },
  	{
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true,title:'首页'}
    },
    {
      path:'/category/:bid',
      component:()=>import('../components/Category.vue'),
      name:"category",
      meta:{keepAlive:true,title:'分类'}
    },
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:"detail",
      meta:{title:'详细'}
    },
    {
      path:'/admin/:username',
      component:()=>import('../components/Admin.vue'),
      name:"admin",
      meta:{title:'个人中心'}
    },
  	{
      path:'*',
      redirect:'/home'
    }
  ]
})
