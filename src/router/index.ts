import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		{
			path: '/books/:id',
			name: 'book.details',
			component: () => import('../views/BookDetailsView.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('../views/NotFoundView.vue'),
		},
		{
			path: '/books/',
			name: 'books',
			component: () => import('../views/BooksView.vue'),
		},
		{
			path: '/cart/',
			name: 'cart',
			component: () => import('../views/CartView.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
		},
		{
			path: '/history',
			name: 'history',
			component: () => import('../views/BorrowHistoryView.vue'),
		},
	],
	scrollBehavior(to, from, savedPosition) {
		// Always scroll to top
		return { top: 0 }
	},
})

export default router
