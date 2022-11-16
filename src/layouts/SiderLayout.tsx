import { Layout } from 'antd';
import React, { Component } from 'react';
import { Outlet } from 'react-router';

const { Header } = Layout;

class SiderLayout extends Component {
  render() {
    return (
      <div>
        <Header>header</Header>
        <div>left</div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default SiderLayout;
