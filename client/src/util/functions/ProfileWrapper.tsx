import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_ID } from "../../redux/actionSaga/AuthActionSaga";
import MyProfile from "../../pages/TimeLine/MyProfile";
import Profile from "../../pages/TimeLine/Profile";

const ProfileWrapper = () => {
  const { userID } = useParams();
  const [userIdFromServer, setUserIdFromServer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_USER_ID());
    setUserIdFromServer(userIDFromStore);
  }, [dispatch]);

  const { userID: userIDFromStore } = useSelector(
    (state: any) => state.authReducer
  );

  if (userID === "me" || userID === userIdFromServer) {
    return <MyProfile />;
  } else {
    return <Profile userID={userID} />;
  }
};

export default ProfileWrapper;
