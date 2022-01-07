import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  Center,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import { storage } from "../firebase";

import "../../assests/style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OneCenter = () => {
  let postId = useParams().id;
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [center, setCenter] = useState({
    title: "",
    desc: "",
    img: "",
    location: "",
  });

  const state = useSelector((state) => {
    return state;
  });

  const oneCenter = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getCenterById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result.data);
      setCenter(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/updatePost/${postId}`,
        center,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result.data);
      setCenter(result.data);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Make sure to fill all fields! try again",
        });
      }
    }
  };

  const deletePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/deletePost/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/centers");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is something wrong!",
        });
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setCenter({ ...center, img });
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
          .then((img) => {
            setCenter({ ...center, img });
          });
      }
    );
  };

  useEffect(() => {
    oneCenter();
  }, []);
  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column">
        {center && (
          <Center key={center._id}>
            <Box
              m="20px"
              w="50rem"
              boxShadow="base"
              p="6"
              rounded="md"
              textAlign="center"
            >
              <Box>
                {state.logInReducer.role == "Admin" ? (
                  <Box display="flex" flexDirection="row-reverse">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<GiHamburgerMenu />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem onClick={() => setEdit(!isEdit)}>
                          Edit Center
                        </MenuItem>
                        <MenuItem onClick={() => deletePost()}>
                          Delete Center
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                ) : (
                  ""
                )}
                <Box>
                  <Center>
                    <Image src={img} alt={center.title} boxSize="360px" />
                  </Center>
                  <Center>
                    <Text className="p">{center.desc}</Text>
                  </Center>
                </Box>
                <Box m="3rem">
                  <AspectRatio ratio={16 / 9}>
                    <iframe src={center.location} alt="demo" />
                  </AspectRatio>
                </Box>
              </Box>
            </Box>
            {isEdit ? (
              <Box w="50%">
                <Heading as="h3" size="lg">
                  Edit Center
                </Heading>
                <Heading as="h4" size="md">
                  Title
                </Heading>
                <Input
                  placeholder="Title"
                  // value={title}
                  onChange={(e) => {
                    setCenter({ ...center, title: e.target.value });
                  }}
                ></Input>

                <Heading as="h4" size="md">
                  Description
                </Heading>
                <Input
                  placeholder="Description"
                  // value={desc}
                  onChange={(e) => {
                    setCenter({ ...center, desc: e.target.value });
                  }}
                ></Input>
                <Heading as="h4" size="md">
                  Location
                </Heading>
                <Input
                  placeholder="Location"
                  // value={location}
                  onChange={(e) => {
                    setCenter({ ...center, location: e.target.value });
                  }}
                ></Input>
                <Box>
                  <Text as="h4" size="md">
                    New Avatar
                  </Text>
                  <div>
                    <Input
                      type="file"
                      name="newAvatar"
                      onChange={handleChange}
                    />
                    <div>
                      <Button onClick={handleUpload}>upload</Button>
                      <progress value={progress} max="100" />
                    </div>
                    <Button onClick={updatePost}>Save</Button>
                  </div>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Center>
        )}
      </Box>
    </>
  );
};

export default OneCenter;
