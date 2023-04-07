import {
  faBookmark,
  faComment,
  faEllipsis,
  faHeart,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, ConfigProvider, Divider, Space } from "antd";
import { type } from "os";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssPost";

interface PostProps {
  post: any;
  userInfo: any;
}

const Post = (PostProps : any) => { 
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
  }); // 9/17/2016

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
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
                <FontAwesomeIcon size="lg" icon={faEllipsis} />
              </div>
            </div>
          </div>
          <div className="postBody mt-5">
            <div className="title font-bold">{PostProps.post.title}</div>
            <div className="content mt-3">
              {/* <div className="content__text">{PostProps.post.content}</div> */}
              {/* parse to HTML */}
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
