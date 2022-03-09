import Vue from 'vue'
import VueRouter from 'vue-router'
import Tab from '../views/Tabbar.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: "/tab/home"
    },
    {
        path: '/tab',
        component: Tab,
        children: [{
                path: 'home',
                component: () =>
                    import ("../views/HomeView.vue"),
            },
            {
                path: 'myinfo',
                component: () =>
                    import ("../views/Myinfo.vue"),
            }
        ]
    }, {
        path: '/covmap',
        component: () =>
            import ("../views/CovidMap.vue"),
    }, {
        path: '/login',
        component: () =>
            import ("../views/Login.vue"),
    }, {
        path: '/fixpwd',
        component: () =>
            import ("../views/FixPassword.vue"),
    }
]

const router = new VueRouter({
    routes
})

export default router