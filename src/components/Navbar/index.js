import React, { useState } from "react";
import logo from "../../assests/imgs/logo.png";
import { useNavigate } from "react-router-dom";
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

const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
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

          {/* Desktop */}
          <Box>
            <Flex display={["none", "none", "flex", "flex"]}>
              <Link href="/news&events">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="news&events"
                  my={5}
                  w="100%"
                >
                  Events & News
                </Button>
              </Link>

              <Link href="/community">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Community"
                  my={5}
                  w="100%"
                >
                  Community
                </Button>
              </Link>

              <Link href="/research">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Researches"
                  my={5}
                  w="100%"
                >
                  Research
                </Button>
              </Link>

              <Link href="/centers">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Centers"
                  my={5}
                  w="100%"
                >
                  Centers
                </Button>
              </Link>
              {state.logInReducer.token == null ? (
                <Link href="/newAccount">
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Register"
                    my={5}
                    w="100%"
                  >
                   Sign Up
                  </Button>
                </Link>
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
                              src={state.logInReducer.userAvatar}
                              m="0.2rem"
                            />
                            <Box m="0.5rem">
                              <Text fontSize="lg">
                                {state.logInReducer.userName}
                              </Text>
                              <Text fontSize="lg">
                                {state.logInReducer.userEmail}
                              </Text>
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
              <Link href="/news&events">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my={5}
                  w="100%"
                >
                  Events & News
                </Button>
              </Link>

              <Link href="/community">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="About"
                  my={5}
                  w="100%"
                >
                  Community
                </Button>
              </Link>

              <Link href="/research">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Contact"
                  my={5}
                  w="100%"
                >
                  Research
                </Button>
              </Link>

              <Link href="/centers">
                <Button
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                  my={5}
                  w="100%"
                >
                  Centers
                </Button>
              </Link>
              {state.logInReducer.token == null ? (
                <Link href="/newAccount">
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Register"
                    my={5}
                    w="100%"
                  >
                    Sign Up
                  </Button>
                </Link>
              ) : (
                <Link href={`/profile/${state.logInReducer.userId}`}>
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label="Profile"
                    my={5}
                    w="100%"
                  >
                    Profile
                  </Button>
                </Link>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default Navbar;
