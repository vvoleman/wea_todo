import {createApp} from 'vue'
import {createPinia} from 'pinia'
import axios from "axios";
import App from '@/App.vue'
import {API_URL} from "@/assets/constants/api";
import router from "@/router/router";
import {createFontAwesome} from "@/plugins/fa";
import Toast, {PluginOptions} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import '@/style.scss'

const pinia = createPinia()
const app = createApp(App)

createFontAwesome()

axios.defaults.baseURL = API_URL
//set default axios to withCredentials
axios.defaults.withCredentials = true

const toastOptions: PluginOptions = {
    pauseOnFocusLoss: false,
    icon: true,
    timeout: 3000,
}

app
    .use(pinia)
    .use(router)
    .use(Toast, toastOptions)
    .mount('#app')
