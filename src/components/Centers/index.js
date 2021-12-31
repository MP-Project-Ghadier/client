import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Box, Button, Center, Heading, Input, Text } from "@chakra-ui/react";
import { storage } from "../firebase";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Centers = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [centers, setCenters] = useState(null);
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
  //postRouter.post("/newCenter", authentication, authorization, newCenter);
  const newCenter = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newCenter`,
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
      //       allCenters();
      console.log(result);
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
      console.log(result.data);
      setCenters(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneCenter = (id) => {
    navigate(`/center/${id}`);
  };
  useEffect(() => {
    allCenters();
  }, []);
  return (
    <>
      <Box m="20">
        <Heading as="h3" size="lg" textAlign="center">
          All Centers
        </Heading>
        {centers && centers.length
          ? centers.map((ele) => {
              //   console.log(ele);
              return (
                <Center key={ele._id}>
                  <Box
                    w="70%"
                    p="5"
                    m="5"
                    borderRadius="md"
                    boxShadow="base"
                    rounded="md"
                    onClick={() => {
                      oneCenter(ele._id);
                    }}
                  >
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
                    <Text>{ele.user.name}</Text>
                    <Text>{ele.createdAt}</Text>
                  </Box>
                </Center>
              );
            })
          : ""}{" "}
        <Box m="20px">
          <Heading as="h3" size="lg">
            New Center
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
            <img alt={title} src={url} />

            <Button onClick={puplish}>Puplish</Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Centers;
