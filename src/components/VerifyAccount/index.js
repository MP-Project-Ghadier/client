import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Stack, Box, Center, Button } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../Navbar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    confirmAccount();
    // eslint-disable-next-line
  }, []);
  
  const confirmAccount = async () => {
    const result = await axios.get(`${BASE_URL}/verifyEmail/${token}`);
    console.log(result);
  };

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
            <Box m="70px" p="70px">
              <Heading textAlign="center">
                Your Email has been verified! 🎉
              </Heading>
            </Box>
            <Center>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </Center>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default VerifyEmail;
