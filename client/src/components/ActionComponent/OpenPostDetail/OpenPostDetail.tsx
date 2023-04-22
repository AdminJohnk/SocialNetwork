import { Avatar, ConfigProvider, Input, Popover } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/Slice/ModalHOCSlice";
import { getTheme } from "../../../util/functions/ThemeFunction";
import PostDetail from "../../Form/PostDetail/PostDetail";
import StyleTotal from "./cssOpenPostDetail";
import data from "@emoji-mart/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import Picker from "@emoji-mart/react";

interface PostProps {
  post: any;
  userInfo: any;
}

const OpenPostDetail = (PostProps: PostProps) => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [commentContent, setCommentContent] = useState("");

  const handleComment = (content: any) => {
    setCommentContent(content);
  };

  useLayoutEffect(() => {
    dispatch(
      openModal({
        title: "The post of " + PostProps.userInfo.username,
        component: (
          <PostDetail post={PostProps.post} userInfo={PostProps.userInfo} />
        ),
        footer: (
          <div className=" commentInput text-left flex items-center">
            <Avatar
              className="mr-2"
              size={40}
              src={PostProps.userInfo.userImage}
            />
            <div className="input w-full">
              <Input
                value={commentContent}
                placeholder="Add a Comment"
                allowClear
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
                        data={data}
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
            </div>
          </div>
        ),
      })
    );
  }, [commentContent]);

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

export default OpenPostDetail;
