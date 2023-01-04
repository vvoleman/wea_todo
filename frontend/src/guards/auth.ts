import {useAuthStore} from "@/stores/AuthStore";

// @ts-ignore
export async function isLogged(to, from, next) {
	if (await useAuthStore().isLoggedIn()) {
		return next();
	}
	return next({ name: 'signin' });
}

// @ts-ignore
export async function isNotLogged(to, from, next) {
	console.log('is user not logged in?', await useAuthStore().isLoggedIn())
	if (!await useAuthStore().isLoggedIn()) {
		return next();
	}
	return next({ name: 'home' });
}