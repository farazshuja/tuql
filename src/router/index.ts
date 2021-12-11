import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tuql from '../views/Tuql.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tuql',
    component: Tuql
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
