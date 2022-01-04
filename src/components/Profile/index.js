import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
import Footer from "../Footer";
import axios from "axios";
import { storage } from "../firebase";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState(null);

  const [profile, setProfile] = useState({
    _id: id,
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const state = useSelector((state) => {
    return state;
  });

  //userRouter.get("/getUser/:id", authentication, getUsers);
  const getUser = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setProfile(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  //if result.data 404 يعني مسجل دخول عن طريق قوقل لأنه ما حط ايدي صحيح تبع مونقو حط الايدي حق قوقل واللي مو موجود بالداتا بيس حقتنا

  // we need to get user by email as what I did before, insted of params
  // user posts in profile

  //userRouter.put("/updateProfile", authentication, updateProfile);
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
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
              src={profile.avatar}
            />
            <Box p="6" m="8">
              <Text p="2" m="2">
                Name:
              </Text>
              <Text p="2" m="2">
                {profile.name}
              </Text>
              <Text p="2" m="2">
                Email:
              </Text>
              <Text p="2" m="2">
                {profile.email}
              </Text>
            </Box>
          </Box>
        </Box>
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
              New Password
            </Text>
            <Input
              placeholder="password"
              onChange={(e) => {
                setProfile({ ...profile, password: e.target.value });
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
              {/* <Image alt={profile.userName} src={profile.avatar} /> */}

              <Button onClick={editProfile}>Save Changes</Button>
            </div>
          </Box>
        ) : (
          ""
        )}
      </Center>
      <Box mt="3rem">
        <Footer />
      </Box>{" "}
    </>
  );
};

export default Profile;
