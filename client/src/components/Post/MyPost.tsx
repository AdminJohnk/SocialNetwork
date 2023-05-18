import {
  faBookmark,
  faComment,
  faUpRightFromSquare,
  faEllipsis,
  faHeart,
  faPenToSquare,
  faShare,
  faShareNodes,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, ConfigProvider, Divider, Dropdown, Space, Modal, notification } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getTheme } from '../../util/functions/ThemeFunction';
import StyleTotal from './cssPost';
import { commonColor } from '../../util/cssVariable/cssVariable';

import {
  DELETE_POST_SAGA,
  LIKE_POST_SAGA,
  SHARE_POST_SAGA,
  SAVE_POST_SAGA,
  INCREASE_VIEW_SAGA,
} from '../../redux/actionSaga/PostActionSaga';
import { openDrawer } from '../../redux/Slice/DrawerHOCSlice';
import EditPostForm from '../Form/EditPostForm/EditPostForm';
import OpenMyPostDetailModal from '../ActionComponent/OpenPostDetail/OpenMyPostDetailModal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import useIntersectionObserver from '../../util/functions/useIntersectionObserver';
import 'highlight.js/styles/monokai-sublime.css';

interface PostProps {
  post: any;
  userInfo: any;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

// -----------------------------------------------------

const MyPost = (PostProps: PostProps) => {
  const link = PostProps.post.link;

  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // ------------------------ Like ------------------------

  // Like Number
  const [likeNumber, setLikeNumber] = useState(PostProps.post?.likes?.length);
  useEffect(() => {
    setLikeNumber(PostProps.post?.likes?.length);
  }, [PostProps.post?.likes?.length]);

  // Like color
  const [likeColor, setLikeColor] = useState('white');
  useEffect(() => {
    PostProps.post?.isLiked ? setLikeColor('red') : setLikeColor('white');
  }, [PostProps.post?.isLiked]);

  // isLiked
  const [isLiked, setIsLiked] = useState(true);
  useEffect(() => {
    setIsLiked(PostProps.post?.isLiked);
  }, [PostProps.post?.isLiked]);

  // ------------------------ Share ------------------------

  // Share Number
  const [shareNumber, setShareNumber] = useState(PostProps.post?.shares?.length);
  useEffect(() => {
    setShareNumber(PostProps.post?.shares?.length);
  }, [PostProps.post?.shares?.length]);

  // Share color
  const [shareColor, setShareColor] = useState('white');
  useEffect(() => {
    PostProps.post?.isShared ? setShareColor('blue') : setShareColor('white');
  }, [PostProps.post?.isShared]);

  // isShared
  const [isShared, setIsShared] = useState(true);
  useEffect(() => {
    setIsShared(PostProps.post?.isShared);
  }, [PostProps.post?.isShared]);

  // ------------------------ Save ------------------------

  // isSaved
  const [isSaved, setIsSaved] = useState(true);
  useEffect(() => {
    setIsSaved(PostProps.post?.isSaved);
  }, [PostProps.post?.isSaved]);

  // Save color
  const [saveColor, setSaveColor] = useState('white');
  useEffect(() => {
    PostProps.post?.isSaved ? setSaveColor('yellow') : setSaveColor('white');
  }, [PostProps.post?.isSaved]);

  const createdAt = new Date(PostProps.post?.createdAt);
  //format date to get full date
  const date = createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      DELETE_POST_SAGA({
        id: PostProps.post?._id,
      }),
    );
    setIsModalOpen(false);
    openNotificationWithIcon('success');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // post setting
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faUpRightFromSquare} />
          <span className="ml-2">Open post in new tab</span>
        </div>
      ),
      onClick: () => {
        window.open(`http://localhost:3000/post/${PostProps.post?._id}`, '_blank')?.focus();
      },
    },
    {
      key: '2',
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faPenToSquare} />
          <span className="ml-2">Edit Post</span>
        </div>
      ),
      onClick: () => {
        dispatch(
          openDrawer({
            title: 'Edit Post',
            component: (
              <EditPostForm
                key={Math.random()}
                id={PostProps.post?._id}
                title={PostProps.post?.title}
                content={PostProps.post?.content}
                img={PostProps.post?.url}
              />
            ),
          }),
        );
      },
    },
    {
      key: '3',
      label: (
        <div key="3" className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faTrash} />
          <span className="ml-2">Delete Post</span>
        </div>
      ),
      onClick: () => {
        showModal();
      },
    },
  ];

  // Notification delete post
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Delete Successfully',
      placement: 'bottomRight',
    });
  };

  // Open PostDetailModal
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);

  const { visible } = useSelector((state: any) => state.modalHOCReducer);

  useEffect(() => {
    if (!visible && isOpenPostDetail) {
      setIsOpenPostDetail(!isOpenPostDetail);
    }
  }, [visible]);

  function removeCode(htmlString: any): any {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const elements = doc.getElementsByClassName('ql-syntax');
    while (elements.length > 0) elements[0].remove();
    return doc.body.innerHTML;
  }

  const [expanded, setExpanded] = useState(false);

  const displayContent =
    expanded || PostProps.post?.content?.length <= 250
      ? PostProps.post?.content
      : removeCode(PostProps.post?.content)?.slice(0, 250) + '...';

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // ------------------------ View ------------------------
  const postRef = React.useRef(null);

  const onIntersect = () => {
    dispatch(
      INCREASE_VIEW_SAGA({
        id: PostProps.post?._id,
      }),
    );
  };

  useIntersectionObserver(postRef, onIntersect);

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      {contextHolder}
      <Modal
        title={
          <>
            <FontAwesomeIcon
              className="icon mr-2"
              icon={faTriangleExclamation}
              style={{ color: commonColor.colorWarning1 }}
            />
            <span>Are you sure delete this post?</span>
          </>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: commonColor.colorBlue1,
          },
        }}
        cancelButtonProps={{
          style: {
            color: themeColorSet.colorText1,
            backgroundColor: themeColorSet.colorBg3,
          },
        }}
      >
        <p>You will not be able to recover files after deletion!</p>
      </Modal>
      {isOpenPostDetail ? (
        <OpenMyPostDetailModal key={PostProps.post?._id} post={PostProps.post} userInfo={PostProps.userInfo} />
      ) : null}
      <StyleTotal theme={themeColorSet} className={'rounded-lg mb-4'}>
        <div ref={postRef} className="post px-4 py-3">
          <div className="postHeader flex justify-between items-center">
            <div className="postHeader__left">
              <div className="name_avatar flex">
                <Avatar size={50} src={PostProps.userInfo?.userImage} />
                <div className="name ml-2">
                  <div className="name__top font-bold">
                    <NavLink to={`/user/${PostProps.userInfo?.id}`} style={{ color: themeColorSet.colorText1 }}>
                      {PostProps.userInfo?.username}
                    </NavLink>
                  </div>
                  <div className="time" style={{ color: themeColorSet.colorText3 }}>
                    <span>{'Data Analyst'} • </span>
                    <span>{date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="postHeader__right">
              <div className="icon">
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                  <FontAwesomeIcon size="lg" icon={faEllipsis} />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="postBody mt-5">
            <div className="title font-bold">{PostProps.post?.title}</div>
            <div className="content mt-3">
              <div className="content__text">
                <ReactQuill
                  value={displayContent}
                  readOnly={true}
                  theme={'bubble'}
                  modules={{
                    syntax: true,
                  }}
                />
                {PostProps.post?.content?.length > 250 && (
                  <a onClick={toggleExpanded}>{expanded ? 'Read less' : 'Read more'}</a>
                )}
              </div>
              {PostProps.post.url ? (
                <div className="contentImage mt-3">
                  <img src={PostProps.post.url} alt="" style={{ width: '100%' }} />
                </div>
              ) : link ? (
                <a
                  href={link.linkAddress}
                  target="_blank"
                  style={{
                    color: themeColorSet.colorText2,
                  }}
                >
                  <div
                    className="contentLink flex mt-5 px-3 py-3 cursor-pointer"
                    style={{ backgroundColor: themeColorSet.colorBg4 }}
                  >
                    <div className="left w-4/5 p-2">
                      <div className="mb-2" style={{ fontWeight: 600, color: themeColorSet.colorText1 }}>
                        {link.title?.length > 100 ? link.title.slice(0, 100) + '...' : link.title}
                      </div>
                      <div>
                        {link.description?.length > 100 ? link.description.slice(0, 100) + '...' : link.description}
                      </div>
                    </div>
                    <img src={link.image} alt="" className="w-1/5" />
                  </div>
                </a>
              ) : (
                <></>
              )}
            </div>
            <Divider style={{ backgroundColor: themeColorSet.colorText1 }} />
          </div>
          <div className="postFooter flex justify-between items-center">
            <div className="like_share flex justify-between w-1/5">
              <Space className="like" direction="vertical" align="center">
                <span>{likeNumber} Like</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faHeart} color={likeColor} />}
                  onClick={(e: any) => {
                    if (isLiked) {
                      setLikeNumber(likeNumber - 1);
                      setLikeColor('white');
                      setIsLiked(false);
                    } else {
                      setLikeNumber(likeNumber + 1);
                      setLikeColor('red');
                      setIsLiked(true);
                    }
                    dispatch(
                      LIKE_POST_SAGA({
                        id: PostProps.post?._id,
                      }),
                    );
                  }}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>{shareNumber} Share</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faShare} color={shareColor} />}
                  onClick={(e: any) => {
                    if (isShared) {
                      setShareNumber(shareNumber - 1);
                      setShareColor('white');
                      setIsShared(false);
                    } else {
                      setShareNumber(shareNumber + 1);
                      setShareColor('blue');
                      setIsShared(true);
                    }
                    dispatch(
                      SHARE_POST_SAGA({
                        id: PostProps.post?._id,
                      }),
                    );
                  }}
                />
              </Space>
            </div>
            <div className="comment_view flex justify-between w-1/3">
              <Space className="like" direction="vertical" align="center">
                <span>{PostProps.post?.comments?.length} Comment</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<FontAwesomeIcon icon={faComment} />}
                  onClick={() => {
                    setIsOpenPostDetail(true);
                  }}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>
                  {PostProps.post.views} {PostProps.post.views > 0 ? 'Views' : 'View'}
                </span>
                <Space>
                  <Avatar
                    className="item"
                    style={{ backgroundColor: 'transparent' }}
                    icon={<FontAwesomeIcon icon={faBookmark} color={saveColor} />}
                    onClick={(e: any) => {
                      if (isSaved) {
                        setIsSaved(false);
                        setSaveColor('white');
                      } else {
                        setIsSaved(true);
                        setSaveColor('yellow');
                      }
                      dispatch(
                        SAVE_POST_SAGA({
                          id: PostProps.post?._id,
                        }),
                      );
                    }}
                  />
                  <Avatar
                    className="item"
                    style={{ backgroundColor: 'transparent' }}
                    icon={<FontAwesomeIcon icon={faShareNodes} />}
                  />
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default MyPost;
