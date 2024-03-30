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
    middleware: 'auth'
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
    MONGO_URI: process.env.MONGO_URI
  },

})
