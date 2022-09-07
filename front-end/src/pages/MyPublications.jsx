import React from "react";
import postService from "../services/post.service";
import PostsTableItem from "../components/MyPublicationsTableItem";
import MyPublicationsTableItemActionsBtns from '../components/MyPublicationsTableItemActionsBtns';
import PostCountersBox from '../components/PostCountersBox';



function MyPublications() {

  const userID = JSON.parse(localStorage.getItem('User data')).userID;

  const [myPosts, setMyPosts ] = React.useState([]);

  

  const callAPI = React.useCallback( () => {
    
    postService.getAllMyPosts( userID )
      .then( (response) => {

        setMyPosts(response.data.results)
        //setImageUrl(props.imageUrl)

      })
      .catch((error)=> console.log(error))
  }, [userID])

  React.useEffect(()=>{
    callAPI()
  },[callAPI, userID] )

  

  return (

    <>

      <header className="d-flex flex-column justify-content-center align-items-center m-4">
        
        <div>
          <h1 className="font-title fs-1 text-light color-3 border border-light rounded m-2 py-2 px-3">Mes publications</h1>
        </div>
      </header>

      <main className="d-flex flex-column align-items-center">
        <header className="bg-secondary py-2 px-3" >
          <h2 className="font-text text-light">Mes posts</h2>
        </header>
        <table className="table w-75 color-4 border border-2 border-dark my-4">
          <thead className="font-aside color-1 text-light border border-light border-2">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Post</th>
              <th scope="col">Crée le</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody >
    
            {
              myPosts.map( (item) => {


              

                return (

                
                
                <>
                <PostsTableItem
                  key={item.postID}
                  postID={item.postID}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  createdAt={item.createdAt}
                  isRelease={item.isRelease}
                  readingsNbr={item.readingsNbr}
                  likesNbr={item.likesNbr}
                  numberOfComments={item.numberOfComments} 
                  />
                  <PostCountersBox
                    key={item.createdAt}
                    readingsNbr={item.readingsNbr}
                    likesNbr={item.likesNbr}
                    numberOfComments={item.numberOfComments} 
                    />
                    <MyPublicationsTableItemActionsBtns
                    key={item.title} />
                    </>
                ) 
                }
              ) 
            }
          
          </tbody>
        </table>

      </main>

    </>

  );



}

export default MyPublications;


