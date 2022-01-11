import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Image,
  chakra,
  Text,
  Center,
  Input,
  Heading,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";
import { IoIosTrash } from "react-icons/io";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Comments = () => {
  let postId = useParams().id;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    postComment();
    setComment("")

  }, []);

  const postComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/postComments/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      if (result.status === 200) {
        setComments(result.data[1]);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const newComment = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newComment/${postId}`,
        {
          desc: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result);
      postComment();
    } catch (error) {
      console.log(error.response);
    }
  };

  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish this comment?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        newComment();

        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The comment is not puplished", "", "info");
        setComment("");
      } else {
        setComment("");
      }
    });
  };

  const deleteComment = async (id) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/deleteComment/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      if (result.status === 200) {
        Swal.fire({
          title: "Do you want to delete this comment?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Deleted",
          denyButtonText: `Don't Delete`,
        }).then((result) => {
          if (result.isConfirmed) {
            setComment("");
            deleteComment();
            postComment();

            Swal.fire("Deleted!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("The comment is not Deleted", "", "info");
            setComment("");
          } else {
            setComment("");
          }
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Center>
        <Heading>Comments</Heading>
      </Center>
      {comments && (
        <>
          {comments.map((elem, i) => {
            return (
              <Flex
                p={50}
                w="full"
                alignItems="center"
                justifyContent="center"
                key={i}
              >
                <Box w="md" mx="auto" py={4} px={8} shadow="lg" rounded="lg">
                  {state.logInReducer.user._id === elem.user._id ? (
                    <IconButton
                      colorScheme="blue"
                      aria-label="comment btn"
                      m="2"
                      onClick={() => {
                        deleteComment(elem._id);
                      }}
                      icon={<IoIosTrash />}
                    />
                  ) : (
                    ""
                  )}
                  <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
                    <Image
                      w={20}
                      h={20}
                      fit="cover"
                      rounded="full"
                      borderStyle="solid"
                      borderWidth={2}
                      alt="Testimonial avatar"
                      src={elem.user.avatar}
                    />
                  </Flex>

                  <chakra.p m={4} fontSize={{ base: "2xl", md: "m" }} fontWeight="bold">
                    {elem.desc}
                  </chakra.p>

                  <Flex justifyContent="space-between" mt={4}>
                    <chakra.h2
                      fontSize={{ base: "lg", md: "m" }}
                      mt={{ base: 2, md: 0 }}
                    >
                      {elem.createdAt}
                    </chakra.h2>
                    <Text fontSize="xl">{elem.user.name}</Text>
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </>
      )}
      <Box mb="4">
        <Input
          size="md"
          w="400px"
          h="80px"
          m={8}
          placeholder="write your comment here"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button onClick={puplish}>add comment</Button>
      </Box>
    </>
  );
};

export default Comments;
