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
} from "@chakra-ui/react";

import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";
// import Navbar from "../Navbar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {
  const [users, setUsers] = useState([]);

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

  //   "/approveSpecialist"
  // );
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
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  //   "/rejectSpecialist"
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

  // userRouter.put("/deleteUser", authentication, authorization, deleteUser);
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

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Center>
        <Box w="80%" mt="5rem">
          <Heading textAlign="center">Specialist</Heading>
          <Center>
            {users && users.length
              ? users.map((elem, i) => {
                  return (
                    <>
                      <Center key={i}>
                        {elem.role === "61c17200bfafd96433645c8d" ? (
                          <>
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              bg="white"
                              rounded="xl"
                              shadow="lg"
                              borderWidth="1px"
                              m="0.5rem"
                              h="25rem"
                              mb="3rem"
                              key={elem._id}
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
                                    onClick={() =>
                                      approveSpecialist(elem.email)
                                    }
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
                          </>
                        ) : (
                          ""
                        )}
                      </Center>
                    </>
                  );
                })
              : ""}
          </Center>
          <Divider m="2rem" />
          <Heading textAlign="center">User</Heading>
          <Center>
            {users && users.length
              ? users.map((elem) => {
                  return (
                    <>
                      <Center>
                        {elem.role === "61c17227bfafd96433645c8f" ? (
                          <>
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              bg="white"
                              rounded="xl"
                              shadow="lg"
                              borderWidth="1px"
                              m="0.5rem"
                              h="25rem"
                              mb="10rem"
                              key={elem._id * 2}
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
                          </>
                        ) : (
                          ""
                        )}
                      </Center>
                    </>
                  );
                })
              : ""}
          </Center>
        </Box>
      </Center>
      <Box mt="3rem">
        <Footer />
      </Box>    </>
  );
};

export default Dashboard;
