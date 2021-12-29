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
} from "@chakra-ui/react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Researches = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [researches, setResearches] = useState(null);
  const [source, setSource] = useState("");

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });
  // postRouter.post("/newResearch", authentication, authorization, newResearch);
  const newResearch = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/newResearch`,
        {
          title: title,
          desc: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const puplish = () => {
    Swal.fire({
      title: "Do you want to puplish a new research?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Puplish",
      denyButtonText: `Don't Puplish`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        newResearch();
        setTitle("");
        setDesc("");
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The research is not puplished", "", "info");
        setTitle("");
        setDesc("");
      } else {
        setTitle("");
        setDesc("");
      }
    });
  };

  //   postRouter.get("/getResearch", authentication, getResearch);
  const allResearches = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getResearch`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      //   console.log(result.data);
      setResearches(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneResearch = (id) => {
    navigate(`/research/${id}`);
  };

  useEffect(() => {
    allResearches();
  }, []);
  return (
    <>
      <Box m="20">
        <Heading as="h3" size="lg" textAlign="center">
          All Researches
        </Heading>
        {researches && researches.length
          ? researches.map((ele) => {
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
                      oneResearch(ele._id);
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
      </Box>
      {/* <Box>
        <Heading as='h3' size='lg'> Type of research</Heading>
      </Box> */}
      <Box m="20px">
        <Heading as="h3" size="lg">
          New Research
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
        <Button onClick={puplish}>Puplish</Button>
      </Box>
    </>
  );
};

export default Researches;
