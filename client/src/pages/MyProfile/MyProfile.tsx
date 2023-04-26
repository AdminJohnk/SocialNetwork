import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import StyleTotal from "./cssMyProfile";
import { getTheme } from "../../util/functions/ThemeFunction";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Empty,
  Input,
  Row,
  Skeleton,
  Space,
  Switch,
  Tabs,
  Tag,
  theme,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Slice/ThemeSlice";
import { DARK_THEME, LIGHT_THEME } from "../../util/constants/SettingSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faFileLines,
  faComments,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { icon } from "@fortawesome/fontawesome-svg-core";
import TabPane from "antd/es/tabs/TabPane";
import MyPost from "../../components/Post/MyPost";
import NewPost from "../../components/NewPost/NewPost";
import { GET_ALL_POST_BY_USERID_SAGA } from "../../redux/actionSaga/PostActionSaga";
import MyPostShare from "../../components/Post/MyPostShare";
import { useParams } from "react-router-dom";
import { openDrawer } from "../../redux/Slice/DrawerHOCSlice";
import EditProfileForm from "../../components/Form/EditProfileForm/EditProfileForm";


const descArray = [
  {
    icon: faSnowflake,
    title: "Java",
    color1: "#ed0e0e",
    color: "magenta",
  },
  {
    icon: faSnowflake,
    title: "Back End",
    color1: "#009B93",
    color: "cyan",
  },
  {
    icon: faSnowflake,
    title: "Data Analytics",
    color1: "#f5a623",
    color: "lime",
  },
  {
    icon: faSnowflake,
    title: "Front End",
    color1: "#7B00ED",
    color: "volcano",
  },
  {
    icon: faSnowflake,
    title: "Full Stack",
    color1: "#00B0F0",
    color: "geekblue",
  },
  {
    icon: faSnowflake,
    title: "DevOps",
    color1: "#7B00ED",
    color: "purple",
  },
  {
    icon: faSnowflake,
    title: "Project Management",
    color1: "#FE6700",
    color: "gold",
  },
  {
    icon: faSnowflake,
    title: "Design",
    color1: "#009B93",
    color: "blue",
  },
  {
    icon: faSnowflake,
    title: "Career",
    color1: "#00BCD4",
    color: "orange",
  },
  {
    icon: faSnowflake,
    title: "Problem Solver",
    color1: "#009B36",
    color: "geekblue",
  },
  {
    icon: faSnowflake,
    title: "App Design",
    color1: "#526D7B",
    color: "lime",
  },
];

const MyProfile = () => {
  const dispatch = useDispatch();

  const { userID } = useParams<{ userID: string }>();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_ALL_POST_BY_USERID_SAGA({
        userId: userID,
      })
    );
  }, [dispatch, userID]);

  const postArray = useSelector((state: any) => state.postReducer.postArr);
  const userInfo = useSelector((state: any) => state.postReducer.userInfo);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}> 
        {!postArray || !userInfo ? (
          <>
            <Row>
              <Col offset={4} span={16}>
                <div className="cover w-full h-80 rounded-br-lg rounded-bl-lg relative">
                  <Skeleton className="pt-4" active paragraph={{ rows: 6 }} />
                </div>
                <div className="avatar ">
                  <Skeleton.Image
                    active
                    style={{
                      width: "10rem",
                      height: "10rem",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <Row className="py-5">
                  <Col offset={6} span={12}>
                    <Skeleton className="pt-4" active paragraph={{ rows: 4 }} />
                  </Col>
                  <Col span={6}>
                    <div className="chat_Follow flex justify-around items-center w-full h-full">
                      <div className="editProfile">
                        <Skeleton.Button active />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col span={18} className="mt-5">
                  <Skeleton className="pt-4" active paragraph={{ rows: 4 }} />
                </Col>
                <div className="mainContain mt-16">
                  <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
                  <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
                  <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
                  <Skeleton className="mt-5" avatar paragraph={{ rows: 4 }} />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col offset={4} span={16}>
                <div
                  className="cover w-full h-80 rounded-br-lg rounded-bl-lg relative"
                  style={{
                    backgroundImage: `url("./images/TimeLinePage/cover2.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="avatar rounded-full overflow-hidden">
                  <img
                    src={
                      userInfo.userImage
                        ? userInfo.userImage
                        : "./images/DefaultAvatar/default_avatar.png"
                    }
                    alt="avt"
                  />
                </div>
                <Row className="py-5">
                  <Col offset={6} span={12}>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: themeColorSet.colorText1 }}
                    >
                      {userInfo.username}
                    </div>
                    <div className="position mt-2">
                      <FontAwesomeIcon className="icon" icon={faSnowflake} />
                      <span
                        style={{ color: themeColorSet.colorText3 }}
                        className="ml-2"
                      >
                        User Interface Architect & Senior Manager UX
                      </span>
                    </div>
                    <div className="viewResume mt-2">
                      <FontAwesomeIcon className="icon" icon={faFileLines} />
                      <NavLink to="/resume" className="ml-2">
                        View Resume
                      </NavLink>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="chat_Follow flex justify-around items-center w-full h-full">
                      <div className="editProfile">
                        <button
                          className="btnEditProfile px-4 py-2"
                          onClick={() => {
                            dispatch(
                              openDrawer({
                                title: "Edit Profile",
                                component: <EditProfileForm />,
                              })
                            );
                          }}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="id_address_join">
                  <span className="id item mr-2">@tianrongliew</span>
                  <span className="address item mr-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faLocationDot}
                    />
                    Global
                  </span>
                  <span className="join">
                    <FontAwesomeIcon className="icon mr-2" icon={faBriefcase} />
                    Joined Jun 2020
                  </span>
                </div>
                <Col span={18} className="mt-5">
                  <div className="description flex flex-wrap">
                    {descArray.map((item, index) => {
                      return (
                        <Tag
                          className="item mx-2 my-2"
                          key={index}
                          color={item.color}
                        >
                          <FontAwesomeIcon
                            className="icon mr-2"
                            icon={item.icon}
                          />
                          {item.title}
                        </Tag>
                      );
                    })}
                  </div>
                </Col>
                <div className="follow mt-5">
                  <span className="follower item mr-2">
                    <span className="mr-1">{2710}</span> Follower
                  </span>
                  <span className="following item mr-2">
                    <span className="mr-1">{78}</span> Following
                  </span>
                  <span className="post mr-2">
                    <span className="mr-1">{56}</span> Post
                  </span>
                </div>
                <div className="experience mt-5">
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Rabiloo</span>
                    <span className="position mr-2">Java Developer |</span>
                    <span className="date">2019.10 ~ 2022.10</span>
                  </div>
                  <div className="item mt-2">
                    <FontAwesomeIcon
                      className="icon mr-2"
                      icon={faBriefcase}
                      style={{ color: commonColor.colorBlue1 }}
                    />
                    <span className="company mr-2">Pan United</span>
                    <span className="position mr-2">Software Engineer |</span>
                    <span className="date">~ 2022.10</span>
                  </div>
                </div>
                <div className="contact mt-5">
                  <Space>
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faFacebookF)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faGithub)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faTwitter)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faInstagram)} />}
                    />
                    <Avatar
                      className="item"
                      icon={<FontAwesomeIcon icon={icon(faLinkedin)} />}
                    />
                  </Space>
                </div>
                <div className="mainContain mt-5">
                  <Tabs
                    defaultActiveKey="2"
                    // onChange={onChange}
                  >
                    <TabPane tab="Introduce" key="1" className="mt-10">
                      Introduce
                    </TabPane>
                    <TabPane tab="Post" key="2" className="mt-10">
                      <NewPost userInfo={userInfo} />
                      {postArray.length === 0 && (
                        <div className="w-8/12">
                          <Empty
                            className="mt-10 mb-20"
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            description={<span>No post</span>}
                          />
                        </div>
                      )}
                      {postArray.map((item: any, index: number) => {
                        return (
                          <div className="w-8/12">
                            {item.PostShared && (
                              <MyPostShare
                                key={item._id}
                                post={item}
                                userInfo={userInfo}
                                owner={item.user}
                              />
                            )}
                            {!item.PostShared && (
                              <MyPost
                                key={item._id}
                                post={item}
                                userInfo={userInfo}
                              />
                            )}
                          </div>
                        );
                      })}
                    </TabPane>
                    <TabPane tab="Show" key="3" className="mt-10">
                      Show
                    </TabPane>
                    <TabPane tab="Seri" key="4" className="mt-10">
                      Seri
                    </TabPane>
                    <TabPane tab="Guest book" key="5" className="mt-10">
                      Guest book
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MyProfile;
