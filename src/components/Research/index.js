import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  Box,
  Tooltip,
  Button,
  Center,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Researches = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [researches, setResearches] = useState(null);
  const [link, setLink] = useState("");
  const [add, setAdd] = useState(false);

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  useEffect(() => {
    allResearches();
    // eslint-disable-next-line
  }, []);

  const newResearch = async () => {
    try {
      // eslint-disable-next-line
      const result = await axios.post(
        `${BASE_URL}/newResearch`,
        {
          title: title,
          desc: desc,
          location: link,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      allResearches();
      setTitle("");
      setDesc("");
      setLink("");
      setAdd(false);
    } catch (error) {
      console.log(error.response);
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

  const allResearches = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getResearch`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      // console.log(result.data);
      setResearches(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneResearch = (id) => {
    navigate(`/research/${id}`);
  };

  return (
    <>
      <Box p="20" h="40vh">
        <Heading as="h3" size="lg" m={3}>
          Research Studies
        </Heading>
        <Text fontSize="xl" m={3}>
          The prevalence of autism is growing worldwide. Owing to parents being
          the primary caregivers in most situations, their ability to recognize
          the signs and symptoms of autism and respond appropriately is of
          paramount importance in aiming to provide the best healthcare to
          autistic individuals. We try to collect latest research studies about
          Autism and share it here with our community for help families to be
          more aware about Autism.
        </Text>
        {state.logInReducer.role === "Admin" ||
        state.logInReducer.role === "Specialist" ? (
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
                  New Research
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
                  Link
                </Heading>
                <Input
                  m="0.5rem"
                  placeholder="Title"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                ></Input>
                <Button onClick={puplish} m="0.5rem">
                  Puplish
                </Button>
              </Box>
            </Center>
          ) : (
            ""
          )}
        </>
        <>
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
                      {/* <Text>{ele.user.name}</Text> */}
                      <Text>{ele.createdAt}</Text>
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

export default Researches;
