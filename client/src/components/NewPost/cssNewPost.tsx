import styled, { css } from "styled-components";
import {
  commonColor,
  flex_center_column,
  flex_center_row,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
  .ql-toolbar {
    svg {
      /* filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%); */
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)
        brightness(100%) contrast(100%);
    }
  }
  .ql-editor {
    font-size: 14px;
  }
  .newPostBody{
    .name_avatar{
        .name{
            a{
                color: ${(props) => props.theme.colorText1};
                :hover{
                    text-decoration: underline;
                    transition: all 0.5s;
                }
            }
        }
    }
  }
  .newPostFooter {
    .newPostFooter__left {
      .emoji, .code {
        :hover {
          cursor: pointer;
          color: ${commonColor.colorBlue2};
          transition: all 0.5s;
        }
      }
    }
    .newPostFooter__right {
      .createButton {
        background-color: ${commonColor.colorBlue1};
        :hover {
          background-color: ${commonColor.colorBlue3};
          transition: all 0.5s;
        }
      }
    }
  }
`;

export default StyleTotal;