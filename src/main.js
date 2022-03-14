import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/css/global.css'
import axios from 'axios'

import { Tabbar, TabbarItem, CellGroup, Form, Field, Button, Cascader, Popup, Picker, NavBar, Calendar, Checkbox, CheckboxGroup, RadioGroup, Radio, Area, DatetimePicker, Uploader } from 'vant';
Vue.prototype.$http = axios
Vue.config.productionTip = false;


Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cascader);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(NavBar);
Vue.use(Calendar);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Area);
Vue.use(DatetimePicker);
Vue.use(Uploader);


// const loginstatus = 0

// 请求拦截器,其余请求头加上token
axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (config.url == "/user/login") {
        return config;
    } else {
        config.headers.Authorization = token;
    }
    return config;
});




axios.interceptors.response.use((response) => {
    return response.data
})

axios.defaults.baseURL = "http://8.142.81.85:8080";
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')