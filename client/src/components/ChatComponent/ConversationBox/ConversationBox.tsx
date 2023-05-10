import { useSelector } from 'react-redux';
import OtherUser from '../../../util/functions/OtherUser';
import { useMemo } from 'react';
import { format } from 'date-fns';
import AvatarGroup from '../../Avatar/AvatarGroup';
import Avatar from '../../Avatar/Avatar';
import { getTheme } from '../../../util/functions/ThemeFunction';

interface ConversationBoxProps {
  data: any;
  selected?: boolean;
}

const ConversationBox = (Props: ConversationBoxProps) => {
  const otherUser = OtherUser(Props.data);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const lastMessage = useMemo(() => {
    const messages = Props.data.messages || [];

    return messages[messages.length - 1];
  }, [Props.data.messages]);

  const isOwn = userInfo.id === lastMessage?.sender._id;

  const userID = useMemo(() => {
    return userInfo.id;
  }, [userInfo]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArr = lastMessage.seen || [];

    if (!userID) return false;

    return seenArr.indexOf(userID) !== -1;
  }, [lastMessage, userID]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent an image';

    if (lastMessage?.body) return lastMessage.body;

    return 'Start a conversation';
  }, [lastMessage, userID]);

  return (
    <div
      className={`w-full relative flex items-center space-x-3 my-3 p-3 hover:bg-neutral-100rounded-lg transition cursor-pointer ${
        Props.selected ? themeColorSet.colorBg3 : themeColorSet.colorBg2
      }`}
    >
      {Props.data.isGroup ? <AvatarGroup users={Props.data.users} /> : <Avatar user={otherUser} />}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p
              className={`text-md font-medium`}
              style={{
                color: themeColorSet.colorText1,
              }}
            >
              {Props.data.name || otherUser.username}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={`truncate text-sm ${hasSeen ? themeColorSet.colorText1 : themeColorSet.colorText2}`}>
            {isOwn ? `You: ${lastMessageText}` : lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;