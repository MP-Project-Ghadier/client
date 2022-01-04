import React, { useState } from "react";
import { Input, Heading, Stack, Center, Text, Button,Box } from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
// import Footer from "../Footer";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ForgetPass = () => {
  const [email, setEmail] = useState("");

  // userRouter.post("/forgetPass", forgetPass);
  const forgetPass = async () => {
    try {
      //   console.log(email);
      const result = await axios.post(`${BASE_URL}/forgetPass`, {
        email: email,
      });
      //   console.log(result);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Email sent successfully, Check your email.",
          showConfirmButton: false,
          timer: 2500,
        });

      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Center>
        <Stack textAlign="center" m="80px">
          <Heading>Reset Password</Heading>
          <Text>Please enter your email</Text>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Button onClick={forgetPass}>Send</Button>
        </Stack>
      </Center>
      {/* <Box mt="3rem">
        <Footer />
      </Box> */}
    </>
  );
};

export default ForgetPass;
