import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.css'
import  './assets/global.less';
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(createPinia())
app.mount('#app')
