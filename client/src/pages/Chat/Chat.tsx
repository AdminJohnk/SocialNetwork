import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { getTheme } from "../../util/functions/ThemeFunction";
import { ConfigProvider, } from "antd";
import StyleTotal from "./cssChat";
import { Content } from 'antd/es/layout/layout'

import { GET_MESSAGE_BY_CONV_ID_SAGA, SEND_MESSAGE_TO_A_USER_SAGA } from '../../redux/actionSaga/ChatActionSaga'
import Contacts from './../../components/Chat/ChatContacts/Contacts';
import ChatContainer from './../../components/Chat/ChatContainer/ChatContainer';
const Chat = () => {

    const dispatch = useDispatch();
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();

    useEffect(() => {
        // dispatch(
        //     GET_MESSAGE_BY_CONV_ID_SAGA(
        //         "644255161541b06fac0f544c"
        //     ));

        // dispatch(
        //     SEND_MESSAGE_TO_A_USER_SAGA({
        //         "conversationId": "644255161541b06fac0f544c",
        //         "sender": "644254dc1541b06fac0f544b",
        //         "text": "fine"
        //     }));
    }, [dispatch])

    // const messages = useSelector((state: any) => state.chatReducer.data);
    // console.log(messages ? messages: "am");


    return (
        <ConfigProvider
            theme={{
                token: themeColor,
            }}
        >
            <StyleTotal theme={themeColorSet} >

                <Content className='chat flex' >
                    <div className="chat-contact">
                        <Contacts />
                    </div>
                    <div className='chat-container'>
                        <ChatContainer />
                    </div>
                </Content>
            </StyleTotal>
        </ConfigProvider>
    )
}

export default Chat