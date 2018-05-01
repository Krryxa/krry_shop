<template>
	<div class="header">
		<div class="content">
			<div class="left">
				<a href="#" class="h_a">
					<img src="../assets/krrylogo.png" width="60">
				</a>
				<ul class="nav">
					<li>
						<a href="#">
							<i class="iconfont icon-home"></i>
							首页
						</a>
					</li>
					<li>
						
						<a href="#">
							<i class="iconfont icon-leimupinleifenleileibie2"></i>
							分类
						</a>
					</li>
					<li>
						<a href="#">
							<i class="iconfont icon-new-box"></i>
							最新
						</a>
					</li>
					<li>
						<a href="#">
							<i class="iconfont icon-gerenzhongxin"></i>
							个人中心
						</a>
					</li>
				</ul>
			</div>
			<div class="right">
				<a href="#">登录</a>
				<a href="#">注册</a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {msg:'hello'}
		},
		created(){

		},
		methods:{},
		computed:{},
		components:{}
	}
</script>
<style type="text/css" scoped>
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
</style>