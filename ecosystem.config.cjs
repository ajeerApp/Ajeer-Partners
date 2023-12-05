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
    ],
};

// in stg
// pm2 start ecosystem.config.cjs --only partners-stg
