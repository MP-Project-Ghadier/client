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
  const [url, setUrl] = useState("");
  const [edit, setEdit] = useState(false);
  const [center, setCenter] = useState([]);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [locationLink, setlocation] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    oneCenter();
  }, []);

  const oneCenter = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getCenterById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setCenter(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/updatePost/${postId}`,
        {
          title: title.length > 0 ? title : center.title,
          desc: desc.length > 0 ? desc : center.desc,
          img: img ? img : center.img,
          locationLink:
            locationLink.length > 0 ? locationLink : center.location,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
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
      setEdit(!edit);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is something went wrong, ask the admin",
        });
      }
      setEdit(!edit);
    }
  };

  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish a new event?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      if (result.isConfirmed) {
        updatePost();
        setTitle("");
        setDesc("");
        setImg("");
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The event is not puplished", "", "info");
        setTitle("");
        setDesc("");
        setImg("");
      } else {
        setTitle("");
        setDesc("");
        setImg("");
      }
    });
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
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  return (
    <>
      <Navbar />
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
                    <MenuItem onClick={() => setEdit(!edit)}>
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
            {edit ? (
              <Center>
                <Box
                  m="4"
                  w="50rem"
                  boxShadow="base"
                  p="3"
                  rounded="md"
                  textAlign="center"
                >
                  <Heading as="h3" size="lg" m="2rem">
                    Update Center
                  </Heading>
                  <Heading as="h4" size="md" m="0.5rem">
                    Title
                  </Heading>
                  <Input
                    m="0.5rem"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></Input>

                  <Heading as="h4" size="md" m="0.5rem">
                    Description
                  </Heading>
                  <Input
                    m="0.5rem"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  ></Input>
                  <Heading as="h4" size="md" m="0.5rem">
                    Center Image
                  </Heading>
                  <Box>
                    <Input
                      type="file"
                      name="newPost"
                      onChange={handleChange}
                      m="0.5rem"
                    />
                    <Box>
                      <Button onClick={handleUpload}>upload</Button>
                      <progress value={progress} max="100" />
                    </Box>

                    <Image alt={title} src={url} />
                    <Box>
                      <Button onClick={puplish}>ْUpdate</Button>
                    </Box>
                  </Box>
                </Box>
              </Center>
            ) : (
              <>
                <Box>
                  <Center>
                    <Image
                      src={center.img}
                      alt={center.title}
                      boxSize="360px"
                    />
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
              </>
            )}
          </Box>
        </Center>
      )}
    </>
  );
};

export default OneCenter;
