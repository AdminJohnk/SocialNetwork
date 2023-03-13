import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom'
import { useSelector ,useDispatch } from "react-redux";
import { CHECK_LOGIN_SAGA } from "../../redux/actionSaga/AuthActionSaga";

const NewFeed = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CHECK_LOGIN_SAGA());
  }, []);

  const checkLogin = useSelector((state: any) => state.authReducer.login);
  
  if(!checkLogin) {
    return <Navigate replace to='/login' />
  }

  return <div></div>;
};

export default NewFeed;
