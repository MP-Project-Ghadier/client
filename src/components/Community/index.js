import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  Flex,
  chakra,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState(null);
  const [add, setAdd] = useState(false);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  useEffect(() => {
    allPosts();
    // eslint-disable-next-line
  }, []);

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
      setTitle("");
      setDesc("");
      // console.log(result.status);
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

  const onePost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <Box p="20" h="40vh">
        <Heading as="h3" size="lg" p={3}>
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
          <Box display="flex" justifyContent="flex-end">
            <Tooltip label="Add new post!">
              <PlusSquareIcon
                boxSize={12}
                _hover={{
                  background: "white",
                  color: "#2C5282",
                }}
                onClick={() => setAdd(!add)}
              />
            </Tooltip>
          </Box>
        )}
        <>
          {add ? (
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
                <Button onClick={newPost} m="0.5rem">
                  Puplish
                </Button>
              </Box>
            </Center>
          ) : (
            ""
          )}
        </>
        <>
          <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
            {posts && posts.length
              ? posts.map((ele) => {
                  return (
                    <Flex
                      p={8}
                      w="full"
                      alignItems="center"
                      justifyContent="center"
                      key={ele._id}
                    >
                      <Box
                        mx="auto"
                        px={8}
                        py={4}
                        rounded="lg"
                        shadow="lg"
                        w="50rem"
                        maxW="50rem"
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <chakra.span fontSize="sm">
                            {ele.createdAt}
                          </chakra.span>
                        </Flex>

                        <Box mt={2}>
                          <Text fontSize="2xl" fontWeight="700">
                            {ele.title}
                          </Text>
                        </Box>

                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          mt={4}
                        >
                          <Button
                            onClick={() => {
                              onePost(ele._id);
                            }}
                          >
                            Read more
                          </Button>

                          <Flex alignItems="center">
                            <Image
                              mx={4}
                              w={10}
                              h={10}
                              rounded="full"
                              fit="cover"
                              display={{ base: "none", sm: "block" }}
                              src={ele.user.avatar}
                              alt="avatar"
                            />
                            <Text mx={2} fontWeight="bold">
                              {ele.user.name}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })
              : ""}
          </Box>
        </>
      </Box>
    </>
  );
};

export default Posts;
