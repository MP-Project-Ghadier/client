import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, Center, Box, Text } from "@chakra-ui/react";

const Profile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  return (
    <>
      {state ? (
        <>
          <Center>
            <Box maxW="100%" borderWidth="1px" boxShadow="2xl" p="6" m="8">
              <Box display="flex" p="6" m="8">
                {" "}
                <Image
                  borderRadius="md"
                  src={avatar}
                  alt="avatarImg"
                  borderRadius="50%"
                  boxSize="150px"
                  src={state.logInReducer.userAvatar}
                />
              </Box>
              <Box p="6" m="8">
                <Center>
                <Text p="2" m="2">
                  Name:
                </Text>
                <Text p="2" m="2">{state.logInReducer.userName}</Text>
                <Text p="2" m="2">Email:</Text>
                <Text p="2" m="2">{state.logInReducer.userEmail}</Text>
                </Center>
              </Box>
            </Box>
          </Center>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
