module.exports = {
    apps: [
        {
            name: 'ajeer-partners-prod',
            port:'3003',
            script: './.output/server/index.mjs',
            exec_mode: 'cluster',
            instances: 'max',
            mode: 'production',
        },
        // {
        //     name: 'ajeer-partners-stg',
        //     port:'3003',
        //     script: './.output/server/index.mjs',
        //     exec_mode: 'cluster',
        //     instances: 'max',
        //     mode: 'stg',
        // },
    ]
  }
