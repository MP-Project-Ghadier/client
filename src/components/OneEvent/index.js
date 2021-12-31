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
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";

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
      console.log(result.data);
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
      console.log(result.data);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/events");
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
  useEffect(() => {
    oneEvent();
  }, []);
  return (
    <>
      {event && (
        <Center key={event._id}>
          <Box
            p="5"
            maxW="50%"
            borderWidth="1px"
            boxShadow="2xl"
            p="6"
            rounded="md"
          >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
              />
              <MenuList>
                <MenuItem onClick={() => setEdit(true)}>Edit Events</MenuItem>
                <MenuItem onClick={() => deletePost()}>Delete Event</MenuItem>
              </MenuList>
            </Menu>
            <Heading textAlign="center" m={5}>
              {event.title}
            </Heading>
            <Center>
              <Image src={img} alt={title} boxSize="360px" m={10} />
            </Center>

            <Text p="5" m="5">
              {event.desc}
            </Text>
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
