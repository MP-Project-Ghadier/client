import React from "react";
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
} from "@chakra-ui/react";
import kid2 from "../../assests/imgs/kid2.jpg";
import specialist from "../../assests/imgs/specialist.jpg";
import maternity from "../../assests/imgs/maternity.png";
import chat from "../../assests/imgs/chat.png";
import children from "../../assests/imgs/children.png";
import male from "../../assests/imgs/male.png";
import female from "../../assests/imgs/female.png";
import presentation from "../../assests/imgs/presentation.png";
import Xpresentation from "../../assests/imgs/Xpresentation.png";

const About = () => {
  return (
    <>
      <Box>
        <Image
          src={specialist}
          alt="autismImg"
          w="32rem"
          overflow="hidden"
          zIndex="-1"
          pos="relative"
          m="1rem"
        />
        <Box
          pos="absolute"
          top="70rem"
          right="2rem"
          m="1rem"
          p="1rem"
          w="50rem"
        >
          <Text fontSize="5xl">Community of Autism Families</Text>
          <Text fontSize="5xl">And Specialists</Text>
          <Text fontSize="3xl">
            An organization that brings together autism families‘s experiences
            and multi-discipline expertise in counselling services,
          </Text>
          <Text fontSize="3xl">
            awareness programs and last researches, news and events about
            autism.
          </Text>
        </Box>
      </Box>
      <Box>
        <Box>
          <Image src={kid2} opacity="0.7" zIndex="hide" />
        </Box>
        <Box
          pos="absolute"
          top="123rem"
          right="0"
          m="1rem"
          p="1rem"
          bg=" rgba(255, 255, 255, 0.5)"
        >
          <Text fontSize="5xl">What is Autism?</Text>
          <Box>
            <Text fontSize="2xl">Autism, or Autism Spectrum Disorder,</Text>
            <Text fontSize="2xl">is a known brain development condition</Text>
            <Text fontSize="2xl">that manifests itself as difficulty</Text>
            <Text fontSize="2xl">
              in communicating or socializing with others
            </Text>
            <Text fontSize="2xl">and can affect an individual and</Text>
            <Text fontSize="2xl">their family throughout their life.</Text>
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
      <Box m="70">
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
