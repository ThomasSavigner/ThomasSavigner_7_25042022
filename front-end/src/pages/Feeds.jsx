import React from "react";
import postService from "../services/post.service";
import Pagination from "react-js-pagination";
import CardPost from "../components/Cardpost/index"


function Feeds() {


  const [ arrayPosts, setArrayPosts ] = React.useState([]);
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const postsPerPage= 10;

  const callingFeeds = React.useCallback(() => {
    postService.getFeeds()
        .then( (res) => { 
          setArrayPosts(res.data.result)
        } )
        .catch((error)=> console.log(error))
  }, [])
  console.log("log")
  React.useEffect(() => {
    callingFeeds()
  }, [callingFeeds])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOffirstPost = indexOfLastPost - postsPerPage;
  const currentPosts= arrayPosts.slice(indexOffirstPost, indexOfLastPost);

  return (
    <>
    <div className="d-flex justify-content-center m-3 ">
      <div id="toppage" className="d-flex justify-content-center pt-3 color-1 w-50 border border-light rounded">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={arrayPosts.length}
            pageRangeDisplayed={arrayPosts.length / postsPerPage}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
          
        </div>
      </div>
      {
        currentPosts.map((post) => (     
          <CardPost   key={post.postID}
                      postID={post.postID}
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
        <div className="d-flex justify-content-center linktoppage-margin">
        <a href="#toppage" className="border border-light m-5 p-2 color-3"><span className="material-icons text-light">arrow_upward</span></a>
        </div>
        <div className="m-5">-</div>
  </>
  );
}

export default Feeds;
