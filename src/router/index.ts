import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/addition',
      name: 'addition',
      component: () => import('@/views/AdditionView.vue'),
    },
    {
      path: '/soustraction',
      name: 'soustraction',
      component: () => import('@/views/SoustractionView.vue'),
    },
    {
      path: '/multiplication',
      name: 'multiplication',
      component: () => import('@/views/MultiplicationView.vue'),
    },
    {
      path: '/division',
      name: 'division',
      component: () => import('@/views/DivisionView.vue'),
    },
  ],
})

export default router
