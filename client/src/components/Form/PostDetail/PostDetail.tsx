import React from "react";
import Post from "../../Post/Post";
import StyleTotal from "./cssPostDetail";
import { Comment } from "@ant-design/compatible";
import { Avatar } from "antd";

interface PostProps {
  post: any;
  userInfo: any;
}

const PostDetail = (Props: PostProps) => {
  return (
    <div className="">
      <Post post={Props.post} userInfo={Props.userInfo} />
      {Props.post.comments.map((item: any, index: number) => {
        return (
          <Comment
            key={index}
            author={item.user.username}
            avatar={
              <Avatar src={item.user.userImage} alt={item.user.username} />
            }
            content={item.content}
          />
        );
      })}
    </div>
  );
};

export default PostDetail;
