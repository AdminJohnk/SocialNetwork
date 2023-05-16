import { Button } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { messageService } from '../../../services/MessageService';
import { useDispatch } from 'react-redux';
import GroupChatModal from '../../ChatComponent/GroupChatModal/GroupChatModal';
import { closeModal, openModal } from '../../../redux/Slice/ModalHOCSlice';

interface Props {
  users: [];
}

const OpenGroupModal = (Props: Props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [membersGroup, setMembersGroup] = useState([]);
  const [name, setName] = useState('');

  const [key, setKey] = useState(Math.random());

  const handleSetName = (name: string) => {
    setName(name);
  };

  const handleSetMembersGroup = (members: []) => {
    setMembersGroup(members);
  };

  const componentMemorized = useMemo(
    () => <GroupChatModal key={key} setName={handleSetName} setValue={handleSetMembersGroup} users={Props.users} />,
    [key, name, membersGroup],
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
        <Button loading={isLoading} type="primary" onClick={() => onSubmit()}>
          Create
        </Button>
      </div>
    ),
    [isLoading],
  );

  const onSubmit = () => {
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
  };

  useEffect(() => {
    setKey(Math.random());
  }, []);

  useEffect(() => {
    dispatch(
      openModal({
        title: 'Create a new group chat',
        component: componentMemorized,
        footer: footerMemorized,
      }),
    );
  }, [componentMemorized, footerMemorized]);

  return <></>;
};

export default OpenGroupModal;
