import React from 'react';

export default {
  routes: [
    // {
    //   path: '/',
    //   isDynamic: true,
    //   component: React.lazy(
    //     () => import(/* webpackChunkName: "home",webpackPrefetch: true */ '#/pages/user/Login'),
    //   ),
    // },
    {
      path: '/',
      isDynamic: true,
      component: React.lazy(
        () => import(/* webpackChunkName: "page1",webpackPrefetch: true */ '#/pages/Home'),
      ),
    },
  ],
};
