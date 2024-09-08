import type { Tuser } from "../libs/types/user";

export const useLogin = () => {
  const fetch = useFetchApi();
  return (data: { email: string; password: string }) => {
    return fetch<{ results: { admin: Tuser; token: string } }>("auth/login", {
      method: "POST",
      body: data,
    });
  };
};
