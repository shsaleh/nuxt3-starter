// https://nuxt.com/docs/api/configuration/nuxt-config
import type { ViteConfig } from 'nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  build: { transpile: ['vuetify'] },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL as string,
    },
  },
  modules: [
    '@pinia/nuxt',
    [
      '@nuxt/eslint',
      {
        config: {
          rules: {
            // ...Override rules, for example:
            'vue/multi-word-component-names': 'off',
          },
          stylistic: true,
          extends: ['@antfu'],
        },
      },
    ],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: ViteConfig) => {
        if (config.plugins) {
          config.plugins.push(vuetify({ autoImport: true }))
        }
      })
    },
    '@nuxtjs/i18n',
  ],
  pinia: {
    storesDirs: ['./store/**', './layers/*/store/**'],
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: './libs/i18n/locales/en.ts',
        dir: 'ltr',
      },
      {
        code: 'fa',
        iso: 'fa-IR',
        name: 'فارسی',
        file: './libs/i18n/locales/fa.ts',
        dir: 'rtl',
      },
    ],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
