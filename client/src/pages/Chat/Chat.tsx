import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import { getTheme } from "../../util/functions/ThemeFunction";
import { ConfigProvider, } from "antd";
import StyleTotal from "./cssChat";
import { Content } from 'antd/es/layout/layout'

import {
    GET_MESSAGE_BY_CONV_ID_SAGA,
    SEND_MESSAGE_TO_A_USER_SAGA,
    CREATE_CONVERSATION_SAGA,
    GET_CONVERSATION_BY_USER_ID_SAGA,
    GET_CONVERSATION_BY_TWO_USER_ID_SAGA,

} from '../../redux/actionSaga/ChatActionSaga'
import Contacts from './../../components/Chat/ChatContacts/Contacts';
import ChatContainer from './../../components/Chat/ChatContainer/ChatContainer';
const Chat = () => {

    const dispatch = useDispatch();
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();


    // const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // const { user } = useSelector((state: any) => state.userReducer);
    const userId = "6444d706166034c075e1ca9a";
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
        // dispatch(
        //     CREATE_CONVERSATION_SAGA({
        //         "senderId": "hgaf",
        //         "receiverId": "awf"
        //     }));

        dispatch(
            GET_CONVERSATION_BY_USER_ID_SAGA(
                userId
            ));

        // dispatch(
        //     GET_CONVERSATION_BY_TWO_USER_ID_SAGA({
        //         firstUserId: "644254dc1541b06fac0f544b",
        //         secondUserId: "644254671541b06fac0f544a"
        //     }));

    }, [dispatch, userId])

    const conversations = useSelector((state: any) => state.chatReducer.convArr);
    // console.log(conversations.length);
    const handleChatChage = (chat: any) => {
        setCurrentChat(chat);
        // console.log(chat);
    }

    return (
        <ConfigProvider
            theme={{
                token: themeColor,
            }}
        >
            <StyleTotal theme={themeColorSet} >

                <Content className='chat flex' >
                    <div className="chat-contact">
                        <Contacts conversations={conversations} currentUser={userId} currentChat={handleChatChage} />
                    </div>
                    <div className='chat-container'>
                        {currentChat === null ? (
                            <div className=""> not chat </div>
                        ) : (
                            < ChatContainer currentChat={currentChat} currentUser = {userId}/>
                        )}
                    </div>
                </Content>
            </StyleTotal>
        </ConfigProvider>
    )
}

export default Chat