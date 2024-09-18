import { navigations } from "../navigation";

export default defineNuxtPlugin((nuxtApp) => {
  useAddNavigation(navigations);
});
