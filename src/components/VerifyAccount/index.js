import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Stack, Box, Center, Button } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  //   userRouter.get("/verifyAccount/:token", verifyAccount);
  const confirmAccount = async () => {
    const result = await axios.get(`${BASE_URL}/verifyEmail/${token}`);
    console.log(result);
  };

  useEffect(() => {
    confirmAccount();
  }, []);

  return (
    <>
      <Center>
        <Navbar />
        <Stack>
          <Box
            m="70px"
            p="70px"
            height="75vh"
            justifyContent="center"
            textAlign="center"
          >
            <Box  m="70px"
            p="70px">
              <Heading textAlign="center">
                Your Email has been verified! 🎉
              </Heading>
            </Box>
            <Center>
              <Button onClick={() => navigate("/login")}>
                Login
              </Button>
            </Center>
          </Box>
        </Stack>
      </Center>
      <Box mt="3rem">
        <Footer />
      </Box>    </>
  );
};

export default VerifyEmail;
