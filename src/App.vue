<template>
  <div id="app">
    <!-- 需要缓存走这里 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 正常访问走下面，不需要缓存 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
	a{text-decoration: none;color:#333;cursor:url(./assets/link.cur),pointer !important;transition: .3s !important;}
	a:hover{text-decoration: none;color:#dd5862 !important;transition: .3s !important;}
	img{vertical-align: middle;}
	button{cursor:url(./assets/link.cur),pointer !important;}
	button:focus{
	  outline:none !important;
	  border:none !important;
	}
	input,button{outline:none;}
	.clear{clear:both;}
	.content{width:960px;margin: 0 auto;position: relative;height: 100%;}
	.borderRadius8{border-radius: 8px;}
	.lineHeight{height: 50px;}
	/* 超出一行省略 */
	.overflow1{ overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	/* 超出两行省略 */
	.overflow2{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
	.right{float:right;}
	.left{float:left;}
</style>
