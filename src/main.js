import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'

createApp(App).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(router).mount('#app')
