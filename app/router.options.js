
// 👉 Redirects
const redirects = [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
        path: '/',
        name: 'index',
        meta: {
            middleware: to => {
                const { data: sessionData } = useAuth()

                const userRole = sessionData.value ?.user.role

                if (userRole === 'admin')
                    return { name: 'place-order' }
                // if (userRole === 'client')
                //     return { name: 'access-control' }

                return { name: 'login', query: to.query }
            },
        },
        component: h('div'),
    },
    {
        path: '/pages/user-profile',
        name: 'pages-user-profile',
        redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    // {
    //     path: '/pages/account-settings',
    //     name: 'pages-account-settings',
    //     redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    // },
]



// https://router.vuejs.org/api/interfaces/routeroptions.html
export default {
    routes: scannedRoutes => [
        ...redirects,
        ...scannedRoutes,
    ],
}
