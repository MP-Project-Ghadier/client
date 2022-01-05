import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import LoginGoogle from "../LoginGoogle/index";
import Navbar from "../Navbar";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Stack,
  InputRightElement,
  InputGroup,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  Text,
  Link,
} from "@chakra-ui/react";
import { ImEye } from "react-icons/im";

import PasswordChecklist from "react-password-checklist";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const signUpAsSpecialist = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/newSpecialist`, {
        name,
        email,
        password,
      });
      // console.log(result);
      if (result.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Email sent successfully, Check your email.",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      // console.log(error.response.status);
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already exist!",
        });
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill name, email and password fields",
        });
      }
      console.log(error);
    }
  };

  const signUp = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/newUser`, {
        name,
        email,
        password,
      });
      console.log(result);
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
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already exist!",
        });
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill name, email and password fields",
        });
      }
      console.log(error);
    }
  };

  return (
    <>
      <Center>
        <Navbar />

        <Stack
          boxShadow="2xl"
          p="6"
          m="160px"
          rounded="md"
          w="50%"
          justifyContent="center"
          textAlign="center"
        >
          <Box>
            <Heading m="15" p="15">
              Create New Account
            </Heading>
            {/* should be 2 options user || specialist */}
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab >User</Tab>
                <Tab >Specialist</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <>
                    <Heading as="h5" size="sm" m="15px" color="red">
                      Sign up as a User
                    </Heading>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Name</FormLabel>
                      <Input
                        type="name"
                        placeholder="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Password</FormLabel>
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
                            <ImEye />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <PasswordChecklist
                        m="8px"
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                          "lowercase",
                        ]}
                        minLength={6}
                        value={password}
                        onChange={(isValid) => {
                          if (isValid) {
                            const button = document.querySelector(
                              "#signupSubmitButton"
                            );
                            button.disabled = false;
                          } else {
                            const button = document.querySelector(
                              "#signupSubmitButton"
                            );
                            button.disabled = true;
                          }
                        }}
                      />
                    </FormControl>
                    <Center>
                      <Button id="signupSubmitButton" onClick={signUp}>
                        Sign Up
                      </Button>
                    </Center>
                    {/* <LoginGoogle /> */}
                  </>
                </TabPanel>
                <TabPanel>
                  <>
                    <Heading as="h5" size="sm" m="15px" color="red">
                      Sign up as a Spicalist
                    </Heading>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Name</FormLabel>
                      <Input
                        type="name"
                        placeholder="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel m="8px">Your Password</FormLabel>
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
                            <ImEye />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <PasswordChecklist
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                          "lowercase",
                        ]}
                        minLength={6}
                        value={password}
                        onChange={(isValid) => {
                          if (isValid) {
                            const button = document.querySelector(
                              "#signupSubmitButton"
                            );
                            button.disabled = false;
                          } else {
                            const button = document.querySelector(
                              "#signupSubmitButton"
                            );
                            button.disabled = true;
                          }
                        }}
                      />
                    </FormControl>
                    <Center>
                      <Button
                        id="signupSubmitButton"
                        onClick={signUpAsSpecialist}
                      >
                        Sign Up
                      </Button>
                    </Center>
                  </>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Box>
              <Text fontSize="2xl">
                You Already Have an Account?
                <Button
                ml="1rem"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Text>
            </Box>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default Register;
