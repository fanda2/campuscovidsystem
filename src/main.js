import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import axios from 'axios'
import './plugins/vant.js'

Vue.prototype.$http = axios
Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(config => {
    if (config.url == "/user/all" || config.url == "/admin/all" || config.url == "/notify/all") {
        config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
})


axios.interceptors.response.use((response) => {
    return response.data
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')