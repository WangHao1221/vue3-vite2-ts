import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import { store, key } from './store';
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import { globalRegister } from './global'; // element-plus


createApp(App)
    .use(router)
    .use(store, key)
    // .use(globalRegister)
    .mount('#app')
