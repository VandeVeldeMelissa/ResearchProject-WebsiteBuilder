import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import App from './App.vue'
import VueKonva from 'vue-konva';
import router from './bootstrap/router'

const app = createApp(App);
app.use(router)
app.use(VueKonva);
app.mount('#app');