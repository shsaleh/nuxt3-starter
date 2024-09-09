import { defineNuxtPlugin } from "#app";
import {
  defineAbility,
} from "@casl/ability";
import { abilitiesPlugin } from "@casl/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    abilitiesPlugin,
    defineAbility((can) => {}),
    {
      useGlobalProperties: true,
    }
  );
});
