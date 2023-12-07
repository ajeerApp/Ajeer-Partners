module.exports = {
    apps: [
        {
            name: 'partners-stg',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: 'max',
            mode: 'staging',
        },
        // {
        //     name: 'partners-pro',
        //     port:'3003',
        //     script: './.output/server/index.mjs',
        //     exec_mode: 'cluster',
        //     instances: 'max',
        //     mode: 'production',
        // },
    ],
};
