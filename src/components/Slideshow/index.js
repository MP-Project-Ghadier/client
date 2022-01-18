import React, { useState, useRef, useEffect } from "react";
import kid from "../../assests/imgs/kid.jpg";
import kid3 from "../../assests/imgs/kid3.jpg";
import community from "../../assests/imgs/community.jpg";
import childPlay from "../../assests/imgs/childPlay.jpg";
import { Box, Image } from "@chakra-ui/react";

import "../../assests/style.css";

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const imgs = [kid, kid3, community, childPlay];
  const delay = 3000;

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
    // eslint-disable-next-line
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  return (
    <>
      <Box className="slideshow">
        <Box
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {imgs.map((backgroundImg, index) => (
            <Image
              className="slide"
              key={index}
              src={backgroundImg}
              alt="slideimg"
            />
          ))}
        </Box>
      </Box>
      <Box
        pos="absolute"
        top="36rem"
        left="0rem"
        p="1.5rem"
        borderRadius="sm"
        boxShadow="lg"
        rounded="md"
        bg=" rgba(255, 255, 255, 0.5)"
      >
        <h1 className="h1">Autism isn't a Disability, </h1>

        <h1 className="h1"> It is a Different Ability</h1>
      </Box>
    </>
  );
};

export default Slideshow;
