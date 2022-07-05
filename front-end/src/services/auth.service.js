import axios from "axios";

const API_URL = "http://localhost:4039/api/auth/";

const signup = (file, firstName, lastName, departmentID, email, password, passwordConfirm ) => {
    return axios.post(API_URL + "signup", {
      file,
      firstName,
      lastName,
      departmentID,
      email,
      password,
      passwordConfirm 
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
            JSON.stringify(response.data));
      }

      return response.data;
    })

}    


const logout = () => {
  return axios
    .put(API_URL + "logout")
    .then(() => { localStorage.removeItem("Bearer token") }
    )
  
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("Bearer token"));
};

const AuthService = { 
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;