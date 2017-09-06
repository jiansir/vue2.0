<template>
	<div class='cartcontrol'>
		<transition name="move">
			<div class="cart-decrease" v-show='showOff' @click="subCart" >
				<span class="inner iconfont icon-offline"></span>
			</div>
		</transition>
		<div class="cart-count"></div>
		<div class="cart-add iconfont icon-addition" @click="addCart"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				showOff:false
			}
		},
		methods:{
			addCart(){
				this.showOff=true
			},
			subCart(){
				this.showOff=false
			}
		}
	}
</script>
<style lang="stylus">
	.cartcontrol
		// display:flex
		.iconfont
			color:#3385FF
		.cart-decrease
			display:inline-block
			padding:6px
			transition:all 0.4s linear
			.inner
				font-size:24px
				line-height:24px
			&.move-enter-active,&.move-leave-active
				opacity:1
				transform:translate3d(0,0,0)
				.inner
					display:inline-block
					transition:all 1s linear
					transform:rotate(0)
			&.move-enter,&.move-leave-active
				opacity:0
				transform:translateX(24px)
				.inner
					transform:rotate(90deg)
		.cart-count
			display:inline-block
			vertical-align:top
		.cart-add
			display:inline-block
			font-size:24px
			line-height:24px
			padding:6px
			vertical-align:top
</style>