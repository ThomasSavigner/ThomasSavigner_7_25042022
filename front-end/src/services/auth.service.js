import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4039/api/auth/";

const signup = async (file, firstName, lastName, departmentID, email, password, passwordConfirm ) => {
    try {
    const response = await axios.post(API_URL + "signup", {
      file,
      lastName,
      firstName,
      departmentID,
      email,
      password,
      passwordConfirm
    }, {
      headers: { "Content-Type": "multipart/form-data" }
    }
    );
    if (response.data.token) {
      localStorage.setItem("Bearer token", JSON.stringify(response.data.token));
    }
    if (response.data.user) {
      localStorage.setItem("User data", JSON.stringify(response.data.user));
    }
  } catch (error) {
    console.log(error.toJSON());
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    }
    );
    if (response.data.token) {
      localStorage.setItem("Bearer token", JSON.stringify(response.data.token));
    }
    if (response.data.user) {
      localStorage.setItem("User data", JSON.stringify(response.data.user));
    }
  } catch (error) {
    console.log(error.toJSON());
  }
}    

const logout = async () => {
  try {
    await axios.put(API_URL + "logout", null, { headers: authHeader() });
    localStorage.clear();
  } catch (error) {
    console.log(error.toJSON());
  }
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