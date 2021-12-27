import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Stack, Box, Center, Button } from "@chakra-ui/react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyEmail = () => {
  const navigate = useNavigate();
  //   userRouter.get("/verifyAccount/:id", verifyAccount);
  //this 
  const confirmAccount = async (token) => {
    const result = await axios.get(`${BASE_URL}/verifyEmail/${token}`);
    console.log(result);
    console.log("here");
  };

  useEffect(() => {
    confirmAccount();
  }, []);

  return (
    <>
      <Center>
        <Stack>
          <Box m="20px">
            <Heading textAlign="center">
              Your Email has been verified! 🎉
            </Heading>
            <Center>
              {" "}
              <Button m="20px" onClick={() => navigate("/")}>
                Home
              </Button>
            </Center>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default VerifyEmail;
