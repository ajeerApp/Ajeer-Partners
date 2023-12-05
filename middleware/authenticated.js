import {useUserStore} from '@core/stores/user'

export default defineNuxtRouteMiddleware(to=>{
    const user=useUserStore()
if(user.getUser){
return navigateTo('/')
}

})

