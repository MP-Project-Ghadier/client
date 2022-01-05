import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserPosts = () => {
  const [user, setUser] = useState("");

  const state = useSelector((state) => {
    return {
      logInReducer: state.logInReducer,
    };
  });

  const userPosts = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/getPostsByUserId`,
        {
          headers: {
            Authorization: `Bearer ${state.logInReducer.token}`,
          },
        }
      );
      // console.log(result.data);
    } catch (error) {
      // console.log(error.response);
    }
  };
  // postRouter.get("/getPostsByUserId", authentication, getPostsByUserId);
  useEffect(() => {
    userPosts();
  }, []);
  return (
    <>
      <h1>userPosts</h1>
    </>
  );
};

export default UserPosts;
