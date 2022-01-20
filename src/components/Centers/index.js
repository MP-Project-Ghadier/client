import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { storage } from "../firebase";
import { PlusSquareIcon } from "@chakra-ui/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Centers = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [centers, setCenters] = useState(null);
  const [img, setImg] = useState(null);
  const [location, setLocation] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [add, setAdd] = useState(false);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  useEffect(() => {
    allCenters();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    console.log(e);
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log(img, "<=====");
    if (!img) return console.log("there is no img uploaded");
    else {
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
    }
  };

  const newCenter = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newCenter`,
        {
          title: title,
          desc: desc,
          img: url,
          location: location,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result);
      allCenters();
      setTitle("");
      setDesc("");
      setImg(null);
      setLocation("");
      setAdd(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish a new center?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      if (result.isConfirmed) {
        newCenter();
        setTitle("");
        setDesc("");
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The center is not puplished", "", "info");
        setTitle("");
        setDesc("");
      } else {
        setTitle("");
        setDesc("");
      }
    });
  };

  const allCenters = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getCenter`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result.data);
      setCenters(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneCenter = (id) => {
    navigate(`/center/${id}`);
  };

  return (
    <>
      <Box p="20" h="40vh">
        <Heading as="h3" size="lg" m={3}>
          Centers
        </Heading>
        <Text fontSize="xl" m={3}>
          The prevalence of autism is growing worldwide. Owing to parents being
          the primary caregivers in most situations, their ability to recognize
          the signs and symptoms of autism and respond appropriately is of
          paramount importance in aiming to provide the best healthcare to
          autistic individuals. We try to collect all centers to help families
          find the nearest center to diagnosing and provide the health care to
          autistic individuals.
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
        <>
          <Center>
            {add ? (
              <Box
                m="20px"
                w="50rem"
                boxShadow="base"
                p="6"
                rounded="md"
                textAlign="center"
              >
                <Heading as="h3" size="lg" m="2rem">
                  New Center
                </Heading>
                <Heading as="h4" size="md">
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

                <Heading as="h4" size="md">
                  Description
                </Heading>
                <Input
                  m="0.5rem"
                  placeholder="Description"
                  value={desc}
                  maxLength="400"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                ></Input>

                <Heading as="h4" size="md">
                  Location
                </Heading>
                <Input
                  m="0.5rem"
                  placeholder="location link"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                ></Input>

                <Heading as="h4" size="md" m="0.5rem">
                  Event Image
                </Heading>
                <div>
                  <input
                    type="file"
                    name="newPost"
                    onChange={handleChange}
                    onClick={() => {
                      console.log("here");
                    }}
                  />
                  <div>
                    <Button onClick={handleUpload}>upload</Button>
                    <progress value={progress} max="100" />
                  </div>
                  {/* <img alt={title} src={url} /> */}

                  <Button onClick={puplish}>Puplish</Button>
                </div>
              </Box>
            ) : (
              ""
            )}
          </Center>
        </>
        <>
          {centers && centers.length
            ? centers.map((ele) => {
                return (
                  <Flex
                    p={50}
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    key={ele._id}
                  >
                    <Box
                      mx={{ lg: 8 }}
                      display={{ lg: "flex" }}
                      maxW={{ lg: "5xl" }}
                      shadow={{ lg: "lg" }}
                      rounded={{ lg: "lg" }}
                    >
                      <Box w={{ lg: "50%" }}>
                        <Box
                          h={{ base: 64, lg: "full" }}
                          rounded={{ lg: "lg" }}
                          bgSize="contain"
                          bgRepeat="no-repeat"
                          style={{
                            backgroundImage: `url(${ele.img})`,
                          }}
                        ></Box>
                      </Box>

                      <Box
                        py={12}
                        px={6}
                        maxW={{ base: "xl", lg: "5xl" }}
                        w={{ lg: "50%" }}
                      >
                        <chakra.h2
                          fontSize={{ base: "2xl", md: "3xl" }}
                          fontWeight="bold"
                        >
                          {ele.title}
                        </chakra.h2>
                        <chakra.p mt={4}>{ele.desc}</chakra.p>

                        <Box mt={8}>
                          <Text
                            bg="gray.900"
                            color="gray.100"
                            px={5}
                            py={3}
                            fontWeight="semibold"
                            rounded="lg"
                            textAlign="center"
                            _hover={{ bg: "gray.800" }}
                            onClick={() => {
                              oneCenter(ele._id);
                            }}
                          >
                            Location
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                );
              })
            : ""}
        </>
      </Box>
    </>
  );
};

export default Centers;
