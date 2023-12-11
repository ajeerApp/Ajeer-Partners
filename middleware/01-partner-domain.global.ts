import { partnerInfo } from '~/stores/partner';
import { isValidPartner, getPartnerInfo } from '@/utils/partner-info';
import { getSubDomain } from '@/utils/sub-domain';
import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const routeSubDomain = to.params.subdomain;
  const subDomain = getSubDomain();
  console.log('routeSubDomain is',routeSubDomain , 'subDomain is',subDomain );
  if (!subDomain || !isValidSubdomain(subDomain, routeSubDomain)) {
    console.log('partner domain is not Valid',);
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
});

function isValidSubdomain(subDomain, routeSubDomain) {
  const partner = partnerInfo();
  // TODO, send request to endpoint to get all partners domains, for checking
  const validSubdomains = ['saudiceramics', 'test1'];
  return validSubdomains.includes(subDomain) && subDomain === routeSubDomain;
}
