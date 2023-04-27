import { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "default",
    redirect: "/music/readme"
},
{
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),

},
{
    path: "/music",
    name: "music",
    component: () => import("@/views/music/index.vue"),
    redirect:"/music/readme",
    children: [{
        path: "readme",
        component: () => import("@/views/music/views/ReadMe.vue")
    },{
        path: "interval",
        component: () => import("@/views/music/views/Base.vue")
    }, {
        path: "scales",
        component: () => import("@/views/music/views/Scales.vue")
    },
        {
            path: "chord",
            component: () => import("@/views/music/views/Chord.vue")
        }
    ]
},

{
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
},


{
    path: "/:pathMatch(.*)*",
    redirect: { name: "error_page" }
},

]

export default routes
