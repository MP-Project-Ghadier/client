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
} from "@chakra-ui/react";
import { storage } from "../firebase";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Events = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [events, setEvents] = useState(null);
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

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

  // postRouter.post("/newEvent", authentication, authorization, newEvent);
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
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The event is not puplished", "", "info");
        setTitle("");
        setDesc("");
      } else {
        setTitle("");
        setDesc("");
      }
    });
  };

  //  postRouter.get("/getEvent", authentication, getEvent);

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

  useEffect(() => {
    allEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Box m="40" h="40vh">
        <Heading as="h3" size="lg" m={3}>
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
        <>
          {events && events.length
            ? events.map((ele) => {
                console.log(ele);
                return (
                  <Center key={ele._id}>
                    <Box
                      w="100vh"
                      p="5"
                      m="5"
                      borderRadius="md"
                      boxShadow="base"
                      rounded="md"
                      onClick={() => {
                        oneEvent(ele._id);
                      }}
                    >
                      <Image w={320} src={ele.img} />
                      <Text m={3}>{ele.createdAt}</Text>
                      <Box>
                        <Heading
                          mt="2"
                          fontSize="xl"
                          fontWeight="semibold"
                          lineHeight="short"
                          textAlign="center"
                          pb="3"
                        >
                          {ele.title}
                        </Heading>
                      </Box>
                    </Box>
                  </Center>
                );
              })
            : ""}
        </>
        {state.logInReducer.role === "Admin" ? (
          <Center>
            <Box m="20px" textAlign="center">
              <Heading as="h3" size="lg">
                New Event
              </Heading>
              <Heading as="h4" size="md">
                Title
              </Heading>
              <Input
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
                placeholder="Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></Input>
              <div>
                <Input type="file" name="newPost" onChange={handleChange} />
                <div>
                  <Button onClick={handleUpload}>upload</Button>
                  <progress value={progress} max="100" />
                </div>
                <Image alt={title} src={url} />

                <Button onClick={puplish}>Puplish</Button>
              </div>
            </Box>
          </Center>
        ) : (
          ""
        )}
      </Box>
      <Box mt="3rem">
        <Footer />
      </Box>    </>
  );
};

export default Events;
