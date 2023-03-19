import styled, { css } from "styled-components";
import {
  flex_center_column,
  flex_center_row,
  commonColor,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  .sider {
    &::-webkit-scrollbar {
      display: none;
    }
    .ant-menu-item {
      /* color: red; */
    }
  }
  .ant-menu-inline-collapsed-tooltip { display: none; }


  // nondisplay tooltip menu
  .ant-menu-submenu-title {
    .ant-menu-submenu-arrow {
      display: none;
    }
  }



`;

export default StyleTotal;
