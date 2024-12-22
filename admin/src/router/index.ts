import { createRouter, createWebHistory, RouteRecordName } from 'vue-router'
import routes from '@/router/routes'
import { RoleValue } from '@/common/enums/permision/role'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user') != null;
  const userRole = loggedIn
    ? JSON.parse(localStorage.getItem('user')!).role
    : null;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      // Check role permissions
      if (userRole === RoleValue.ADMIN) {
        // Admin can access all routes
        next();
      } else if (userRole === RoleValue.STAFF) {
        // Staff can access specific routes
        if (
          to.matched.some((record) =>
            (record.meta.role as RoleValue[])?.includes(RoleValue.STAFF),
          )
        ) {
          next();
        } else {
          // Unauthorized access
          next({ name: 'errors.403' }); // Redirect to default page or handle accordingly
        }
      } else if (userRole === RoleValue.TRAINER) {
        // Trainer can access specific routes
        if (
          to.matched.some((record) =>
            (record.meta.role as RoleValue[])?.includes(RoleValue.TRAINER),
          )
        ) {
          next();
        } else {
          // Unauthorized access
          next({ name: 'errors.403' }); // Redirect to default page or handle accordingly
        }
      } else {
        // Other roles (MEMBER or any other)
        // Unauthorized access
        next({ name: '/' }); // Redirect to default page or handle accordingly
      }
    }
  } else {
    next(); // No authentication required
  }
});

export default router
