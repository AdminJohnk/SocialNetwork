import React, { useState, useEffect } from "react";

import { Layout, theme, Input, Row, List, Avatar, Divider, Skeleton } from 'antd';
import StyleTotal from "./cssContacts";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";

// const { Search } = Input;

let dataUser = [
    {
        userId: '1',
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userId: '1',
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
];

interface DataType {
    userId: String;
    userName: string;
    userImage: string;
}

const Contacts = ({ conversations, currentUser, currentChat }: any) => {

    // const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const setCurrentChat = (user: any) => {
        currentChat(user);
    }

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        //   .then((res) => res.json())
        //   .then((body) => {
        //     setData([...data, ...body.results]);
        //     setLoading(false);
        //   })
        //   .catch(() => {
        //     setLoading(false);
        //   });
        setData(dataUser);
        setLoading(false);
    };

    const getUSer = async () => {
        try {
            for (let i = 0; i < conversations.length; i++) {
                const friendId = conversations[i].members.find((m: any) => m !== currentUser);
                const res = await axios.get(`http://localhost:7000/api/users/` + friendId);
                data.push({
                    userId: res.data.content.user._id,
                    userName: res.data.content.user.firstname + ' ' + res.data.content.user.lastname,
                    userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
                });
                // console.log(res.data.content.user.firstname + ' ' + res.data.content.user.lastname);
                // setData(dataUser);
            }
            setData(data);
            console.log(data);

        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        loadMoreData();
        getUSer();


    }, [conversations, currentUser]);



    return (
        <StyleTotal>
            <Layout>
                <Row className="header h-24">
                    <div className="Chats text-3xl">
                        Chats
                    </div>
                    <Input
                        placeholder="Search..."
                        allowClear
                        // onInput={(value: any) => console.log(value)}
                        className="search"

                    />
                </Row>
                <div
                    className="scrollableDiv"
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 1}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item className="oneUser" onClick={() => setCurrentChat(item)}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.userImage} />}
                                        title={<div>{item.userName}</div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Layout>
        </StyleTotal >

    );
};


export default Contacts;