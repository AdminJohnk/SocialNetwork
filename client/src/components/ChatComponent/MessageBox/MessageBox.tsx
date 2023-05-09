import { Image } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar';
import format from 'date-fns/format';

interface MessageBoxProps {
  data: any;
  isLast?: boolean;
}

const MessageBox = (Props: MessageBoxProps) => {
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const isOwn = userInfo.id === Props.data.sender._id;
  const seenList = (Props.data.seen || [])
    .filter((user: any) => user._id !== Props.data?.sender?._id)
    .map((user: any) => user.lastname + ' ' + user.firstname)
    .join(', ');

  const container = `flex gap-3 p-4 ${isOwn && 'justify-end'}`;
  const avatar = `${isOwn && 'order-2'}`;
  const body = `'flex flex-col gap-2', ${isOwn && 'items-end'}`;
  const message = `'text-sm w-fit overflow-hidden'
    ${isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100'}
    ${Props.data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'}`;

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={Props.data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{Props.data.sender.name}</div>
          <div className="text-xs text-gray-400">{format(new Date(Props?.data?.createdAt), 'p')}</div>
        </div>
        <div className={message}>
          {Props.data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={Props.data.image}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{Props.data.body}</div>
          )}
        </div>
        {Props.isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
