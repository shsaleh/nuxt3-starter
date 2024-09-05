import type { UseFetchOptions } from "#app";

const userAuth = useCookie("token");
const config = useRuntimeConfig();

if (!config.baseUrl) {
  throw new Error("baseUrl didn't provided by env");
}
const $customFetch = $fetch.create({
  baseURL: config.baseUrl as string,
  onRequest({ request, options, error }) {
    if (userAuth.value) {
      const headers = useRequestHeaders(["Authorization"]);
      headers.authorization = `Bearer ${userAuth.value}`;
      // Add Authorization header
      options.headers = options.headers || {};
      options.headers = headers;
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo("/login");
    }
  },
});

export const useFetchApi = <T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) => {
  return useFetch(url, {
    ...options,
    $fetch: $customFetch,
  });
};
