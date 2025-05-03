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
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('../../views/admin/CreatePostView.vue'),
    },
    {
      path: '/post-lists',
      name: 'post-lists',
      component: () => import('../../views/admin/PostListView.vue'),
    },
  ],
}
