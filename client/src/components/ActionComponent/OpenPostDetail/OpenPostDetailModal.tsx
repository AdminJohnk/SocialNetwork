import { Avatar, ConfigProvider, Input, Popover, Button } from 'antd';
import React, { useMemo, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/Slice/ModalHOCSlice';
import { getTheme } from '../../../util/functions/ThemeFunction';
import PostDetailModal from '../../Form/PostDetail/PostDetail';
import StyleTotal from './cssOpenPostDetailModal';
import dataEmoji from '@emoji-mart/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from '@emoji-mart/react';
import {
  SAVE_COMMENT_POSTSHARE_SAGA,
  SAVE_COMMENT_SAGA,
  SAVE_REPLY_SAGA,
  SAVE_REPLY_POSTSHARE_SAGA,
  GET_POSTSHARE_BY_ID_SAGA,
  GET_POST_BY_ID_SAGA,
} from '../../../redux/actionSaga/PostActionSaga';

interface PostProps {
  post: any;
  userInfo: any;
  postShare?: any;
  owner?: any;
}

const OpenPostDetailModal = (PostProps: PostProps) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [commentContent, setCommentContent] = useState('');

  useLayoutEffect(() => {
    if (PostProps.postShare) {
      dispatch(GET_POSTSHARE_BY_ID_SAGA({ id: PostProps.post._id }));
    } else {
      dispatch(GET_POST_BY_ID_SAGA({ id: PostProps.post._id }));
    }
  }, [PostProps.post, PostProps.postShare]);

  const [data, setData] = useState<any>({ isReply: false, idComment: null });

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const handleData = (data: any) => {
    setData(data);
  };

  const handleComment = (content: any) => {
    setCommentContent(content);
  };

  const handleSubmitComment = () => {
    if (PostProps.postShare) {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_POSTSHARE_SAGA({
            id: post?._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          }),
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_POSTSHARE_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: post?._id,
          }),
        );
      }
    } else {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_SAGA({
            id: post?._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          }),
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: post?._id,
          }),
        );
      }
    }
    setTimeout(() => {
      setCommentContent('');
    }, 1000);
  };

  const checkEmpty = () => {
    if (commentContent === '') {
      return true;
    } else {
      return false;
    }
  };

  const memoizedComponent = useMemo(
    () => (
      <PostDetailModal
        onData={handleData}
        post={post}
        userInfo={userInfo}
        data={data}
        postShare={PostProps.postShare}
        owner={PostProps.owner}
      />
    ),
    [post, userInfo, data],
  );

  const memoizedInputComment = useMemo(
    () => (
      <div className="commentInput text-right flex items-center">
        <Avatar className="mr-2" size={40} src={userInfo?.userImage} />
        <div className="input w-full">
          <Input
            value={commentContent}
            placeholder="Add a Comment"
            // allowClear
            onChange={(e) => {
              handleComment(e.target.value);
            }}
            style={{
              borderColor: themeColorSet.colorText3,
            }}
            maxLength={150}
            addonAfter={
              <Popover
                placement="right"
                trigger="click"
                title={'Emoji'}
                content={
                  <Picker
                    data={dataEmoji}
                    onEmojiSelect={(emoji: any) => {
                      handleComment(commentContent + emoji.native);
                    }}
                  />
                }
              >
                <span
                  className="emoji cursor-pointer hover:text-blue-700"
                  style={{
                    transition: 'all 0.3s',
                  }}
                >
                  <FontAwesomeIcon className="item mr-3 ml-3" size="lg" icon={faFaceSmile} />
                </span>
              </Popover>
            }
          ></Input>
          <span
            className="sendComment cursor-pointer hover:text-blue-700"
            {...(checkEmpty()
              ? {
                  style: {
                    color: 'gray',
                    //hover disabled
                    cursor: 'not-allowed',
                  },
                }
              : { transition: 'all 0.3s' })}
            onClick={handleSubmitComment}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </div>
      </div>
    ),
    [commentContent],
  );

  useLayoutEffect(() => {
    dispatch(
      openModal({
        title: 'The post of ' + userInfo?.username,
        component: memoizedComponent,
        footer: (
          <ConfigProvider>
            <StyleTotal theme={themeColorSet}>{memoizedInputComment}</StyleTotal>
          </ConfigProvider>
        ),
      }),
    );
  }, [memoizedComponent, memoizedInputComment]);

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

export default OpenPostDetailModal;
