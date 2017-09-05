<template>
	<div class="goods">
		<div class="menu-wrapper" ref="goodsWrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border-1px">
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>

		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<p class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</p>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>		
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	const ERR_OK=0;
	export default {
		data(){
			return{
				goods:[]
			}
		},
		created(){
			this.$http.get('/api/goods').then((response)=>{
				console.log(response)
				response=response.body;
				if(response.errno==ERR_OK){
					this.goods=response.data;
					this.$nextTick(()=>{
						this._initScroll()
					})
				}
			})
		},
		methods:{
			_initScroll(){
				this.goodsScroll=new BScroll(this.$refs.goodsWrapper,{
					click:true
				})
				this.foodsWrapper=new BScroll(this.$refs.foodsWrapper,{
					click:true
				})
			},
		}
	}
</script>
<style lang="stylus">
	@import '../common/stylus/mixin.styl'
	.goods
		display:flex
		position:absolute
		top:5.333333rem
		bottom:46px
		width:100%
		overflow:hidden
		font-size:14px
		.menu-wrapper
			flex:0 0 2.133333rem
			width:2.133333rem
			background:#f3f5f7
			.menu-item
				display:table
				height:1.44rem
				width:1.6rem
				padding:0 12px
				
				.text
					display:table-cell
					width:1.6rem
					vertical-align:middle
					text-align:center
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex:1	
			.title
				padding-left:0.373333rem
				font-size:12px
				height:26px
				line-height:0.693333rem
				color:rgb(147,153,159)
				background:#f3f5f7
			.food-item
				display:flex
				margin:0.48rem
				padding-bottom:0.48rem
				border-1px(rgba(7,17,27,0.1))
				.icon>img
					width:1.52rem
					height:1.52rem
					margin-right:0.266667rem
				.content
					flex:1
					.name
						margin:2px 0 8px 0
						height:0.373333rem
						line-height:0.373333rem
						color:rgb(7,17,27)
					.desc, .extra
						font-size:10px
						line-height:0.266667rem
						color:rgb(147,153,159)	
					.desc
						margin-bottom:8px
					.extra
						.count
							margin-right:12px
</style>