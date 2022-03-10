import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/css/global.css'
import axios from 'axios'

Vue.prototype.$http = axios

import { Tabbar, TabbarItem, CellGroup, Form, Field, Button, Cascader, Popup, Picker, NavBar, Calendar, Checkbox, CheckboxGroup, RadioGroup, Radio, Area, DatetimePicker } from 'vant';
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




Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(config => {
    if (config.url == "/user/login") {
        return config
    } else {
        config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
})


axios.defaults.baseURL = 'http://8.142.81.85:8080'

// Vue.use(Vant);
// 


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')