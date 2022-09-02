
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:4039/api/comments/";
const requestHeaders = { headers: authHeader()};



//----------        API calls for handle Comment data      ----------


//--- "Create a comment" ---

const createComment = ( myComment ) => {

    return axios.post( API_URL + "postID", { myComment }, requestHeaders )

}



const commentService = {
    createComment
}


export default commentService