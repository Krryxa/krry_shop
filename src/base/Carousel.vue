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
				<a href="https://www.ainyi.com/blog/detail/301">
					<img src="https://www.ainyi.com/resources/blog/images/2018/03/26/404d6a1c-dd3e-40a3-9b7a-a18b43a44161.jpg" width="960" height="380">
				</a>
			</div>
			<div class="item">
				<a href="https://www.ainyi.com/blog/detail/201">
					<img src="https://www.ainyi.com/resources/blog/images/2017/04/22/fd03c01a-cd3a-4ce9-9f67-1fbc85b86629.jpg" width="960" height="380">
				</a>
			</div>
			<div class="item">
				<a href="https://www.ainyi.com/blog/detail/281">
					<img src="https://www.ainyi.com/resources/blog/images/2018/03/26/fae33078-5be0-462d-88d1-8d9171f593c8.jpg" width="960" height="380">
				</a>
			</div>
			<div class="item">
				<a href="https://www.ainyi.com/blog/detail/211">
					<img src="https://www.ainyi.com/resources/blog/images/2017/09/24/2626d92c-a573-4736-8677-0412bed88f89.jpg" width="960" height="380">
				</a>
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