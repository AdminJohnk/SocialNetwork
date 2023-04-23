import React from 'react'
import styled from "styled-components";
import StyleTotal from "./cssChatContainer";
import ChatInput from '../ChatInput/ChatInput';
import { ConfigProvider, Layout } from 'antd';
import Messages from '../Messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../../util/functions/ThemeFunction';


const { Content, Footer, Header } = Layout;

const ChatContainer = ({ own }: any) => {

    const dispatch = useDispatch();
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();

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
                        <img className="chat-container-avatar" src="https://picsum.photos/200/300" alt="" />

                        <div>
                            <div className="chat-container-name">
                                <h3>Chat Name</h3>
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