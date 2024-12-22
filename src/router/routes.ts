import {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "",
		name: "music",
		component: () => import("@/views/music/index.vue"),
		redirect: "/readme",
		children: [{
			path: "readme",
			component: () => import("@/views/music/views/ReadMe.vue")
		}, {
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
		path: "/:pathMatch(.*)*",
		redirect: "/readme"
	},

]

export default routes
