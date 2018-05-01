<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	/* 全局样式 */
	*{margin:0;padding: 0}
	body{cursor:url(./assets/default.cur),default;}
	ul li{list-style: none}
	a{text-decoration: none;color:#333;cursor:url(./assets/link.cur),pointer !important;}
	a:hover{text-decoration: none;}
	img{vertical-align: middle;}
	input,button{-webkit-appearance:none;}
	.clear{clear:both;}
	.content{width:960px;margin: 0 auto;position: relative;height: 100%;}
	.borderRadius8{border-radius: 8px;}
	.lineHeight{height: 50px;}
	/* 超出一行省略 */
	.overflow1{ overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	/* 超出两行省略 */
	.overflow2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
</style>
