import React from "react";
import About from "../About";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Slideshow from "../Slideshow";

const Home = () => {
  return (
    <>
      <Slideshow />
      <Navbar />
      <About />
      <Footer />
    </>
  );
};

export default Home;
