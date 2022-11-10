import BaseComponent from '#/components/BaseComponent';
import { IRouterPage } from '#/types/service/IRouterPage';
import { Route, Routes, BrowserRouter, HashRouter } from 'react-router-dom';
import NoMatch from '#/components/NoMatch';
import React from 'react';
import Home from '#/pages/Home';
import Login from '#/pages/Login';

interface IRouterUIProps {
  routers: IRouterPage[];
}

class RouterUI extends BaseComponent<IRouterUIProps> {
  renderPage = (router: IRouterPage) => {
    const { component, path, loadingFallback } = router;
    const Page = component;
    return (
      <React.Suspense fallback={loadingFallback || '正在加载中...'} key={path}>
        <Page />
      </React.Suspense>
    );
  };

  /**
   * 生成router
   * @param {*} routers
   * @param {*} container
   * @param {*} recur 是否递归
   */
  renderRouter = (routers: IRouterPage[] = []) =>
    routers.map(router => {
      let { path } = router;
      return <Route key={path} path={path} element={this.renderPage(router)} />;
    });

  render() {
    const { routers } = this.props;
    return (
      <BrowserRouter>
        <Routes>
          {this.renderRouter(routers)}
          <Route element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default RouterUI;
