import { useAuth } from '@/stores/auth';

export function isAuthenticated() {
     // must define authStore for every export function
  const auth = useAuth();
  auth.initializeFromStorage();
  return auth.isLoggedIn;
}

export function getAuthUserToken() {
  const auth = useAuth();
  auth.initializeFromStorage();
  return auth.getAccessToken;
}

export function getUserOrders() {
  const auth = useAuth();
  auth.initializeFromStorage();
  return auth.getOrders;
}
