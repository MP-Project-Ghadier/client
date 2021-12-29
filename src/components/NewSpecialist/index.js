import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const signUpAsSpecialist = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/newSpecialist`, {
        name,
        email,
        password,
      });
      console.log(result);
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

  return (
    <>
      <Center>
        <Stack
          boxShadow="2xl"
          p="6"
          m="80px"
          rounded="md"
          bg="white"
          w="50%"
          justifyContent="center"
          textAlign="center"
        >
          {" "}
          <Box>
            <Heading m="8px">Create New Account</Heading>
            <Heading as="h5" size="sm" m="15px" color="red">
              Sign up as a Spicalist
            </Heading>
            {/* should be 2 options user || specialist */}
            <Button
              m="8px"
              colorScheme="green"
              onClick={() => navigate("/newUser")}
            >
              User
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/newSpicalist")}
            >
              Specialist
            </Button>

            <>
              {" "}
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
                      {" "}
                    < ImEye />

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
                {" "}
                <Button id="signupSubmitButton" onClick={signUpAsSpecialist}>
                  {" "}
                  Sign Up
                </Button>
              </Center>
            </>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default Register;
