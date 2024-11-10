import {
  defineAbility,
} from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    abilitiesPlugin,
    defineAbility(() => {}),
    {
      useGlobalProperties: true,
    },
  )
})
