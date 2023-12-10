import { ofetch } from 'ofetch';
import { isAuthenticated, getAuthUserToken } from '@/utils/auth-user';

export default defineNuxtPlugin(nuxtApp => {

    ofetch.create({
        onRequest({ request, options }) {
            // If the request is not the login request, add the authorization header
            if (request.url !== '/auth/login') {
                // TODO clean this logs
                console.log('ofetch plugin , the user is already logged in');
                options.headers = options.headers || {};
                options.headers['Authorization'] = 'Bearer ' + getAuthUserToken();
                console.log('ofetch plugin , this is options headers', options.headers);
            } else {
                console.log('ofetch plugin , the user is NOT logged in');
            }
        },
    });

});
