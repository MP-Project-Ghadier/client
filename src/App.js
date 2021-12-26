import React from "react";
import { Routes, Route } from "react-router-dom";
import NewSpecialist from "./components/NewSpecialist";
import Login from "./components/Login";
import NewUser from "./components/NewUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/newSpicalist" element={<NewSpecialist />} />
        <Route exact path="/newUser" element={<NewUser />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
