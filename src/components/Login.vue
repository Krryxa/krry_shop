<template>
	<div>
		<div class="wrapper">
			<div class="container">
				<h1>Welcome</h1>
				<form class="form">
					<input type="text" placeholder="用户名" v-model="user.username">
					<input type="password" placeholder="密码" v-model="user.password">
					<button type="button" id="login-button" @click="flag && beforeLogin()">{{msg}}</button>
				</form>
				<span class="c_back" @click="goback">返回</span>
				<router-link class="c_register" to="register">没有账号？点击注册</router-link>
			</div>
			
			<ul class="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {loginUser} from '../api/index.js';
	// vuex
	import * as Types from '../store/mutations-type.js';
	export default{
		data(){
			return {user:{
				username:'',
				password:''
			},flag:true,msg:'登录'}
		},
		created(){
			$('#login-button').click((event)=>{
				event.preventDefault();
				$('form').fadeOut(500);
				$('.wrapper').addClass('form-success');
			});
		},
		methods:{
			beforeLogin(){
				if(this.user.username == ''){
					layer.msg('请输入用户名');
					return;
				}
				if(this.user.password == ''){
					layer.msg('请输入密码');
					return;
				}
				//登录方法
				this.login();
			},
			async login(){
				this.flag = false;
				this.msg = '登录中';
				// 发送请求
				let res = await loginUser(this.user);
				if(res.length == 0){
					layer.msg('用户名不存在');
					this.flag = true;
					this.msg = '登录';
				}
				else if(res == 'errorCode'){
					layer.msg('密码错误');
					this.flag = true;
					this.msg = '登录';
				}
				else{
					this.msg = '登录成功';
					//成功登录，保存session，跳转到首页
					sessionStorage.setItem('user',JSON.stringify(res)); //这里继续转化为json字符串，放进sessionStorage
					//执行方法，将用户名设置进全局参数  vuex
					//提交mutation的Types.SETUSERNAME方法
					//第二个参数是携带的参数
					this.$store.commit(Types.SETUSERNAME,res.username);
					//登录成功进入首页
					this.$router.push('/home');
				}
			},
			goback(){
				//返回一级
				this.$router.go(-1);
			}
		},
		computed:{},
		components:{

		}
	}
</script>
<style type="text/css" scoped>
	.wrapper {
	  background: #50a3a2;
	  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
	  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
	  opacity: 0.8;
	  position: absolute;
	  top: 0;
	  left: 0;
	  bottom:0;
	  right:0;
	  width: 100%;
	  overflow: hidden;

	}

	.wrapper.form-success .container h1 {
	  -webkit-transform: translateY(85px);
	      -ms-transform: translateY(85px);
	          transform: translateY(85px);
	}
	.container {
	    margin: 0 auto;
	    width: 100%;
	    position: absolute;
	    height: 294px;
	    top: 50%;
	    margin-top: -190px;
    	text-align: center;
	}
	.container h1 {
	  font-size: 40px;
	  -webkit-transition-duration: 1s;
	          transition-duration: 1s;
	  -webkit-transition-timing-function: ease-in-put;
	          transition-timing-function: ease-in-put;
	  font-weight: 200;
	}
	form {
	  padding: 20px 0;
	  position: relative;
	  z-index: 2;
	}
	form input {
	  -webkit-appearance: none;
	     -moz-appearance: none;
	          appearance: none;
	  outline: 0;
	  border: 1px solid rgba(255, 255, 255, 0.4);
	  background-color: rgba(255, 255, 255, 0.2);
	  width: 250px;
	  border-radius: 3px;
	  padding: 10px 15px;
	  margin: 0 auto 10px auto;
	  display: block;
	  text-align: center;
	  font-size: 18px;
	  color: white;
	  -webkit-transition-duration: 0.25s;
	          transition-duration: 0.25s;
	  font-weight: 300;
	}
	form input:hover {
	  background-color: rgba(255, 255, 255, 0.4);
	}
	form input:focus {
	  background-color: white;
	  width: 300px;
	  color: #53e3a6;
	}
	form button {
	  -webkit-appearance: none;
	     -moz-appearance: none;
	          appearance: none;
	  outline: 0;
	  background-color: white;
	  border: 0;
	  padding: 10px 15px;
	  color: #53e3a6;
	  border-radius: 3px;
	  width: 250px;
	  cursor: pointer;
	  font-size: 18px;
	  -webkit-transition-duration: 0.25s;
	          transition-duration: 0.25s;
	}
	form button:hover {
	  background-color: #f5f7f9;
	}
	.bg-bubbles {
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  z-index: 1;
	}
	.bg-bubbles li {
	  position: absolute;
	  list-style: none;
	  display: block;
	  width: 40px;
	  height: 40px;
	  background-color: rgba(255, 255, 255, 0.15);
	  bottom: -160px;
	  -webkit-animation: square 25s infinite;
	  animation: square 25s infinite;
	  -webkit-transition-timing-function: linear;
	  transition-timing-function: linear;
	}
	.bg-bubbles li:nth-child(1) {
	  left: 10%;
	}
	.bg-bubbles li:nth-child(2) {
	  left: 20%;
	  width: 80px;
	  height: 80px;
	  -webkit-animation-delay: 2s;
	          animation-delay: 2s;
	  -webkit-animation-duration: 17s;
	          animation-duration: 17s;
	}
	.bg-bubbles li:nth-child(3) {
	  left: 25%;
	  -webkit-animation-delay: 4s;
	          animation-delay: 4s;
	}
	.bg-bubbles li:nth-child(4) {
	  left: 40%;
	  width: 60px;
	  height: 60px;
	  -webkit-animation-duration: 22s;
	          animation-duration: 22s;
	  background-color: rgba(255, 255, 255, 0.25);
	}
	.bg-bubbles li:nth-child(5) {
	  left: 70%;
	}
	.bg-bubbles li:nth-child(6) {
	  left: 80%;
	  width: 120px;
	  height: 120px;
	  -webkit-animation-delay: 3s;
	          animation-delay: 3s;
	  background-color: rgba(255, 255, 255, 0.2);
	}
	.bg-bubbles li:nth-child(7) {
	  left: 32%;
	  width: 160px;
	  height: 160px;
	  -webkit-animation-delay: 7s;
	          animation-delay: 7s;
	}
	.bg-bubbles li:nth-child(8) {
	  left: 55%;
	  width: 20px;
	  height: 20px;
	  -webkit-animation-delay: 15s;
	          animation-delay: 15s;
	  -webkit-animation-duration: 40s;
	          animation-duration: 40s;
	}
	.bg-bubbles li:nth-child(9) {
	  left: 25%;
	  width: 10px;
	  height: 10px;
	  -webkit-animation-delay: 2s;
	          animation-delay: 2s;
	  -webkit-animation-duration: 40s;
	          animation-duration: 40s;
	  background-color: rgba(255, 255, 255, 0.3);
	}
	.bg-bubbles li:nth-child(10) {
	  left: 90%;
	  width: 160px;
	  height: 160px;
	  -webkit-animation-delay: 11s;
	          animation-delay: 11s;
	}
	.c_register{
		z-index: 2;
  		position: relative;
	}
	.c_register:hover{
		color:#bd3119;
	}
	.c_back{
		position: relative;
	    z-index: 2;
	    cursor: url(../assets/link.cur),pointer;
	    margin-right: 86px;
	}
	.c_back:hover{
		color:#bd3119;
	}
	@-webkit-keyframes square {
	  0% {
	    -webkit-transform: translateY(0);
	            transform: translateY(0);
	  }
	  100% {
	    -webkit-transform: translateY(-700px) rotate(600deg);
	            transform: translateY(-700px) rotate(600deg);
	  }
	}
	@keyframes square {
	  0% {
	    -webkit-transform: translateY(0);
	            transform: translateY(0);
	  }
	  100% {
	    -webkit-transform: translateY(-700px) rotate(600deg);
	            transform: translateY(-700px) rotate(600deg);
	  }
	}
</style>