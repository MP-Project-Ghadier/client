import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../../reducers/login";
import {
  Image,
  Center,
  Box,
  Text,
  Input,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  useEditableControls,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Navbar from "../Navbar";
import axios from "axios";
import { storage } from "../firebase";
// import UserPosts from "../UserPosts";
import "../../assests/style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState(null);

  // const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const [profile, setProfile] = useState({
    _id: id,
    name: state.logInReducer.user.name,
    email: state.logInReducer.user.email,
    avatar: state.logInReducer.user.avatar,
  });

  // const getUser = async () => {
  //   try {
  //     const result = await axios.get(`${BASE_URL}/profile/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${state.logInReducer.token}`,
  //       },
  //     });
  //     localStorage.setItem("user", JSON.stringify(result.data));
  //     dispatch(updateUserInfo(result.data));
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const editProfile = async () => {
    try {
      const result = await axios.put(`${BASE_URL}/updateProfile`, profile, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      console.log(result);
      // getUser();
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

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <>
      <Navbar />
      <Center>
        <Box w="60%" borderWidth="1px" boxShadow="2xl" p="6" m="8">
          <Box>
            <Button onClick={() => setEdit(!edit)}>Update</Button>
          </Box>
          <Box display="flex" p="6" m="8">
            <Image
              borderRadius="md"
              alt="avatarImg"
              borderRadius="50%"
              boxSize="150px"
              src={state.logInReducer.user.avatar}
            />

            <Box>
              <Box m="3rem" display="flex" justifyContent="space-between">
                <Box mr="3rem">
                  <h2 className="h2">Your Name</h2>
                </Box>
                <Editable
                  textAlign="center"
                  defaultValue={state.logInReducer.user.name}
                  fontSize="2xl"
                  isPreviewFocusable={false}
                >
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                </Editable>
              </Box>
            </Box>
          </Box>
        </Box>
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
      </Center>

      {/* <UserPosts /> */}
    </>
  );
};

export default Profile;
