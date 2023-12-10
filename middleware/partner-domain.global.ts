export default defineNuxtRouteMiddleware(async (to, from) => {
  const subdomain = to.params.subdomain;
  console.log('partnerdomain middleware, subdomain is: ', subdomain);
  if (!subdomain || !isValidSubdomain(subdomain)) {
    console.log('partnerdomain is not Valid, subDomain is: ', subdomain);
    // return navigateTo('/');
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
});

function isValidSubdomain(subdomain) {
  // TODO, make api request to backend to get partner info
  const validSubdomains = ['test1', 'test2'];
  return validSubdomains.includes(subdomain);
}