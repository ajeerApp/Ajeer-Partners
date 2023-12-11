import { partnerInfo } from '~/stores/partner';
import { isValidPartner, getPartnerInfo } from '@/utils/partner-info';
import { getSubDomain } from '@/utils/sub-domain';
import { useRouter } from 'vue-router';
import {useAuth} from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const routeSubDomain = to.params.subdomain;
  const subDomain = getSubDomain();
  console.log('subDomain middleware is: ', subDomain );
  if (!subDomain || !isValidSubdomain(subDomain, routeSubDomain)) {
    console.log('partnerdomain is not Valid, subDomain is: ', subDomain);
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
});

function isValidSubdomain(subDomain, routeSubDomain) {
  const partner = partnerInfo();
  // TODO, make api request to backend to get partner info
  // TODO, handle this by api with dashboard
  // if(isValidPartner()) {
  //   return true;
  // } else {
  //   partner.getInfo({});
  // }
  // TODO, send request to endpoint to get all partners domains , for checking
  const validSubdomains = ['saudiceramics', 'test1'];
  return validSubdomains.includes(subDomain) && subDomain === routeSubDomain;
}
