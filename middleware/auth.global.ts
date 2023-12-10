import { isAuthenticated } from '@/utils/auth-user';

// gst, is login or auth page , in general it is for auth user
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Get the user's intended destination route
  const destRoute = to.path;

  console.log('auth middleware isAuthenticated() ', isAuthenticated());

  // Check if the user is not logged in
  if (!isAuthenticated()) {
    console.log('auth middleware the user is NOT logged in');
    // If not logged in and not on the login page, redirect to login
    if (to.path !== '/gst') {
      return navigateTo('/gst');
    }
  } else {
    console.log('auth middleware the user is already logged in');
    // If logged in and on the login page, redirect to their destination route
    if (to.path === '/gst') {
      return navigateTo(destRoute);
    }
  }
});
