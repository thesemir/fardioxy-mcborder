// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose', 'nuxt-auth-utils'],
  mongoose:{
    uri : "mongodb+srv://botzebipro:uZOC2GYHF3KZy0hn@cluster0.4dcyb.mongodb.net/testdb"
  },
  runtimeConfig:{
    oauth:{
      discord:{
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SEC
      }
    }
  },
  app: {
    head: {
      title: 'Alice in Borderland - Serveur Minecraft',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { 
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
        }
      ]
    }
  }
})