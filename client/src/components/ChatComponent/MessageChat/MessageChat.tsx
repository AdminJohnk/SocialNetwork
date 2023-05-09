import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';
import { ConfigProvider } from 'antd';
import StyleTotal from './cssMessageChat';
import AvatarGroup from '../../Avatar/AvatarGroup';
import OtherUser from '../../../util/functions/OtherUser';
import Avatar from '../../Avatar/Avatar';
import MessageBox from '../MessageBox/MessageBox';
import { pusherClient } from '../../../util/functions/Pusher';
import { find } from 'lodash';
import { GET_MESSAGES_SAGA, SEEN_MESSAGE_SAGA } from '../../../redux/actionSaga/MessageActionSaga';
import { useCurrentConversationData, useMessagesData } from '../../../util/functions/DataProvider';
import { messageService } from '../../../services/MessageService';
import useIntersectionObserver from '../../../util/functions/useIntersectionObserver';

interface IParams {
  conversationId: string;
}

const MessageChat = (Props: IParams) => {
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GET_MESSAGES_SAGA(Props.conversationId));
  // }, [Props.conversationId]);

  const { members } = useSelector((state: any) => state.activeListReducer);
  // const { currentConversation } = useSelector((state: any) => state.conversationReducer);
  // const { messages } = useSelector((state: any) => state.conversationReducer);

  const { currentConversation, isLoadingConversation } = useCurrentConversationData(Props.conversationId);

  const { messages, isLoadingMessages } = useMessagesData(Props.conversationId);

  const otherUser = OtherUser(currentConversation);

  const isActive = members?.indexOf(otherUser?._id!) !== -1;

  const statusText = useMemo(() => {
    if (currentConversation.isGroup) {
      return `${currentConversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [currentConversation, isActive]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [messagesState, setMessagesState] = useState([]);

  const seenMessage = async () => {
    await messageService.seenMessage(Props.conversationId);
  };

  useEffect(() => {
    if (isLoadingMessages) return;
    setMessagesState(messages);
  }, [isLoadingMessages]);

  useEffect(() => {
    pusherClient.subscribe(Props.conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = async (message: any) => {
      seenMessage();

      setMessagesState((current: any) => {
        if (find(current, { _id: message._id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: any) => {
      setMessagesState((current: any) =>
        current.map((currentMessage: any) => {
          if (currentMessage._id === newMessage._id) {
            return newMessage;
          }

          return currentMessage;
        }),
      );
    };

    pusherClient.bind('new-message', messageHandler);
    pusherClient.bind('message-update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(Props.conversationId);
      pusherClient.unbind('new-message', messageHandler);
      pusherClient.unbind('message-update', updateMessageHandler);
    };
  }, [Props.conversationId, messages, messagesState]);

  useIntersectionObserver(bottomRef, seenMessage);

  return (
    <>
      <div
        className="header flex justify-between items-center py-6 px-6"
        style={{
          height: '12%',
          borderBottom: '1px solid',
          borderColor: themeColorSet.colorBg4,
        }}
      >
        <div className="flex gap-3 items-center">
          {currentConversation.isGroup ? (
            <AvatarGroup users={currentConversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{currentConversation.name || otherUser.username}</div>
            <div className="text-sm font-light text-neutral-500">{statusText}</div>
          </div>
        </div>
      </div>
      <div
        className="body px-3"
        style={{
          height: '80%',
          overflow: 'auto',
        }}
      >
        <div className="flex-1 overflow-y-auto">
          {messagesState?.length !== 0 &&
            messagesState?.map((message: any, i: any) => (
              <MessageBox isLast={i === messagesState.length - 1} key={message._id} data={message} />
            ))}
          <div className="pt-12" ref={bottomRef} />
        </div>
      </div>
    </>
  );
};

export default MessageChat;
