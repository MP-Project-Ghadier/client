import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
  chakra,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
// import kid2 from "../../assests/imgs/kid2.jpg";
import specialist from "../../assests/imgs/specialist.jpg";
import maternity from "../../assests/imgs/maternity.png";
import chat from "../../assests/imgs/chat.png";
import children from "../../assests/imgs/children.png";
import male from "../../assests/imgs/male.png";
import female from "../../assests/imgs/female.png";
import presentation from "../../assests/imgs/presentation.png";
import Xpresentation from "../../assests/imgs/Xpresentation.png";

const About = () => {
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/newAccount");
  };
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "12xl" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
          <Box
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            style={{
              backgroundImage: `url(${specialist})`,
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            Community of Autism Families And Specialists
          </chakra.h2>
          <chakra.p
            mt={2}
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize="2xl"
          >
            An organization that brings together autism families‘s experiences
            and multi-discipline expertise in counselling services, awareness
            programs and last researches, news and events about autism.
          </chakra.p>

          <Box mt={8}>
            <Link
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
              onClick={toRegister}
            >
              Join Us
            </Link>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box w="100%">
          <Box
            pos="absolute"
            top="60rem"
            right="2rem"
            m="1rem"
            p="1rem"
            w="35%"
          >
            <Flex justifyContent="space-between" alignItems="center"></Flex>
          </Box>
        </Box>
      </Box>

      <Box
        w="100%"
        bottom="0"
        right="0"
        display="flex"
        justifyContent="space-evenly"
        textAlign="center"
        p="1rem"
      >
        <Box w="25%" boxShadow="md" p="8" rounded="md" bgColor="#1A365D">
          <Center>
            <Image
              src={maternity}
              alt="maternity"
              w="6rem"
              p="1rem"
              bgColor="white"
              borderRadius="20%"
            />
          </Center>
          <Text fontSize="3xl" color="white" m="1rem">
            Autism affects One out of every 59 Children
          </Text>
        </Box>
        <Box w="25%" boxShadow="md" p="8" rounded="md" bgColor="#1A365D">
          <Center>
            <Image
              src={chat}
              alt="chat"
              w="6rem"
              p="1rem"
              bgColor="white"
              borderRadius="20%"
            />
          </Center>
          <Text fontSize="3xl" color="white" m="1rem">
            40% of children with Autism do not speak
          </Text>
        </Box>
        <Box w="25%" boxShadow="md" p="8" rounded="md" bgColor="#1A365D">
          <Center>
            <Image
              src={children}
              alt="children"
              w="6rem"
              p="0.5rem"
              bgColor="white"
              borderRadius="20%"
            />
          </Center>
          <Text fontSize="3xl" color="white" m="1rem">
            Boys are four times more likely to have autism than girls
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" p="2rem" m="2rem">
        <Box
          w="35%"
          justifyContent="center"
          textAlign="center"
          m="1rem"
          borderRadius="sm"
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
        >
          <Text fontSize="3xl" m="1rem" color="#1A365D">
            Gender
          </Text>
          <Center>
            <Box m="1rem">
              <Center>
                <Image
                  src={male}
                  alt="male"
                  w="9rem"
                  p="1rem"
                  bgColor="white"
                  borderRadius="20%"
                />
              </Center>
              <Text color="#1A365D" fontSize="xl">
                Male
              </Text>
              <Text color="#1A365D" fontSize="xl">
                79%
              </Text>
            </Box>
            <Box>
              <Center>
                <Image
                  src={female}
                  alt="male"
                  w="9rem"
                  p="1rem"
                  bgColor="white"
                  borderRadius="20%"
                />
              </Center>
              <Text color="#1A365D" fontSize="xl">
                Female
              </Text>
              <Text color="#1A365D" fontSize="xl">
                21%
              </Text>
            </Box>
          </Center>
        </Box>
        <Box
          w="35%"
          justifyContent="center"
          textAlign="center"
          bgColor="white"
          m="1rem"
          borderRadius="sm"
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
        >
          <Box w="100%" justifyContent="center" textAlign="center">
            <Text fontSize="3xl" m="1rem" color="#1A365D">
              Enroll in education
            </Text>
            <Center>
              <Box>
                <Center>
                  <Image
                    src={presentation}
                    alt="male"
                    w="9rem"
                    p="1rem"
                    bgColor="white"
                    borderRadius="20%"
                  />
                </Center>
                <Text color="#1A365D" fontSize="xl">
                  Enrolled
                </Text>
                <Text color="#1A365D" fontSize="xl">
                  56%
                </Text>
              </Box>
              <Box m="1rem">
                <Center>
                  <Image
                    src={Xpresentation}
                    alt="male"
                    w="9rem"
                    p="1rem"
                    bgColor="white"
                    borderRadius="20%"
                  />
                </Center>
                <Text color="#1A365D" fontSize="xl">
                  Not enrolled
                </Text>
                <Text color="#1A365D" fontSize="xl">
                  44%
                </Text>
              </Box>
            </Center>
          </Box>
        </Box>
      </Box>
      <Box m="70" mb="3rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Gender statistics</Th>
              <Th>Males under the age of 13</Th>
              <Th>Males over the age of 13</Th>
              <Th>Females under the age of 13</Th>
              <Th>Females over the age of 13</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Age</Td>
              <Td isNumeric>65%</Td>
              <Td isNumeric>35%</Td>
              <Td isNumeric>59%</Td>
              <Td isNumeric>41%</Td>
            </Tr>

            <Tr>
              <Td>Saudis</Td>
              <Td isNumeric>58%</Td>
              <Td isNumeric>32% </Td>
              <Td isNumeric>53% </Td>
              <Td isNumeric> 35% </Td>
            </Tr>
            <Tr>
              <Td>Non-Saudis</Td>
              <Td isNumeric>7%</Td>
              <Td isNumeric>3% </Td>
              <Td isNumeric>7% </Td>
              <Td isNumeric> 5% </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>Not enrolled Saudis</Td>
              <Td isNumeric>47%</Td>
              <Td isNumeric>46% </Td>
              <Td isNumeric>46%</Td>
              <Td isNumeric> 34% </Td>
            </Tr>
          </Tfoot>
          <Tfoot>
            <Tr>
              <Td> Not enrolled non-Saudis</Td>
              <Td isNumeric>3%</Td>
              <Td isNumeric>3% </Td>
              <Td isNumeric>10%</Td>
              <Td isNumeric> 9% </Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default About;
