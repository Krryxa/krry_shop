<template>
	<div>
		<KHeader></KHeader>
		<!-- 获取路由路径上的参数{{$route.params.bid}} -->
		<div class="content">
			<div class="c_hea">
				<span class="c_h_title">{{categoryName}}</span>
				<div class="v_ttmore">
			 		<router-link :to="{name:'category',params:{bid:1}}">电子产品</router-link>
			 		<router-link :to="{name:'category',params:{bid:2}}">衣物鞋包</router-link>
			 		<router-link :to="{name:'category',params:{bid:3}}">美妆个护</router-link>
			 		<router-link :to="{name:'category',params:{bid:4}}">饮食酒类</router-link>
			 		<router-link :to="{name:'category',params:{bid:5}}">医药保健</router-link>
			 		<router-link :to="{name:'category',params:{bid:6}}">图书音像</router-link>
			 		<router-link :to="{name:'category',params:{bid:0}}">查看全部&gt;</router-link>
		 			<div class="clear"></div>
		 		</div>
			</div>
			<div class="listbox">
				<Loading v-if="loading"></Loading>
		 		<ul v-if="!loading" class="databox">
				 	<li class="items" v-for="(shop,index) in cateShop" :key="index">
						<router-link class="imgbox pr" :to="{name:'detail',params:{bid:shop._id}}">
							 <img class="lazy" v-lazy="shop.img" width="210" height="210" style="display: inline;">
						</router-link>
				 		<div class="slbox">
				 			<p title="价格" class="prices">
								￥<span class="money">{{shop.price}}</span>
							</p>
							<router-link :to="{name:'detail',params:{bid:shop._id}}">
								<span class="desc overflow1">{{shop.desc}}</span>
							</router-link>
							<router-link  class="in_kind overflow1" :to="{name:'category',params:{bid:shop.kindId}}">
								<span id="kinds">{{shop.kind}}</span>
							</router-link>
		 					<a href="#" class="in_shop overflow1">
		 						<span id="shopname">{{shop.username}}</span>
		 						<i class="iconfont icon-box"></i>
		 					</a>
				 		</div>
				 	</li>
				 	<div class="clear"></div>
				 </ul>
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
	import {getCateShop} from '../api/index.js';
	export default{
		data(){
			return {cateNames:['全部商品','电子产品','衣物鞋包','美妆个护','饮食酒类','医药保健','图书音像'],
				cateShop:[],loading:true}
		},
		created(){
			this.getCateShop();
		},
		methods:{
			/* 查询分类数据 */
			async getCateShop(){
				this.cateShop = await getCateShop(this.bid);
				this.loading = false;
			}
		},
		computed:{
			bid(){
				return this.$route.params.bid; //将路径上的id映射到bid上
			},
			categoryName(){
				return this.cateNames[this.bid]; //获取当前内容的类型名称
			}
		},
		watch:{
			//监听路由变化的时候
			'$route'(to,from){
				this.loading = true;
				this.getCateShop();
			},
		},
		components:{
			KHeader,
			KFooter,
			Loading,
		}
	}
</script>
<style type="text/css" scoped>
	.router-link-active{
		color: #dd5862 !important;
		text-decoration: none;
	}
	.c_hea{
		margin-top: 50px;
	    height: 55px;
	    border-bottom: 1px solid #ddd;
	    position: relative;
	}
	.c_hea .c_h_title{
		font-size: 30px;
		-webkit-text-fill-color: transparent;
	    background: -webkit-gradient(linear,left top,left bottom,from(#FD0051),to(#A22C93));
	    -webkit-background-clip: text;
	}
	.c_hea .v_ttmore{
		float: right;
	    position: absolute;
	    right: 0;
	    bottom: 8px;
	}
	.c_hea .v_ttmore a{
		color: #7d7d7d;
		display: inline-block;
	    margin-left: 8px;
	    margin-top: 4px;
		transition: .4s;
	}
	.c_hea .v_ttmore a:hover{
		color:#dd5862;
	}
	.listbox{
		margin-top: 20px;
	}
	.listbox .items{
		width: 210px;
		float: left;
		margin-right:40px;
		margin-bottom: 30px;
	}
	.listbox .items:nth-child(4n){
		margin-right:0;
	}
	.listbox .items a.imgbox{
		border-radius: 4px;
	    overflow: hidden;
	    display: block;
	}
	.listbox .items a.imgbox .lazy{
	    border-radius: 4px;
	    transition: .8s;
	}
	.listbox .items a.imgbox .lazy:hover{
		transform: scale(1.12);
		transition: .8s;
	}
	.listbox .items .slbox{
		margin-top: 8px;
	    color: #666;
		line-height: 24px;
	}
	.listbox .items .slbox a{
		color:#666;
	}
	.listbox .items .slbox .title{
		margin-top: 0;
	}
	.listbox .items .slbox .title a{
		font-size: 18px;
    	font-weight: 600;
    	color:#333;
    	display: block;
	}
	.listbox .items .slbox .prices{
		color:red;
		font-size:16px;
		font-weight: bold;
	}
	.listbox .items .slbox .desc{
		line-height: 20px;
		max-width: 210px;
    	display: table-cell;
	}
	.listbox .items .slbox .in_kind{
		display: table;
		color:#999;
		max-width: 210px;
	}
	.listbox .items .slbox .in_shop{
		display: table-cell;
		color:#999;
		max-width: 210px;
	}
	.listbox .items .slbox a:hover{
		color:#dd5862;
		transition: .4s;
	}
</style>