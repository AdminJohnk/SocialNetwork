import { ConfigProvider } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { commonColor } from "../../util/cssVariable/cssVariable";
import { getTheme } from "../../util/functions/ThemeFunction";

import StyleTotal from "./cssPost";

const Post = () => {
    // Lấy theme từ LocalStorage chuyển qua css
    const { change } = useSelector((state: any) => state.themeReducer);
    const { themeColor } = getTheme();
    const { themeColorSet } = getTheme();

    // Hover menu
    const [collapsed, setCollapsed] = useState(true);
    const handleMouseEnter = () => {
        setCollapsed(false);
    };
    const handleMouseLeave = () => {
        setCollapsed(true);
    };

    return (
        <ConfigProvider
            theme={{
                token: themeColor,
            }}
        >
            <StyleTotal theme={themeColorSet}>
                <div className="post">
                    <div className="post_header flex">
                        <div className="post_header_avatar">
                            <img
                                className="img"
                                src="https://picsum.photos/200/300"
                                alt=""
                            />
                        </div>
                        <div className="post_header_info">
                            <div className="post_header_info_name">
                                <span>Nguyễn Văn A</span>
                            </div>
                            <div className="post_header_info_time">
                                <span>1 giờ trước</span>
                            </div>
                        </div>
                        <div
                            className="post_header_menu"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="post_header_menu_icon">
                                <i className="fas fa-ellipsis-h"></i>
                            </div>
                            <div

                                className={`post_header_menu_content ${collapsed ? "collapsed" : ""
                                    }`}
                            >
                                <div className="post_header_menu_content_item">
                                    <span>Chỉnh sửa</span>
                                </div>
                                <div className="post_header_menu_content_item">
                                    <span>Xóa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </StyleTotal>
        </ConfigProvider>
    );
};

export default Post;
