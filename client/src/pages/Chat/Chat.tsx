import { Avatar, ConfigProvider, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../util/functions/ThemeFunction";
import StyleTotal from "./cssChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import {
  CommentOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import SearchChat from "../../components/ChatComponent/SearchChat/SearchChat";
import { commonColor } from "../../util/cssVariable/cssVariable";

const Chat = () => {
  const messageArr = [
    {
      id: 1,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Hello Bao, I am Kien",
    },
    {
      id: 2,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Hello Kien, How are you?",
    },
    {
      id: 3,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",

      text: "I'm doing well, thanks for asking. How about you?",
    },
    {
      id: 4,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I'm good too, thanks. What brings you here today?",
    },
    {
      id: 5,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I wanted to discuss the software report that we have been working on.",
    },
    {
      id: 6,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Ah, yes. I remember. What would you like to know?",
    },
    {
      id: 7,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I was wondering if you could give me an update on the progress of the report?",
    },
    {
      id: 8,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Sure, we are making good progress. We should have the first draft ready by the end of the week.",
    },
    {
      id: 9,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That's great news. Do you need any help with anything?",
    },
    {
      id: 10,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Actually, yes. I could use some help with data analysis. Would you be interested in helping out?",
    },
    {
      id: 11,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Sure, I'd be happy to help. Just let me know what you need.",
    },
    {
      id: 12,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Thanks, I'll send over the data later today. Is that okay with you?",
    },
    {
      id: 13,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That's fine. I'll take a look as soon as I receive it.",
    },
    {
      id: 14,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Great. Thanks for your help, Kien.",
    },
    {
      id: 15,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "No problem, Bao. We're a team, and I'm happy to help out.",
    },
    {
      id: 16,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "I appreciate that. We'll make sure to get this report done on time.",
    },
    {
      id: 17,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Definitely. I'm looking forward to seeing the final product.",
    },
    {
      id: 18,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Me too. I'll talk to you later.",
    },
    {
      id: 19,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Me too. I think it will be a great addition to our portfolio.",
    },
    {
      id: 20,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Agreed. Let's keep up the good work and get it done.",
    },
    {
      id: 21,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "By the way, have you had a chance to look at the feedback from the beta testers?",
    },
    {
      id: 22,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Not yet. I've been busy with other projects. What did they say?",
    },
    {
      id: 23,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Overall, they are happy with the software, but there are a few bugs that need to be fixed.",
    },
    {
      id: 24,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Okay. I can take a look at those bugs and see what we can do to fix them.",
    },
    {
      id: 25,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "That would be great. We want to make sure the software is as bug-free as possible before release.",
    },
    {
      id: 26,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Definitely. I'll get started on that right away.",
    },
    {
      id: 27,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Thanks, Kien. I appreciate your help.",
    },
    {
      id: 28,
      conversationd: 1,
      me: true,
      sender: 1,
      senderName: "Kien",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "No problem, Bao. That's what I'm here for.",
    },
    {
      id: 29,
      conversationd: 1,
      sender: 2,
      senderName: "Bao",
      senderImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU",
      text: "Let's touch base again next week and see where we're at with the report and the software bugs.",
    },
  ];

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div className="chat flex">
          <div
            className="slider flex flex-col justify-between items-center h-screen py-3"
            style={{
              width: "5%",
              borderRight: "1px solid",
              borderColor: themeColorSet.colorBg4,
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
            }}
          >
            <div className="logo">
              <NavLink to="/timeline" className="icon_logo">
                <FontAwesomeIcon className="icon" icon={faSnowflake} />
              </NavLink>
            </div>
            <div className="option">
              <Space size={30} direction="vertical">
                <div className="message optionItem">
                  <CommentOutlined className="text-2xl" />
                </div>
                <div className="Search optionItem">
                  <SearchOutlined className="text-2xl" />
                </div>
                <div className="Setting optionItem">
                  <SettingOutlined className="text-2xl" />
                </div>
              </Space>
            </div>
            <div className="mode">
              <FontAwesomeIcon className="icon" icon={faSun} />
            </div>
          </div>
          <div
            className="insteadComponent"
            style={{
              marginLeft: "5%",
              width: "23%",
              height: "100vh",
              position: "fixed",
              borderRight: "1px solid",
              borderColor: themeColorSet.colorBg4,
            }}
          >
            <SearchChat />
          </div>
          <div
            className="chatBox"
            style={{
              width: "49%",
              marginLeft: "28%",
              height: "100vh",
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
            }}
          >
            <div
              className="header flex justify-between items-center py-4 px-3"
              style={{
                height: "12%",
                borderBottom: "1px solid",
                borderColor: themeColorSet.colorBg4,
              }}
            >
              <Space
                className="myInfo flex items-center py-4 px-3"
                style={{
                  height: "12%",
                }}
              >
                <div className="avatar relative">
                  <Avatar
                    size={50}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU"
                  />
                  <span
                    className="dot"
                    style={{
                      width: "7px",
                      height: "7px",
                      backgroundColor: commonColor.colorGreen1,
                      display: "inline-block",
                      borderRadius: "50%",
                      position: "absolute",
                      right: "0px",
                      bottom: "0px",
                    }}
                  ></span>
                </div>
                <div className="name_career">
                  <div
                    className="name mb-1"
                    style={{
                      color: themeColorSet.colorText1,
                      fontWeight: 600,
                    }}
                  >
                    Bao
                  </div>
                  <div
                    className="career"
                    style={{
                      color: themeColorSet.colorText3,
                    }}
                  >
                    Product Manager
                  </div>
                </div>
              </Space>
              <Space className="extension">
                <div
                  className="searchContent mr-2"
                  style={{ color: themeColorSet.colorText3 }}
                >
                  <SearchOutlined className="text-2xl" />
                </div>
                <div className="moreOption">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faEllipsis}
                    size="xl"
                  />
                </div>
              </Space>
            </div>
            <div
              className="body mx-3 my-4"
              style={{
                height: "83%",
                overflow: "auto",
              }}
            >
              <div className="chatContent">
                {messageArr.map((item: any, index: any) => {
                  return !item.me ? (
                    <div
                      className="message flex items-center my-8 w-2/3"
                      key={index}
                    >
                      <div className="avatar mr-3">
                        <Avatar
                          size={40}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiauApOpu95sj6IxatDeXrrAfCVznCpX41g&usqp=CAU"
                        />
                      </div>
                      <div className="text">{item.text}</div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="message my-8 w-2/3 text-right">
                        <div
                          className="text px-4 py-2"
                          style={{
                            backgroundColor: commonColor.colorBlue3,
                            borderRadius: "30px",
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="footer"></div>
          </div>
          <div
            className="shared"
            style={{
              width: "23%",
              marginLeft: "77%",
              position: "fixed",
              backgroundColor: themeColorSet.colorBg1,
            }}
          ></div>
        </div>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default Chat;
