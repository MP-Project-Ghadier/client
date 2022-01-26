import React, { useState, useEffect, useParams } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/login";
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
  chakra,
  HStack,
  VStack,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import Logo from "../../assests/imgs/logo.png";
import "../../assests/style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Navbar = () => {
  const mobileNav = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode();
  // const [display, changeDisplay] = useState("none");

  const [profile, setProfile] = useState(null);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line
  }, []);

  const userProfile = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/profile/${state.logInReducer.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      setProfile(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

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

  return (
    <React.Fragment>
      <chakra.header w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Home Page"
              display="flex"
              alignItems="center"
            >
              <Box boxSize="4.5rem" pos="absolute" top={0} left={0}>
                <Image
                  src={Logo}
                  alt="logoimg"
                  pointer="cursor"
                  onClick={() => navigate("/")}
                />
              </Box>
            </chakra.a>
          </Flex>

          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Tooltip label="Dark mode">
                <Button onClick={toggleColorMode}>
                  <Box>
                    <Image src="https://img.icons8.com/material/24/000000/do-not-disturb-2.png" />
                  </Box>
                </Button>
              </Tooltip>
              <Button
                as="a"
                variant="ghost"
                aria-label="news&events"
                onClick={() => navigate("/news&events")}
              >
                Events & News
              </Button>
              <Button
                as="a"
                variant="ghost"
                aria-label="Community"
                onClick={() => navigate("/community")}
              >
                Community
              </Button>
              <Button
                as="a"
                variant="ghost"
                aria-label="Researches"
                onClick={() => navigate("/research")}
              >
                Research
              </Button>
              <Button
                as="a"
                variant="ghost"
                onClick={() => navigate("/centers")}
              >
                Centers
              </Button>
              {state.logInReducer.token === "" ? (
                <>
                  <Button
                    variant="ghost"
                    aria-label="Login"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    aria-label="Register"
                    onClick={() => navigate("/newAccount")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  {profile ? (
                    <Popover>
                      <PopoverTrigger>
                        <Button as="a" variant="ghost" aria-label="Profile">
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
                            to={`/profile/${profile._id}`}
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
                  ) : (
                    ""
                  )}
                </>
              )}
            </HStack>

            {/* Mobile Content */}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                spacing={3}
                rounded="sm"
                shadow="sm"
                bgColor="gray.50"
                h="100vh"
                w="100vw"
              >
                <CloseIcon
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Tooltip label="Dark mode">
                  <Button onClick={toggleColorMode}>
                    <Box>
                      <Image src="https://img.icons8.com/material/24/000000/do-not-disturb-2.png" />
                    </Box>
                  </Button>
                </Tooltip>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  w="full"
                  onClick={() => navigate("/news&events")}
                >
                  Events & News
                </Button>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="community"
                  w="full"
                  onClick={() => navigate("/community")}
                >
                  Community
                </Button>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="research"
                  w="full"
                  onClick={() => navigate("/research")}
                >
                  Research
                </Button>
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="centers"
                  w="full"
                  onClick={() => navigate("/centers")}
                >
                  Centers
                </Button>
                {state.logInReducer.token === "" ? (
                  <Box>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Register"
                      w="full"
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
                      w="full"
                      onClick={() =>
                        navigate(`/profile/${state.logInReducer.userId}`)
                      }
                    >
                      Profile
                    </Button>
                  </Box>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default Navbar;
