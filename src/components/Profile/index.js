import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../reducers/login";

import {
  Image,
  Center,
  Box,
  Text,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import Navbar from "../Navbar";
import axios from "axios";
import { storage } from "../firebase";
import UserPosts from "../UserPosts";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [profile, setProfile] = useState({
    _id: id,
    name: state.logInReducer.user.name,
    email: state.logInReducer.user.email,
    avatar: state.logInReducer.user.avatar,
  });

  const getUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(updateUserInfo(result.data));
    } catch (error) {
      console.log(error.response);
    }
  };

  const editProfile = async () => {
    try {
      const result = await axios.put(`${BASE_URL}/updateProfile`, profile, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      console.log(result);
      getUser();
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

  return (
    <>
      <Navbar />
      {state.logInReducer.role === "Admin" ? (
        <>
          <Box
            p="6"
            rounded="md"
            textAlign="center"
            display="flex"
            flexDirection="row-reverse"
          >
            <Button onClick={() => navigate("/Dashboard")}>
              Admin Dashboard
            </Button>
          </Box>
        </>
      ) : (
        ""
      )}
      <Center>
        <Box maxW="100%" borderWidth="1px" boxShadow="2xl" p="6" m="8">
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<EditIcon />}
            // onClick={setEdit(true)}
          />
          <Box display="flex" p="6" m="8">
            <Image
              borderRadius="md"
              alt="avatarImg"
              borderRadius="50%"
              boxSize="150px"
              src={state.logInReducer.user.avatar}
            />
            <Box p="6" m="8">
              <Text p="2" m="2">
                Name:
              </Text>
              <Text p="2" m="2">
                {state.logInReducer.user.name}
              </Text>
              <Text p="2" m="2">
                Email:
              </Text>
              <Text p="2" m="2">
                {state.logInReducer.user.email}
              </Text>
            </Box>
          </Box>
        </Box>

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
      </Center>
      <UserPosts />
    </>
  );
};

export default Profile;
