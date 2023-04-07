import { Avatar, ConfigProvider, Divider, Form, Input, Popover } from "antd";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssNewPost";
import ImageCompress from "quill-image-compress";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { TOKEN } from "../../util/constants/SettingSystem";
import { CREATE_POST_SAGA } from "../../redux/actionSaga/PostActionSaga";
Quill.register("modules/imageCompress", ImageCompress);

var toolbarOptions = [
  ["bold", "italic", "underline", "clean"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
];

const NewPost = () => {
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  // Quill Editor
  let [quill, setQuill] : any = useState(null);

  useEffect(() => {
    quill = new Quill("#editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
    quill.on("text-change", function () {
      handleQuillChange();
    });
    setQuill(quill);
  }, []);

  const handleQuillChange = () => {
    const text = quill.root.innerHTML;
    formik.setFieldValue("content", text);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (values) => {
      dispatch(
        CREATE_POST_SAGA({
          postCreate: values,
        })
      );
    },
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          ...themeColor,
          controlHeight: 40,
          borderRadius: 0,
          lineWidth: 0,
        },
      }}
    >
      <StyleTotal theme={themeColorSet} className="w-8/12 rounded-lg mb-4">
        <div className="newPost px-4 py-3">
          <div
            className="newPostHeader text-center text-2xl font-bold"
            style={{ color: themeColorSet.colorText1 }}
          >
            Create Post
          </div>
          <div className="newPostBody">
            <div className="name_avatar flex items-center">
              <Avatar size={50} src="./images/TimeLinePage/avt.jpg" />
              <div className="name font-bold ml-2">
                <NavLink to="/profile">Kien Tran</NavLink>
              </div>
            </div>
            <div className="AddTitle mt-4 z-10">
              <Form.Item name="title">
                <Input
                  placeholder="Add a Title"
                  allowClear
                  style={{ borderColor: themeColorSet.colorText3 }}
                  maxLength={150}
                  onChange={formik.handleChange}
                ></Input>
              </Form.Item>
            </div>
            <div className="AddContent mt-4">
              <div id="editor" />
            </div>
          </div>
          <div className="newPostFooter mt-3 flex justify-between items-center">
            <div className="newPostFooter__left">
              <Popover
                placement="top"
                trigger="click"
                title={"Members"}
                content={
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji: any) => {
                      quill.focus();
                      quill.insertText(
                        quill.getSelection().index,
                        emoji.native
                      );
                    }}
                  />
                }
              >
                <span className="emoji">
                  <FontAwesomeIcon
                    className="item mr-3 ml-3"
                    size="lg"
                    icon={faFaceSmile}
                  />
                </span>
              </Popover>
              <span className="code">
                <FontAwesomeIcon className="item" size="lg" icon={faCode} />
              </span>
            </div>
            <div className="newPostFooter__right">
              <button
                type="submit"
                className="createButton w-full font-bold px-4 py-2"
                style={{ color: themeColorSet.colorText1 }}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default NewPost;
