<template>
	<div class="goods">
		<div class="menu-wrapper" ref="goodsWrapper">
			<ul>
				<li v-for="(item,index) in goods" :class="index===currentIndex?'currentItem':'menu-item'" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class='food-list-hook'>
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
								<div class="price">
									<span class="now">&yen;{{food.price}}</span><span class="old">&yen;{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol></cartcontrol>	
								</div>
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
	import cartcontrol from './cartcontrol'
	const ERR_OK=0;
	export default {
		data(){
			return{
				goods:[],
				scrollY:0,
				listHeight: []
			}
		},
		computed:{
			currentIndex(){
				for(var  i=0;i<this.listHeight.length;i++){
					var prevlist=this.listHeight[i];
					var nextlist=this.listHeight[i+1];
					if(!nextlist||(this.scrollY>=prevlist&&this.scrollY<nextlist)){
						console.log(prevlist)
						return i
					}
				}
				// for (let i = 0; i < this.listHeight.length; i++) {
				// 	console.log(this.listHeight.length)
		  //         let height1 = this.listHeight[i];
		  //         let height2 = this.listHeight[i + 1];
		  //         if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
		  //         	// console.log(i)
		  //           return i;
		  //         }
		  //       }
				return 0;
			}
		},
		created(){
			this.$http.get('/api/goods').then((response)=>{
				response=response.body;
				if(response.errno==ERR_OK){
					this.goods=response.data;
					this.$nextTick(()=>{
						this._initScroll();
						this.calclistHeight();
					})
				}
			})
		},
		methods:{
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				let foodList =this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el=foodList[index];
				// this.foodsScroll.scrollTo(0,-this.listHeight[index],300)
				this.foodsScroll.scrollToElement(el,300)
			},
			_initScroll(){
				this.goodsScroll=new BScroll(this.$refs.goodsWrapper,{
					click:true
				})
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType: 3
				})
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y))
				})
			},
			calclistHeight(){
				let foodslist=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height=0;
				// this.listHeight.push(height);
				for(var i=0;i<foodslist.length;i++){
	    			let item=foodslist[i];
	    			height+=item.clientHeight;
	    			this.listHeight.push(height);
				}
			}
		},
		components:{
			cartcontrol
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
			.currentItem
				background:#fff
			.menu-item,.currentItem
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
					.price
						font-weight:700
						line-height:0.64rem
						.now
							margin-right:8px
							font-size:14px
							color:rgb(240,20,20)
						.old
							text-decoration:line-through
							font-size:10px
							color:rgb(147,153,159)
					.cartcontrol-wrapper
						position:absolute
						right:0
						bottom:12px

</style>