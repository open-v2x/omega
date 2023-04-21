import React, { useCallback, useEffect, useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-components';
import { setToken } from '#/utils/storage';
import { SelectLang } from '#/components/SelectLang';

import styles from './index.module.less';
import { useUserStore } from '#/store/user';
import { LoginParams } from '#/types/service/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '#/services/api/user';
import { getUrlSearch } from '#/utils';
import classNames from 'classnames';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const { fetchUserInfo, clearCookies } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [routing, setRouting] = useState(false);

  useEffect(() => {
    if (routing) {
      const { redirect } = getUrlSearch(location.search);
      navigate(redirect || '/', { replace: true });
    }
  }, [routing]);

  const handleSubmit = useCallback(async (values: LoginParams) => {
    clearCookies();
    const { access_token: accessToken, token_type: tokenType } = await login(values);
    const token = `${tokenType} ${accessToken}`;
    setToken(token);
    await fetchUserInfo();
    setRouting(true);
  }, []);

  return (
    <div className={classNames(styles.container)}>
      <div className={styles.left}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.main}>
          <LoginForm
            logo={'/assets/img/logo.png'}
            title={t('OpenV2X Title')}
            onFinish={async values => {
              await handleSubmit(values as LoginParams);
            }}
          >
            <div className={styles.form}>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={t('Username')}
                rules={[{ required: true, message: t('Please input your username') }]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  autoComplete: 'off',
                }}
                placeholder={t('Password')}
                rules={[{ required: true, message: t('Please input your password') }]}
              />
            </div>
          </LoginForm>
        </div>
      </div>
      <div className={styles.right}>
        <img
          className={styles['right-login-img']}
          src={'/assets/img/login_full_image.png'}
          alt="login_full_image"
        />
      </div>
    </div>
  );
};
export default Login;
