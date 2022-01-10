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
  Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OneEvent = () => {
  const navigate = useNavigate();
  let postId = useParams().id;
  const [event, setEvent] = useState([]);
  const [userName, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [img, setImg] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    oneEvent();
  }, []);
  
  // postRouter.get("/getResearchById/:id", authentication, getResearchById);
  const oneEvent = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getEventById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      //   console.log(result.data);
      setImg(result.data.img);
      setEvent(result.data);
      setUsername(result.data.user.name);
    } catch (error) {
      console.log(error);
    }
  };



  //   postRouter.put("/updatePost/:id", authentication, authorization, updatePost);
  const updatePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/updatePost/${postId}`,
        {
          title: title,
          desc: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
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

  //   postRouter.put("/deletePost/:id", authentication, deletePost);

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
      <Navbar />
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
                    <MenuItem onClick={() => setEdit(true)}>
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
                  {console.log(event.user)}
                  <Box mt={4}>
                    <Flex alignItems="center">
                      <Flex alignItems="center">
                        {/* <Image
                          h={10}
                          fit="cover"
                          rounded="full"
                          src={event.user.avatar}
                          alt="Avatar"
                        /> */}
                        <Link mx={2} fontWeight="bold">
                          {/* {event.user.name} */}
                        </Link>
                      </Flex>
                      <chakra.span mx={1} fontSize="sm">
                        {event.createdAt}
                      </chakra.span>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
          {isEdit ? (
            <Box m="20px" p="10px" pos="absolute" top="50" left="0" w="20%">
              <Heading as="h3" size="lg">
                Edit Event
              </Heading>
              <Heading as="h4" size="md">
                Title
              </Heading>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Input>

              <Heading as="h4" size="md">
                Description
              </Heading>
              <Input
                placeholder="Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></Input>
              <Button onClick={updatePost}>Save</Button>
            </Box>
          ) : (
            ""
          )}
        </Center>
      )}
    </>
  );
};

export default OneEvent;
