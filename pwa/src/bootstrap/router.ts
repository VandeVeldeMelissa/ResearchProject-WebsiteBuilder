import {
	createRouter,
	createWebHistory,
	Router,
	RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../screens/WebsiteBuilder.vue'),
	},
	{
		path: '/preview',
		name: 'Preview',
		component: () => import('../screens/Preview.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'ClientError',
		component: () => import('../screens/generic/ClientError.vue'),
	},
]

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
