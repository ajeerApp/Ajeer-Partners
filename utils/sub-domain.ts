import { useNuxtApp } from '#app';
export function getSubDomain(): string {

        const nuxtApp = useNuxtApp();
        const path = nuxtApp._route.path;
        const pathSegments = path.split('/');
        const partnerDomain = pathSegments[1];

        return partnerDomain;
}
