export const authRoutes = {
  path: '/',
  name: 'auth',
  component: () => import('../../views/auth/AuthView.vue'), // Ensure this file exists at the specified path
  children: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../../views/auth/RegisterView.vue'),
    },
  ],
}
