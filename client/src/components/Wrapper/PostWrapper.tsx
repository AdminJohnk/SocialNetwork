import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_POST_BY_ID_SAGA } from '../../redux/actionSaga/PostActionSaga';
import OpenPostDetail from '../ActionComponent/OpenPostDetail/OpenPostDetail';
import OpenMyPostDetail from '../ActionComponent/OpenPostDetail/OpenMyPostDetail';
import { GET_USER_ID } from '../../redux/actionSaga/AuthActionSaga';
import { getTheme } from '../../util/functions/ThemeFunction';
import { Col, ConfigProvider, Row, Skeleton } from 'antd';

const PostWrapper = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      GET_POST_BY_ID_SAGA({
        id: postID,
      }),
    );
    dispatch(GET_USER_ID());
  }, []);

  if (!post || !userInfo) {
    return (
      <ConfigProvider
        theme={{
          token: themeColor,
        }}
      >
        <div
          style={{
            backgroundColor: themeColorSet.colorBg1,
          }}
        >
          <Row className="py-10">
            <Col offset={3} span={18}>
              <Skeleton avatar paragraph={{ rows: 1 }} active />
              <div className="mt-10">
                <Skeleton className="mb-8" active paragraph={{ rows: 3 }} />
                <Skeleton className="mb-8" active paragraph={{ rows: 3 }} />
                <Skeleton className="mb-8" active paragraph={{ rows: 3 }} />
              </div>
              <div className="w-8/12 mt-5">
                <Skeleton className="mb-3" avatar paragraph={{ rows: 1 }} active />
                <Skeleton className="mb-3" avatar paragraph={{ rows: 1 }} active />
                <Skeleton className="mb-3" avatar paragraph={{ rows: 1 }} active />
              </div>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    );
  } else if (userInfo?.id === userID) {
    return <OpenMyPostDetail key={post._id} post={post} userInfo={userInfo} />;
  } else {
    return <OpenPostDetail key={post._id} post={post} userInfo={userInfo} />;
  }
};

export default PostWrapper;
