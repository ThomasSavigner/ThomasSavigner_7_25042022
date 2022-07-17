import React from "react";
import postService from "../services/post.service";
import CardPost from "../components/Cardpost/index"


function Feeds() {

//  logique pagination
//  mapper cards sur le tableau json response....
//  return results

const [ arrayPosts, setArrayPosts ] = React.useState([]);

  const callingFeeds = () => {
    postService.getFeeds()
        .then( (res) => { 
          
          setArrayPosts(res.data.result) } )
        .catch((error)=> console.log(error))
  }

  React.useEffect(() => {
    callingFeeds()
  }, [])
  return (
    <>
    {
      arrayPosts.map((post) => (     
        <CardPost   key={post.postID}
                    avatarUrl={post.userP.avatarUrl}
                    firstName={post.userP.firstName}
                    lastName={post.userP.lastName}
                    department={post.userP.department.name}
                    postCommentsModifiedAt={post.postCommentsModifiedAt}
                    topic={post.topic}
                    hashtags={post.hashtags}
                    article={post.article}
                    imageUrl={post.imageUrl}
                    readings={post.readings}
                    likes={post.likes}
                    
        />
      ))
    }
  </>
  );
}

export default Feeds;
