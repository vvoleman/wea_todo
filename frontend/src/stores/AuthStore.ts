import {defineStore} from "pinia";
import axios, {AxiosError} from "axios";
import UnauthorizedError from "@/errors/auth/UnauthorizedError";
import ServerError from "@/errors/ServerError";
import InvalidParams from "@/errors/auth/InvalidParams";
import UserAlreadyExistsError from "@/errors/auth/UserAlreadyExistsError";
import {computed, Ref, ref} from "vue";

export interface UserData {
    id: number;
    email: string;
    createdAt: Date;
    taskHash: string;
}

export const useAuthStore = defineStore('auth',  () =>{
    const user: Ref<UserData | null | undefined> = ref(undefined)

    console.log('calling')

    const isAuthenticated = computed(() => {
        return !!user.value
    })

    async function signUp(email: string, password: string, password2: string): Promise<void> {
        try {
            const response = await axios.post('/user/signup', {
                email,
                password,
                password2
            }, {withCredentials: true})

            if (response.status === 200) {
                user.value = response.data.data.user;
                return
            }
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 400) {
                throw new InvalidParams("Invalid params")
            }

            if (error.response?.status === 409) {
                throw new UserAlreadyExistsError("User already exists")
            }

            throw new ServerError("Unexpected error")
        }

    }

    async function signIn(email: string, password: string): Promise<void> {
        try {
        const response = await axios.post('/user/signin', {
            email,
            password
        }, {withCredentials: true})

        if (response.status === 200) {
            user.value = response.data.data.user;
            return
        }
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 404) {
                throw new UnauthorizedError("Invalid credentials")
            }

            throw new ServerError("Unexpected error")
        }
    }

    async function signOut(): Promise<void> {
        const response = await axios.post('/user/signout', {}, {withCredentials: true})

        if (response.status === 200) {
            user.value = null;
            return
        }

        throw new ServerError("Unable to sign out");
    }

    async function checkAuth(): Promise<void> {
        const response = await axios.get('/user', {withCredentials: true})

        if (response.status === 200) {
            user.value = response.data.data.user;
            return
        }

        throw new ServerError("Unable to check auth");
    }

    async function isLoggedIn(): Promise<boolean> {
        if (user.value === undefined) {
            await checkAuth()
        }

        return !!user.value
    }

    checkAuth().then()

    return {
        user,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        checkAuth,
        isLoggedIn
    }

})