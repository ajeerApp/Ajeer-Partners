import { useAuth } from '@/stores/auth';

export function isAuthenticated() {
     // must define authStore for every export function
  const authStore= useAuth();
  return authStore.isLoggedIn !== null && authStore.isLoggedIn !== false;
}

export function getAuthUserToken() {
    const authStore= useAuth();
    return authStore.getAccessToken;
}
