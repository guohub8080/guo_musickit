import {createWebHashHistory} from 'vue-router';
import {createRouter} from 'vue-router';
import routes from './routes';
import useMusicStore from "@/views/music/logic/music_store";



const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router