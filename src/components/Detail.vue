<template>
	<div>
		<KHeader></KHeader>
		<div class="content">
			<Loading v-if="loading"></Loading>
			<div v-if="!loading">
				<div class="left">
					<img v-lazy="shop.img" width="250" height="250">
				</div>
				<div class="right">
					<div class="title">{{shop.desc}}</div>
					<div class="price">¥{{shop.price}}</div>
					<router-link  class="category" :to="{name:'category',params:{bid:shop.kindId}}">{{shop.kind}}</router-link><br>
					<div class="username">{{shop.username}}  <i class="iconfont icon-box"></i></div>
					<button class="intocar" @click="flag && beforeAddShop()">{{intoShop}}</button>
					<router-link  class="buynow" :to="this.$store.state.username ? {name:'comfirm',params:{bid:shop._id}} : '/login'" tag="button">立即购买</router-link>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<KFooter></KFooter>
	</div>
</template>
<script type="text/javascript">
	import KHeader from '../base/KHeader.vue';
	import KFooter from '../base/KFooter.vue';
	/* 导入动画加载组件 */
	import Loading from '../base/Loading.vue';
	//导入查询某条数据的api、加入购物车api
	import {getDetail,getDeAll,addShop} from '../api/index.js';
	export default{
		data(){
			return {shop:"",loading:true,flag:true,intoShop:'加入购物车'}
		},
		created(){
			this.getDeAll();
		},
		methods:{
			// 获取商品详细信息，并且如果已经登录就检测登录的用户是否已经将此商品加入购物车
			async getDeAll(){
				//检测是否登录、登录的用户是否已经将此商品加入购物车
				let user = JSON.parse(sessionStorage.getItem('user'));
				//如果已登录
				if(user){
					//两个都一起异步，1.获取商品信息，2.检测登录的用户是否已经将此商品加入购物车
					let [shop,result] = await getDeAll(this.bid,user.id);
					//商品信息赋值到this.shop
					this.shop = shop;
					//如果result有数据，表明已经加入购物车
					if(result.length != 0){
						this.flag = false; //阻止继续点击加入购物车事件
						this.intoShop = '车上等你';
					}
				}else{
					//如果没有登录，就只需要执行获取商品详细信息的操作
					this.shop = await getDetail(this.bid);
				}
				this.loading = false;
			},

			//加入购物车之前的方法
			beforeAddShop(){
				this.flag = false; //阻止继续点击加入购物车事件
				let user = JSON.parse(sessionStorage.getItem('user'));
				//如果没有登录，跳转到登录页面
				if(!user){
					this.$router.push('/login');
				}else{
					//执行加入购物车
					let shopCar = {
						'userId':user.id,
						'shopId':this.shop._id,
						'shopName':this.shop.desc,
						'shopPrice':this.shop.price,
						'shopImg':this.shop.img
					};
					//加载动画
					layer.load();
					//执行加入购物车的方法
					this.add(shopCar);
				}
			},
			async add(shopCar){
				let msg = await addShop(shopCar);
				if(msg == 'success'){
					layer.msg('加入购物车成功~',{icon: 1});
					this.intoShop = '车上等你';
					//清除加载动画
					layer.closeAll('loading');
				} 
				else{
					layer.msg('加入购物车失败~',{icon: 2});
					this.flag = true;
					//清除加载动画
					layer.closeAll('loading');
				} 
			},
		},
		computed:{
			bid(){
				return this.$route.params.bid; //将路径上的id映射到bid上，即商品id
			}
		},
		components:{
			KHeader,
			KFooter,
			Loading,
		}
	}
</script>
<style type="text/css" scoped>
	.content{
		margin-top: 100px;
    	margin-bottom: 100px;
    	min-height: 250px;
	}
	.left{
		width:300px;
		float:left;
	}
	.right{
		width:660px;
		float:left;
	}
	.title{
		font-size: 16px;
	}
	.price{
		margin-top: 15px;
		color:red;
		font-weight: bold;
		font-size: 20px;
	}
	.category{
		margin-top: 15px;
		display: inline-block;
		color: #999;
	}
	.category:hover{
		color:red;
		transition: .4s;
	}
	.username{
		margin-top: 15px;
		display: inline-block;
    	color: #999;
	}
	.right button{
		position: absolute;
    	bottom: 0;
		width: 91px;
	    height: 38px;
	    border: none;
	    outline: none;
	    border-radius: 4px;
	    background: #e84d4d;
	    color: #fff;
	}
	.right button:hover{
		transition: .4s !important;
		background: #e67f11 !important;
	}
	.right .intocar{
		background:#166fe2 !important;
	}
	.right .buynow{
		margin-left: 156px;
	}
</style>