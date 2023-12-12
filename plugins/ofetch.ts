import { ofetch } from 'ofetch';
import { isAuthenticated, getAuthUserToken } from '@/utils/auth-user';
import {getSubDomain} from "@/utils/sub-domain";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
    const apiFetch = ofetch.create({
        baseURL: `${config.public.apiBase}${getSubDomain()}`,
        headers: {
            'Content-Type': 'application/json',
        },
        async onRequest({ request, options }) {
            options.headers = {
                'Content-Type': 'application/json',
                ...(request !== '/gst' ? { Authorization: `Bearer ${getAuthUserToken()}` } : {}),
                ...options.headers,
            };
            console.log('getAuthUserToken in, ofetch plugin:', getAuthUserToken() );
            console.log('this is options headers, ofetch plugin', options.headers);
            options.body = JSON.stringify(options.body);
            console.log('request, ofetch plugin:', request );
            console.log('request url, ofetch plugin:', request );
            console.log('request === , ofetch plugin:', request !== '/gst' );
        },
        async onRequestError({ request, options, error }) {
            console.error('Request error, ofetch plugin:', error);
        },
        async onResponse({ request, response, options }) {
            const resData = response._data;
            console.log('Response data, ofetch plugin:', resData);
            if (resData.success === true) {
                console.log('Request success, ofetch plugin:', resData);
            } else {
                throw new Error('Request failed, ofetch plugin');
            }
        },
        async onResponseError({ request, response, options }) {
            console.error('Response error, ofetch plugin:', response.statusText);
        },
    });

    nuxtApp.provide('apiFetch', apiFetch);
});
