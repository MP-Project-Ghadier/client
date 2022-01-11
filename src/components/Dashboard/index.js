import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Center,
  Image,
  Flex,
  Button,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
// import Navbar from "../Navbar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [research, setResearch] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  // "/getUsers"
  const allUsers = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getUsers`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setUsers(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const approveSpecialist = async (approveEmail) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/approveSpecialist`,
        { email: approveEmail },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      //send email to server
      // console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  const rejectSpecialist = async (rejectEmail) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/rejectSpecialist`,
        { email: rejectEmail },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      //send email to server
      //   console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteUser = async (deleteEmail) => {
    try {
      const result = await axios.put(
        `${BASE_URL}/deleteUser`,
        { email: deleteEmail },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      //send email to server
      //   console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  //   postRouter.get(
  //   "/reseachNeedApprove",
  //   authentication,
  //   authorization,
  //   reseachNeedApprove
  // );

  const reseachNeedApprove = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/reseachNeedApprove`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result.data);
      setResearch(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   postRouter.put("/approvePost", authentication, authorization, approvePost);
  const approvePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/approvePost`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  //   postRouter.put("/deletePost/:id", authentication, authorization, deletePost);

  // commentRouter.put(
  //     "/deleteComment/:id",
  //     authentication,
  //     authorization,
  //     deleteComment
  //   );

  useEffect(() => {
    // allUsers();
    reseachNeedApprove();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Center>
        <Box w="80%" mt="5rem">
          <Heading textAlign="center">Specialists</Heading>
          <Center>
            {users && users.length
              ? users.map((elem, i) => {
                  return (
                    <Center key={elem._id}>
                      {elem.role === "61c17200bfafd96433645c8d" ? (
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          rounded="xl"
                          shadow="lg"
                          borderWidth="1px"
                          m="0.5rem"
                          h="25rem"
                          mb="3rem"
                        >
                          <Box
                            w="100%"
                            height="200px"
                            position="relative"
                            overflow="hidden"
                            roundedTop="lg"
                          >
                            <Image
                              src={elem.avatar}
                              objectFit="cover"
                              alt="img of user"
                              layout="fill"
                              boxSize="200px"
                              ml="2rem"
                            />
                          </Box>
                          <Box p="6">
                            <Box
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              <Heading as="h4" size="md">
                                {elem.name}
                              </Heading>
                            </Box>
                            <Box>
                              <Button
                                colorScheme="blue"
                                m="1rem"
                                w="6rem"
                                onClick={() => approveSpecialist(elem.email)}
                              >
                                Approve
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                m="1rem"
                                w="6rem"
                                colorScheme="yellow"
                                onClick={() => rejectSpecialist(elem.email)}
                              >
                                Reject
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                m="1rem"
                                w="6rem"
                                colorScheme="red"
                                onClick={() => deleteUser(elem.email)}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Flex>
                      ) : (
                        ""
                      )}
                    </Center>
                  );
                })
              : ""}
          </Center>
          <Divider m="2rem" />
          <Heading textAlign="center">Users</Heading>
          <Center>
            {users && users.length
              ? users.map((elem) => {
                  return (
                    <Center key={elem._id + 2}>
                      {elem.role === "61c17227bfafd96433645c8f" ? (
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          rounded="xl"
                          shadow="lg"
                          borderWidth="1px"
                          m="0.5rem"
                          h="25rem"
                          mb="10rem"
                        >
                          <Box
                            w="100%"
                            height="200px"
                            position="relative"
                            overflow="hidden"
                            roundedTop="lg"
                          >
                            <Image
                              src={elem.avatar}
                              objectFit="cover"
                              alt="img of user"
                              layout="fill"
                              boxSize="200px"
                              ml="2rem"
                            />
                          </Box>
                          <Box p="6">
                            <Box
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              <Heading as="h4" size="md">
                                {elem.name}
                              </Heading>
                            </Box>
                            <Box>
                              <Button
                                m="1rem"
                                w="6rem"
                                colorScheme="red"
                                onClick={() => deleteUser(elem.email)}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Flex>
                      ) : (
                        ""
                      )}
                    </Center>
                  );
                })
              : ""}
          </Center>
          <Divider m="2rem" />
          <Heading textAlign="center">Research</Heading>
          <Center>
            {research && research.length
              ? research.map((elem) => {
                  return (
                    <Center key={elem._id + 3}>
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        rounded="xl"
                        shadow="lg"
                        borderWidth="1px"
                        m="0.5rem"
                        h="25rem"
                        mb="10rem"
                      >
                        <Box p="6">
                          <Box
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            <Text>{elem.title}</Text>
                          </Box>
                          <Box>
                            <Button
                              m="1rem"
                              w="6rem"
                              // onClick={() => approveSpecialist(elem.email)}
                            >
                              Read About
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              colorScheme="blue"
                              m="1rem"
                              w="6rem"
                              // onClick={() => approveSpecialist(elem.email)}
                            >
                              Approve
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              m="1rem"
                              w="6rem"
                              colorScheme="yellow"
                              // onClick={() => rejectSpecialist(elem.email)}
                            >
                              Reject
                            </Button>
                          </Box>
                        </Box>
                      </Flex>
                    </Center>
                  );
                })
              : ""}
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default Dashboard;
