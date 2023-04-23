import styled, { css } from "styled-components";
import {
  flex_center_column,
  flex_center_row,
  commonColor,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
z-index: 10;
  .sider {
    &::-webkit-scrollbar {
      display: none;
    }
    .ant-menu-item {
      /* color: red; */
    }
  }
`;

export default StyleTotal;
