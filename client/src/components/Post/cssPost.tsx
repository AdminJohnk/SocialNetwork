import styled, { css } from "styled-components";
import {
  flex_center_column,
  flex_center_row,
  commonColor,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  height: 200vh;
  color: ${(props) => props.theme.colorText1};
  .post {
    padding-left: 180px;
    padding-right: 180px;
    padding-top: 20px;
  }

`;

export default StyleTotal;
