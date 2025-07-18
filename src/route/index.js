import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ItemDetail from '../pages/ItemDetail.vue'
import AddItemEntry from '../pages/AddItemEntry.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/profile/:uid', component: ItemDetail },
    { path: '/add', component: AddItemEntry },
    { path: '/edit/:uid', component: AddItemEntry }
]

export default createRouter({ history: createWebHistory(), routes })
