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
import { IoIosTrash } from "react-icons/io";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Comments = () => {
  let postId = useParams().id;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  //postRouter.get("/postComments/:id", authentication, postComments);
  const postComment = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/postComments/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      if (result.status === 200) {
        // console.log(result.data[1]);
        setComments(result.data[1]);
        // console.log(comments);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  // commentRouter.post("/newComment/:id", authentication, newComment);
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
  // commentRouter.put("/deleteComment/:id", authentication, deleteComment);
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
        postComment();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    postComment();
  }, []);

  return (
    <>
      <Center>
        {" "}
        <Heading>comments</Heading>
      </Center>
      <Center>
        <Box>
          {comments && (
            <>
              {comments.map((elem, i) => {
                // console.log(elem._id);
                return (
                  <Center key={i}>
                    <Box m={3}>
                      {state.logInReducer.userId === elem.user._id ? (
                        <IconButton
                          colorScheme="blue"
                          aria-label="comment btn"
                          // size=""
                          m="2"
                          onClick={() => {
                            deleteComment(elem._id);
                          }}
                          icon={<IoIosTrash />}
                        />
                      ) : (
                        ""
                      )}
                      <Box textAlign="center" padding={5}>
                        <Text>{elem.user.name}</Text>
                        <Text>{elem.desc}</Text>
                        <Text>{elem.createdAt}</Text>
                      </Box>
                    </Box>
                  </Center>
                );
              })}
            </>
          )}
          <Center>
            <Box mb="4">
              <Input
                size="md"
                w="400px"
                h="80px"
                mr="4"
                m={20}
                placeholder="write your comment here"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button onClick={puplish}>add comment</Button>
            </Box>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Comments;
