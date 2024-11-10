import type { UseFetchOptions } from '#app'

export const useFetchApi = () => {
  const userAuth = useCookie('token')
  const config = useRuntimeConfig()

  if (!config.public.BASE_URL) {
    throw new Error('BASE_URL didn\'t provided by env')
  }
  const $customFetch = $fetch.create({
    baseURL: config.public.BASE_URL as string,
    onRequest({ /* request, */ options /* error */ }) {
      if (userAuth.value) {
        const headers = useRequestHeaders(['Authorization'])
        headers.authorization = `Bearer ${userAuth.value}`
        // Add Authorization header
        options.headers = options.headers || {}
        options.headers = { ...options.headers, ...headers }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    },
  })
  return <T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {},
  ) => {
    return useFetch(url, {
      ...options,
      $fetch: $customFetch,
    })
  }
}
