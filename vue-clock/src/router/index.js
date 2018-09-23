import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
//const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
//

export default [{
	path:'/',
	component:App,//顶层路由，对应index.html
	children:[    //二级路由。对应App.vue
		      //地址为空时跳转home页面
		{
			path:'',
			redirect:'home'
		},
		{
			path:'/home',
			component:home
		},
		{
			path:'/login',
			component:login
		},
		// {
		// 	path:'profile',
		// 	component:profile,
		// 	children:[{
		// 		path:'info',
		// 		component:info,
		// 		children:[{
		// 			path:'setusername',
		// 			component:setusername,
		// 		},{
		// 			path:'addredd',
		// 			component:address,
		// 			children:[{
		// 				path:'add',
		// 				component:add,
		// 				children:[{
		// 					path:'addDetail'
		// 				}]
		// 			}]
		// 		}]
		// 	},{
		// 		path:'service',
		// 		computer:service
		// 	}]
		// },
		{
			path:'/forget',
			component:forget
		}
	]
}]

