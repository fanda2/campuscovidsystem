import Vue from "vue";
import VueRouter from "vue-router";
import Tab from "../views/Tabbar.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/tab/home",
    },
    {
        path: "/tab",
        component: Tab,
        children: [{
                path: "home",
                component: () =>
                    import ("../views/HomeView.vue"),
            },
            {
                path: "myinfo",
                component: () =>
                    import ("../views/Myinfo.vue"),
            },
        ],
    },
    {
        path: "/covmap",
        component: () =>
            import ("../views/CovidMap.vue"),
    },
    {
        path: "/login",
        component: () =>
            import ("../views/Login.vue"),
    },
    {
        path: "/fixpwd",
        component: () =>
            import ("../views/FixPassword.vue"),
    },
    {
        path: "/Card",
        component: () =>
            import ("../views/tab1/SelfCard.vue"),
    },
    {
        path: "/Temp",
        component: () =>
            import ("../views/tab1/Temperature.vue"),
    },
    {
        path: "/Reporter",
        component: () =>
            import ("../views/tab1/RouteReport.vue"),
    },
    {
        path: "/Calendar",
        component: () =>
            import ("../views/tab1/Calendar.vue"),
    },
    {
        path: "/BackSchool",
        component: () =>
            import ("../views/tab2/BackSchool.vue"),
    },
    {
        path: "/Out",
        component: () =>
            import ("../views/tab2/Out.vue"),
    },
    {
        path: "/outview",
        component: () =>
            import ("../views/tab2/Outview.vue"),
    },
    {
        path: "/Activity",
        component: () =>
            import ("../views/tab2/SchoolActivity.vue"),
    },
    {
        path: "/Code",
        component: () =>
            import ("../views/tab3/HealthCode.vue"),
    },
    {
        path: "/Uncleic",
        component: () =>
            import ("../views/tab3/UncleicAcid.vue"),
    },
    {
        path: "/Vaccines",
        component: () =>
            import ("../views/tab3/Vaccines.vue"),
    },
    {
        path: "/address",
        component: () =>
            import ("../views/tab4/Address.vue"),
    },
    {
        path: "/hospital",
        component: () =>
            import ("../views/tab4/Hospital.vue"),
    },
    {
        path: "/detect",
        component: () =>
            import ("../views/tab4/Detect.vue"),
    },
    {
        path: "/detail",
        component: () =>
            import ("../views/Detail.vue"),
    },
    {
        path: "/changepwd",
        component: () =>
            import ("../views/ChangePwd.vue"),
    },
    {
        path: "/routedet",
        name: "routedet",
        component: () =>
            import ("../views/tab1/DetialRoute.vue"),
    },
    {
        path: "/activitydet",
        name: 'activitydet',
        component: () =>
            import ("../views/tab2/Actdetial.vue"),
    }
];

const router = new VueRouter({
    routes,
});

export default router;