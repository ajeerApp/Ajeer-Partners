import { useAuth } from '@/stores/auth';

export function isAuthenticated() {
     // must define authStore for every export function
  const authStore= useAuth();
  const isAuthorized = authStore.isLoggedIn !== null && authStore.isLoggedIn !== false;
  console.log('isAuthenticated', isAuthorized);
  console.log('getAuthUserToken', getAuthUserToken);
  return isAuthorized;
}

export function getAuthUserToken() {
    const authStore= useAuth();
    return authStore.getAccessToken;
}
