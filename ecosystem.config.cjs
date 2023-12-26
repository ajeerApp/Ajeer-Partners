module.exports = {
    apps: [
        {
            name: 'partners.iajeer.com',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: 'max',
            mode: 'production',
        },
        {
            name: 'partners.stg.iajeer.com',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: 'max',
            mode: 'stg',
        },
    ]
  }
