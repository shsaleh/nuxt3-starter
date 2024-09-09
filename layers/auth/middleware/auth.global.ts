import { useUserStore } from "~/layers/auth/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const profile = useProfile();
  const token = useCookie("token");
  const localePath = useLocalePath();
  console.log(token.value);

  if (to.fullPath !== localePath("/auth/userLogin")) {
    if (!token.value) {
      return navigateTo(localePath("/auth/userLogin"));
    } else if (userStore.user.roles?.length === 0 || !userStore.user.email) {
      const { status, data } = await profile();
      if (status.value === "success" && data.value) {
        userStore.user = data.value.results;
      }
      if (status.value === "error") {
        token.value = null;

        return navigateTo(localePath("/auth/userLogin"));
      }
    }
  }
});
