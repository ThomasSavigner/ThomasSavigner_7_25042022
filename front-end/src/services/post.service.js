
import axios from 'axios';
import authHeader from './auth-header';


const API_URL = "http://localhost:4039/api/posts/";
const requestHeaders = { headers: authHeader()};



//----------        API calls for handle Post data      ----------


//--- "get all posts" ---

const getFeeds = () => {

    return axios.get( API_URL + "/all", requestHeaders )

}



//--- "get one post with associated comments" ---

const focusOnPostandComments = (postID) => {

    return axios.get( API_URL + "post/" + postID, requestHeaders )

}



//--- "update a post data"

const likePost = (postID) => {

    return axios.put( API_URL + "like/" + postID, null, requestHeaders)

}




const postService = {
    getFeeds,
    focusOnPostandComments,
    likePost,
};


export default postService