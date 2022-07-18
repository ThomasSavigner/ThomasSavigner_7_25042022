import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4039/api/posts/";


const getFeeds = () => {
    return axios.get( API_URL + "all",  {headers: authHeader()} );
}


const postService = {
    getFeeds,

};

export default postService