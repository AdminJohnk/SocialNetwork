import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';
import { Badge, ConfigProvider, Input, Space } from 'antd';
import StyleTotal from './cssConversationList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble, faPlus } from '@fortawesome/free-solid-svg-icons';
import { commonColor } from '../../../util/cssVariable/cssVariable';
import { SearchOutlined } from '@ant-design/icons';
import { pusherClient } from '../../../util/functions/Pusher';
import Avatar from '../../Avatar/Avatar';
import { find } from 'lodash';
import { CREATE_CONVERSATION_SAGA } from '../../../redux/actionSaga/MessageActionSaga';

interface ConversationListProps {
  initialItems: any;
  users: [];
  title?: string;
}

const SearchChat = (Props: ConversationListProps) => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();

  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const { members } = useSelector((state: any) => state.activeListReducer);

  const [items, setItems] = useState(Props.initialItems);

  console.log('items', items);

  const pusherKey = useMemo(() => {
    return userInfo?.id;
  }, [userInfo]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: any) => {
      setItems((current: any) =>
        current.map((currentConversation: any) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        }),
      );
    };

    const newHandler = (conversation: any) => {
      setItems((current: any) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: any) => {
      setItems((current: any) => {
        return [...current.filter((convo: any) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind('conversation-update', updateHandler);
    pusherClient.bind('new-conversation', newHandler);
    pusherClient.bind('conversation-remove', removeHandler);
  }, [pusherKey]);

  const HandleOnClick = (item: any) => {
    dispatch(
      CREATE_CONVERSATION_SAGA({
        users: [item, userInfo._id ? userInfo._id : userInfo.id],
      }),
    );
  };

  const formatUsername = (username: any) => {
    const MAX_LENGTH = 14; // maximum length of username on one line
    const words = username.split(' ');
    let lines = [];
    let currentLine = '';

    // add each word to a line, breaking onto new line if line is too long
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentLine.length + word.length > MAX_LENGTH) {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    }

    // add any remaining words to the last line
    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }

    // return the formatted username
    return lines.join('\n');
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="searchChat h-screen">
          <Space
            className="myInfo flex items-center py-4 px-3"
            style={{
              borderBottom: '1px solid',
              borderColor: themeColorSet.colorBg4,
              height: '12%',
            }}
          >
            <div className="avatar relative">
              <Avatar user={userInfo} />
            </div>
            <div className="name_career">
              <div
                className="name mb-1"
                style={{
                  color: themeColorSet.colorText1,
                  fontWeight: 600,
                }}
              >
                {userInfo.username}
              </div>
              <div
                className="career"
                style={{
                  color: themeColorSet.colorText3,
                }}
              >
                UX/UI Designer
              </div>
            </div>
          </Space>
          <div
            className="searchInput px-3 py-4 w-full flex justify-between items-center"
            style={{
              borderBottom: '1px solid',
              borderColor: themeColorSet.colorBg4,
              height: '11%',
            }}
          >
            <div className="input flex items-center w-full">
              <div
                className="iconSearch mr-2"
                style={{
                  color: themeColorSet.colorText3,
                }}
              >
                <SearchOutlined className="text-2xl" />
              </div>
              <ConfigProvider
                theme={{
                  token: {
                    lineWidth: 0,
                    controlHeight: 40,
                    // borderRadius: 0,
                    colorBgBase: 'transparent',
                  },
                }}
              >
                <Input
                  placeholder="Search"
                  className="mr-4"
                  style={{
                    width: '90%',
                  }}
                />
              </ConfigProvider>
            </div>
            <div className="iconPlus">
              <FontAwesomeIcon className="text-xl" icon={faPlus} />
            </div>
          </div>
          <div
            className="userActive px-3 py-4 w-full"
            style={{
              borderBottom: '1px solid',
              borderColor: themeColorSet.colorBg4,
              height: '20%',
            }}
          >
            <div
              className="title"
              style={{
                fontWeight: 600,
              }}
            >
              People
            </div>
            <div className="listUser flex mt-3">
              {Props.users.map((item: any, index: number) => {
                return (
                  <div
                    className="user flex flex-col justify-center items-center mr-10 cursor-pointer"
                    key={index}
                    onClick={() => HandleOnClick(item._id)}
                  >
                    <div className="avatar relative">
                      <Avatar user={item} />
                    </div>
                    <div
                      className="name text-center mt-2"
                      style={{
                        fontSize: '0.9rem',
                      }}
                    >
                      {formatUsername(item.username)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="userChat"
            style={{
              height: '57%',
              overflow: 'auto',
            }}
          >
            {/* {userChatArray.map((item, index) => {
              return (
                <div className="userItem flex justify-between items-center py-4 px-3" key={index}>
                  <div
                    className="avatar_info flex items-center"
                    style={{
                      width: '70%',
                    }}
                  >
                    <div className="avatar relative">
                      <Avatar size={40} src={item.avatar} />
                      {item.active && (
                        <span
                          className="dot"
                          style={{
                            width: '7px',
                            height: '7px',
                            backgroundColor: commonColor.colorGreen1,
                            display: 'inline-block',
                            borderRadius: '50%',
                            position: 'absolute',
                            right: '0px',
                            bottom: '0px',
                          }}
                        ></span>
                      )}
                    </div>
                    <div className="info ml-4">
                      <div
                        className="name mb-1"
                        style={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="lastMessage"
                        style={{
                          color: themeColorSet.colorText3,
                          fontSize: '0.9rem',
                        }}
                      >
                        {!item.getMessage ? (
                          item.lastMessage.length > 20 ? (
                            <>
                              <span
                                style={{
                                  color: themeColorSet.colorText1,
                                }}
                              >
                                You:{' '}
                              </span>
                              <span>{item.lastMessage.slice(0, 20) + '...'}</span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{
                                  color: themeColorSet.colorText1,
                                }}
                              >
                                You:{' '}
                              </span>
                              <span>{item.lastMessage}</span>
                            </>
                          )
                        ) : item.lastMessage.length > 20 ? (
                          <span>{item.lastMessage.slice(0, 20) + '...'}</span>
                        ) : (
                          <span>{item.lastMessage}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="time_read"
                    style={{
                      width: '22%',
                    }}
                  >
                    <div
                      className="time text-right"
                      style={{
                        color: themeColorSet.colorText3,
                        fontSize: '0.9rem',
                      }}
                    >
                      {item.time}
                    </div>
                    <div className="read text-right">
                      {item.getMessage && item.unread > 0 ? (
                        <span
                          className="numberUnread"
                          style={{
                            color: themeColorSet.colorText1,
                            fontSize: '0.7rem',
                            width: '17px',
                            height: '17px',
                            lineHeight: '17px',
                            backgroundColor: commonColor.colorBlue1,
                            display: 'inline-block',
                            textAlign: 'center',
                            borderRadius: '50%',
                          }}
                        >
                          {item.unread}
                        </span>
                      ) : item.getMessage && item.unread === 0 ? (
                        ''
                      ) : !item.getMessage && !item.userRead ? (
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCheck}
                          style={{
                            color: commonColor.colorGreen1,
                            fontSize: '0.8rem',
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-xl"
                          icon={faCheckDouble}
                          style={{
                            color: commonColor.colorGreen1,
                            fontSize: '0.8rem',
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })} */}
          </div>
          <div className="listUser"></div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default SearchChat;
