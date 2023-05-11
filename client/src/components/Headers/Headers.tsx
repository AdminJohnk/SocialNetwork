import React from 'react';
import { Avatar, Badge, Col, ConfigProvider, Row, Space, Switch, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssHeaders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/transfer/search';
import { BellOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { DARK_THEME, LIGHT_THEME } from '../../util/constants/SettingSystem';
import { setTheme } from '../../redux/Slice/ThemeSlice';
import { NavLink } from 'react-router-dom';
import DayNightSwitch from '../Button/Day&NightSwitch';

const Headers = () => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();
  const { algorithm } = getTheme();

  const switchTheme = localStorage.getItem('theme') === 'dark';
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  // Switch theme
  const dispatch = useDispatch();
  const onChange = (checked: boolean) => {
    if (checked) {
      dispatch(setTheme({ theme: DARK_THEME }));
    } else {
      dispatch(setTheme({ theme: LIGHT_THEME }));
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: algorithm,
        token: {
          ...themeColor,
          controlHeight: 38,
        },
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <Header
          className="header"
          style={{
            backgroundColor: themeColorSet.colorBg2,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            width: '100%',
          }}
        >
          <Row align="middle">
            <Col span={16} offset={4}>
              <Row align="middle">
                <Col span={4}>
                  <NavLink to="/">
                    <FontAwesomeIcon
                      className="iconLogo text-3xl"
                      icon={faSnowflake}
                      style={{ color: themeColorSet.colorText1 }}
                    />
                    <Title level={2} className="title inline-block ml-2" style={{ color: themeColorSet.colorText1 }}>
                      DevHub
                    </Title>
                  </NavLink>
                </Col>
                <Col span={15} className="px-4">
                  <Search placeholder="Search" />
                </Col>
                <Col span={5} className="pl-3">
                  <Space size={25}>
                    <NavLink to="/message">
                      <Badge count={5}>
                        <Avatar
                          className="messageButton cursor-pointer"
                          shape="circle"
                          icon={<CommentOutlined className="text-xl" />}
                        />
                      </Badge>
                    </NavLink>
                    <Badge count={7}>
                      <Avatar className="notiButton cursor-pointer" icon={<BellOutlined className="text-xl" />} />
                    </Badge>
                    <NavLink to={`/user/${userInfo?.id}`}>
                      <Avatar className="avatarButton cursor-pointer" icon={<UserOutlined />} size="default" />
                    </NavLink>
                    {/* <Switch
                      checkedChildren="dark"
                      unCheckedChildren="light"
                      checked={switchTheme}
                      onChange={onChange}
                    /> */}
                    <DayNightSwitch checked={switchTheme} onChange={onChange} />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Headers;
