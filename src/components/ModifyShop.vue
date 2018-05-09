<template>
	<div>
		<KHeader></KHeader>
		<div class="content">
			<div class="con_head">
				<p>修改商品</p>
			</div>
			<div class="con_boxs">
				<p class="shop_lable">商品名称</p>
				<input type="text" v-model="shop.desc">
				<p class="shop_lable">图片链接</p>
				<input type="text" v-model="shop.img">
				<p class="shop_lable">商品单价</p>
				<input type="number" v-model.number="shop.price">
				<p class="shop_lable">商品分类</p>
				<select v-model="shop.kind">
				    <option disabled selected="true">请选择分类</option>
				    <option>电子产品</option>
				    <option>衣物鞋包</option>
				    <option>美妆个护</option>
				    <option>饮食酒类</option>
				    <option>医药保健</option>
				    <option>图书音像</option>
				</select>
				<button class="sumbie btn btn-danger right" @click="beforeModify">确认修改</button>
				<button class="sumbie btn-success btn left" @click="back">返回</button>
				<div class="clear"></div>
			</div>
		</div>
		<KFooter></KFooter>
	</div>
</template>
<script type="text/javascript">
	import KHeader from '../base/KHeader.vue';
	import KFooter from '../base/KFooter.vue';
	import {getDetail,modifyShop} from '../api/index.js';
	export default{
		data(){
			return {shop:{},
				cateNames:['全部商品','电子产品','衣物鞋包','美妆个护','饮食酒类','医药保健','图书音像'],
			}
		},
		created(){
			this.getDetailShop();
		},
		methods:{
			async getDetailShop(){
				this.shop = await getDetail(this.bid);
			},
			//修改之前的判断
			beforeModify(){
				//保证每个字段都填写了
				if(!this.shop.desc){
					layer.msg('请填商品名称');
					return;
				}
				if(!this.shop.img){
					layer.msg('请填图片链接');
					return;
				}
				if(!this.shop.price){
					layer.msg('请填商品单价');
					return;
				}
				if(!this.shop.kind){
					layer.msg('请选择商品分类');
					return;
				}
				let user = JSON.parse(sessionStorage.getItem('user'));
				//获取用户id和用户名
				this.shop.userId = user.id;
				this.shop.username = user.username;
				//获取并设置商品id
				this.shop.id = this.bid;
				//获取kindId
				this.shop.kindId = this.cateNames.indexOf(this.shop.kind);
				//加载动画
				layer.load();
				//修改商品
				this.modify();
			},
			async modify(){
				let msg = await modifyShop(this.shop);
				if(msg == 'success'){
					//清除加载动画
					layer.closeAll('loading');
					layer.msg('修改成功', {icon: 1});
					//跳转到首页
					this.$router.push('/home');
				}
			},
			back(){
				//返回一级
				this.$router.go(-1);
			}
		},
		computed:{
			bid(){
				return this.$route.params.bid; //将路径上的id映射到bid上，即商品id
			}
		},
		components:{
			KHeader,
			KFooter
		}
	}
</script>
<style type="text/css" scoped>
	.con_head{
		padding-top: 8px;
	    padding-bottom: 8px;
	    font-size: 30px;
	    text-align: center;
	    margin-top: 20px;
	    margin-bottom: 10px;
	    color: rgb(226, 93, 12);
	    line-height: 1.1;
	}
	.con_boxs{
		margin:50px auto;
		width: 450px;
		margin-top: 20px;
	}
	.shop_lable{
		display:table;
		font-size: 24px;
	}
	input{
		margin-bottom: 20px;
	    margin-top: 3px;
	    width: 100%;
	    height: 40px;
	    border-radius: 5px;
	    border: 1px solid #c5c4c4;
	    text-indent: 8px;
   		font-size: 16px;
	}
	select{
		width: 200px;
	    height: 30px;
	    margin-top: 3px;
	    margin-bottom: 20px;
	    display: block;
	}
	.sumbie{
		width: 206px;
	    height: 40px;
	    margin-top: 16px;
	}
</style>