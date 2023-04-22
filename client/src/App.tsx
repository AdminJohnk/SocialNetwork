import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DrawerHOC from "./HOC/Drawer/DrawerHOC";
import ModalHOC from "./HOC/Modal/ModalHOC";
import GetStarted from "./pages/GetStarted/GetStarted";
import Login from "./pages/Login/Login";
import NewFeed from "./pages/NewFeed/NewFeed";
import Register from "./pages/Register/Register";
import SelectCommunity from "./pages/SelectCommunity/SelectCommunity";
import SelectInterest from "./pages/SelectInterest/SelectInterest";
import TimeLine from "./pages/TimeLine/TimeLine";
import { CHECK_LOGIN_SAGA } from "./redux/actionSaga/AuthActionSaga";
import {
  setDispatch,
  setNavigate,
  setUseSelector,
} from "./redux/Slice/FunctionSlice";
import MainTemplate from "./templates/MenuTemplate/MainTemplate";

const App = () => {
  //Set một số tham số cần thiết trên toàn cục
  const dispatch = useDispatch();
  dispatch(setDispatch(dispatch));

  let navigate = useNavigate();
  dispatch(setNavigate(navigate));

  dispatch(setUseSelector(useSelector));

  return (
    <>
      <LoadingComponent />
      <DrawerHOC />
      <ModalHOC />
      <Routes>
        <Route path="/select-interest" element={<SelectInterest />} />
        <Route path="/select-community" element={<SelectCommunity />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<MainTemplate Component={TimeLine} />} />
        <Route
          path="/timeline"
          element={<MainTemplate Component={TimeLine} />}
        />
      </Routes>
    </>
  );
};

export default App;
