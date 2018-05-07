<template>
	<div>
		<KHeader></KHeader>
		<div class="content">
			<!-- bootstrap 栅格化布局 默认12列-->
			<!-- 常见样式 ：基本样式+增强样式 -->
			<!-- default：灰色 success：绿色 danger：红色  warning：警告色 info：浅蓝色 primary：蓝色 -->
			<!-- 每一行又拥有12列 -->
			<div class="row">
				<table class="table table-hover table-bordered">
					<caption style="color:#e25d0c;" class="h2 text-center">{{this.$store.state.username}} 购物车</caption>
					<Loading v-if="loading"></Loading>
					<thead v-if="!loading">
						<tr>
							<!-- click点击时，checkBox的状态还没改变，所以使用change监听，只当值变化后触发函数 -->
							<th style="width: 80px;">
								<span>全选</span>
								<input style="margin-left: 12px;" type="checkbox" v-model="checkAll">
							</th>
							<td>商品</td>
							<td>单价</td>
							<td>数量</td>
							<td>小计</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody v-if="!loading">
						<tr v-for="(product,index) in shops" :key="index">
							<td class="pro_check"><input type="checkbox" v-model="product.isSelected"></td>
							<td>
								<router-link :to="{name:'detail',params:{bid:product.shopId}}">
									<img class="pro_img" :src="product.shopImg" width="100">
									<span class="pro_span">{{product.shopName}}</span>
								</router-link>
							</td>
							<td class="pro_line pricess">{{product.shopPrice | toFixed(2)}}</td>
							<!-- .number 使输入框的值变成数字 -->
							<!-- .lazy：当输入框失去焦点时才更新数据 -->
							<td><input class="pro_inp" type="number" v-model.number.lazy="product.shopCount" min="1"></td>
							<!-- 过滤器 原数据不变的情况，只是改变显示的效果  管道符 -->
							<td class="pro_line pricess">{{product.shopPrice*product.shopCount | toFixed(2)}}</td>
							<td class="pro_line"><button class="btn btn-danger" @click="beforeRemove(product._id)">删除</button></td>
						</tr>
						<tr>
							<!-- {{sum()}} 数据一变化，就会算出总价格，不会缓存上一次的结果
							computed 可以解决这个问题 -->
							<td class="pro_sum" colspan="6">总价格：
								<span class="pricess">{{sum | toFixed(2)}}</span>
								<button class="pro_submit btn btn-warning">提交订单</button>
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
	import {shopCar,deleteShop} from '../api/index.js';
	export default{
		data(){
			return {shops:[],loading:true,userId:""}
		},
		created(){
			this.getShopCar();
		},
		methods:{
			async getShopCar(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.userId = user.id;
				this.shops = await shopCar(this.userId);
				this.loading = false;
			},
			//删除购物车的商品
			beforeRemove(id){
				//询问框
				layer.confirm('您确定从购物车移除这个商品？', {
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
			async remove(id){
				let msg = await deleteShop(id);
				if(msg == 'success'){
					//清除加载动画
					layer.closeAll('loading');
					layer.msg('成功移除', {icon: 1});
					this.shops = await shopCar(this.userId);
				}
			}
		},
		//可以有自定义过滤器
		filters:{
			//这里的this指向window
			//第一个参数input是管道符前面的值，往后的参数是调用时的参数
			toFixed(input,param1){
				return '￥'+input.toFixed(2); //保留两位小数
			}
		},
		computed:{
			checkAll:{
				//get和set中this指向实例，默认v-model会获取checkAll的值，所以会调用get方法
				//当shops值变化时会重新计算
				//every方法，找false，一旦找到false，就返回true，所以一旦有一件商品有没有选中，全选按钮就是false没有选中
				get(){
					return this.shops.every(p=>p.isSelected);
				},
				set(val){  //当给checkbox赋值的时候
					this.shops.forEach(p=>p.isSelected = val);
				}
			},
			//如果计算属性写成函数，则默认调用的是get方法
			sum(){ //求和函数,sum的结果会被缓存，如果依赖的数据没有变化就不会重新执行
				return this.shops.reduce((prev,next)=>{
					if(!next.isSelected) return prev; //如果当前没被选中，就不加上当前这一项
					return prev+next.shopPrice*next.shopCount;
				},0);
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
	.pro_check{
		line-height: 100px;
    	text-align: center;
	}
	.pro_img{
		float:left;
	}
	.pro_span{
		max-width: 499px;
	    display: block;
	    box-sizing: border-box;
	    margin: 30px 0;
	}
	.pro_line{
		line-height: 100px;
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