import { useState } from "react";
import { Comment, Icon } from "@ant-design/compatible";
import { Avatar, Tooltip } from "antd";

interface CommentProps {
  comment: any;
  userInfo: any;
  children?: any;
}

const CommentDetail = (Props: CommentProps) => {
  const [likes, setLike] = useState(0);
  const [dislikes, setDislike] = useState(0);
  const [action, setAction] = useState("");

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
    <span key="comment-basic-reply-to">Reply to</span>,
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
