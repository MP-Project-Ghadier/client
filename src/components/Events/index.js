import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  Image,
  Flex,
  Link,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { storage } from "../firebase";
import { PlusSquareIcon } from "@chakra-ui/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Events = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [events, setEvents] = useState(null);
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [add, setAdd] = useState(false);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  useEffect(() => {
    allEvents();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const newEvent = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newEvent`,
        {
          title: title,
          desc: desc,
          img: url,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      allEvents();
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };
  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish a new event?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      if (result.isConfirmed) {
        newEvent();
        setTitle("");
        setDesc("");
        setImg(null);
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The event is not puplished", "", "info");
        setTitle("");
        setDesc("");
        setImg(null);
      } else {
        setTitle("");
        setDesc("");
        setImg(null);
      }
    });
  };

  const allEvents = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getEvent`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      //   console.log(result.data);
      setEvents(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneEvent = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <>
      <Box p="20" h="40vh">
        <Heading as="h3" size="lg" p={3}>
          News & Events
        </Heading>
        <Text fontSize="xl" m={3}>
          Stay updated about our various activities, events, milestones and
          achievements. At the Society for Autism Families, we are passionate
          about spreading and showcasing our news updates, our sponsored events,
          as well as our professional works and publications to keep interested
          individuals informed about our growing programmes that mark a
          memorable humanitarian impression.
        </Text>
        {state.logInReducer.role === "Admin" ? (
          <Box display="flex" justifyContent="flex-end">
            <Tooltip label="Add new event!">
              <PlusSquareIcon
                boxSize={12}
                _hover={{
                  background: "white",
                  color: "#2C5282",
                }}
                onClick={() => setAdd(!add)}
              />
            </Tooltip>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <>
        {add ? (
          <Center>
            <Box
              m="4"
              w="50rem"
              boxShadow="base"
              p="3"
              rounded="md"
              textAlign="center"
            >
              <Heading as="h3" size="lg" m="2rem">
                New Event
              </Heading>
              <Heading as="h4" size="md" m="0.5rem">
                Title
              </Heading>
              <Input
                m="0.5rem"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Input>

              <Heading as="h4" size="md" m="0.5rem">
                Description
              </Heading>
              <Input
                m="0.5rem"
                placeholder="Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></Input>
              <Heading as="h4" size="md" m="0.5rem">
                Event Image
              </Heading>
              <Box>
                <Input
                  type="file"
                  name="newPost"
                  onChange={handleChange}
                  m="0.5rem"
                />
                <Box>
                  <Button onClick={handleUpload}>upload</Button>
                  <progress value={progress} max="100" />
                </Box>

                {/* <Image alt={title} src={url} /> */}
                <Box>
                  <Button onClick={puplish}>Puplish</Button>
                </Box>
              </Box>
            </Box>
          </Center>
        ) : (
          ""
        )}
      </>
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly">
        {events && events.length
          ? events.map((ele) => {
              // console.log(ele);
              return (
                <Flex
                  p={8}
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                  key={ele._id}
                >
                  <Box w="300rem" mx="auto" rounded="lg" shadow="md" maxW="2xl">
                    <Image
                      roundedTop="lg"
                      w="full"
                      h={64}
                      fit="cover"
                      src={ele.img}
                      alt="Article"
                    />

                    <Box p={6}>
                      <Box>
                        <chakra.span fontSize="xs" textTransform="uppercase">
                          News & Events
                        </chakra.span>
                        <Link
                          display="block"
                          fontWeight="bold"
                          fontSize="2xl"
                          mt={2}
                          _hover={{ color: "gray.600", textDecor: "underline" }}
                          onClick={() => {
                            oneEvent(ele._id);
                          }}
                        >
                          {ele.title}
                        </Link>
                      </Box>

                      <Box mt={4}>
                        <Flex alignItems="center">
                          <Flex alignItems="center">
                            <Image
                              h={10}
                              fit="cover"
                              rounded="full"
                              src={ele.user.avatar}
                              alt="Avatar"
                            />
                            <Text mx={2} fontWeight="bold">
                              {ele.user.name}
                            </Text>
                          </Flex>
                          <chakra.span mx={1} fontSize="sm">
                            {ele.createdAt}
                          </chakra.span>
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              );
            })
          : ""}
      </Box>
    </>
  );
};

export default Events;
