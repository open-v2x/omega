import { getUserInfo, loginByToken } from '#/services/api/user';
import create from 'zustand';
import { setToken } from '#/utils/storage';
import cookie from 'react-cookies';
interface IUserStore {
  userInfo: any;
  fetchUserInfo: () => void;
  logout: () => void;
  fetchTokenByIam: () => void;
  logged: boolean;
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
  logout: () => {
    set({
      userInfo: {},
    });
  },
  fetchTokenByIam: async () => {
    const iamToken =
      cookie.load('X-Auth-Token') ||
      'gAAAAABjoBK5xmYWBTLTYD8g2HXBo_P8tTN3EbbkXXay7LzZeXkEBZHfSOtVCdWxkgzZVu6u3nNuk3dty2-wHTsMHoogsLOyymlINl5jgCc2H7APRVw2ZyQVWFO1EddDHgiVugzkYKCN83799Xc23esrLb6-dOg379yqWhPUweO1dgZObSgXOSw';
    console.log(iamToken);
    const { access_token: accessToken, token_type: tokenType } = await loginByToken({
      IamToken: iamToken,
    });
    const token = `${tokenType} ${accessToken}`;
    setToken(token);
  },
}));

export { useUserStore };
