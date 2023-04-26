import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";
import MyProfile from "../../pages/MyProfile/MyProfile";
import Profile from "../../pages/Profile/Profile";
import { setLoading } from "../../redux/Slice/LoadingSlice";

const ProfileWrapper = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  // const { isLoading1 } = useSelector((state: any) => state.loadingReducer);

  const { userID: userIDFromStore } = useSelector(
    (state: any) => state.authReducer
  );

  useEffect(() => {
    dispatch(GET_USER_ID());
  }, []);

  if (!userIDFromStore) {
    dispatch(setLoading({ isLoading: true }));
  } else if (userID === "me" || userID === userIDFromStore) {
    return <MyProfile />;
  } else {
    return <Profile userID={userID} />;
  }
};

export default ProfileWrapper;
