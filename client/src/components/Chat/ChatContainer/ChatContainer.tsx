import React, { useEffect } from 'react'
import styled from "styled-components";
import StyleTotal from "./cssChatContainer";
import ChatInput from '../ChatInput/ChatInput';
import { ConfigProvider, Layout } from 'antd';
import Messages from '../Messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';

import {
    GET_MESSAGE_BY_CONV_ID_SAGA,
    GET_CONVERSATION_BY_TWO_USER_ID_SAGA,

} from '../../../redux/actionSaga/ChatActionSaga';

const { Content, Footer, Header } = Layout;

const ChatContainer = ({ currentChat, currentUser }: any) => {

    const dispatch = useDispatch();
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();

    useEffect(() => {
        dispatch(
            GET_CONVERSATION_BY_TWO_USER_ID_SAGA({
                firstUserId: currentUser,
                secondUserId: currentChat.userId
            }));
        // console.log(currentChat);
    }, [currentChat])

    const conv = useSelector((state: any) => state.chatReducer.conv2UserArr);

    useEffect(() => {
        dispatch(
            GET_MESSAGE_BY_CONV_ID_SAGA(
                conv._id
            ));
    }, [conv])
    const message = useSelector((state: any) => state.chatReducer.messageArr);
    console.log(message);


    // console.log(message);

    return (
        <ConfigProvider
            theme={{
                token: themeColor,
            }}
        >
            <StyleTotal>
                <Layout>
                    {/* <Header className='header'>

                </Header> */}

                    <Content className='chat-container' style={{
                        padding: '10px 50px',
                        backgroundColor: themeColorSet.colorBg1,
                    }}>
                        <div className="chat-container-headers flex">
                            <img className="chat-container-avatar" src={`${currentChat.userImage}`} alt="" />

                            <div>
                                <div className="chat-container-name">
                                    {currentChat.userName}
                                </div>
                                <div className="chat-container-action">
                                    action
                                </div>
                            </div>
                        </div>

                        <div className="chat-message">
                            <Messages />
                            <Messages own={true} />
                            <Messages />
                            <Messages own={true} />
                        </div>
                    </Content>
                    {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
                    <Footer>
                        <ChatInput />
                    </Footer>
                </Layout>
            </StyleTotal >
        </ConfigProvider>
    )
}

export default ChatContainer