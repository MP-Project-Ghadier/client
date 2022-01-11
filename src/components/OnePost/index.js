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
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import { IoIosTrash } from "react-icons/io";
import Comments from "../Comments";
import Navbar from "../Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OnePost = () => {
  const navigate = useNavigate();
  let postId = useParams().id;
  const [post, setPost] = useState([]);
  const [userName, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isEdit, setEdit] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    onePost();
  }, []);

  const onePost = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPostById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setPost(result.data);
      setUsername(result.data.user.name);
    } catch (error) {
      console.log(error.response);
    }
  };

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
      setPost(result.data);
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
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/community");
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

  return (
    <>
      <Navbar />
      {post && (
        <Center key={post._id} m={10}>
          <Box
            m="20px"
            w="50rem"
            boxShadow="base"
            p="6"
            rounded="md"
            textAlign="center"
          >
            {state.logInReducer.user.name == userName ? (
              <Box display="flex" flexDirection="row-reverse">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem onClick={() => setEdit(true)}>Edit Post</MenuItem>
                    <MenuItem onClick={() => deletePost()}>
                      Delete Post
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              ""
              // console.log(post.user)
            )}

            <Heading textAlign="center">{post.title}</Heading>

            <Box>
              <Text p="5" m="5">
                {post.desc}
              </Text>
            </Box>
            <Box>
              <Text
                mt={2}
                fontSize="lg"
                lineHeight="short"
                textAlign="left"
                pl="3"
              >
                Shared By: {userName}
              </Text>
            </Box>
          </Box>
          {isEdit ? (
            <Box m="20px" p="10px" pos="absolute" top="50" left="0" w="20%">
              <Heading as="h3" size="lg">
                Edit Post
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
      <Box m="1rem">
        <Comments />
      </Box>
    </>
  );
};

export default OnePost;
