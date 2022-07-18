import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4039/api/auth/";

const signup = (file, firstName, lastName, departmentID, email, password, passwordConfirm ) => {
    return axios.post(API_URL + "signup",
   
     {
      file,
      lastName,
      firstName,
      departmentID,
      email,
      password,
      passwordConfirm
  },
  { headers: {"Content-Type": "multipart/form-data"}},
  )
  .then((response) => {
    if (response.data.token) {
      localStorage.setItem(
        "Bearer token",
        JSON.stringify(response.data.token));
    }
    if (response.data.user) {
      localStorage.setItem(
        "User data",
        JSON.stringify(response.data.user)
      )
    }
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
        email,
        password,
      }
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem(
          "Bearer token",
          JSON.stringify(response.data.token));
      }
      if (response.data.user) {
        localStorage.setItem(
          "User data",
          JSON.stringify(response.data.user)
        )
      }
    });
}    


const logout = () => {
  return axios.put(API_URL + "logout", null, {headers: authHeader()})
              .then(() => { localStorage.clear()})
    
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("User data"));
};

const AuthService = { 
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;