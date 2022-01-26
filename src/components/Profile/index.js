import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { updateUserInfo } from "../../reducers/login";
import {
  Center,
  Box,
  Text,
  Input,
  Button,
  chakra,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { storage } from "../firebase";
import "../../assests/style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState(null);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line
  }, []);

  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/profile/${state.logInReducer.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      setProfile(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const editProfile = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.put(`${BASE_URL}/updateProfile`, profile, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((avatar) => {
            setProfile({ ...profile, avatar });
          });
      }
    );
  };
  // userRouter.put("/deleteUser", authentication, authorization, deleteUser);

  const deleteAccount = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/deleteAccount`,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      {profile ? (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="sm"
            mx="auto"
          >
            <Box
              bg="gray.300"
              h={64}
              w="full"
              rounded="lg"
              shadow="md"
              bgSize="cover"
              bgPos="center"
              style={{
                backgroundImage: `url(${profile.avatar})`,
              }}
            ></Box>
            <Box w="sm" shadow="lg" rounded="lg" overflow="hidden">
              <chakra.h3
                py={2}
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing={1}
              >
                {profile.name}
              </chakra.h3>
              <Flex alignItems="center" justifyContent="center" py={2} px={3}>
                <chakra.span fontWeight="bold">{profile.email}</chakra.span>
              </Flex>
              <Flex alignItems="center" justifyContent="center" py={2} px={3}>
                <Button onClick={() => setEdit(!edit)}>Update Profile</Button>
              </Flex>
              <Flex alignItems="center" justifyContent="center" py={2} px={3}>
                <Button onClick={()=> deleteAccount()}>Delete Account</Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      ) : (
        ""
      )}

      <Center>
        <Box>
          {edit ? (
            <Box m="20px" textAlign="center">
              <Text as="h3" size="lg">
                Update Profile
              </Text>
              <Text as="h4" size="md">
                Name
              </Text>
              <Input
                placeholder="name"
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                }}
              ></Input>
              <Text as="h4" size="md">
                New Avatar
              </Text>
              <div>
                <Input type="file" name="newAvatar" onChange={handleChange} />
                <div>
                  <Button onClick={handleUpload}>upload</Button>
                  <progress value={progress} max="100" />
                </div>
                <Button onClick={editProfile}>Save Changes</Button>
              </div>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Center>
    </>
  );
};

export default Profile;
