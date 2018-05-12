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
      meta:{title:'首页'}
    },
    {
      path:'/category/:bid',
      component:()=>import('../components/Category.vue'),
      name:"category",
      meta:{title:'分类商品'}
    },
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:"detail",
      meta:{title:'商品详细'}
    },
    {
      path:'/admin/:username',
      component:()=>import('../components/Admin.vue'),
      name:"admin",
      meta:{title:'个人中心'}
    },
    {
      path:'/admin/add/:username',
      component:()=>import('../components/AddShop.vue'),
      name:"add",
      meta:{title:'添加商品'}
    },
    {
      path:'/admin/modify/:bid',
      component:()=>import('../components/ModifyShop.vue'),
      name:"modify",
      meta:{title:'修改商品'}
    },
    {
      path:'/admin/car/:username',
      component:()=>import('../components/shopCar.vue'),
      name:"car",
      meta:{title:'我的购物车'}
    },
  	{
      path:'*',
      redirect:'/home'
    }
  ]
})
