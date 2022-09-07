import { Link, useNavigate } from "react-router-dom";



const MyPublicationsTableItemActionsBtns = (props) => {

    const navigate = useNavigate();

    const accessToEditPostForm = (event) => {
        
        event.preventDefault()

        let UserPostDetails = {
            status: true,
            postID: props.postID,
          }
      
          const data = JSON.stringify( UserPostDetails );
            
          localStorage.setItem( 'UserPostDetails', data );
      
          navigate('/app/editpost');
    }

    return (

        <>
        
            <div>
                <div>
                    <Link to={`/app/${props.postID}`}>
                        <span className="material-icons">visibility</span>
                    </Link>
                </div>
                <div>
                    <Link to="/app/editpost" onClick={accessToEditPostForm} >
                        <span className="material-icons">update</span>
                    </Link>
                </div>
                <div>
                    <div>
                        <span className="material-icons">delete</span>
                   </div>
                </div>
            </div>

        </>

    )


}

export default MyPublicationsTableItemActionsBtns;