import { getUserInfo } from '#/services/api/user';
import create from 'zustand';

interface IUserStore {
  userInfo: any;
  logged: boolean;
  fetchUserInfo: () => void;
}

const useUserStore = create<IUserStore>(set => ({
  userInfo: {},
  logged: false,
  fetchUserInfo: async () => {
    const response = await getUserInfo();
    if (response) {
      set({ userInfo: response, logged: true });
    }
  },
}));

export { useUserStore };
