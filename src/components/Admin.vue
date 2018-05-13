<template>
	<div>
		<KHeader></KHeader>
		<div class="content">
			<div class="row">
				<router-link :to="{name:'add',params:{username:this.$store.state.username}}" class="noshop" v-if="noShop">
					您还没有发布任何商品哦~
				</router-link>
				<table class="table table-hover table-bordered">
					<caption style="color:#e25d0c;" class="h2 text-center">
						<p>{{this.$store.state.username}} 的中心</p>
						<router-link :to="{name:'add',params:{username:this.$store.state.username}}" tag="button" class="btn-success btn left">发表商品</router-link>
						<router-link :to="{name:'car',params:{username:this.$store.state.username}}" tag="button" class="btn-warning btn right">我的购物车</router-link>
					</caption>
					<Loading v-if="loading"></Loading>
					<thead v-if="!loading">
						<tr>
							<th>编号</th>
							<td style="width:500px;">商品</td>
							<td>分类</td>
							<td>单价</td>
							<td style="width:180px;">操作</td>
						</tr>
					</thead>
					<tbody v-if="!loading">
						<tr v-for="(product,index) in shops" :key="index">
							<td class="pro_check">{{index+1}}</td>
							<td>
								<router-link :to="{name:'detail',params:{bid:product._id}}">
									<img class="pro_img" :src="product.img" width="100">
									<span class="pro_span">{{product.desc}}</span>
								</router-link>
							</td>
							<td class="pro_line">
								<router-link :to="{name:'category',params:{bid:product.kindId}}">{{product.kind}}</router-link>
							</td>
							<td class="pro_line pricess">￥{{product.price}}</td>
							<td class="pro_line">
								<router-link :to="{name:'modify',params:{bid:product._id}}" tag="button" class="btn btn-warning btn_modify">修改</router-link>
								<button class="btn btn-danger" @click="beforeRemove(product._id)">删除</button>
							</td>
						</tr>
					</tbody>
				</table>
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
	import {myShop,removeMyShop} from '../api/index.js';
	export default{
		data(){
			return {shops:[],loading:true,userId:"",noShop:false}
		},
		created(){
			//查询自己发布的商品
			this.mySearShop();
		},
		methods:{
			async mySearShop(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				//获取用户id
				this.userId = user.id;
				this.shops = await myShop(this.userId);
				//如果没有查到，没有发表商品，显示提示信息
				if(this.shops.length == 0) this.noShop = true;
				this.loading = false;
			},
			//删除购物车的商品之前
			beforeRemove(id){
				//询问框
				layer.confirm('您确定删除这个商品？', {
					skin: 'layui-layer-lan', //样式类名
					title: '乐诗提醒',
				  	btn: ['确定','取消'] //按钮
				},()=>{
					//加载动画
					layer.load();
					this.remove(id);
				},()=>{
				  //取消
				  
				});
			},
			//删除购物车的商品
			async remove(id){
				let msg = await removeMyShop(id);
				if(msg == 'success'){
					//清除加载动画
					layer.closeAll('loading');
					layer.msg('成功删除', {icon: 1});
					this.shops = await myShop(this.userId);
					//如果没有查到，没有发表商品，显示提示信息
					if(this.shops.length == 0) this.noShop = true;
				}
			},
		},
		computed:{
			
		},
		components:{
			KHeader,
			KFooter,
			Loading,
		}
	}
</script>
<style scoped>
	.row{
		min-height: 430px;
		width: 960px;
    	margin: 0 auto;
	}
	.noshop{
		position: absolute;
	    font-size: 32px;
	    margin-top: 130px;
	    text-align: center;
	    top: 150px;
	    width: 100%;
	    background: -webkit-gradient(linear,left top,left bottom,from(#f1770c),to(#fb2e00));
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	.pro_check{
		line-height: 100px;
    	text-align: center;
	}
	.pro_img{
		float:left;
		margin-right: 12px;
	}
	.pro_span{
		max-width: 499px;
	    display: block;
	    box-sizing: border-box;
	    margin: 30px 0;
	}
	.pro_line{
		line-height: 100px;
		text-align: center;
	}
	.pro_inp{
		margin-top: 33px;
	    width: 100%;
	    border-radius: 5px;
	    height: 31px;
	    text-indent: 5px;
	    border: 1px solid #c5c5c5;
	}
	.pro_sum{
		padding: 25px;
    	font-size: 16px;
    	line-height: 34px;
	}
	.pricess{
		color:red;
	}
	.pro_submit{
		float:right;
	}
	.btn_modify{
		margin-right:16px;
	}
</style>