import React, { useState,
  //  useEffect
   } from "react";
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
  Image,
} from "@chakra-ui/react";
import { storage } from "../firebase";
import Navbar from "../Navbar";

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

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  // useEffect(() => {
  //   if (centers === null) return;
  //   allCenters();
  // }, []);

  const handleChange = (e) => {
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
  //postRouter.post("/newCenter", authentication, authorization, newCenter);
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
      console.log(result);
      allCenters();
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

  //postRouter.get("/getCenter", authentication, getCenter);

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
      <Navbar />
      <Box m="40" h="40vh">
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
        <Center>
          {state.logInReducer.role === "Admin" ? (
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
                <img alt={title} src={url} />

                <Button onClick={puplish}>Puplish</Button>
              </div>
            </Box>
          ) : (
            ""
          )}
        </Center>
        <>
          {centers && centers.length
            ? centers.map((ele) => {
                //   console.log(ele);
                return (
                  <Center key={ele._id}>
                    <Box
                      p="5"
                      w="80%"
                      mt="5rem"
                      borderRadius="md"
                      boxShadow="base"
                      rounded="md"
                      onClick={() => {
                        oneCenter(ele._id);
                      }}
                    >
                      <Heading
                        mt="2"
                        fontSize="md"
                        fontWeight="semibold"
                        lineHeight="short"
                        textAlign="center"
                        pb="3"
                      >
                        {ele.title}
                      </Heading>
                      <Center>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          rounded="xl"
                          shadow="lg"
                          borderWidth="1px"
                          m="0.5rem"
                          h="25rem"
                          mb="3rem"
                        >
                          <Box
                            w="100%"
                            height="200px"
                            position="relative"
                            overflow="hidden"
                            roundedTop="lg"
                            alignContent="center"
                            justifyContent="center"
                          >
                            <Image
                              src={ele.img}
                              objectFit="fill"
                              alt="img of center"
                              layout="fill"
                              boxSize="400px"
                            />
                          </Box>
                        </Flex>
                      </Center>
                    </Box>
                  </Center>
                );
              })
            : ""}
        </>
      </Box>
    </>
  );
};

export default Centers;
