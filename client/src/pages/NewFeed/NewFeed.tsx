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
import { ConfigProvider, Form, Input } from "antd";
import StyleTotal from "./cssNewFeed";
import TextArea from "antd/es/input/TextArea";

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
      <StyleTotal theme={themeColorSet}>
      <div className="post">
          <div className="post_header flex">
            <div className="post_header_avatar">
              <img className="img" src="https://picsum.photos/200/300" alt="" />
            </div>
            <div className="post_header_info">
              <div className="post_header_info_name">
                <span>Nguyễn Văn A</span>
              </div>
            </div>
          </div>

          <div className="post_body">
            <div className="post_body_content">
              <ConfigProvider
                theme={{
                  token: {
                    colorTextBase: "#d4d4d4",
                    colorBgBase: "#333345",
                    lineWidth: 0,
                    controlHeight: 40,
                  },
                }}
              >
                <Form
                  className="mt-5 formPost"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 8px)",
                      marginRight: "16px",
                    }}
                    name="content"
                    rules={[
                      {
                        required: false,
                        message: "Please input your content!",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Share your Knowledge"
                      allowClear>
                    </TextArea>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
            <div className="post_footer">
              <div className="post_footer_action flex justify-between ml-4 mr-4">
                <div className="post_footer_action_icon_media">
                  <FontAwesomeIcon className="icon" icon={faPlus} />
                </div>

                <div className="post_footer_action_icon_send flex justify-center px-2 py-1">
                  <FontAwesomeIcon className="icon pt-2 pb-2 px-2" icon={faPaperPlane} />
                  <p className="send-button pt-1 pr-2">Send</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NewFeed;
