import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('../views/auth/AuthView.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

export default router
