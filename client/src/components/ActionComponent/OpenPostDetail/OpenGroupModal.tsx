import { Button, ConfigProvider } from 'antd';
import { useState, useMemo, useLayoutEffect, useEffect } from 'react';
import { messageService } from '../../../services/MessageService';
import { useDispatch, useSelector } from 'react-redux';
import GroupChatModal from '../../ChatComponent/GroupChatModal/GroupChatModal';
import { closeModal, openModal } from '../../../redux/Slice/ModalHOCSlice';
import StyleTotal from './cssOpenPostDetailModal';
import { getTheme } from '../../../util/functions/ThemeFunction';
interface Props {
  users: [];
}

const OpenGroupModal = (Props: Props) => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [membersGroup, SetMembersGroup] = useState<any>();
  let [name, setGroupName] = useState<any>();

  const handleSetName = (newName: any) => {
    if (!newName) return;
    console.log(newName);
    setGroupName(() => {
      name = newName;
    });
    console.log(name);
  };

  const handleSetMembersGroup = (members: any) => {
    // console.log(members);
    SetMembersGroup(members);
  };

  const onSubmit = () => {
    console.log(name, membersGroup);
    if (!name || !membersGroup || membersGroup.length < 2) {
      return;
    }

    setIsLoading(true);

    messageService
      .createConversation({ users: membersGroup, name, isGroup: true })
      .then(() => {
        setIsLoading(false);
        dispatch(closeModal());
      })
      .catch(() => console.log('error'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const componentMemorized = useMemo(
    () => (
      <GroupChatModal
        name={name}
        setName={handleSetName}
        value={membersGroup}
        setValue={handleSetMembersGroup}
        users={Props.users}
      />
    ),
    [name, membersGroup],
  );

  const footerMemorized = useMemo(
    () => (
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          disabled={isLoading}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>
        <Button loading={isLoading} type="primary" onClick={onSubmit}>
          Create
        </Button>
      </div>
    ),
    [isLoading, name, membersGroup],
  );

  useLayoutEffect(() => {
    dispatch(
      openModal({
        title: 'Create a new group chat',
        component: componentMemorized,
        footer: footerMemorized,
      }),
    );
  }, [componentMemorized, footerMemorized]);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div></div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default OpenGroupModal;
