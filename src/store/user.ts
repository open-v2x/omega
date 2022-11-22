import { getUserInfo } from '#/services/api/user';
import create from 'zustand';

interface IUserStore {
  userInfo: any;
  fetchUserInfo: () => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>(set => ({
  userInfo: {},
  logged: false,
  fetchUserInfo: async () => {
    const response = await getUserInfo();
    if (response) {
      set({ userInfo: response });
    }
  },
  logout: () => {
    set({
      userInfo: {},
    });
  },
}));

export { useUserStore };
