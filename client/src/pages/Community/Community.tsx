import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import StyleTotal from './cssCommunity';
import { getTheme } from '../../util/functions/ThemeFunction';
import {
  Avatar,
  Button,
  Col,
  Collapse,
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
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/Slice/ThemeSlice';
import { DARK_THEME, LIGHT_THEME } from '../../util/constants/SettingSystem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake,
  faFileLines,
  faComments,
  faLocationDot,
  faBriefcase,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import { commonColor } from '../../util/cssVariable/cssVariable';
import { icon } from '@fortawesome/fontawesome-svg-core';
import TabPane from 'antd/es/tabs/TabPane';
import MyPost from '../../components/Post/MyPost';
import NewPost from '../../components/NewPost/NewPost';
import { GET_ALL_POST_BY_USERID_SAGA } from '../../redux/actionSaga/PostActionSaga';
import MyPostShare from '../../components/Post/MyPostShare';
import { useParams } from 'react-router-dom';
import { openDrawer } from '../../redux/Slice/DrawerHOCSlice';
import EditProfileForm from '../../components/Form/EditProfileForm/EditProfileForm';
import { LoadingProfileComponent } from '../../components/GlobalSetting/LoadingProfileComponent/LoadingProfileComponent';

const { Panel } = Collapse;

const tagArr = [
  {
    id: 1,
    name: 'React',
  },
  {
    id: 2,
    name: 'Javascript',
  },
  {
    id: 3,
    name: 'NodeJS',
  },
];

const adminArr = [
  {
    id: 1,
    name: 'Rong',
    userName: '@tianrongliew',
    userImage:
      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
  },
  {
    id: 2,
    name: 'Sriparno Roy',
    userName: '@sriparno01465',
    userImage: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  },
  {
    id: 3,
    name: 'Lena Lee',
    userName: '@lenalee123',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU',
  },
];

const memberArr = [
  {
    id: 1,
    name: 'Rong',
    userName: '@tianrongliew',
    userImage:
      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
  },
  {
    id: 2,
    name: 'Sriparno Roy',
    userName: '@sriparno01465',
    userImage: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  },
  {
    id: 3,
    name: 'Lena Lee',
    userName: '@lenalee123',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU',
  },
  {
    id: 4,
    name: 'Sarah Smith',
    userName: '@sarahcodes',
    userImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU',
  },
  {
    id: 5,
    name: 'John Doe',
    userName: '@johndoe87',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU',
  },
];

const recentlyJoinedArr = [
  {
    id: 1,
    name: 'Rong',
    userName: '@tianrongliew',
    userImage:
      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
  },
  {
    id: 2,
    name: 'Sriparno Roy',
    userName: '@sriparno01465',
    userImage: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
  },
  {
    id: 3,
    name: 'Lena Lee',
    userName: '@lenalee123',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijUsFF_9lkZWtXXSK5npYSueYZjA13sfjnQ&usqp=CAU',
  },
  {
    id: 4,
    name: 'Sarah Smith',
    userName: '@sarahcodes',
    userImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMti6Y58F9U28BKZAOQMWDh9auJ5gfJahe5uKYMjr0kSNaXP4MZYkvDomyRUVKOfiPT5g&usqp=CAU',
  },
  {
    id: 5,
    name: 'John Doe',
    userName: '@johndoe87',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-NFn1a5QD_qi-HzSeySBUfx5AALewRHYw-g&usqp=CAU',
  },
];

const Community = () => {
  const dispatch = useDispatch();

  const { userID } = useParams<{ userID: string }>();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_ALL_POST_BY_USERID_SAGA({
        userId: 'me',
      }),
    );
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const postArraySlice = useSelector((state: any) => state.postReducer.postArr);
  const userInfoSlice = useSelector((state: any) => state.userReducer.userInfo);

  const postArray = useMemo(() => postArraySlice, [postArraySlice]);
  const userInfo = useMemo(() => userInfoSlice, [userInfoSlice]);

  const [isNotAlreadyChanged, setIsNotAlreadyChanged] = React.useState(true);

  const userInfoRef = React.useRef(userInfo);

  useEffect(() => {
    setIsNotAlreadyChanged(userInfoRef.current === userInfo);
  }, [userInfo, isNotAlreadyChanged, userInfoRef]);
  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {!postArray || !userInfo || isNotAlreadyChanged ? (
          <LoadingProfileComponent />
        ) : (
          <div className="communityPage">
            <Row>
              <Col span={24} className="avatar_cover relative">
                <div
                  className="cover w-full h-80 rounded-br-lg rounded-bl-lg"
                  style={{
                    backgroundImage: `url("./images/CommunityPage/cover.jpg")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="avatar rounded-full overflow-hidden">
                  <img
                    src={userInfo?.userImage ? userInfo?.userImage : './images/DefaultAvatar/default_avatar.png'}
                    alt="avt"
                  />
                </div>
              </Col>
              <Col offset={4} span={16}>
                <Row className="py-5 name_Editprofile">
                  <Col offset={6}>
                    <div className="text-2xl font-bold" style={{ color: themeColorSet.colorText1 }}>
                      React.JS
                    </div>
                    <div className="description mt-2">
                      <span style={{ color: themeColorSet.colorText2 }}>
                        Let's get together and discuss all things React! You can talk about your latest project, React
                        perf, React testing, anything!
                      </span>
                    </div>
                    <Space className="subInformation mt-2" size={15}>
                      <div className="unknow" style={{ color: themeColorSet.colorText3 }}>
                        <FontAwesomeIcon className="icon" icon={faFileLines} />
                        <span className="ml-2">Technology</span>
                      </div>
                      <div className="createDate" style={{ color: themeColorSet.colorText3 }}>
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">Created Jun 2021</span>
                      </div>
                      <div className="members" style={{ color: themeColorSet.colorText3 }}>
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">16,918 Members</span>
                      </div>
                    </Space>
                  </Col>
                </Row>
                <div className="flex">
                  <div className="mainContain mt-5 w-8/12">
                    <Tabs
                      defaultActiveKey="1"
                      // onChange={onChange}
                    >
                      <TabPane tab="All" key="1" className="mt-10">
                        <NewPost userInfo={userInfo} />
                        {postArray.length === 0 && (
                          <Empty
                            className="mt-10 mb-20"
                            image={Empty.PRESENTED_IMAGE_DEFAULT}
                            description={<span>No post</span>}
                          />
                        )}
                        {postArray.map((item: any, index: number) => {
                          return (
                            <div>
                              {item.PostShared && (
                                <MyPostShare key={item._id} post={item} userInfo={userInfo} owner={item.user} />
                              )}
                              {!item.PostShared && <MyPost key={item._id} post={item} userInfo={userInfo} />}
                            </div>
                          );
                        })}
                      </TabPane>
                      <TabPane tab="Code" key="2" className="mt-10">
                        Code
                      </TabPane>
                      <TabPane tab="Link" key="3" className="mt-10">
                        Link
                      </TabPane>
                      <TabPane tab="Poll" key="4" className="mt-10">
                        Poll
                      </TabPane>
                      <TabPane tab="Media" key="5" className="mt-10">
                        Media
                      </TabPane>
                    </Tabs>
                  </div>
                  <div className="infoCommunity mt-32 ml-3 w-4/12">
                    <div
                      className="about px-3 py-4 rounded-md mb-3"
                      style={{ backgroundColor: themeColorSet.colorBg2 }}
                    >
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        About
                      </div>
                      <div className="content mb-1" style={{ color: themeColorSet.colorText2 }}>
                        🟨 Official JavaScript community 💛 Here to learn, share or ask for help ! 🧑‍💻👩‍💻
                      </div>
                      <div
                        className="seeMore block mb-3 hover:underline cursor-pointer"
                        style={{ transition: 'all .5s', color: commonColor.colorBlue3, fontWeight: 600 }}
                      >
                        See More
                      </div>
                      <div className="createDate mb-5" style={{ color: themeColorSet.colorText3 }}>
                        <FontAwesomeIcon className="icon" icon={faCalendar} />
                        <span className="ml-2">Created Jun 2021</span>
                      </div>
                      <div className="numberMember text-xl" style={{ fontWeight: 600 }}>
                        11,396
                      </div>
                      <div className="titleMembers" style={{ color: themeColorSet.colorText3 }}>
                        Members
                      </div>
                    </div>
                    <div className="tags px-3 py-4 mb-3 rounded-md" style={{ backgroundColor: themeColorSet.colorBg2 }}>
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        Tags
                      </div>
                      <div className="content flex flex-wrap">
                        {tagArr.map((item: any, index: number) => {
                          return <span className="tagItem px-4 py-2 mr-2">{item.name}</span>;
                        })}
                      </div>
                    </div>
                    <div
                      className="admin px-3 py-4 mb-3 rounded-md"
                      style={{ backgroundColor: themeColorSet.colorBg2 }}
                    >
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        Admins
                      </div>
                      <div className="content">
                        {adminArr.map((item: any, index: number) => {
                          return (
                            <div className="item flex items-center px-2 py-2">
                              <Avatar src={item.userImage} />
                              <Space
                                size={1}
                                direction="vertical"
                                className="ml-2"
                                style={{ color: themeColorSet.colorText2 }}
                              >
                                <span style={{ fontWeight: 600, color: themeColorSet.colorText1 }}>{item.name}</span>
                                <span style={{ color: themeColorSet.colorText3 }}>{item.userName}</span>
                              </Space>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="member px-3 py-4 mb-3 rounded-md"
                      style={{ backgroundColor: themeColorSet.colorBg2 }}
                    >
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        Members
                      </div>
                      <div className="content">
                        {memberArr.map((item: any, index: number) => {
                          return (
                            <div className="item flex items-center px-2 py-2">
                              <Avatar src={item.userImage} />
                              <Space
                                size={1}
                                direction="vertical"
                                className="ml-2"
                                style={{ color: themeColorSet.colorText2 }}
                              >
                                <span style={{ fontWeight: 600, color: themeColorSet.colorText1 }}>{item.name}</span>
                                <span style={{ color: themeColorSet.colorText3 }}>{item.userName}</span>
                              </Space>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="rules px-3 py-4 mb-3 rounded-md"
                      style={{ backgroundColor: themeColorSet.colorBg2 }}
                    >
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        Rules
                      </div>
                      <Collapse>
                        <Panel header="1. About Data Analytics community" key="1">
                          <p>
                            A home of Data Analytics. Everything from data engineering, analytics engineering, data
                            warehousing, event tracking plan, BI platforms, visualizations, building report.
                          </p>
                        </Panel>
                        <Panel header="2. Rules of the community" key="2">
                          <p>
                            1. Stimulate conversation, and be respectful of others’ views. 2. We're a global dev
                            community: while the language for online discussions may be English (unless otherwise
                            specified), remember not everybody is a native English speaker/writer. 3. Don't take
                            yourself too seriously, we're here to have fun, learn, create, and explore the world of
                            community together. 4. Assume people hold good intentions 5. Seek to understand 6. Treat
                            others the way we wish to be treated. Above all, we work to keep conversation here kind,
                            educational, helpful, and resourceful — if we feel like something is putting the sanctity of
                            the community at risk, we will do our best to remove it.
                          </p>
                        </Panel>
                      </Collapse>
                    </div>
                    <div
                      className="recentlyJoined px-3 py-4 mb-3 rounded-md"
                      style={{ backgroundColor: themeColorSet.colorBg2 }}
                    >
                      <div className="title mb-2 text-lg" style={{ fontWeight: 600 }}>
                        Recently Joined
                      </div>
                      <div className="content">
                        {recentlyJoinedArr.map((item: any, index: number) => {
                          return (
                            <div className="item flex items-center px-2 py-2">
                              <Avatar src={item.userImage} />
                              <Space
                                size={1}
                                direction="vertical"
                                className="ml-2"
                                style={{ color: themeColorSet.colorText2 }}
                              >
                                <span style={{ fontWeight: 600, color: themeColorSet.colorText1 }}>{item.name}</span>
                                <span style={{ color: themeColorSet.colorText3 }}>{item.userName}</span>
                              </Space>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Community;