import React from "react";
import { useParams } from "react-router-dom";
import postService from "../services/post.service";
import ArticlePost from "../components/ArticlePost/index"
import CommentsBox from "../components/CommentsBox"; 


const FocusOnPost= () => {

  const { postID } = useParams();

  const [ articleContent, setArticleContent ] = React.useState([]);
  const [ articleComments, setArticleComments ] = React.useState([]);
  
  console.log("log")

  React.useEffect(()=> {

    const getPostAndComments = async function () {
      try {
        let response = await postService.focusOnPostandComments(postID);

        let body = [];
        body.push(response.data.postComments);
        setArticleContent(body);

        let commentsArray = response.data.postComments.pstComments;
        let comments = [];
        for (let u = 0; u < commentsArray.length; u++) {
          comments.push(response.data.postComments.pstComments[u]);
        }

        setArticleComments(comments);

      } catch (error) {
        console.log(error);
      }
    };
    
    getPostAndComments()
  
  }, [postID])

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
           readings={post.readings}
           likes={post.likes}
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
