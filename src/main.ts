import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/admin-lte/admin_lte.bundle.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
