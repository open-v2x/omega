import { getUserInfo, loginByToken } from '#/services/api/user';
import create from 'zustand';
import { setToken } from '#/utils/storage';
import cookie from 'react-cookies';
interface IUserStore {
  userInfo: any;
  fetchUserInfo: () => any;
  logout: () => void;
  fetchTokenByIam: () => void;
}

const useUserStore = create<IUserStore>(set => ({
  userInfo: {},
  fetchUserInfo: async () => {
    const response = await getUserInfo();
    set({ userInfo: response || {} });
    return response;
  },
  logout: () => {
    set({
      userInfo: {},
    });
  },
  fetchTokenByIam: async () => {
    const iamToken = cookie.load('X-Auth-Token') || '';
    const { access_token: accessToken, token_type: tokenType } = await loginByToken(iamToken);
    const token = `${tokenType} ${accessToken}`;
    setToken(token);
  },
}));

export { useUserStore };
