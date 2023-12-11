import { defineStore } from 'pinia';
import {isValidPartner} from "@/utils/partner-info";

interface PartnerState {
  partner: {
    id: string;
    otp: string;
    email: string;
    phone: string;
    website: string;
    landing_page_content: string;
    app_version: string;
    access_token: string;
  } | null;
}

export const partnerInfo = defineStore('partner', {
  state: (): PartnerState => ({
    partner: null,
  }),
  getters: {
    isValidPartner(state): boolean {
      // TODO , get domain dynamic from url
      return state.partner && (state.partner.domain !== null && state.partner.domain !== undefined) && state.partner.domain == 'saudiceramics';
    },
    partnerInfo(state): string | null {
      return state.partner ? state.partner : null;
    },
  },
  actions: {
    async login(payload: {}) {
      const config = useRuntimeConfig()
      // TODO, get partner_domain from request, make domain dynamic
      const response = await $fetch(`${config.public.apiBase}saudiceramics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const res = response;
      const resData = res.data;
      const domain = resData.domain;
      console.log('thi is partner res', res);
      if (res.success === true) {
        console.log('partner res.success === true');
        this.partner = resData.partner;
        this.partner.domain = domain;
        console.log('this partner', this.partner);
      } else {
        throw new Error('failed to get partner info');
      }
    },

  },
});
