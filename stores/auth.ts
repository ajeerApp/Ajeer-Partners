import { defineStore } from 'pinia';
const TOKEN_STORE_NAME = 'tokenData';
const USER_STORE_NAME = 'userData';

interface AuthUser {
  name: string;
  mobile: string;
  otp: string;
}

interface tokenInfo {
  access_token: string;
  token_type: string;
  expires_at: string;
}

interface AuthState {
  user: AuthUser | null;
  token: tokenInfo | null;
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn(state): boolean {
      // checks if the state.token is truthly and not falsy value like (null,undefined,0,"" etc)
      return !!state.token && !!state.token.access_token;
    },
    getAccessToken(state) {
      return state.token ? state.token.access_token : null;
    },
    getUserData(state) {
      return state.user ? state.user : null;
    },
  },
  actions: {

    initializeFromStorage() {
        if (process.client && localStorage.getItem(TOKEN_STORE_NAME)) {
              const tokenData = JSON.parse(localStorage.getItem(TOKEN_STORE_NAME));
              const  userdData = JSON.parse(localStorage.getItem(USER_STORE_NAME));
              if (tokenData) {
                this.$patch({ token: tokenData });
              }
              if (userdData) {
               this.$patch({ user: userdData });
              }
        }
    },

    async login(payload: { mobile: string;}) {
      const config = useRuntimeConfig()
      const nuxtApp = useNuxtApp()
      const response = await nuxtApp.$apiFetch(`/users/check`, {
        method: 'POST',
        params: {
          mobile: payload.mobile,
        }
      });
      const resData = response.data;
      console.log('thi is login resData', resData);
      if (response.success === true) {
        const userMappedData: AuthUser = {
          name: resData.user.name,
          mobile: resData.user.mobile,
          otp: resData.user.otp,
        };

        const tokenData = {
          access_token: resData.access_token,
          token_type: resData.token_type,
          expires_at: resData.expires_at,
        }

        this.$patch({ user: userMappedData });
        localStorage.setItem(TOKEN_STORE_NAME, JSON.stringify(tokenData));
        localStorage.setItem(USER_STORE_NAME, JSON.stringify(userMappedData));
      } else {
        throw new Error('Login failed');
      }
    },

    logout() {
      this.$patch({
        user: null,
      });
      localStorage.removeItem(TOKEN_STORE_NAME);
      window.location.reload()
    },
  },
});

