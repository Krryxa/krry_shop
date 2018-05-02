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
      path:'/category/:bid',
      component:()=>import('../components/Category.vue'),
      name:"category",
      meta:{keepAlive:true,title:'分类'}
    },
    {
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:"detail",
      meta:{keepAlive:true,title:'详细'}
    },
  	{
      path:'*',
      redirect:'/home'
    }
  ]
})
