import { defineStore } from 'pinia';

const TOKEN_STORE_NAME = 'tokenData';
const USER_STORE_NAME = 'userData';
const PARTNER_ORDERS_STORE_NAME = 'partnerOrdersData'; // New localStorage key for orders
const AJEER_ORDERS_STORE_NAME = 'ajeerOrdersData'; // New localStorage key for orders

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

interface OrderProduct {
    name: string;
    quantity: string;
    sku: string;
    image: string;
}

interface PartnerUserOrders {
    id: string;
    delivery_status: string;
    purchase_date: string;
    products: OrderProduct[];
}

interface AjeerUserOrders {
  id: string;
  status: string;
}

interface AuthState {
  user: AuthUser | null;
  token: tokenInfo | null;
  partner_orders: PartnerUserOrders[] | null;
  ajeer_orders: AjeerUserOrders[] | null;
}


export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    partner_orders: null,
    ajeer_orders: null,
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
    getPartnerOrders(state): PartnerUserOrders[] | null {
        return state.partner_orders;
    },
    getAjeerOrders(state): PartnerUserOrders[] | null {
      return state.ajeer_orders;
    },
  },
  actions: {

    initializeFromStorage() {
        if (process.client && localStorage.getItem(TOKEN_STORE_NAME)) {
              const tokenData = JSON.parse(localStorage.getItem(TOKEN_STORE_NAME));
              const  userdData = JSON.parse(localStorage.getItem(USER_STORE_NAME));
              const partnerOrdersData = JSON.parse(localStorage.getItem(PARTNER_ORDERS_STORE_NAME)); // Retrieve orders from localStorage
              const ajeerOrdersData = JSON.parse(localStorage.getItem(AJEER_ORDERS_STORE_NAME)); // Retrieve orders from localStorage
            if (tokenData) {
                this.$patch({ token: tokenData });
              }
              if (userdData) {
               this.$patch({ user: userdData });
              }
              if (partnerOrdersData) {
                    this.$patch({ partner_orders: partnerOrdersData });
              }
            if (ajeerOrdersData) {
              this.$patch({ ajeer_orders: ajeerOrdersData });
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
      console.log('response', response);
      if (response.success === true) {
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

        const partnerOrdersData = resData.partner_orders;
        const ajeerOrdersData = resData.ajeer_orders;
        this.$patch({ partner_orders: null });
        this.$patch({ ajeer_orders: null });
        localStorage.removeItem(PARTNER_ORDERS_STORE_NAME); // clear old order data
        localStorage.removeItem(AJEER_ORDERS_STORE_NAME); // clear old order data
        this.$patch({ user: userMappedData });
        this.$patch({ partner_orders: partnerOrdersData });
        this.$patch({ ajeer_orders: ajeerOrdersData });

        localStorage.setItem(TOKEN_STORE_NAME, JSON.stringify(tokenData));
        localStorage.setItem(USER_STORE_NAME, JSON.stringify(userMappedData));
        localStorage.setItem(PARTNER_ORDERS_STORE_NAME, JSON.stringify(partnerOrdersData));
        localStorage.setItem(AJEER_ORDERS_STORE_NAME, JSON.stringify(ajeerOrdersData));
      } else {
        throw new Error('Login failed');
      }
    },

    logout() {
      this.$patch({
        user: null,
      });
      localStorage.removeItem(TOKEN_STORE_NAME);
      this.$patch({ partner_orders: null });
      this.$patch({ ajeer_orders: null });
      localStorage.removeItem(PARTNER_ORDERS_STORE_NAME);
      localStorage.removeItem(AJEER_ORDERS_STORE_NAME);
      window.location.reload()
    },




  },
});

