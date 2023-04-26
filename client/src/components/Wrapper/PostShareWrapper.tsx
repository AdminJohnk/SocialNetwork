import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POSTSHARE_BY_ID_SAGA } from "../../redux/actionSaga/PostActionSaga";
import { setLoading } from "../../redux/Slice/LoadingSlice";
import OpenPostShareDetail from "../ActionComponent/OpenPostDetail/OpenPostShareDetail";
import OpenMyPostShareDetail from "../ActionComponent/OpenPostDetail/OpenMyPostShareDetail";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";

const PostShareWrapper = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state: any) => state.postReducer.post);
  const userInfo = useSelector((state: any) => state.postReducer.userInfo);

  const { userID } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(
      GET_POSTSHARE_BY_ID_SAGA({
        id: postID,
      })
    );
    dispatch(GET_USER_ID());
  }, []);

  if (!userInfo) {
    dispatch(setLoading({ isLoading: true }));
  } else if (userInfo.id === userID) {
    dispatch(setLoading({ isLoading: false }));
    return <OpenMyPostShareDetail post={post} userInfo={userInfo} />;
  } else {
    dispatch(setLoading({ isLoading: false }));
    return <OpenPostShareDetail post={post} userInfo={userInfo} />;
  }
};

export default PostShareWrapper;
