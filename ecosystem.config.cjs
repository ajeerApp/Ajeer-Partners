module.exports = {
    apps: [
        {
            name: 'partners.iajeer.com',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: '1',
            mode: 'production',
        },
        {
            name: 'partners.stg.iajeer.com',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: '1',
            mode: 'stg',
        },
    ]
  }
