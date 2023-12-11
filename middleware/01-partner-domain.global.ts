import { partnerInfo } from '~/stores/partner';
import { isValidPartner, getPartnerInfo } from '@/utils/partner-info';
import { getSubDomain } from '@/utils/sub-domain';
import { useRouter } from 'vue-router';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const subdomain = to.params.subdomain;
  const subDomain = getSubDomain();
  console.log('subDomain middleware is: ', subDomain );

  if (!subdomain || !isValidSubdomain(subdomain)) {
    console.log('partnerdomain is not Valid, subDomain is: ', subdomain);
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
});

function isValidSubdomain(subdomain) {
  // TODO, make api request to backend to get partner info
  // TODO, handle this by api with dashboard
  console.log('isValidSubdomain  subdomain is: ', subdomain);

  // try {
  //   await partner.login({
  //     mobile: mobile.value,
  //   });
  //   router.push('/');
  // } catch (error) {
  //   console.error(error);
  // }

  const validSubdomains = ['saudiceramics', 'test1'];
  return validSubdomains.includes(subdomain);
}
