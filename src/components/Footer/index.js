import React from "react";
import { Flex, IconButton, Link, Text, Box } from "@chakra-ui/react";
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
const Footer = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        textAlign="center"
        bgColor="#1A365D"
        h="6rem"
      >
        <Text fontSize="xl" color="white" m="1rem" pos="absolute">
          ©{new Date().getFullYear()} Unity of Autism Families & Specialists.
          All Rights Reserved
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          w="100%"
          m="3rem"
          color="white"
        >
          <TiSocialTwitter cursor="pointer" fontSize="35px" />
          <TiSocialYoutube cursor="pointer" fontSize="35px" />
          <TiSocialFacebook cursor="pointer" fontSize="35px" />
          <TiSocialInstagram cursor="pointer" fontSize="35px" />
        </Box>
      </Box>
    </>
  );
};

export default Footer;