<template>
	<div style="position:relative; height:100%">
		<!-- 头部 -->
		<KHeader></KHeader>
		<div class="content box">
			<!-- 轮播图组件 -->
			<Carousel></Carousel>
			<div class="lineHeight"></div>
			<div class="c_litt_div">
				<h3 class="c_litt_title"><span></span>最新推荐</h3>
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
		 		<div class="clear"></div>
		 	</div>
		 	<div class="listbox">
		 		<Loading v-if="loading"></Loading>
		 		<ul v-if="!loading" class="databox">
				 	<li class="items" v-for="(shop,index) in newShop" :key="index">
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
		<!-- 底部 -->
		<KFooter></KFooter>
	</div>
</template>

<script type="text/javascript">
	import KHeader from '../base/KHeader.vue';
	import KFooter from '../base/KFooter.vue';
	/* 导入轮播图组件 */
	import Carousel from '../base/Carousel.vue';
	/* 导入动画加载组件 */
	import Loading from '../base/Loading.vue';
	/* 导入查询最新数据的api */
	import {getNewShop} from '../api/index.js';

	export default{
		data(){
			return {newShop:[],loading:true}
		},
		created(){
			this.getNewShop();
		},
		methods:{
			/* 查询最新数据 */
			async getNewShop(){
				this.newShop = await getNewShop();
				this.loading = false;
			}
		},
		computed:{},
		components:{
			KHeader,
			KFooter,
			Carousel,
			Loading,
		}
	}
</script>
<style type="text/css" scoped>
	.box{
		margin: 50px auto;
	}
	.c_litt_div .c_litt_title{
		font-size: 24px;
    margin-bottom: 19px;
    margin-top: 0;
    float: left;
	}
	.c_litt_div .c_litt_title span{
		border-left: 3px solid #dd5862;
    font-size: 18px;
    margin-right: 10px;
	}
	.c_litt_div .v_ttmore{
		float: right;
	}
	.c_litt_div .v_ttmore a{
		float: left;
    display: inline-block;
    margin-left: 12px;
    margin-top: 4px;
    transition: .4s;
    color: #7d7d7d;
	}
	.c_litt_div .v_ttmore a:hover{
		color:#dd5862;
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