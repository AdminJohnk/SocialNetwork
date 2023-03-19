import React, { useState, useEffect, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CHECK_LOGIN_SAGA } from "../../redux/actionSaga/AuthActionSaga";
import { getTheme } from "../../util/functions/ThemeFunction";
import { ConfigProvider } from "antd";
import StyleTotal from "./cssNewFeed";

const NewFeed = () => {
  // Kiểm tra đã login hay chưa
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(CHECK_LOGIN_SAGA());
  // }, []);

  // const checkLogin = useSelector((state: any) => state.authReducer.login);

  // if (!checkLogin) {
  //   return <Navigate to="/login" />;
  // }

   // Lấy theme từ LocalStorage chuyển qua css
   const { change } = useSelector((state: any) => state.themeReducer);
   const {themeColor} = getTheme();
   const {themeColorSet} = getTheme();

   return (
    <ConfigProvider
      theme={{
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

export default NewFeed;
