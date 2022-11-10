import { getUserInfo } from '#/services/api/user';
import create from 'zustand';

interface IUserStore {
  userInfo: any;
  fetchUserInfo: () => void;
}

const useUserStore = create<IUserStore>(set => ({
  userInfo: {},
  fetchUserInfo: async () => {
    const response = await getUserInfo();
    if (response) {
      set({ userInfo: response });
    }
  },
}));

export { useUserStore };
