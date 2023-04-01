import React, { useState, useEffect, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  faPlus,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { CHECK_LOGIN_SAGA } from "../../redux/actionSaga/AuthActionSaga";
import { getTheme } from "../../util/functions/ThemeFunction";
import { Avatar, Col, ConfigProvider, Form, Row, Input, Dropdown, Button, MenuProps, Space } from "antd";
import StyleTotal from "./cssNewFeed";
import Post from './../../components/Post/Post';
import QuillEditor from "../../components/QuillEditor/QuillEditor";
const NewFeed = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet} >
        <div className="newfeed">
          <div className="createpost">
            <div className="createpost-header">
            </div>
            <div className="createpost-body">
              <div className="createpost-body-editor">

                <QuillEditor />
              </div>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NewFeed;
