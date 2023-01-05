import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import Home from '@/views/Home.vue'
import {isLogged, isNotLogged} from "@/guards/auth";
import {updateTitle} from "@/guards/title";

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {title: 'Úkoly'},
		beforeEnter: isLogged,
	},
	{
		path: '/sign-up',
		name: 'signup',
		component: SignUp,
		meta: {title: 'Registrace'},
		beforeEnter: isNotLogged,
	},
	{
		path: '/sign-in',
		name: 'signin',
		component: SignIn,
		meta: {title: 'Přihlášení'},
		beforeEnter: isNotLogged,
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(updateTitle)

export default router