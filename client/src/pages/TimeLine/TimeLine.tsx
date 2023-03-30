import React, {useState} from "react";
import { ThemeProvider } from "styled-components";
import StyleTotal from "./cssTimeLine";
import { getTheme } from "../../util/functions/ThemeFunction";
import {
  Avatar,
  Col,
  ConfigProvider,
  Input,
  Row,
  Space,
  Switch,
  theme,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Slice/ThemeSlice";
import { DARK_THEME, LIGHT_THEME } from "../../util/constants/SettingSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faFileLines,
  faComments,
  faLocationDot,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

// A array include
// Java, Back End, Data Analytics, Front End, Full Stack, Mobile, DevOps, Project Management, Design, Business, Career, Problem Solver, App Design

const descArray = [
  // "Java",
  // "Back End",
  // "Data Analytics",
  // "Front End",
  // "Full Stack",
  // "DevOps",
  // "Project Management",
  // "Design",
  // "Career",
  // "Problem Solver",
  // "App Design",
  {
    icon: faSnowflake,
    title: "Java",
    color: "#ed0e0e",
    Bghover: "#e13030",
  },
];

const TimeLine = () => {

  const [bgColorItem, setBgColorItem] = useState("transparent");

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
        <Row>
          <Col offset={4} span={16}>
            <div className="cover w-full h-80 rounded-br-lg rounded-bl-lg relative"></div>
            {/* <div className="avatar rounded-full overflow-hidden">
              <img src="./images/TimeLinePage/avt.jpg" alt="avt" />
            </div> */}
            <Row className="py-5">
              <Col offset={6} span={12}>
                <div
                  className="text-2xl font-bold"
                  style={{ color: themeColorSet.colorText1 }}
                >
                  Tapas Adhikary
                </div>
                <div className="position mt-2">
                  {/* <Avatar src="./images/TimeLinePage/position.jpg" size={25} /> */}
                  <FontAwesomeIcon className="icon" icon={faSnowflake} />
                  <span
                    style={{ color: themeColorSet.colorText3 }}
                    className="ml-2"
                  >
                    User Interface Architect & Senior Manager UX
                  </span>
                </div>
                <div className="viewResume mt-2">
                  <FontAwesomeIcon className="icon" icon={faFileLines} />
                  <NavLink to="/resume" className="ml-2">
                    View Resume
                  </NavLink>
                </div>
              </Col>
              <Col span={6}>
                <div className="chat_Follow flex justify-around items-center w-full h-full">
                  <div className="chat px-2 py-2 text-base rounded-full">
                    <FontAwesomeIcon className="icon" icon={faComments} />
                  </div>
                  <div className="follow px-4 py-2">
                    <span>Follow</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="id_address_join">
              <span className="id mr-2">@tianrongliew</span>
              <span className="address mr-2">
                <FontAwesomeIcon className="icon mr-2" icon={faLocationDot} />
                Global
              </span>
              <span className="join">
                <FontAwesomeIcon className="icon mr-2" icon={faBriefcase} />
                Joined Jun 2020
              </span>
            </Row>
            <Row className="mt-5">
              <Col span={18}>
                <div className="description flex flex-wrap">
                  {descArray.map((item, index) => {
                    return (
                      <span
                        className="item px-3 py-1 mx-2 my-1"
                        key={index}
                      >
                        <FontAwesomeIcon
                          className="icon mr-2"
                          icon={item.icon}
                        />
                        {item.title}
                      </span>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyleTotal>
    </ConfigProvider>
  );
};

export default TimeLine;
