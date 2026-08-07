// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    preset: 'cloudflare-pages'
  },

  css: [
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['echarts', 'vue-echarts', 'resize-detector']
  },

  app: {
    head: {
      title: 'Enterprise Analytics Dashboard | Nuxt 3',
      meta: [
        { name: 'description', content: 'Clean, responsive analytics dashboard built with Nuxt 3, Vue 3, Tailwind CSS, and Apache ECharts.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  }
})
