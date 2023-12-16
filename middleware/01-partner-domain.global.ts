import { partnerInfo } from '~/stores/partner';
import { isValidPartner, getPartnerInfo } from '@/utils/partner-info';
import { getSubDomain } from '@/utils/sub-domain';
import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const routeSubDomain = to.params.subdomain;
  const subDomain = getSubDomain();
  const router = useRouter();
  const allowedRoutes=[`/${subDomain}/gst`]
  
  if(allowedRoutes.includes(to.path)){
    console.log(allowedRoutes)
    return;
  }

  console.log('routeSubDomain is',routeSubDomain , 'to.params', to.params );
  if (!subDomain || !isValidSubdomain(subDomain)) {
    console.log('partner domain is not Valid',);
    // return navigateTo('/saudiceramics/gst')

    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
 
});

function isValidSubdomain(subDomain) {
  const partner = partnerInfo();
  // TODO, send request to endpoint to get all partners domains, for checking
  const validSubdomains = ['saudiceramics', 'test1'];
  return validSubdomains.includes(subDomain);
}
// saudiceramics
// saudiceramics
