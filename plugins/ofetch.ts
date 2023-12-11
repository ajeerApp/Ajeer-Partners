import { ofetch } from 'ofetch';
import { isAuthenticated, getAuthUserToken } from '@/utils/auth-user';

export default defineNuxtPlugin(nuxtApp => {

    ofetch.create({
        onRequest({ request, options }) {
            // If the request is not the login request, add the authorization header
            if (request.url !== '/gst') {
                // TODO enhance this code
                options.headers = options.headers || {};
                options.headers['Authorization'] = 'Bearer ' + getAuthUserToken();
                console.log('ofetch plugin , this is options headers', options.headers);
            } else {
                console.log('ofetch plugin , the user is NOT logged in');
            }
        },
    });

});
