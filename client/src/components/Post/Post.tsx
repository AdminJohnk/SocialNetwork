import {
  faBookmark,
  faBriefcase,
  faComment,
  faCopy,
  faEllipsis,
  faHeart,
  faPenToSquare,
  faShare,
  faShareNodes,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Menu,
  message,
  Popconfirm,
  Popover,
  Space,
  Modal,
  notification,
} from "antd";
import type { MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { type } from "os";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssPost";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { DELETE_POST_SAGA, LIKE_POST_SAGA } from "../../redux/actionSaga/PostActionSaga";
import { NotificationPlacement } from "antd/es/notification/interface";
import { openDrawer } from "../../redux/Slice/DrawerHOCSlice";
import EditPostForm from "../Form/EditPostForm/EditPostForm";

interface PostProps {
  post: any;
  userInfo: any;
}

type NotificationType = "success" | "info" | "warning" | "error";

// -----------------------------------------------------

const Post = (PostProps: any) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const createdAt = new Date(PostProps.post.createdAt);
  //format date to get full date
  const date = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(
      DELETE_POST_SAGA({
        id: PostProps.post._id,
      })
    );
    setIsModalOpen(false);
    openNotificationWithIcon("success");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // post setting
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faCopy} />
          <span className="ml-2">Copy Link Post</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="item flex items-center px-4 py-2">
          <FontAwesomeIcon className="icon" icon={faPenToSquare} />
          <span className="ml-2">Edit Post</span>
        </div>
      ),
      onClick: () => {
        dispatch(
          openDrawer({
            title: "Edit Post",
            component: (
              <EditPostForm
                title={PostProps.post.title}
                content={PostProps.post.content}
              />
            ),
          })
        );
      },
    },
    {
      key: "3",
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
      message: "Delete Successfully",
      placement: "bottomRight",
    });
  };

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
      <StyleTotal theme={themeColorSet} className="w-8/12 rounded-lg mb-4">
        <div className="post px-4 py-3">
          <div className="postHeader flex justify-between items-center">
            <div className="postHeader__left">
              <div className="name_avatar flex">
                <Avatar size={50} src={PostProps.userInfo.userImage} />
                <div className="name ml-2">
                  <div className="name__top font-bold">
                    <NavLink
                      to="/profile"
                      style={{ color: themeColorSet.colorText1 }}
                    >
                      {PostProps.userInfo.username}
                    </NavLink>
                  </div>
                  <div
                    className="time"
                    style={{ color: themeColorSet.colorText3 }}
                  >
                    <span>{"Data Analyst"} • </span>
                    <span>{date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="postHeader__right">
              <div className="icon">
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <FontAwesomeIcon size="lg" icon={faEllipsis} />
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="postBody mt-5">
            <div className="title font-bold">{PostProps.post.title}</div>
            <div className="content mt-3">
              <div
                className="content__text"
                dangerouslySetInnerHTML={{
                  __html: PostProps.post.content,
                }}
              ></div>
            </div>
            <Divider style={{ backgroundColor: themeColorSet.colorText1 }} />
          </div>
          <div className="postFooter flex justify-between items-center">
            <div className="like_share flex justify-between w-1/5">
              <Space className="like" direction="vertical" align="center">
                <span>{PostProps.post.likes.length} Like</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: "transparent" }}
                  icon={<FontAwesomeIcon icon={faHeart} />}
                  onClick={(e: any) => {
                    dispatch(
                      LIKE_POST_SAGA({
                        id: PostProps.post._id
                      })
                    );
                    
                  }}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>3 Share</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: "transparent" }}
                  icon={<FontAwesomeIcon icon={faShare} />}
                />
              </Space>
            </div>
            <div className="comment_view flex justify-between w-1/3">
              <Space className="like" direction="vertical" align="center">
                <span>{PostProps.post.comments.length} Comment</span>
                <Avatar
                  className="item"
                  style={{ backgroundColor: "transparent" }}
                  icon={<FontAwesomeIcon icon={faComment} />}
                />
              </Space>
              <Space className="like" direction="vertical" align="center">
                <span>70 View</span>
                <Space>
                  <Avatar
                    className="item"
                    style={{ backgroundColor: "transparent" }}
                    icon={<FontAwesomeIcon icon={faBookmark} />}
                  />
                  <Avatar
                    className="item"
                    style={{ backgroundColor: "transparent" }}
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

export default Post;
