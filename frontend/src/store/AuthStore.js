import DOMAIN from "../services/endpoint";
import axios from "axios";
import { setSession } from "../services/jwt.service";

const createAuthStore = (set, get) => ({
  user: null,
  authLoading: false,
  tokenLoading: true,
  setUser: (args) => set({ user: args }),
  logoutService: () => {
    setSession(null);
    set({ user: null, authLoading: false, tokenLoading: false });
  },
  loginService: async (email, password) => {
    set({ authLoading: true });
    try {
      const res = await axios.post(`${DOMAIN}/api/user/login`, {
        email,
        password,
      });
      if (res.data.result?.user && res.data.result?.token) {
        setSession(res.data.result?.token);
        set({ user: res.data.result?.user, authLoading: false });
      } else {
        set({ authLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      set({ authLoading: false });
    }
  },
  loginWithToken: async () => {
    try {
      const res = await axios.post(`${DOMAIN}/api/user/validation`);
      if (res.data.result?.user && res.data.result?.token) {
        setSession(res.data.result?.token);
        set({ user: res.data.result?.user, tokenLoading: false });
      } else {
        set({ tokenLoading: false, user: null });
      }
    } catch (error) {
      console.log(error);
      get().logoutService();
    }
  },
});

export default createAuthStore;
