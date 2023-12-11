import { partnerInfo } from '@/stores/partner';

export function isValidPartner() {
     // must define partner for every export function
    const partner= partnerInfo();
    return partner.isValidPartner;
}

export function getPartnerInfo() {
    const partner = partnerInfo();
    return partner.partnerInfo;
}
