import React, { useState } from "react";
import logo from "../../assests/imgs/logo.png";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useColorMode,
  Tooltip,
  Flex,
  Button,
  IconButton,
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
import { logout } from "../../reducers/login";
import { useSelector, useDispatch } from "react-redux";
import "../../assests/style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line
  const [navbar, setNavbar] = useState(false);
  // eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");

  // eslint-disable-next-line
  const [profile, setProfile] = useState({
    _id: id,
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const userLogout = async () => {
    dispatch(
      logout({
        role: "",
        token: "",
        user: "",
      })
    );
    await navigate("/login");
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

  return (
      <Box pos="block" m="2rem" p="2rem">
        <Box boxSize="8rem" pos="absolute" top={0} left={0}>
          <Image
            src={logo}
            alt="logoimg"
            pointer="cursor"
            onClick={() => navigate("/")}
          />
        </Box>
        <Flex
          position="absolute"
          top="1rem"
          right="1rem"
          align="center"
          zIndex="popover"
        >
          <Box m="25px">
            <Tooltip label="Dark mode">
              <Button onClick={toggleColorMode}>
                <Box p="0.5rem">
                  
                  <Image src="https://img.icons8.com/material/24/000000/do-not-disturb-2.png" />
                </Box>
              </Button>
            </Tooltip>
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
              {state.logInReducer.token === "" ? (
                <>
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Register"
                      my={5}
                      w="100%"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Register"
                      my={5}
                      w="100%"
                      onClick={() => navigate("/newAccount")}
                    >
                      Sign up
                    </Button>
                  </Box>
                </>
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
                              alt="avatarImg"
                              borderRadius="50%"
                              boxSize="60px"
                              src={state.logInReducer.user.avatar}
                              m="0.2rem"
                            />
                            <Box m="0.5rem">
                              <Text fontSize="lg">
                                {state.logInReducer.user.name}
                              </Text>
                              <Text fontSize="lg">
                                {state.logInReducer.user.email}
                              </Text>
                            </Box>
                          </Flex>
                        </PopoverHeader>
                        <Link
                          to={`/profile/${state.logInReducer.user._id}`}
                          className="manageLink"
                        >
                          manage your profile
                        </Link>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Center>
                            <Button colorScheme="red" onClick={userLogout}>
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
  );
};
export default Navbar;
