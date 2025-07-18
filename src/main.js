import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'

document.documentElement.classList.add('my-app-dark')

createApp(App).use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
}).use(router).mount('#app')
