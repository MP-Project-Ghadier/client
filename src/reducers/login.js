const initialState = {
  role: null,
  token: null,
  userId: null,
  userEmail: null,
  userName: null,
  userAvatar: null,
};

const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, userId, userEmail, userName, userAvatar } = payload;
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userAvatar", userAvatar);

      //what we need to do
      // console.log(`token ${token}, userId ${userId}`);
      return { token }; // this is the change we need to return when this case is called

    case "LOGOUT":
      localStorage.clear();
      return {
        token: null,
        userId: null,
        userEmail: null,
        userName: null,
        userAvatar: null,
      };

    default:
      const roleStorage = localStorage.getItem("role");
      const tokenStorage = localStorage.getItem("token");
      const userIdStorage = localStorage.getItem("userId");
      const userEmailStorage = localStorage.getItem("userEmail");
      const userNameStorage = localStorage.getItem("userName");
      const userAvatarStorage = localStorage.getItem("userAvatar");

      if (tokenStorage)
        return {
          role: roleStorage,
          token: tokenStorage,
          userId: userIdStorage,
          userEmail: userEmailStorage,
          userName: userNameStorage,
          userAvatar: userAvatarStorage,
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
    payload: data,
  };
};
