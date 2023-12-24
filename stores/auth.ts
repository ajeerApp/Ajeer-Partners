import { defineStore } from 'pinia';

import { useOrdersStore} from '~/stores/orders';

const TOKEN_STORE_NAME = 'tokenData';
const USER_STORE_NAME = 'userData';
const ORDERS_STORE_NAME = 'ordersData';

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

interface OrdersInfo {
  orders: array;
}

interface AuthState {
  user: AuthUser | null;
  token: tokenInfo | null;
  orders:  OrdersInfo;
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    orders:null
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
    getOrdersData(state) {
      return state.orders ? state.orders : null;
    },
  },
  actions: {

    initializeFromStorage() {
        if (process.client && localStorage.getItem(TOKEN_STORE_NAME)) {
              const  tokenData = JSON.parse(localStorage.getItem(TOKEN_STORE_NAME));
              const  ordersData = JSON.parse(localStorage.getItem(ORDERS_STORE_NAME));
              const  userdData = JSON.parse(localStorage.getItem(USER_STORE_NAME));
              if (tokenData) {
                this.$patch({ token: tokenData });
              }
              if (ordersData) {
                this.$patch({ orders: ordersData });
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
            // Properly assign orders to the state
    this.orders = resData.partner_user_orders;

        console.log("orders in auth",this.orders)
        const ordersStore = useOrdersStore();
        // Update orders in orders store
        ordersStore.setOrders(this.orders);
        const userMappedData: AuthUser = {
          name: resData.user.user.first_name,
          mobile: resData.user.user.mobile,
          otp: resData.user.user.otp,
        };

        const tokenData = {
          access_token: resData.user.access_token,
          token_type: resData.user.token_type,
          expires_at: resData.user.expires_at,
        }

        const ordersData = resData.partner_user_orders;

        this.$patch({ user: userMappedData });
        localStorage.setItem(TOKEN_STORE_NAME, JSON.stringify(tokenData));
        localStorage.setItem(ORDERS_STORE_NAME, JSON.stringify(ordersData));
        localStorage.setItem(USER_STORE_NAME, JSON.stringify(userMappedData));

        console.log('thi is login ordersData', ordersData);
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

