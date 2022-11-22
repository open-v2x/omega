import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-components';
import { setToken } from '#/utils/storage';
import { SelectLang } from '#/components/SelectLang';

import styles from './index.module.less';
import { useUserStore } from '#/store/user';
import imgLoginUser from '#/assets/images/login_user.png';
import imgLoginPwd from '#/assets/images/login_password.png';
import { LoginParams } from '#/types/service/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '#/services/api/user';
import { getUrlSearch } from '#/utils';
import classNames from 'classnames';
const Login: React.FC = () => {
  const { fetchUserInfo } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values: LoginParams) => {
    const { access_token: accessToken, token_type: tokenType } = await login(values);
    const token = `${tokenType} ${accessToken}`;
    setToken(token);
    await fetchUserInfo();
    if (!navigate) return;
    const { redirect } = getUrlSearch(location.search);
    navigate(redirect || '/', { replace: true });
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <LoginForm
        logo={<>{t('OpenV2X Edge Portal')}</>}
        onFinish={async values => {
          await handleSubmit(values as LoginParams);
        }}
      >
        <p>{t('Platform Login')}</p>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <img src={imgLoginUser} alt="" />,
          }}
          placeholder={t('Username')}
          rules={[{ required: true, message: t('Please input your username') }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <img src={imgLoginPwd} alt="" />,
            autoComplete: 'off',
          }}
          placeholder={t('Password')}
          rules={[{ required: true, message: t('Please input your password') }]}
        />
      </LoginForm>
    </div>
  );
};
export default Login;
