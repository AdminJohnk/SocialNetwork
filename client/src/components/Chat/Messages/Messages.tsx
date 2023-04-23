import React from 'react'

import StyleTotal from "./cssMessages";

function Messages({own}: any) {
    return (
        <StyleTotal>
            <div className={own ? "messages own flex items-end pr-3" : "messages flex"}>
                <div className="message-top flex pt-2">
                    <img className={own ? "messages-avatar hidden" : "messages-avatar"} src="https://picsum.photos/200/300" alt="" />

                    <div className="messages-content">
                        <div className={own ? "messages-content-name hidden" : "messages-content-name hidden"}>
                            <h3>Chat Name</h3>
                        </div>
                        <div className="messages-content-message">
                            <p>The most basic "header-content-footer" layout.

                                Generally, the mainnav is placed at the top of the page, and includes the logo,
                                the first level navigation, and the secondary menu (users, settings, notifications)
                                from left to right in it. We always put contents in a fixed size navigation (eg: 1200px),
                                the layout of the whole page is stable, it's not affected by viewing area.</p>
                        </div>
                    </div>
                </div>
                <div className="messages-bottom"> 1 hour </div>
            </div>
        </StyleTotal>
    )
}

export default Messages