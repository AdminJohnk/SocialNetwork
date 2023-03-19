import React from "react";
import { ConfigProvider, Layout } from "antd";
import { useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import Headers from "../../components/Headers/Headers";
import Menu from "../../components/Menu/Menu";
import { Content } from "antd/es/layout/layout";

const MainTemplate = (props : any) => {

  const { Component } = props;

  return (
    <Layout>
      <Headers />
      <Layout hasSider>
        <Menu />
        <Content style={{marginLeft: 240, marginTop: 76}}>
          <Component/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainTemplate;
