import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NewFeed from "./pages/NewFeed/NewFeed";
import Register from "./pages/Register/Register";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
