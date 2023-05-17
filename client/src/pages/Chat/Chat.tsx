import { ConfigProvider, Input, Popover, Skeleton, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFaceSmile, faMicrophone, faPaperclip, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import {
  BellOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom';
import ConversationList from '../../components/ChatComponent/ConversationList/ConversationList';
import EmptyChat from '../../components/ChatComponent/EmptyChat/EmptyChat';
import MessageChat from '../../components/ChatComponent/MessageChat/MessageChat';
import { useConversationsData, useCurrentConversationData, useFollowersData } from '../../util/functions/DataProvider';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import { messageService } from '../../services/MessageService';
import UploadComponent from '../../components/UploadComponent/UploadComponent';

const Chat = () => {
  const sharedMediaArr = [
    {
      id: 1,
      image: 'https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg',
    },
    {
      id: 2,
      image: 'https://mcdn.wallpapersafari.com/medium/16/69/rcj6Cz.jpg',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1614640384477-93219e3554a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80',
    },
    {
      id: 5,
      image:
        'https://c8.alamy.com/comp/E730KJ/beautiful-maple-with-nice-background-for-adv-or-others-purpose-use-E730KJ.jpg',
    },
  ];

  const sharedFileArr = [
    {
      id: 1,
      name: 'UARM.sketch',
      dateUpload: '04.20.21',
      size: '200MB',
      image: '/images/ChatPage/sketch.png',
    },
    {
      id: 2,
      name: 'pathlock.sketch',
      dateUpload: '04.20.21',
      size: '100MB',
      image: '/images/ChatPage/sketch.png',
    },
    {
      id: 3,
      name: 'pathlock_brandbook.pdf',
      dateUpload: '04.20.21',
      size: '20MB',
      image: '/images/ChatPage/pdf.png',
    },
  ];

  const sharedLinkArr = [
    {
      id: 1,
      name: 'Banking UI kit. Dark Mode',
      link: 'https://dribbble.com/shots/15473759-Banking-UI-kit-Dark-Mode',
      image:
        'https://cdn.dribbble.com/userupload/3266083/file/original-a5c1d162dc560491d47db23d39651f9c.png?compress=1&resize=1200x900',
    },
    {
      id: 2,
      name: 'Credit Cards Experiment',
      link: 'https://dribbble.com/shots/15473759-Banking-UI-kit-Dark-Mode',
      image:
        'https://cdn.dribbble.com/userupload/3187759/file/original-f4b18dbdf082fbde9dcd6fa11d36c68c.png?compress=1&resize=640x480&vertical=center',
    },
    {
      id: 3,
      name: 'The Batman - DC FanDome Teaser',
      link: 'https://youtube.com/watch?v=8W6x6Yi5x6c',
      image: 'https://media.vov.vn/sites/default/files/styles/large/public/2022-03/1_31.jpg',
    },
  ];

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();

  const { conversationID } = useParams();

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  const [message, setMessage] = useState('');

  const handleSubmit = async (data: any) => {
    if (!conversationID) return;
    if (!data) return;

    await messageService.sendMessage({
      conversationID,
      body: data,
    });

    setMessage('');
  };

  const { conversations, isLoadingConversations } = useConversationsData();

  const { followers, isLoadingFollowers } = useFollowersData(userID);

  const { currentConversation, isLoadingConversation } = useCurrentConversationData(
    conversationID ? conversationID : undefined,
  );

  const handleUpload = async (error: any, result: any, widget: any) => {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }

    await messageService.sendMessage({
      conversationID,
      image: result?.info?.secure_url,
    });
  };

  const [isDisplayShare, setIsDisplayShare] = useState(false);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        {isLoadingConversations || isLoadingFollowers ? (
          <div className="chat flex">
            <div
              className="slider flex flex-col justify-between items-center h-screen py-3"
              style={{
                width: '5%',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
              }}
            >
              <div className="logo">
                <Skeleton.Button active size="large" shape="circle" />
              </div>
              <div className="option">
                <Space size={30} direction="vertical">
                  <Skeleton.Button active size="large" shape="circle" />
                  <Skeleton.Button active size="large" shape="circle" />
                  <Skeleton.Button active size="large" shape="circle" />
                </Space>
              </div>
              <div className="mode">
                <Skeleton.Button active size="large" shape="circle" />
              </div>
            </div>
            <div
              className="insteadComponent"
              style={{
                marginLeft: '5%',
                width: '23%',
                height: '100vh',
                position: 'fixed',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <div
                className="searchChat h-screen"
                style={{
                  backgroundColor: themeColorSet.colorBg1,
                }}
              >
                <div
                  className="flex items-center w-full px-3 py-4"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '12%',
                  }}
                >
                  <Skeleton avatar paragraph={{ rows: 0 }} active />
                </div>
                <div
                  className="searchInput px-3 py-4 w-full flex justify-between items-center"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '11%',
                  }}
                >
                  <Skeleton.Button active size="large" block />
                </div>
                <div
                  className="userActive px-3 py-4 w-full"
                  style={{
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                    height: '20%',
                  }}
                >
                  <div className="listUser grid grid-cols-5 mt-5 ">
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                </div>
                <div className="listUser px-3 py-4">
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                </div>
              </div>
            </div>
            <div
              className="chatBox flex flex-col items-center px-4 py-6"
              style={{
                width: '49%',
                marginLeft: '28%',
                height: '100vh',
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <div
                style={{
                  height: 500,
                  width: '100%',
                }}
              >
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
                <Skeleton className="mt-8" active />
              </div>
            </div>
            <div
              className="shared"
              style={{
                width: '23%',
                height: '100vh',
                marginLeft: '77%',
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
              }}
            >
              <div
                className="extension px-3 flex items-center"
                style={{
                  height: '12%',
                  borderBottom: '1px solid',
                  borderColor: themeColorSet.colorBg4,
                }}
              >
                <div className="flex justify-center items-center w-full">
                  <div
                    className="setting text-center"
                    style={{
                      width: '25%',
                    }}
                  >
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                  <div
                    className="notification text-center"
                    style={{
                      width: '25%',
                    }}
                  >
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                  <div
                    className="warning text-center"
                    style={{
                      width: '25%',
                    }}
                  >
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                  <div
                    className="logout text-center"
                    style={{
                      width: '25%',
                    }}
                  >
                    <Skeleton.Button active size="large" shape="circle" />
                  </div>
                </div>
              </div>
              <div className="fileShare px-3 py-4">
                <div className="sharedMedia">
                  <Space className="content" size={20}>
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                    <Skeleton.Image active />
                  </Space>
                </div>
                <div className="sharedFile mt-5">
                  <div className="flex justify-between items-center mb-3"></div>
                  <div className="content">
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                    <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat flex">
            <div
              className="slider flex flex-col justify-between items-center h-screen py-3"
              style={{
                width: '5%',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
              }}
            >
              <div className="logo">
                <NavLink to="/" className="icon_logo">
                  <FontAwesomeIcon className="icon" icon={faSnowflake} />
                </NavLink>
              </div>
              <div className="option">
                <Space size={30} direction="vertical">
                  <div className="message optionItem">
                    <CommentOutlined className="text-2xl" />
                  </div>
                  <div className="Search optionItem">
                    <SearchOutlined className="text-2xl" />
                  </div>
                  <div className="Setting optionItem">
                    <SettingOutlined className="text-2xl" />
                  </div>
                </Space>
              </div>
              <div className="mode">
                <FontAwesomeIcon className="icon" icon={faSun} />
              </div>
            </div>
            <div
              className="insteadComponent"
              style={{
                marginLeft: '5%',
                width: '23%',
                height: '100vh',
                position: 'fixed',
                borderRight: '1px solid',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <ConversationList
                key={conversations[0]?.lastMessageAt}
                users={followers}
                initialItems={conversations}
                selected={conversationID}
              />
            </div>
            <div
              className="chatBox"
              style={{
                width: isDisplayShare ? '49%' : '72%',
                marginLeft: '28%',
                height: '100vh',
                position: 'fixed',
                backgroundColor: themeColorSet.colorBg1,
                borderRight: isDisplayShare ? '1px solid' : 'none',
                borderColor: themeColorSet.colorBg4,
              }}
            >
              {!conversationID ? (
                <EmptyChat key={Math.random()} />
              ) : isLoadingConversation ? (
                <>
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <Skeleton className="mt-8" active />
                  <div
                    className="shared"
                    style={{
                      width: '23%',
                      height: '100vh',
                      marginLeft: '77%',
                      position: 'fixed',
                      backgroundColor: themeColorSet.colorBg1,
                    }}
                  >
                    <div
                      className="extension px-3 flex items-center"
                      style={{
                        height: '12%',
                        borderBottom: '1px solid',
                        borderColor: themeColorSet.colorBg4,
                      }}
                    >
                      <div className="flex justify-center items-center w-full">
                        <div
                          className="setting text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="notification text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="warning text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                        <div
                          className="logout text-center"
                          style={{
                            width: '25%',
                          }}
                        >
                          <Skeleton.Button active size="large" shape="circle" />
                        </div>
                      </div>
                    </div>
                    <div className="fileShare px-3 py-4">
                      <div className="sharedMedia">
                        <Space className="content" size={20}>
                          <Skeleton.Image active />
                          <Skeleton.Image active />
                          <Skeleton.Image active />
                        </Space>
                      </div>
                      <div className="sharedFile mt-5">
                        <div className="flex justify-between items-center mb-3"></div>
                        <div className="content">
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                          <Skeleton className="mb-3" active avatar paragraph={{ rows: 1 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ height: '92%' }}>
                    <MessageChat
                      // key={conversations[0]?.lastMessageAt}
                      key={conversationID}
                      conversationId={conversationID}
                      setIsDisplayShare={setIsDisplayShare}
                      isDisplayShare={isDisplayShare}
                    />
                  </div>
                  <div
                    className="footer flex justify-between items-center"
                    style={{
                      height: '8%',
                    }}
                  >
                    <div
                      className="iconEmoji"
                      style={{
                        width: '5%',
                      }}
                    >
                      <Popover
                        placement="top"
                        trigger="click"
                        title={'Emoji'}
                        content={<Picker data={dataEmoji} onEmojiSelect={(emoji: any) => {}} />}
                      >
                        <span className="emoji">
                          <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faFaceSmile} />
                        </span>
                      </Popover>
                    </div>
                    <div
                      className="input"
                      style={{
                        width: '78%',
                      }}
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            controlHeight: 32,
                            lineWidth: 0,
                          },
                        }}
                      >
                        <Input
                          allowClear
                          placeholder="Write a message"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.currentTarget.value);
                          }}
                          onPressEnter={(e) => {
                            handleSubmit(e.currentTarget.value);
                          }}
                        />
                      </ConfigProvider>
                    </div>
                    <Space
                      className="extension text-center"
                      style={{
                        width: '12%',
                      }}
                    >
                      <UploadComponent onUpload={handleUpload}>
                        <div className="upload">
                          <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faPaperclip} />
                        </div>
                      </UploadComponent>
                      <div className="micro">
                        <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faMicrophone} />
                      </div>
                    </Space>
                  </div>
                </>
              )}
            </div>
            {isDisplayShare ? (
              <div
                className="shared"
                style={{
                  width: '23%',
                  height: '100vh',
                  marginLeft: '77%',
                  position: 'fixed',
                  backgroundColor: themeColorSet.colorBg1,
                }}
              >
                <div
                  className="extension px-3 flex items-center"
                  style={{
                    height: '12%',
                    borderBottom: '1px solid',
                    borderColor: themeColorSet.colorBg4,
                  }}
                >
                  <div className="flex justify-center items-center w-full">
                    <div
                      className="setting text-center"
                      style={{
                        width: '25%',
                      }}
                    >
                      <SettingOutlined
                        className="extensionItem"
                        style={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </div>
                    <div
                      className="notification text-center"
                      style={{
                        width: '25%',
                      }}
                    >
                      <BellOutlined
                        className="extensionItem"
                        style={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </div>
                    <div
                      className="warning text-center"
                      style={{
                        width: '25%',
                      }}
                    >
                      <ExclamationCircleOutlined
                        className="extensionItem"
                        style={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </div>
                    <div
                      className="logout text-center"
                      style={{
                        width: '25%',
                      }}
                    >
                      <LogoutOutlined
                        className="extensionItem"
                        style={{
                          fontSize: '1.5rem',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="fileShare px-3 py-4">
                  <div className="sharedMedia">
                    <div className="flex justify-between items-center mb-2">
                      <div className="titleContent font-bold">Shared Media</div>
                      <div
                        className="seeAll"
                        style={{
                          color: themeColorSet.colorText3,
                          fontSize: '0.8rem',
                          textDecoration: 'underline',
                        }}
                      >
                        See All
                      </div>
                    </div>
                    <div className="content flex justify-between items-center">
                      {sharedMediaArr.map((item: any, index: any) => {
                        return (
                          <div
                            className="imageContent p-2"
                            key={index}
                            style={{
                              width: '20%',
                            }}
                          >
                            <img
                              className="w-full h-full"
                              src={item.image}
                              alt=""
                              style={{
                                height: '4rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sharedFile mt-5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="titleContent font-bold">Shared Files</div>
                      <div
                        className="seeAll"
                        style={{
                          color: themeColorSet.colorText3,
                          fontSize: '0.8rem',
                          textDecoration: 'underline',
                        }}
                      >
                        See All
                      </div>
                    </div>
                    <div className="content">
                      {sharedFileArr.map((item: any, index: any) => {
                        return (
                          <div className="fileContent flex justify-between items-center mb-2 cursor-pointer">
                            <div className="left flex justify-between items-center">
                              <div
                                className="image px-3 py-3 mr-2"
                                style={{
                                  border: '1px solid',
                                  borderColor: themeColorSet.colorBg4,
                                  borderRadius: '10px',
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="file"
                                  style={{
                                    width: '1.8rem',
                                    height: '1.8rem',
                                  }}
                                />
                              </div>
                              <Space className="info" direction="vertical">
                                <div
                                  className="name"
                                  style={{
                                    color: themeColorSet.colorText1,
                                    fontWeight: '600',
                                  }}
                                >
                                  {item.name}
                                </div>
                                <Space
                                  style={{
                                    color: themeColorSet.colorText3,
                                  }}
                                >
                                  <div className="date">{item.dateUpload}</div>
                                  <div className="dot">•</div>
                                  <div className="size">{item.size}</div>
                                </Space>
                              </Space>
                            </div>
                            <div className="right">
                              <FontAwesomeIcon icon={faDownload} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sharedLink mt-5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="titleContent font-bold">Shared Links</div>
                      <div
                        className="seeAll"
                        style={{
                          color: themeColorSet.colorText3,
                          fontSize: '0.8rem',
                          textDecoration: 'underline',
                        }}
                      >
                        See All
                      </div>
                    </div>
                    <div className="content">
                      {sharedLinkArr.map((item: any, index: any) => {
                        return (
                          <div className="fileContent flex items-center mb-2 cursor-pointer">
                            <div
                              className="image mr-2"
                              style={{
                                width: '3.5rem',
                              }}
                            >
                              <img
                                src={item.image}
                                alt="link"
                                style={{
                                  height: '3.5rem',
                                  borderRadius: '10px',
                                }}
                              />
                            </div>
                            <Space className="link" direction="vertical">
                              <div
                                className="name"
                                style={{
                                  color: themeColorSet.colorText1,
                                  fontWeight: '600',
                                }}
                              >
                                {item.name}
                              </div>
                              <div
                                className="linkContent"
                                style={{
                                  color: themeColorSet.colorText3,
                                  fontSize: '0.9rem',
                                }}
                              >
                                {item.link?.length > 35 ? item.link?.slice(0, 35) + '...' : item.link}
                              </div>
                            </Space>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Chat;
