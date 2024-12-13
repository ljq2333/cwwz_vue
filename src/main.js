

import { createApp } from 'vue'
import App from './App.vue'

import router from '../src/router/'

// 导入pinia
import { createPinia } from 'pinia';
import { useUserStore } from './store';

// 导入组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入图标库
import * as ElementPlusIcons from '@element-plus/icons-vue'


const app = createApp(App)
// const pinia = createPinia()

// const userStore = useUserStore(pinia)
// userStore.fetchUserInfo()


// 注册图标包
for(const [key,component] of Object.entries(ElementPlusIcons)){
    app.component(key,component)
}


app.use(ElementPlus)
app.use(router)

app.mount('#app')
