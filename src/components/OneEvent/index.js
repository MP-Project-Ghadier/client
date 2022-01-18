import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
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
  Flex,
  Link,
  chakra,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import { storage } from "../firebase";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OneEvent = () => {
  const navigate = useNavigate();
  let postId = useParams().id;
  const [event, setEvent] = useState([]);
    // eslint-disable-next-line
  const [userName, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    oneEvent();
      // eslint-disable-next-line
  }, []);

  const oneEvent = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getEventById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setImg(result.data.img);
      setEvent(result.data);
      setUsername(result.data.user.name);
    } catch (error) {
      console.log(error);
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

  const updatePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/updatePost/${postId}`,
        {
          title: title.length > 0 ? title : event.title,
          desc: desc.length > 0 ? desc : event.desc,
          img: img.length > 0 ? img : event.img,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      setEvent(result.data);
      setUsername(result.data.user.name);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setEdit(false);
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
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The event is not puplished", "", "info");
        setTitle("");
        setDesc("");
      } else {
        setTitle("");
        setDesc("");
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
        navigate("/news&events");
      }
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is something wrong!",
        });
      }
    }
  };

  return (
    <>
      {event && (
        <Center key={event._id}>
          <Box
            m="20px"
            w="50rem"
            boxShadow="base"
            p="6"
            rounded="md"
            textAlign="center"
          >
            {state.logInReducer.role === "Admin" ? (
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
                      Edit Events
                    </MenuItem>
                    <MenuItem onClick={() => deletePost()}>
                      Delete Event
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
                    Update Event
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
                    Event Image
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
              <Flex p={50} w="full" alignItems="center" justifyContent="center">
                <Box mx="auto" rounded="lg" shadow="md" maxW="2xl">
                  <Image
                    roundedTop="lg"
                    w="full"
                    h={64}
                    fit="cover"
                    src={event.img}
                    alt="Article"
                  />

                  <Box p={6}>
                    <Box>
                      <chakra.span fontSize="xs" textTransform="uppercase">
                        News & Events
                      </chakra.span>
                      <Link
                        display="block"
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                        _hover={{ color: "gray.600", textDecor: "underline" }}
                      >
                        {event.title}
                      </Link>
                      <chakra.p mt={2} fontSize="xl">
                        {event.desc}
                      </chakra.p>
                    </Box>
                    <Box mt={4}>
                      <Flex alignItems="center">
                        <Flex alignItems="center">
                          <Link mx={2} fontWeight="bold"></Link>
                        </Flex>
                        <chakra.span mx={1} fontSize="sm">
                          {event.createdAt}
                        </chakra.span>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            )}
          </Box>
        </Center>
      )}
    </>
  );
};

export default OneEvent;
