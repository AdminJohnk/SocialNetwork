import styled, { css } from "styled-components";
import {
  flex_center_column,
  flex_center_row,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  .messageButton,
  .notiButton,
  .avatarButton {
    &:hover {
      background-color: ${(props) => props.theme.colorBg4};
    }
  }
`;

export default StyleTotal;
