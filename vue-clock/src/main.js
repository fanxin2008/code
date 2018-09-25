import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded',function(){
		FastClick.attach(document.body);
	}, false);
}
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode:routerMode,
	strict:process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			if (from.meta.keepAlive) {
				from.meta.savePosition = document.body.scrollTop;
			}
		}
	}
})
new Vue({
	router
}).$mount('#app')
