import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Login from "./pages/Login/Login";
import NewFeed from "./pages/NewFeed/NewFeed";
import Register from "./pages/Register/Register";
import TimeLine from "./pages/TimeLine/TimeLine";
import { CHECK_LOGIN_SAGA } from "./redux/actionSaga/AuthActionSaga";
import MainTemplate from "./templates/MenuTemplate/MainTemplate";

const App = () => {
  return (
    <>
      <LoadingComponent />
      <Routes>
        <Route path="/" element={<MainTemplate Component={NewFeed} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<TimeLine />} />
      </Routes>
    </>
  );
};

export default App;
