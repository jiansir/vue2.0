// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods'
import ratings from './components/ratings'
import './common/stylus/index.styl'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */
const router = new VueRouter({
	routes: [{
		path: '/',
		component: goods
	}, {
		path: '/ratings',
		component: ratings
	}]
})
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})