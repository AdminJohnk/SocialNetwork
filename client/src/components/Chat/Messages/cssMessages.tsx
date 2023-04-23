import styled from 'styled-components';
import {
    commonColor,
} from './../../../util/cssVariable/cssVariable';


const StyleTotal = styled.div`

    .messages{
        flex-direction: column;
        margin-top: 20px;
    }

    .messages-avatar{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }
    .messages-content-message{
        padding: 10px;
        border-radius: 10px;
        background-color: ${commonColor.colorBlue1};
        color: ${commonColor.colorWhite1};
        margin-bottom: 10px;
        max-width: 300px;
        /* word-wrap: break-word; */
    }
    .messages-bottom{
        font-size: 12px;
        color: ${commonColor.colorGray1};
        margin-top: 5px;
    }

    .messages.own .messages-content-message {
        background-color: ${commonColor.colorGray1} ;
        color: ${commonColor.colorBlack1};
    }
`;

export default StyleTotal;