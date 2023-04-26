import { Avatar, ConfigProvider, Input, Popover, Button } from "antd";
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../../util/functions/ThemeFunction";
import PostDetail from "../../Form/PostDetail/PostDetail";
import StyleTotal from "./cssOpenPostDetail";
import dataEmoji from "@emoji-mart/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";
import {
  SAVE_COMMENT_POSTSHARE_SAGA,
  SAVE_COMMENT_SAGA,
  SAVE_REPLY_SAGA,
  SAVE_REPLY_POSTSHARE_SAGA,
  GET_POST_BY_ID_SAGA,
} from "../../../redux/actionSaga/PostActionSaga";
import { useParams } from "react-router-dom";

const OpenPostDetail = () => {
  const dispatch = useDispatch();

  const { postID } = useParams();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  useEffect(() => {
    dispatch(
      GET_POST_BY_ID_SAGA({
        id: postID,
      })
    );
  }, []);

  // dispatch(
  //   GET_POST_BY_ID_SAGA({
  //     id: postID,
  //   })
  // );

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.postReducer.userInfo);

  console.log("post", post);
  console.log("userInfo", userInfo);

  // return <></> 

  const [commentContent, setCommentContent] = useState("");

  const [data, setData] = useState<any>({ isReply: false, idComment: null });

  const handleData = (data: any) => {
    setData(data);
  };

  const handleComment = (content: any) => {
    setCommentContent(content);
  };

  const handleSubmitComment = () => {
    if (post.postShare) {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_POSTSHARE_SAGA({
            id: post._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          })
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_POSTSHARE_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: post._id,
          })
        );
      }
    } else {
      if (data.isReply) {
        dispatch(
          SAVE_REPLY_SAGA({
            id: post._id,
            reply: {
              contentComment: commentContent,
              idComment: data.idComment,
            },
          })
        );
        setData({ isReply: false, idComment: null });
      } else {
        dispatch(
          SAVE_COMMENT_SAGA({
            comment: {
              contentComment: commentContent,
            },
            id: post._id,
          })
        );
      }
    }
    setTimeout(() => {
      setCommentContent("");
    }, 1000);
  };

  const checkEmpty = () => {
    if (commentContent === "") {
      return true;
    } else {
      return false;
    }
  };

  const memoizedComponent = useMemo(
    () => (
      <PostDetail
        onData={handleData}
        post={post}
        userInfo={userInfo}
        data={data}
        postShare={post.postShare}
      />
    ),
    [post, userInfo, data]
  );

  const memoizedIputComment = useMemo(
    () => (
      <div className=" commentInput text-right flex items-center">
        <Avatar className="mr-2" size={40} src={userInfo.userImage} />
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
                title={"Emoji"}
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
                    transition: "all 0.3s",
                  }}
                >
                  <FontAwesomeIcon
                    className="item mr-3 ml-3"
                    size="lg"
                    icon={faFaceSmile}
                  />
                </span>
              </Popover>
            }
          ></Input>
          <span
            className="sendComment cursor-pointer hover:text-blue-700"
            {...(checkEmpty()
              ? {
                  style: {
                    color: "gray",
                    //hover disabled
                    cursor: "not-allowed",
                  },
                }
              : { transition: "all 0.3s" })}
            onClick={handleSubmitComment}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </div>
      </div>
    ),
    [commentContent]
  );

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div>
          {memoizedComponent}
          {memoizedIputComment}
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default OpenPostDetail;
