import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-components';
import classNames from 'classnames';
import { setToken } from '#/utils/storage';
import { SelectLang } from '#/components/SelectLang';

import styles from './index.less';
import { useUserStore } from '#/store/user';
import imgLoginUser from '#/assets/images/login_user.png';
import imgLoginPwd from '#/assets/images/login_password.png';
import { LoginParams } from '#/types/service/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '#/services/api/user';

const Login: React.FC = () => <div>登录</div>;
// const { fetchUserInfo } = useUserStore();
// const navigate = useNavigate();
// const location = useLocation();

// const handleSubmit = async (values: LoginParams) => {
//   const { access_token: accessToken, token_type: tokenType } = await login(values);
//   const token = `${tokenType} ${accessToken}`;
//   setToken(token);
//   await fetchUserInfo();
//   if (!location) return;
//   const { query } = location.state;
//   const { redirect } = query as { redirect: string };
//   navigate(redirect || '/', { replace: true });
// };

// return (
//   <div className={classNames(styles.container, 'f f-j-end f-a-center')}>
//     <div className={styles.lang}>
//       <SelectLang />
//     </div>
//     <LoginForm
//       logo={<>{t('OpenV2X Edge Portal')}</>}
//       onFinish={async values => {
//         await handleSubmit(values as LoginParams);
//       }}
//     >
//       <p>{t('Platform Login')}</p>
//       <ProFormText
//         name="username"
//         fieldProps={{
//           size: 'large',
//           prefix: <img src={imgLoginUser} alt="" />,
//         }}
//         placeholder={t('Username')}
//         rules={[{ required: true, message: t('Please input your username') }]}
//       />
//       <ProFormText.Password
//         name="password"
//         fieldProps={{
//           size: 'large',
//           prefix: <img src={imgLoginPwd} alt="" />,
//         }}
//         placeholder={t('Password')}
//         rules={[{ required: true, message: t('Please input your password') }]}
//       />
//     </LoginForm>
//   </div>
// );
export default Login;
