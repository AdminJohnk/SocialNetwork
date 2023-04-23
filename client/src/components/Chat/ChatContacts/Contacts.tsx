import React, { useState, useEffect } from "react";

import { Layout, theme, Input, Row, List, Avatar, Divider, Skeleton } from 'antd';
import StyleTotal from "./cssContacts";
import InfiniteScroll from 'react-infinite-scroll-component';
const { Search } = Input;

const dataUser = [
    {
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 1',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 2',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 3',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
    {
        userName: 'Ant Design Title 4',
        userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png'
    },
];

interface DataType {
    userName: string;
    userImage: string;
}

const Contacts = (contact: any, changeChat: any) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const loadMoreData = () => {
        if (loading) {
            return;
        }
        // setLoading(true);
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
        // setLoading(false);
    };

    useEffect(() => {
        loadMoreData();
    }, []);

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
                        // onSearch={(value) => console.log(value)}
                        className="search"

                    />
                </Row>
                <div
                    className="scrollableDiv"
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 10}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item className="oneUser">
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.userImage} />}
                                        title={<div>{item.userName}</div>}
                                    />
                                </List.Item>
                            )}
                        /></InfiniteScroll></div>
            </Layout>
        </StyleTotal >

    );
};


export default Contacts;