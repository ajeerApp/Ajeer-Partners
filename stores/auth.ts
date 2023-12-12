import { defineStore } from 'pinia';
import { storeToRefs } from 'pinia'
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
  } | null;
  access_token: null;
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    access_token: null,
  }),
  getters: {
    isLoggedIn(state) : boolean {
      console.log('isLoggedIn getter, this access_token state', state.access_token);
      const loggegedIn = state.user && (state.access_token !== null && state.access_token !== undefined);
      console.log('state user in isLoggedIn', state.user);
      console.log('loggegedIn in isLoggedIn', loggegedIn);
      return loggegedIn;
    },
    getAccessToken(state): string | null {
      return state.user ? state.user.access_token : null;
    },
  },
  actions: {

    async login(payload: { mobile: string;}) {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      console.log('login action before send, this access_token state', this.access_token);
      const response = await nuxtApp.$apiFetch(`/users/check`, {
        method: 'POST',
        params: {
          mobile: payload.mobile,
        }
      });
      const res = response;
      const resData = res.data;
      const Token = resData.access_token;
      console.log('thi is login res', res);
      if (res.success === true) {
        console.log('login res.success === true');
        // this.access_token = Token;
        this.$patch({
          user: {
            ...resData.user,
          },
          access_token: Token
        });
        console.log('login action , this access_token', this.access_token);
        console.log('login action this user', this.user);
      } else {
        throw new Error('Login failed');
      }
    },

    logout() { // not used yet
      this.user = null;
      this.user = null;
      this.access_token = null;
    },

  },
});
