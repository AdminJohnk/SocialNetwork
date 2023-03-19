import {
  DiffFilled,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  faBookmark,
  faBriefcase,
  faGlobe,
  faHouse,
  faMaximize,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, ConfigProvider, Divider, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssMenu";

const MenuMain = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Hover menu
  const [collapsed, setCollapsed] = useState(true);
  const handleMouseEnter = () => {
    setCollapsed(false);
  };
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          className="sider"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 76,
            bottom: 0,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="h-full"
            items={[
              {
                key: "1",
                icon: <FontAwesomeIcon className="icon" icon={faHouse} />,
                label: "Home",
              },
              {
                key: "2",
                icon: <FontAwesomeIcon className="icon" icon={faMaximize} />,
                label: "Explore",
              },
              {
                key: "3",
                icon: <FontAwesomeIcon className="icon" icon={faGlobe} />,
                label: "Collaborations",
              },
              {
                key: "4",
                icon: <FontAwesomeIcon className="icon" icon={faBriefcase} />,
                label: "Works",
              },
              {
                key: "5",
                icon: <FontAwesomeIcon className="icon" icon={faBookmark} />,
                label: "Bookmarks",
              },
              {
                key: "6",
                icon: <FontAwesomeIcon className="icon" icon={faPeopleGroup} />,
                label: "All Communities",
              },
              {
                type: "divider",
                style: {
                  backgroundColor: themeColorSet.colorBg3,
                  height: "2px",
                },
              },
              {
                key: "7",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/javascript.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Javascript",
              },
              {
                key: "8",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/graphQL.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "GraphQL",
              },
              {
                key: "9",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/git.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Git",
              },
              {
                key: "10",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/github.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Github",
              },

              {
                key: "11",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/python.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Python",
              },
              {
                key: "12",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/reactjs.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "React",
              },
              {
                key: "13",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/python.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Python",
              },
              {
                key: "14",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/reactjs.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "React",
              },
              {
                key: "15",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/python.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "Python",
              },
              {
                key: "16",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/reactjs.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "React",
              },
              {
                key: "17",
                icon: (
                  <Avatar
                    src="/images/NewfeedPage/Community/reactjs.png"
                    shape="square"
                    size={20}
                  />
                ),
                label: "React",
              },
            ]}
          />
        </Sider>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MenuMain;
