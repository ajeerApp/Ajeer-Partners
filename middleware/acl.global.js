import {useUserStore} from '@core/stores/user'

// export default defineNuxtRouteMiddleware(to=>{
//     const user=useUserStore()
// if(user.getUser){
// return navigateTo('/place-order')
// }
// else
// return undefined
// })


export default defineNuxtRouteMiddleware(to => {
  /*
         * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
         * Examples of public routes are, 404, under maintenance, etc.
         */
  if (to.meta.public)
    return

  const { user } = useUserStore()
  const isLoggedIn = user!==null
  console.log("user store",user)
  console.log("isLoggedIn",isLoggedIn)


  /*
          If user is logged in and is trying to access login like page, redirect to home
          else allow visiting the page
          (WARN: Don't allow executing further by return statement because next code will check for permissions)
         */
  if (to.meta.unauthenticatedOnly) {
    if (isLoggedIn)
      return navigateTo('/')
    else
      return undefined
  }

})
