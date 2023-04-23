import React, { useEffect, useState, useRef } from "react";
import { Mentions, Row, Col, Dropdown, ConfigProvider } from 'antd';
import { faFaceSmile, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import StyleTotal from "./cssChatInput";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTheme } from "../../../util/functions/ThemeFunction";

const { TextArea } = Input;

const ChatInput = ({ handleSendMsg }: any) => {
    // const dispatch = useDispatch();
    const dispatch = useDispatch();
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();
    const [text, setText] = useState('');
    const handleEmojiSelect = (emoji: any) => {
        setText(text + emoji.native);
    };

    const sendChat = (event: any) => {
        event.preventDefault();
        if (text.length > 0) {
            handleSendMsg = text;
            setText("");
        }
    };

    // To disable submit button at the beginning.
    useEffect(() => {
    }, []);
    return (
        <ConfigProvider
            theme={{
                token: themeColor,
            }}
        >
            <StyleTotal>
                <Row className="items-center justify-between">
                    <Col>
                        <FontAwesomeIcon className="icon-add-media w-6 h-6" icon={faPlus} />
                    </Col>
                    <Col>
                        <Dropdown overlay={<Picker data={data}
                            emojiTooltip={true}
                            onEmojiSelect={
                                (emoji: any) => {
                                    handleEmojiSelect(emoji);
                                }
                            }
                        />} placement="topLeft" arrow>
                            <FontAwesomeIcon className="icon-emoji w-6 h-6" icon={faFaceSmile} />
                        </Dropdown>
                    </Col>

                    <Col span={20}>
                        <TextArea onPressEnter={
                            (e: any) => {
                                // dispatch(handleSendMsg(e.target.value));
                                sendChat(e)
                            }
                        }
                            value={text}
                            onChange={
                                (e: any) => {
                                    setText(e.target.value);
                                }}
                            placeholder="Type a message..." autoSize={{ minRows: 1.5, maxRows: 6 }} />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={(e) => {
                                sendChat(e);
                            }}
                            style={{ backgroundColor: themeColorSet.colorBg3, borderColor: themeColorSet.colorBg4 }}
                        >
                            Send
                        </Button>
                    </Col>
                </Row>

            </StyleTotal>
        </ConfigProvider>
    )
}

export default ChatInput;