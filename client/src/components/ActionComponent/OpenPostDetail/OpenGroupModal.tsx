import { Button, ConfigProvider } from 'antd';
import { useState, useMemo, useLayoutEffect, useCallback } from 'react';
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
  const [membersGroup, setMembersGroup] = useState([]);
  const [name, setName] = useState('');

  const handleSetName = (name: any) => {
    setName(name);
  };

  const handleSetMembersGroup = (members: any) => {
    setMembersGroup(members);
  };

  const onSubmit = useCallback(() => {
    console.log(name, membersGroup);
    if (name.length === 0) {
      return;
    }

    if (membersGroup.length < 2) {
      return;
    }

    setIsLoading(true);

    messageService
      .createConversation({ users: membersGroup, name, isGroup: true })
      .then(() => {
        setIsLoading(false);
        dispatch(closeModal());
        setMembersGroup([]);
      })
      .catch(() => console.log('error'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [name, membersGroup]);

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
            setMembersGroup([]);
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
