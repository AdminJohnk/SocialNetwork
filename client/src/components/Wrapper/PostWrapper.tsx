import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POST_BY_ID_SAGA } from "../../redux/actionSaga/PostActionSaga";
import OpenPostDetail from "../ActionComponent/OpenPostDetail/OpenPostDetail";
import { setLoading } from "../../redux/Slice/LoadingSlice";
import OpenMyPostDetail from "../ActionComponent/OpenPostDetail/OpenMyPostDetail";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";

const PostWrapper = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.postReducer.userInfo);

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      GET_POST_BY_ID_SAGA({
        id: postID,
      })
    );
    dispatch(GET_USER_ID());
  }, []);

  if (!userInfo) {
    dispatch(setLoading({ isLoading: true }));
  } else if (userInfo.id === userID) {
    dispatch(setLoading({ isLoading: false }));
    return <OpenMyPostDetail post={post} userInfo={userInfo} />;
  } else {
    dispatch(setLoading({ isLoading: false }));
    return <OpenPostDetail post={post} userInfo={userInfo} />;
  }
};

export default PostWrapper;
