// https://nuxt.com/docs/api/configuration/nuxt-config
import type { ViteConfig } from "nuxt/schema";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: { transpile: ["vuetify"] },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL as string,
    },
  },
  modules: [
    [
      "@nuxt/eslint",
      {
        config: {
          stylistic: true,
          extends: ["@antfu"],
        },
      },
    ],
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: ViteConfig) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/i18n",
  ],
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "./libs/i18n/locales/en.ts",
      },
      {
        code: "fa",
        iso: "fa-IR",
        name: "فارسی",
        file: "./libs/i18n/locales/fa.ts",
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
});
