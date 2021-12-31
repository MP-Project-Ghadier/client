import { useState } from "react";
import logo from "../../assests/imgs/logo.svg";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Link,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  return (
    <>
      <Flex
        position="fixed"
        top="1rem"
        right="1rem"
        align="center"
        zIndex="popover"
      >
     
        <Image
          boxSize="8rem"
          pos="fixed"
          top={0}
          left={0}
          src={logo}
          alt="logoimg"
          onClick={() => navigate("/")}
        />
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link href="/news&events" passHref>
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

          <Link href="/community" passHref>
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

          <Link href="/researches" passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Researches"
              my={5}
              w="100%"
            >
              Researches
            </Button>
          </Link>

          <Link href="/centers" passHref>
            <Button as="a" variant="ghost" aria-label="Centers" my={5} w="100%">
              Centers
            </Button>
          </Link>

          <Link href="/newAccount" passHref>
            <Button as="a" variant="ghost" aria-label="Register" my={5} w="100%">
            Register
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
        <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
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
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link href="/news&events" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Events & News
            </Button>
          </Link>

          <Link href="/community" passHref>
            <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
              Community
            </Button>
          </Link>

          <Link href="/researches" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Researches
            </Button>
          </Link>

          <Link href="/centers" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Centers
            </Button>
          </Link>

          <Link href="/newAccount" passHref>
            <Button as="a" variant="ghost" aria-label="Register" my={5} w="100%">
              Register
            </Button>
          </Link>
        </Flex>
        
      </Flex>
    </>
  );
};
export default Navbar;
