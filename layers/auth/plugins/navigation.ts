import { navigations } from '../navigation'

export default defineNuxtPlugin(() => {
  useAddNavigation(navigations)
})
