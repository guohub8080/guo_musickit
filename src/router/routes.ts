import {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "default",
		redirect: "/readme"
	},
	{
		path: "/readme",
		name: "readme",
		component: () => import("@/views/music/views/ReadMe.vue")
	},
	{
		path: "/interval",
		name: "interval",
		component: () => import("@/views/music/views/Base.vue")
	},
	{
		path: "/scales",
		name: "scales",
		component: () => import("@/views/music/views/Scales.vue")
	},
	{
		path: "/chord",
		name: "chord",
		component: () => import("@/views/music/views/Chord.vue")
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/readme"
	},

]

export default routes
