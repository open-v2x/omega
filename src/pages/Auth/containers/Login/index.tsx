import React from 'react';
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
import { QIANKUN_FILE_PREFIX } from '#/constants/variable';

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
      <div className={styles.left}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.main}>
          <LoginForm
            logo={`${QIANKUN_FILE_PREFIX}/assets/img/logo.png`}
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
          src={`${QIANKUN_FILE_PREFIX}/assets/img/login_full_image.png`}
          alt="login_full_image"
        />
      </div>
    </div>
  );
};
export default Login;
