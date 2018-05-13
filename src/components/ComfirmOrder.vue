<template>
	<div>
		<KHeader></KHeader>
		<div class="content">
			<div class="row">
				<table class="table table-hover table-bordered">
					<caption style="color:#e25d0c;" class="h2 text-center">
						<p>确认订单</p>
						<router-link :to="{name:'car',params:{username:this.$store.state.username}}" tag="button" class="btn-warning btn right">我的购物车</router-link>
					</caption>
					<Loading v-if="loading"></Loading>
					<thead v-if="!loading">
						<tr>
							<td style="width:100px;">店铺</td>
							<td style="width:500px;">商品</td>
							<td style="width:100px;">分类</td>
							<td>单价</td>
							<td>数量</td>
							<td>小计</td>
						</tr>
					</thead>
					<tbody v-if="!loading">
						<tr>
							<td class="pro_check">{{shop.username}}</td>
							<td>
								<router-link :to="{name:'detail',params:{bid:shop._id}}">
									<img class="pro_img" :src="shop.img" width="100">
									<span class="pro_span">{{shop.desc}}</span>
								</router-link>
							</td>
							<td class="pro_check">
								<router-link class="category" :to="{name:'category',params:{bid:shop.kindId}}">{{shop.kind}}</router-link>
							</td>
							<td class="pro_line pricess">{{shop.price | toFixed(2)}}</td>
							<!-- .number 使输入框的值变成数字 -->
							<td><input class="pro_inp" type="number" v-model.number="shop.count" min="1"></td>
							<!-- 过滤器 原数据不变的情况，只是改变显示的效果  管道符 -->
							<td class="pro_line pricess">{{shop.price*shop.count | toFixed(2)}}</td>
						</tr>
						<tr>
							<!-- {{sum()}} 数据一变化，就会算出总价格，不会缓存上一次的结果
							computed 可以解决这个问题 -->
							<td class="pro_sum" colspan="6">总价格：
								<span class="pricess">{{shop.price*shop.count | toFixed(2)}}</span>
								<button class="pro_submit btn btn-warning" @click="submitOrder">提交订单</button>
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
	//导入查询某条数据的api、加入购物车api
	import {getDetail} from '../api/index.js';
	export default{
		data(){
			return {shop:'',loading:true,}
		},
		//可以有自定义过滤器
		filters:{
			//这里的this指向window
			//第一个参数input是管道符前面的值，往后的参数是调用时的参数
			toFixed(input,param1){
				return '￥'+input.toFixed(param1); //保留两位小数
			}
		},
		created(){
			this.getShop();
		},
		methods:{
			async getShop(){
				this.shop = await getDetail(this.bid);
				this.shop.count = 1; //默认数量为1
				this.loading = false;
			},
			//提交订单
			submitOrder(){
				let sum = (this.shop.price*this.shop.count).toFixed(2);
				layer.open({
					skin: 'layui-layer-lan', //样式类名
				  	title: '您的订单',
				  	content: '您购买了<br>'+this.shop.desc+' X'+this.shop.count+'<br><br>总金额：￥'+sum+'<br>我跟你讲，一件还是买得起的',
				  	cancel:()=>{
				  		layer.msg('亲，点确定啦~');
				  	},
				  	yes:()=>{
				  		layer.msg('亲，等着收货吧~');
				  	},
				});
				
			}
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
</style>