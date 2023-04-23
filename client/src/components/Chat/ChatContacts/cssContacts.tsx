import styled from 'styled-components';
import {
    commonColor,
} from './../../../util/cssVariable/cssVariable';


const StyleTotal = styled.div`
    padding-left: 10px;
    height: 100%;
    .scrollableDiv {
        height: 77vh;
        overflow: auto;
        .oneUser{
            :hover{
                background-color: ${commonColor.colorBlue1};
                cursor: pointer;
                transition: all 0.5s;
            }
        }
    }
    .Chats{
        color: ${commonColor.colorBlue1};
        font-weight: 600;
    }

    .header {
        .search{
            width: 90%;
            margin-left: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
`;

export default StyleTotal;