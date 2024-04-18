// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    // middleware: 'auth'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: [
    // ...modules:
    '@pinia/nuxt',
    '@nuxt/ui',

  ],
  imports: {
    dirs: ['stores']
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    // APIKEY: process.env.APIKEY,
    // authDomain: process.env.authDomain,
    // projectId: process.env.projectId,
    // storageBucket: process.env.storageBucket,
    // messagingSenderId: process.env.messagingSenderId,
    // appId: process.env.appId,
  },

})
