import { Image } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar';
import format from 'date-fns/format';
import { getTheme } from '../../../util/functions/ThemeFunction';

interface MessageBoxProps {
  data: any;
  isLast?: boolean;
}

const MessageBox = (Props: MessageBoxProps) => {
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const isOwn = userInfo.id === Props.data.sender._id;
  const seenList = (Props.data.seen || [])
    .filter((user: any) => user._id !== Props.data?.sender?._id)
    .map((user: any) => user.lastname + ' ' + user.firstname)
    .join(', ');

  const container = `flex gap-3 p-4 ${isOwn && 'justify-end'}`;
  const avatar = `mt-3 ${isOwn && 'order-2'}`;
  const body = `flex flex-col gap-2', ${isOwn && 'items-end'}`;
  const message = `text-sm w-fit overflow-hidden break-all
    ${Props.data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'}
    ${
      isOwn && !Props.data.image ? 'bg-sky-500 text-white ml-7' : Props.data.image ? '' : 'bg-gray-700 text-white mr-7'
    }`;

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar key={Props.data.sender._id} user={Props.data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 mb-1">
          <div
            className={`text-sm `}
            style={{
              color: themeColorSet.colorText1,
            }}
          >
            {Props.data.sender.lastname + ' ' + Props.data.sender.firstname}
          </div>
          <div
            className={`text-xs`}
            style={{
              color: themeColorSet.colorText2,
            }}
          >
            {format(new Date(Props?.data?.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {Props.data.image ? (
            <Image
              alt="Image"
              src={Props.data.image}
              draggable={false}
              className="object-contain cursor-pointer"
              style={{
                borderRadius: '2rem',
                border: '0.2px solid',
                maxHeight: '288px',
                maxWidth: '512px',
              }}
            />
          ) : (
            <div>{Props.data.body}</div>
          )}
        </div>
        {Props.isLast && isOwn && seenList.length > 0 && (
          <div
            className={`mt-3 text-xs font-light`}
            style={{
              color: themeColorSet.colorText3,
            }}
          >{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
