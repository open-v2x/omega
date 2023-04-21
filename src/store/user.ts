import { getUserInfo } from '#/services/api/user';
import Cookies from 'js-cookie';
import create from 'zustand';

interface IUserStore {
  userInfo: any;
  fetchUserInfo: () => Promise<any>;
  logout: () => void;
  clearCookies: () => void;
}

const useUserStore = create<IUserStore>((set, get) => ({
  userInfo: {},
  logged: false,
  fetchUserInfo: async () => {
    const response = await getUserInfo();
    if (response) {
      set({ userInfo: response });
    }
    return response;
  },
  clearCookies: () => {
    Cookies.remove('enode');
  },
  logout: () => {
    set({
      userInfo: {},
    });
    get().clearCookies();
  },
}));

export { useUserStore };
