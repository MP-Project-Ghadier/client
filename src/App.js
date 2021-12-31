import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyAccount";
import Profile from "./components/Profile";
import ForgetPass from "./components/ForgetPass";
import ResetPass from "./components/ResetPass";
import Researches from "./components/Researches";
import OneResearch from "./components/OneResearch";
import Events from "./components/Events";
import OneEvent from "./components/OneEvent";
import Posts from "./components/Posts";
import OnePost from "./components/OnePost";
import Comments from "./components/Comments";
import Centers from "./components/Centers";
import OneCenter from "./components/OneCenter";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/newAccount" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/verifyEmail/:token" element={<VerifyEmail />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/forgetPass" element={<ForgetPass />} />
          <Route exact path="/resetPass/:id" element={<ResetPass />} />
          <Route exact path="/researches" element={<Researches />} />
          <Route exact path="/research/:id" element={<OneResearch />} />
          <Route exact path="/news&events" element={<Events />} />
          <Route exact path="/event/:id" element={<OneEvent />} />
          <Route exact path="/community" element={<Posts />} />
          <Route exact path="/post/:id" element={<OnePost />} />
          <Route exact path="/post/:id" element={<Comments />} />
          <Route exact path="/centers" element={<Centers />} />
          <Route exact path="/center/:id" element={<OneCenter />} />
      </Routes>
    </>
  );
};

export default App;
