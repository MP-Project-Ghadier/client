import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  Center,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OneResearch = () => {
  const navigate = useNavigate();
  let postId = useParams().id;
  const [research, setResearch] = useState([]);
  // eslint-disable-next-line
  const [userName, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [edit, setEdit] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    postResearch();
    // eslint-disable-next-line
  }, []);

  const postResearch = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getResearchById/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.logInReducer.token}`,
        },
      });
      setResearch(result.data);
      setUsername(result.data.user.name);
    } catch (error) {
      console.log(error);
    }
  };

  //   postRouter.put("/updatePost/:id", authentication, authorization, updatePost);
  const updatePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/updatePost/${postId}`,
        {
          title: title.length > 0 ? title : research.title,
          desc: desc.length > 0 ? desc : research.desc,
          location: link.length > 0 ? link : research.location,
        },
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
      setResearch(result.data);
      setUsername(result.data.user.name);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setEdit(false);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Make sure to fill all fields! try again",
        });
      }
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
        updatePost();
        setTitle("");
        setDesc("");
        setLink("");
        Swal.fire("Puplished!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("The event is not puplished", "", "info");
        setTitle("");
        setDesc("");
        setLink("");
      } else {
        setTitle("");
        setDesc("");
        setLink("");
      }
    });
  };

  const deletePost = async () => {
    try {
      const result = await axios.put(
        `${BASE_URL}/deletePost/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      console.log(result.data);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/researches");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is something wrong!",
        });
      }
    }
  };

  return (
    <>
      {research && (
        <Center key={research._id}>
          <Box
            m="20px"
            w="50rem"
            boxShadow="base"
            p="6"
            rounded="md"
            textAlign="center"
          >
            {state.logInReducer.role === "Admin" ? (
              <Box display="flex" flexDirection="row-reverse">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem onClick={() => setEdit(!edit)}>
                      Edit Research
                    </MenuItem>
                    <MenuItem onClick={() => deletePost()}>
                      Delete Research
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              ""
            )}
            {edit ? (
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
                    Update Research
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
                    Update
                  </Button>
                </Box>
              </Center>
            ) : (
              <Box>
                <Heading textAlign="center">{research.title}</Heading>
                <Text p="5" m="5">
                  {research.desc}
                </Text>
              </Box>
            )}
          </Box>
        </Center>
      )}
    </>
  );
};

export default OneResearch;
