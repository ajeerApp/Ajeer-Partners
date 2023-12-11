import { partnerInfo } from '@/stores/partner';

export function isValidPartner() {
     // must define authStore for every export function
    const loggegedIn= partnerInfo();
    return loggegedIn.isValidPartner;
}

export function getPartnerInfo() {
    const partner = partnerInfo();
    return partner.partnerInfo;
}
