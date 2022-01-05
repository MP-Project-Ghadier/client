import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
import Navbar from "../Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState(null);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });
  //postRouter.post("/newPost", authentication, newPost); //by any user
  const newPost = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newPost`,
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
      allPosts();
      console.log(result.status);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is something wrong...",
        });
      }
    }
  };

  const allPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPosts`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result.data);
      setPosts(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const onePost = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <>
      <Navbar />
      <Box m="40" h="40vh">
        <Heading as="h3" size="lg" m={3}>
          Community
        </Heading>
        <Text fontSize="xl" m={3}>
          Stay updated with our online community where our members interact with
          each other primarily to share your interests in Autism and last
          updates, ask and answer each other. Here you can feel family vibes. If
          you are not a member yet.Feel free to register and share us your
          interests and concerns
        </Text>
        {state.logInReducer.token == null ? (
          ""
        ) : (
          <Center>

          <Box m="20px" w="50rem" boxShadow='base' p='6' rounded='md'textAlign="center">
            <Heading as="h3" size="lg" m="0.5rem">
              New Post
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
            <Button onClick={newPost} m="0.5rem">Puplish</Button>
          </Box>
          </Center>
        )}
        <>
          {posts && posts.length
            ? posts.map((ele) => {
                //   console.log(ele);
                return (
                  <Center key={ele._id}>
                    <Box
                      w="70%"
                      p="5"
                      m="5"
                      borderRadius="md"
                      boxShadow="base"
                      rounded="md"
                      onClick={() => {
                        onePost(ele._id);
                      }}
                    >
                      <Heading
                        mt="2"
                        fontSize="xl"
                        fontWeight="semibold"
                        lineHeight="short"
                        textAlign="center"
                        pb="3"
                      >
                        {ele.title}
                      </Heading>
                      <Text>{ele.user.name}</Text>
                      <Text>{ele.createdAt}</Text>
                    </Box>
                  </Center>
                );
              })
            : ""}
        </>
      </Box>
    </>
  );
};

export default Posts;
