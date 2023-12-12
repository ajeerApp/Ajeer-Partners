import { useAuth } from '@/stores/auth';

export function isAuthenticated() {
     // must define authStore for every export function
  const auth = useAuth();
  return auth.isLoggedIn;
}

export function getAuthUserToken() {
  const auth = useAuth();
    return auth.getAccessToken;
}
