import { defineStore } from 'pinia';
import { getSubDomain } from '@/utils/sub-domain';

interface AuthState {
    user: {
        mobile: string;
        otp: string;
        type: string;
        pushwoosh_token: string;
        firebase_token: string;
        device: string;
        app_version: string;
        access_token: string;
    } | null;
}

export const useAuth = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
    }),
    getters: {
        isLoggedIn(state): boolean {
            return state.user && (state.user.access_token !== null && state.user.access_token !== undefined);
        },
        getAccessToken(state): string | null {
            return state.user ? state.user.access_token : null;
        },
    },
    actions: {

      async login(payload: { mobile: string;}) {
          const config = useRuntimeConfig();
          const { data, pending, error, refresh } = await useFetch(
            `${config.public.apiBase}${getSubDomain()}/users/check`,
            {
              onRequest({ request, options }) {
                // Modify request before sending
                options.method = 'POST';
                options.headers = {
                  'Content-Type': 'application/json',
                };
                options.body = JSON.stringify(payload);
              },
              onRequestError({ request, options, error }) {
                console.error('login Request error:', error);
              },
              onResponse({ request, response, options }) {
                console.log('this is login response', response);
                const resData = response._data;
                console.log('this is login resData', resData);
                const Token = resData.access_token;
                if (resData.success === true) {
                  console.log('login request res.success === true');
                  this.user = resData.user;
                  this.user.access_token = resData.access_token;
                  console.log('this user', this.user);
                } else {
                  throw new Error('Login request failed');
                }
              },
              onResponseError({ request, response, options }) {
                console.error('login Response error:', response.statusText);
              },
            }
          );
      },

      logout() { // not used yet
            this.user = null;
            this.user.access_token = null;
      },

    },
});
