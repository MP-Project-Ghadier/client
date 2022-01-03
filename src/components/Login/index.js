import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../LoginGoogle/index";
import { login } from "../../reducers/login";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Heading,
  Stack,
  Center,
  InputRightElement,
  InputGroup,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { ImEye } from "react-icons/im";

import Swal from "sweetalert2";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const signIn = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result);
      const data = {
        role: result.data.role,
        token: result.data.token,
        userId: result.data.result._id,
        userEmail: result.data.result.email,
        userName: result.data.result.name,
        userAvatar: result.data.result.avatar,
      };
      // console.log("result", result.status);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/`);
      }
      // console.log(data);
      dispatch(login(data));
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email or password is wrong, Try again",
        });
      }
      if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill email and password fields",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <Center>
        <Stack
          boxShadow="2xl"
          p="6"
          mb="40px"
          rounded="md"
          bg="white"
          w="50%"
          justifyContent="center"
          textAlign="center"
        >
          <Heading>Please Login</Heading>
          <FormControl id="email" isRequired>
            <FormLabel m="8px">Enter your Email</FormLabel>

            <Input
              type="email"
              placeholder="email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Divider height="30px" />
            <FormLabel m="8px">Enter your Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4rem">
                <Button
                  height="1.7rem"
                  mr="3"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {" "}
                  <ImEye />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Divider height="20px" />

          <Center>
            <Button m="8px" onClick={signIn}>
              Sign in
            </Button>
          </Center>

          <Link m="8px" color="#2B6CB0" href="/forgetPass">
            Forget your password?
          </Link>
          <Text fontSize="md">
            Don't Have an Account?
            <Link m="8px" color="#2B6CB0" href="/newAccount">
              Sign Up
            </Link>
          </Text>
          <LoginGoogle />
        </Stack>
      </Center>
      <Box mt="3rem">
        <Footer />
      </Box>{" "}
    </>
  );
};

export default Login;
