import { Image } from 'antd';
import { useSelector } from 'react-redux';

interface AvatarProps {
  user?: any;
}

const Avatar = (Props: AvatarProps) => {
  const { members } = useSelector((state: any) => state.activeListReducer);
  const isActive = members?.indexOf(Props.user?.id ? Props.user?.id : Props.user._id) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image preview={false} src={Props.user?.userImage || './images/DefaultAvatar/default_avatar.png'} alt="Avatar" />
      </div>
      {isActive ? (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      ) : null}
    </div>
  );
};

export default Avatar;
