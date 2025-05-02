export const adminRoutes = {
  path: '/',
  name: 'admin-auth',
  component: () => import('../../views/admin/AdminView.vue'), // Ensure this file exists at the specified path
  children: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../../views/admin/DashboardView.vue'),
    },
  ],
}
