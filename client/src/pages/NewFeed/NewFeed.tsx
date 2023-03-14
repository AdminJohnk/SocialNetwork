import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import { useSelector ,useDispatch } from "react-redux";
import { CHECK_LOGIN_SAGA } from "../../redux/actionSaga/AuthActionSaga";
import { setLogin } from "../../redux/Slice/AuthSlice";

const NewFeed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CHECK_LOGIN_SAGA());
  }, []);

  const checkLogin = useSelector((state: any) => state.authReducer.login);

  console.log(checkLogin);
  
  if(!checkLogin) {
    return <Navigate replace to='/login' />
  }


  return <div>NewFeed</div>;
};

export default NewFeed;
