import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import Home from '@/views/Home.vue'
import {isLogged, isNotLogged} from "@/guards/auth";

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		beforeEnter: isLogged,
	},
	{
		path: '/sign-up',
		name: 'signup',
		component: SignUp,
		beforeEnter: isNotLogged,
	},
	{
		path: '/sign-in',
		name: 'signin',
		component: SignIn,
		beforeEnter: isNotLogged,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router