import { useEffect, useState } from "react";
import { Comment, Icon } from "@ant-design/compatible";
import { Avatar, Tooltip } from "antd";
import styled from "styled-components";

interface CommentProps {
  comment: any;
  userInfo: any;
  children?: any;
  onData: (data: any) => void;
  selectedCommentId?: string | null;
  onSelectComment: (commentId: string | null) => void;
  isReply?: boolean;
}

const CommentDetail = (Props: CommentProps) => {
  const [likes, setLike] = useState(0);
  const [dislikes, setDislike] = useState(0);
  const [action, setAction] = useState("");

  useEffect(() => {
    // Reset the reply button text and style when the component re-renders
    const reply = document.getElementById("reply");
    if (reply) {
      reply.innerHTML = "Reply";
      reply.style.color = "#D4D4D4A6";
      reply.style.fontWeight = "normal";
    }
  }, []);

  const like = () => {
    if (action === "liked") {
      setLike(0);
      setAction("");
    } else {
      setLike(1);
      setDislike(0);
      setAction("liked");
    }
  };

  const dislike = () => {
    if (action === "disliked") {
      setDislike(0);
      setAction("");
    } else {
      setDislike(1);
      setLike(0);
      setAction("disliked");
    }
  };

  const setReply = () => {
    const selectedCommentId =
      Props.selectedCommentId === Props.comment._id ? null : Props.comment._id;
    Props.onData({
      isReply: selectedCommentId ? true : false,
      idComment: selectedCommentId,
    });
    Props.onSelectComment(selectedCommentId);
  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        <Icon
          type="like"
          theme={action === "liked" ? "filled" : "outlined"}
          onClick={like}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={action === "disliked" ? "filled" : "outlined"}
          onClick={dislike}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>{dislikes}</span>
    </span>,
    {
      ...(Props.isReply ? (
        <></>
      ) : (
        <span
          id="reply"
          key="comment-basic-reply-to"
          onClick={setReply}
          {...(Props.selectedCommentId === Props.comment._id
            ? {
                style: {
                  color: "#1890ff",
                  fontWeight: "bold",
                },
              }
            : {
                style: {
                  color: "#D4D4D4A6",
                  fontWeight: "normal",
                },
              })}
        >
          {Props.selectedCommentId === Props.comment._id ? "Cancel" : "Reply"}
        </span>
      )),
    },
  ];
  return (
    <div className="">
      <Comment
        author={Props.comment.user.username}
        actions={actions}
        avatar={
          Props.comment.user.userImage ? (
            <Avatar
              src={Props.comment.user.userImage}
              alt={Props.comment.user.username}
            />
          ) : (
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon="user"
              alt={Props.comment.user.username}
            />
          )
        }
        content={Props.comment.content}
      >
        {Props.children}
      </Comment>
    </div>
  );
};

export default CommentDetail;
