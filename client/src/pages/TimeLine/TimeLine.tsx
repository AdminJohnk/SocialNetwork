import React from "react";
import { ThemeProvider } from "styled-components";
import StyleTotal from "./cssTimeLine";
import { getTheme } from "../../util/functions/ThemeFunction";
import {  ConfigProvider, Input, Switch, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Slice/ThemeSlice";
import { DARK_THEME, LIGHT_THEME } from "../../util/constants/SettingSystem";

const TimeLine = () => {
  

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const {themeColor} = getTheme();
  const {themeColorSet} = getTheme();

 

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div>
          
         
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default TimeLine;
