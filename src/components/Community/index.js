import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Footer from "../Footer";

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
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish a new research?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        newPost();
        setTitle("");
        setDesc("");
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The post is not puplished", "", "info");
        setTitle("");
        setDesc("");
      } else {
        setTitle("");
        setDesc("");
      }
    });
  };

  //   postRouter.get("/getPosts", authentication, getPosts);

  const allPosts = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPosts`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      //   console.log(result.data);
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
        {state.logInReducer.token == null ? (
          ""
        ) : (
          <Box m="20px">
            <Heading as="h3" size="lg">
              New Post
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
            <Button onClick={puplish}>Puplish</Button>
          </Box>
        )}
      </Box>
      <Box mt="3rem">
        <Footer />
      </Box>
    </>
  );
};

export default Posts;
