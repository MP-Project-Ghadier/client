import React, { useState, useEffect } from "react";
import logo from "../../assests/imgs/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Link,
  Image,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Text,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import "../../assests/style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [navbar, setNavbar] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  const [profile, setProfile] = useState({
    _id: id,
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const getUser = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/profile/${state.logInReducer.userId}`,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
      setProfile(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const state = useSelector((state) => {
    return state;
  });

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const changeBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Box>
        <Box pos="block" m="2rem" p="2rem">
          <Flex
            position="fixed"
            top="1rem"
            right="1rem"
            align="center"
            zIndex="popover"
          >
            <Box m="25px">
              <Switch isChecked={isDark} onChange={toggleColorMode} />
            </Box>
            <Box>
              <Image
                boxSize="8rem"
                pos="fixed"
                top={0}
                left={0}
                src={logo}
                alt="logoimg"
                pointer="cursor"
                onClick={() => navigate("/")}
              />
            </Box>

            {/* Desktop */}
            <Box>
              <Flex display={["none", "none", "flex", "flex"]}>
                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="news&events"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/news&events")}
                  >
                    Events & News
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Community"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/community")}
                  >
                    Community
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Researches"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/research")}
                  >
                    Research
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Centers"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/centers")}
                  >
                    Centers
                  </Button>
                </Box>
                {state.logInReducer.token == "" ? (
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Register"
                      my={5}
                      w="100%"
                      onClick={() => navigate("/newAccount")}
                    >
                      Sign Up
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          as="a"
                          variant="ghost"
                          aria-label="Profile"
                          my={5}
                          w="100%"
                        >
                          Profile
                        </Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>
                            <Flex>
                              <Image
                                borderRadius="md"
                                alt="avatarImg"
                                borderRadius="50%"
                                boxSize="60px"
                                src={profile.avatar}
                                m="0.2rem"
                              />
                              <Box m="0.5rem">
                                <Text fontSize="lg">{profile.name}</Text>
                                <Text fontSize="lg">{profile.email}</Text>
                              </Box>
                            </Flex>
                          </PopoverHeader>
                          <Link
                            href={`/profile/${state.logInReducer.userId}`}
                            color="#2B6CB0"
                            p="1"
                            fontSize="lg"
                            textAlign="center"
                          >
                            manage your profile
                          </Link>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Center>
                              <Button colorScheme="red" onClick={logout}>
                                Sign Out
                              </Button>
                            </Center>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </>
                )}
              </Flex>
            </Box>
            {/* Mobile */}
            <IconButton
              aria-label="Open Menu"
              size="lg"
              mr={5}
              icon={<HamburgerIcon />}
              onClick={() => changeDisplay("flex")}
              display={["flex", "flex", "none", "none"]}
            />
          </Flex>

          {/* Mobile Content */}
          <Flex
            w="100vw"
            display={display}
            bgColor="gray.50"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            zIndex={20}
            overflowY="auto"
            flexDir="column"
          >
            <Flex justify="flex-end" pos="block">
              <IconButton
                mt={2}
                mr={2}
                aria-label="Open Menu"
                size="lg"
                icon={<CloseIcon />}
                onClick={() => changeDisplay("none")}
              />
            </Flex>
            <Box>
              <Flex flexDir="column" align="center">
                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Home"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/news&events")}
                  >
                    Events & News
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="About"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/community")}
                  >
                    Community
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Contact"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/research")}
                  >
                    Research
                  </Button>
                </Box>

                <Box>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Home"
                    my={5}
                    w="100%"
                    onClick={() => navigate("/centers")}
                  >
                    Centers
                  </Button>
                </Box>
                {state.logInReducer.token == null ? (
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Register"
                      my={5}
                      w="100%"
                      onClick={() => navigate("/newAccount")}
                    >
                      Sign Up
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Profile"
                      my={5}
                      w="100%"
                      onClick={() =>
                        navigate(`/profile/${state.logInReducer.userId}`)
                      }
                    >
                      Profile
                    </Button>
                  </Box>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
export default Navbar;
