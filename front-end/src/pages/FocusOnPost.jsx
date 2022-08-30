import React from "react";
import { useParams } from "react-router-dom";
import postService from "../services/post.service";
import ArticlePost from "../components/ArticlePost/index"
import CommentsBox from "../components/CommentsBox"; 


const FocusOnPost= () => {

  const { postID } = useParams();

  const [ articleContent, setArticleContent ] = React.useState([]);
  const [ articleComments, setArticleComments ] = React.useState([]);
  const [ readingsNbr, setReadingsNbr ] = React.useState(null);
  const [ heartColor, setHeartColor ] = React.useState(false);

  const callingPost = React.useCallback( () => {
   
    postService.focusOnPostandComments(postID)
      .then( (response) => {
          let body = [];
          body.push(response.data.postComments);
          setArticleContent(body);

          setReadingsNbr(response.data.readingsNbr);
          setHeartColor(response.data.heartHasColor);
          
          let commentsArray = response.data.postComments.pstComments;
          let comments = [];
          for (let u = 0; u < commentsArray.length; u++) {
            comments.push(response.data.postComments.pstComments[u]);
          }
          setArticleComments(comments);
      })
      .catch( (error) =>  { console.log(error) } )
 
  }, [ postID ])


  React.useEffect(()=> { callingPost() }, [ callingPost ] )
  
  
  return (
    
     <>
    { articleContent.map((post) => (
    
    <ArticlePost 
           key={post.postID}
           avatarUrl={post.userP.avatarUrl}
           firstName={post.userP.firstName}
           lastName={post.userP.lastName}
           department={post.userP.department.name}
           postCommentsModifiedAt={post.postCommentsModifiedAt}
           topic={post.topic}
           hashtags={post.hashtags}
           article={post.article}
           imageUrl={post.imageUrl}
           readings={readingsNbr}
           likes={post.likes}
           heartColor={heartColor}
           numberOfComments={post.numberOfComments}
    />

    ))
  }
  <div className="commentsbox-position">
  { articleComments.map((comment) => (
    
    <CommentsBox
          key={comment.commentID}
          userAvatar={comment.userC.avatarUrl}
          userFirstName={comment.userC.firstName}
          userLastName={comment.userC.lastName}
          timestamp={comment.createdAt}
          content={comment.content}
    />
  ))
    
  }
  </div>

  

   
    </>
  );
}

export default FocusOnPost;
