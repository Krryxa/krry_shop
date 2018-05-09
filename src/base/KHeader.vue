<template>
	<div class="header">
		<div class="content">
			<div class="left">
				<router-link to="/home" class="h_a">
					<img src="../assets/krrylogo.png" width="60">
				</router-link>
				<ul class="nav">
					<li>
						<router-link to="/home">
							<i class="iconfont icon-home"></i>
							首页
						</router-link>
					</li>
					<li class="lli">
						<a>
							<i class="iconfont icon-leimupinleifenleileibie2"></i>
							分类商品
						</a>
						<div class="lli_div">
							<router-link :to="{name:'category',params:{bid:1}}">电子产品</router-link>
							<router-link :to="{name:'category',params:{bid:2}}">衣物鞋包</router-link>
							<router-link :to="{name:'category',params:{bid:3}}">美妆个护</router-link>
							<router-link :to="{name:'category',params:{bid:4}}">饮食酒类</router-link>
							<router-link :to="{name:'category',params:{bid:5}}">医药保健</router-link>
							<router-link :to="{name:'category',params:{bid:6}}">图书音像</router-link>
						</div>
					</li>
					<li>
						<router-link :to="{name:'category',params:{bid:0}}">
							<i class="iconfont icon-new-box"></i>
							最新
						</router-link>
					</li>
					<li>
						<router-link :to="this.$store.state.username ? {name:'admin',params:{username:this.$store.state.username}} : '/login'">
							<i class="iconfont icon-gerenzhongxin"></i>
							个人中心
						</router-link>
					</li>
				</ul>
			</div>
			<div class="right">
				<div v-if="this.$store.state.username">
					<span>欢迎：</span>
					<router-link :to="{name:'admin',params:{username:this.$store.state.username}}" class="r_logins">
						{{this.$store.state.username}}
					</router-link>
					<span class="r_button" @click="loginout">退出</span>
				</div>
				<div v-if="!this.$store.state.username">
					<router-link to="/login">登录</router-link>
					<router-link to="/register">注册</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import * as Types from '../store/mutations-type.js';
	export default{
		data(){
			return {msg:'hello'}
		},
		created(){

		},
		//在挂载到实例上去之后,dom渲染结束，可以操作dom了，一些dom操作也可以放在这里
		mounted(){
			$(".lli").hover(()=>{
				$(".lli_div").stop().slideDown(300);
			},()=>{
				$(".lli_div").stop().slideUp(300);
			});
		},
		methods:{
			loginout(){
				//询问框
				layer.confirm('您确定退出登录？', {
					title: '乐诗提醒',
				  btn: ['确定','取消'] //按钮
				}, ()=>{
				  //确定退出登录
				  //清空缓存数据
				  sessionStorage.clear();
				  //全局状态的用户名设为false
				  this.$store.commit(Types.SETUSERNAME,false);
				  layer.msg('成功退出', {icon: 1});
				  //跳转到首页
				  this.$router.push('/home');
				}, ()=>{
				  //取消
				  
				});
			}
		},
		computed:{},
		components:{}
	}
</script>
<style type="text/css" scoped>
	.router-link-active{
		color: #dd5862 !important;
		text-decoration: none;
	}
	.header{
		background: #F2F2F2;
		color: #2d2d2d;
		height: 60px;
		width: 100%;
		position: relative;
	}
	.header .left{
		float:left;
		height: 100%;
	}
	.header .left .h_a{
		height: 60px;
	    display: inline-block;
	    float: left;
	    line-height: 60px;
	    text-align: center;
	    color: #fff;
	}
	.header .left .nav{
		float: left;
    	margin-left: 12px;
	}
	.header .left .nav li{
		float: left;
	    height: 60px;
	    line-height: 60px;
	}
	.header .left .nav li a{
		position: relative;
	    z-index: 4;
	    background: #F2F2F2;
	    height: 60px;
	    font-size: 14px;
	    padding: 0px 14px;
	    display: block;
	    color: #2d2d2d;
	    transition: all 0.3s ease;
	}
	.header .left .nav li a:hover{
		color:#dd5862;
	}
	.header .right{
		width: 200px;
	    height: 60px;
	    float: right;
	    line-height: 60px;
	    text-align: right;
	}
	.header .right a{
		color: #363636;
	    margin-left: 10px;
	    font-size: 14px;
	    transition: 0.5s;
	}
	.header .right a:hover{
		color:#dd5862;
	}
	.header .right .r_logins{
		margin-left: 0px;
    	color: #ff8244;
	}
	.header .right .r_button{
		margin-left: 10px;
		cursor: url(../assets/link.cur),pointer;
	}
	.header .right .r_button:hover{
		color:red;
	}
	.lli_div{
		display: none;
	}
	.lli_div a{
		text-align: center;
	}
</style>