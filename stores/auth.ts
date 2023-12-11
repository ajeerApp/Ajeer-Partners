import { defineStore } from 'pinia';

interface AuthState {
    user: {
        mobile: string;
        otp: string;
        type: string;
        pushwoosh_token: string;
        firebase_token: string;
        device: string;
        app_version: string;
        access_token: string;
    } | null;
}

export const useAuth = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
    }),
    getters: {
        isLoggedIn(state): boolean {
            return state.user && (state.user.access_token !== null && state.user.access_token !== undefined);
        },
        getAccessToken(state): string | null {
            return state.user ? state.user.access_token : null;
        },
    },
    actions: {
        async login(payload: { mobile: string;}) {
                const config = useRuntimeConfig()
                // TODO, get partner_domain from request
                const response = await $fetch(`${config.public.apiBase}saudiceramics/users/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const res = response; // according to response
            const resData = res.data;
            const Token = resData.access_token;
            console.log('thi is login res', res);
            if (res.success === true) {
                console.log('login res.success === true');
                this.user = resData.user;
                this.user.access_token = Token;
                console.log('this user', this.user);
            } else {
                throw new Error('Login failed');
            }
        },

        logout() { // not used yet
            this.user = null;
            this.user.access_token = null;
        },

    },
});
