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
					<router-link  class="category" :to="{name:'category',params:{bid:shop.kindId}}">{{shop.kind}}</router-link>
					<div class="username">{{shop.username}}  <i class="iconfont icon-box"></i></div>
					<button class="intocar">加入购物车</button>
					<button class="buynow">立即购买</button>
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
	//导入查询某条数据的api
	import {getDetail} from '../api/index.js';
	export default{
		data(){
			return {shop:"",loading:true,}
		},
		created(){
			this.getDetail();
		},
		methods:{
			async getDetail(){
				this.shop = await getDetail(this.bid);
				this.loading = false;
			}
		},
		computed:{
			bid(){
				return this.$route.params.bid; //将路径上的id映射到bid上
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
	}
	.category:hover{
		color:red;
		transition: .4s;
	}
	.username{
		margin-top: 15px;
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