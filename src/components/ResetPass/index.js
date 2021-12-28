import React, { useState } from "react";
import {
  Input,
  Heading,
  Stack,
  Center,
  Text,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { ImEye } from "react-icons/im";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ResetPass = () => {
  const { id } = useParams();
  const [code, setCode] = useState(0);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // userRouter.post("/resetPass/:id", resetPass);

  const resetPass = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/resetPass/${id}"`, {
        code: code,
        password: password,
      });
      console.log(result.stat);
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There is something wrong!",
      });
    }
  };
  return (
    <>
      <Center>
        <Stack textAlign="center" m="80px">
          <Heading>New Password</Heading>
          <Text>Enter Reset Password Code</Text>
          <Input
            type="code"
            placeholder="code"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></Input>
          <Text>Enter Your New Password 🔐</Text>
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
          <Button onClick={resetPass}>Save</Button>
        </Stack>
      </Center>
    </>
  );
};

export default ResetPass;
