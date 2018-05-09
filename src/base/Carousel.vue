<template>
	<!--此声明下面的盒子是轮播图-->
	<div id="myCarousel" class="carousel slide">
		<!-- 轮播（Carousel）指标 -->
		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
			<li data-target="#myCarousel" data-slide-to="3"></li>
		</ol>   
		<!-- 轮播（Carousel）项目 -->
		<div class="carousel-inner borderRadius8">
			<div class="item active">
				<img src="../assets/banner/1.jpg" width="960" height="380" alt="First slide">
			</div>
			<div class="item">
				<img src="../assets/banner/2.jpg" width="960" height="380" alt="Second slide">
			</div>
			<div class="item">
				<img src="../assets/banner/3.jpg" width="960" height="380" alt="Third slide">
			</div>
			<div class="item">
				<img src="../assets/banner/4.jpg" width="960" height="380" alt="slide">
			</div>
		</div>
		<!-- 轮播（Carousel）导航 -->
		<a class="left carousel-control borderRadius8" href="#myCarousel" role="button" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control borderRadius8" href="#myCarousel" role="button" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {msg:'hello'}
		},
		created(){
			
		},
		mounted(){
			$(".carousel").carousel();
		},
		methods:{},
		computed:{},
		components:{}
	}
</script>
<style type="text/css" scoped>
	
</style>