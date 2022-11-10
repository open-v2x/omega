import React from 'react';

export default {
  routes: [
    {
      path: '/login',
      isDynamic: true,
      component: React.lazy(
        () => import(/* webpackChunkName: "login",webpackPrefetch: true */ '#/pages/Login'),
      ),
    },
    {
      path: '/',
      isDynamic: true,
      component: React.lazy(
        () => import(/* webpackChunkName: "home",webpackPrefetch: true */ '#/pages/Home'),
      ),
    },
  ],
};
