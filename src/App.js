import React from "react";
import { Routes, Route } from "react-router-dom";
import NewSpecialist from "./components/NewSpecialist";
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import VerifyEmail from "./components/VerifyAccount";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/newSpicalist" element={<NewSpecialist />} />
        <Route exact path="/newUser" element={<NewUser />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verifyEmail/:id" element={<VerifyEmail />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
