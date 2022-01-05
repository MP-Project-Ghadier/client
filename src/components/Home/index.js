import React, { useEffect } from "react";
import About from "../About";
import Navbar from "../Navbar";
import Slideshow from "../Slideshow";

const Home = () => {

  useEffect(() => {}, []);
  return (
    <>
      <Slideshow />
      <Navbar />
      <About />
    </>
  );
};

export default Home;
