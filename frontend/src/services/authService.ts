import authorizedAxiosInstance from "~/utils/authorizedAxios";

export const authService = {
  signUp: async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    const res = await authorizedAxiosInstance.post("auth/signup", { username, password, email, firstName, lastName });
    return res.data;
  },

  signIn: async (username: string, password: string) => {
    const res = await authorizedAxiosInstance.post("auth/signin", { username, password });
    return res.data;
  },

  signOut: async () => {
    return await authorizedAxiosInstance.delete("auth/signout");
  },

  fetchMe: async () => {
    const res = await authorizedAxiosInstance.get("users/me");

    return res.data.user;
  },

  refreshToken: async () => {
    const res = await authorizedAxiosInstance.post("auth/refresh");

    return res.data.accessToken;
  },

  test: async () => {
    const res = await authorizedAxiosInstance.get("users/test");
    return res.data;
  },
};
