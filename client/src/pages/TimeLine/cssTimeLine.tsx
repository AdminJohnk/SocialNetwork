import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import {
  flex_center_column,
  flex_center_row,
  commonColor,
} from "../../util/cssVariable/cssVariable";

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

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  height: 200vh;
  color: ${(props) => props.theme.colorText1};
  .cover {
    background-image: url("./images/TimeLinePage/cover2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .avatar {
    width: 170px;
    height: 170px;
    position: absolute;
    top: 78%;
    left: 4%;
    z-index: 1;
  }
  .chat_Follow {
    .chat {
      background-color: ${(props) => props.theme.colorBg3};
      :hover {
        background-color: ${(props) => props.theme.colorBg4};
        color: ${commonColor.colorBlue2};
        cursor: pointer;
        transition: all 0.5s;
      }
    }
    .follow {
      border: 1px solid ${(props) => props.theme.colorText1};
      :hover {
        color: ${commonColor.colorBlue2};
        border: 1px solid ${commonColor.colorBlue2};
        cursor: pointer;
        transition: all 0.5s;
      }
    }
  }
  .id_address_join {
    color: ${(props) => props.theme.colorText3};
    .id {
      display: inline-block;
      ::after {
        content: "•";
        margin-left: 0.5rem;
      }
    }
    .address {
      display: inline-block;
      ::after {
        content: "•";
        margin-left: 0.5rem;
      }
    }
  }
  .description {
    .item {
      border: 2px solid ${(props) => props.theme.colorText3};
      border-radius: 0.8rem;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

export default StyleTotal;
