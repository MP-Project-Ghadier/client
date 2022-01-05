const initialState = {
  role: "",
  token: "",
  user: null,
};

const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, user} = payload;
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      //what we need to do
      // console.log(`token ${token}, userId ${userId}`);
      return { role, token, user }; // this is the change we need to return when this case is called

    case "LOGOUT":
      localStorage.clear();
      return payload;

    case "USER_INFO":
        return payload;

    default:
      const roleStorage = localStorage.getItem("role");
      const tokenStorage = localStorage.getItem("token");
      const userStorage = localStorage.getItem("user");

      if (tokenStorage)
        return {
          role: roleStorage,
          token: tokenStorage,
          user: JSON.parse(userStorage),
        };
      else return state; //default = initial state
  }
};
export default logInReducer; // export default so we can use it anywhere we need

// after that we need to define a function to each case that take data as an argument
// this function return action = {type: case, payload: data}
export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload:data,
  };
};

export const updateUserInfo = (data) => {
  return {
    type: "USER_INFO",
    payload:data,
  };
};
