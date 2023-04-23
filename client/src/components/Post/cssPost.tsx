import styled, { css } from "styled-components";
import { commonColor } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
  .space-align-block {
    flex: none;
    margin: 16px 8px;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.colorBg4};
    border-radius: 20px;
  }
  .post {
    .postHeader {
      .postHeader__left {
        .name_avatar {
          .name__top {
            a {
              color: ${(props) => props.theme.colorText1};
              :hover {
                text-decoration: underline;
                transition: all 0.5s;
              }
            }
          }
        }
      }
      .postHeader__right {
        .icon {
          :hover {
            cursor: pointer;
            color: ${(props) => props.theme.colorText2};
            transition: all 0.3s;
          }
        }
      }
    }
    .postBody {
    }
    .postFooter {
      .item {
        :hover {
          cursor: pointer;
        }
      }
      .comment_view {
        .emoji {
          :hover {
            cursor: pointer;
            color: ${commonColor.colorBlue2};
            transition: all 0.5s;
          }
        }
      }
    }
  }
`;

export default StyleTotal;
