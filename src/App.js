import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyAccount";
import Profile from "./components/Profile";
import ForgetPass from "./components/ForgetPass";
import ResetPass from "./components/ResetPass";
import Research from "./components/Research";
import OneResearch from "./components/OneResearch";
import Events from "./components/Events";
import OneEvent from "./components/OneEvent";
import Community from "./components/Community";
import OnePost from "./components/OnePost";
import Comments from "./components/Comments";
import Centers from "./components/Centers";
import OneCenter from "./components/OneCenter";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/newAccount" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/forgetPass" element={<ForgetPass />} />
        <Route exact path="/resetPass/:id" element={<ResetPass />} />
        <Route exact path="/research" element={<Research />} />
        <Route exact path="/research/:id" element={<OneResearch />} />
        <Route exact path="/news&events" element={<Events />} />
        <Route exact path="/event/:id" element={<OneEvent />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/post/:id" element={<OnePost />} />
        <Route exact path="/post/:id" element={<Comments />} />
        <Route exact path="/centers" element={<Centers />} />
        <Route exact path="/center/:id" element={<OneCenter />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
