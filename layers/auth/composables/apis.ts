export const useLogin = () => {
  const fetch = useFetchApi();
  return (data: { email: string; password: string }) => {
    return fetch("auth/login", { method: "POST", body: data });
  };
};