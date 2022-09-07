
import React from 'react';



const PostsTableItem = (props) => {
   
    const [ imageUrl, setImageUrl ] = React.useState(props.imageUrl)
    
    if (imageUrl === '') {
        setImageUrl('/icons/insert_photo.png')
      }

    return (

        <>
            
                
                    
                    
            <tr className="">
                    <th scope="row">
                        <img src={imageUrl} alt="article illustration" className='img-thumbnail'/>
                    </th>
                    <td>
                        {props.title}
                        {props.createdAt}
                    </td>
                    <td>
                        { props.isRelease && <div className='rounded-circle bg-success'></div> }
                        { !props.isRelease && <div className='rounded-circle bg-warning'></div> }
                    </td>
                 </tr>   
                  
                
                
                
                
                
            

        </>

    )



}

export default PostsTableItem;