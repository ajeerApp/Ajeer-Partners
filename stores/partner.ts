import { defineStore } from 'pinia';
import { getSubDomain } from '@/utils/sub-domain';

interface PartnerState {
  partner: {
    id: string;
    domain: string;
    email: string;
    phone: string;
    website: string;
    landing_page_content: string;
  } | null;
}

export const partnerInfo = defineStore('partner', {
  state: (): PartnerState => ({
    partner: null,
  }),
  getters: {
    isValidPartner(state): boolean {
      const subDomain = getSubDomain();
      return state.partner && (state.partner.domain !== null && state.partner.domain !== undefined) && state.partner.domain == `${subDomain}`;
    },
    partnerInfo(state): string | null {
      return state.partner ? state.partner : null;
    },
  },
  actions: {
    async getInfo(payload: {}) {
      const config = useRuntimeConfig()
      const subDomain = getSubDomain();
      // TODO, get partner_domain from request, make domain dynamic
      const response = await $fetch(`${config.public.apiBase}${subDomain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(payload),
      });
      const res = response;
      const resData = res.data;
      console.log('thi is resData in partner info', resData);
      if (res.success === true) {
        if(subDomain){
          localStorage.setItem("subdomain",subDomain)
        }
        this.partner = resData.partner;
        console.log('thi partner domain', this.partner.domain );
        return this.partner;
      } else {
        throw new Error('failed to get partner info');
      }
    },

  },
});
