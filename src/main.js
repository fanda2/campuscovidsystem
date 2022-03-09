import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/css/global.css'
// import Vant from 'vant';

import { Tabbar, TabbarItem, Form, Field, Button, Cascader, Popup, Picker } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cascader);
Vue.use(Popup);
Vue.use(Picker);


// Vue.use(Vant);
// 
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')