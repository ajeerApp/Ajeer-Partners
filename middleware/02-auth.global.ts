import { isAuthenticated } from '@/utils/auth-user';
import { getSubDomain } from '@/utils/sub-domain';

// gst, is login or auth page , in general it is for auth user
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
    // Get the user's intended destination route
  const destRoute = to.path;
  const subDomain = getSubDomain();
  if (!isAuthenticated()) {
    console.log('auth middleware the user is NOT logged in');
    // If not logged in and not on the login page, redirect to login
    if (to.path !== `/${subDomain}/gst`) {
      return navigateTo(`/${subDomain}/gst`);
    }
  } else {
    console.log('auth middleware the user is already logged in');
    // If logged in and on the login page, redirect to their destination route
    if (to.path === `/${subDomain}/gst`) {
       return navigateTo(`/${subDomain}/create-order`);
    }
  }
});
