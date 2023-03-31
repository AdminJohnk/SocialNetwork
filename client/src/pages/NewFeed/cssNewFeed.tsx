import styled, { css } from "styled-components";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import {
  flex_center_column,
  flex_center_row,
  commonColor,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  
background-color: ${(props) => props.theme.colorBg1};
height: 200vh;
color: ${(props) => props.theme.colorText1};
.createpost {
  padding-left: 180px;
  padding-right: 180px;
  padding-top: 20px;
}
.createpost .createpost_body .formcreatepost {
  background-color: ${(props) => props.theme.colorBg3};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
.createpost_header_avatar .img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.createpost_footer_action_icon_send {
  background-color: ${(props) => props.theme.colorBg3};
  border-radius: 25px;
  :hover {
    color: ${commonColor.colorBlue2};
    background-color: ${(props) => props.theme.colorBg4};
    cursor: pointer;
    transition: all 0.5s;
  }
  .send-button {
    color: ${(props) => props.theme.colorText1};
    style: bold;
    :hover {
      color: ${commonColor.colorBlue2};
      cursor: pointer;
      transition: all 0.5s;
    }
  }
}
`;

export default StyleTotal;