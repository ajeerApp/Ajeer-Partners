import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: false,

    provider: {
        type: 'authjs'
    }
},
  app: {
    
    head: {
      titleTemplate: '',
      title: 'Ajeer Partners',

      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      }],
    },
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
  ],

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  plugins: ['@/plugins/vuetify/index.js', '@/plugins/iconify/index.js', '@/plugins/vue-google-maps', '@/plugins/i18n/index.js'],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
    presets: ['vue-i18n'],
  },

  hooks: {},

  experimental: {
    typedPages: true,
    inlineSSRStyles: false,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@themeConfig': ['../themeConfig.js'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
          '@validators': ['../@core/utils/validators'],
          '@db/*': ['../server/fake-db/*'],
          '@api-utils/*': ['../server/utils/*'],
        },
      },
    },
  },

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@themeConfig': fileURLToPath(new URL('./themeConfig.js', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
        'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
        '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
        '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
      },
    },

    build: {
      chunkSizeWarningLimit: 5000,
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './**/*.vue',
      ],
    },

    plugins: [
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        },
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true, ssr: true,
        include: [
          fileURLToPath(new URL('./plugins/i18n/locales/**', import.meta.url)),
        ],
      }),
    ],
  },

  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    // Private keys are only available on the server
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    AUTH_SECRET: process.env.AUTH_SECRET,

  

    // Public keys that are exposed to the client.
    public: {
      googleMapKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
    },  
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/device', '@pinia/nuxt','@sidebase/nuxt-auth',
  ],
  
})
