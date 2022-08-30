import * as React from 'react';
import { toFormatedDate } from '../../utils/formatDateFromDB';
import "../../styles/articlepost.css"

export default function CardPostAndItsComments(props) {

 // Format article date
 let datePost = toFormatedDate(props.postCommentsModifiedAt)
    
 return (
     <>
       <section className="article-position border border-dark mx-auto mt-1 color-4">
               <header className="d-flex p-1 color-2">
                   <img alt="user account icon" src={props.avatarUrl} className="rounded-circle avatar-art-width" />
                 <div className="mx-2 text-light d-flex flex-wrap w-100">
                   <h2 className="my-0 font-title fs-5 w-100">{props.firstName} {props.lastName}</h2>
                   <p className="my-0 font-text fs-6 w-50">{props.department}</p>
                   <p className="mb-1 w-50 text-end">{datePost}</p>
                 </div>
               </header>
               <main className="p-0">
                 <div className="px-1 color-4 px-2 text-dark">
                    <h3 className="font-title mb-0 fs-5">{props.topic}</h3>
                    <p className="font-title fs-6 pt-2">{props.hashtags}</p>
                    <div className="text-center">
                      <img src={props.imageUrl} alt="article's illustration" className="shadow art-imgcontainer-position border-dark imgarticle-size p-0" />
                    </div>
                    <p className="font-text fs-6">{props.article}</p>
                 </div>
               </main>
               <footer className="footer-bg-color-3-opacity d-flex justify-content-end pt-1 border border-dark text-dark">
                 <div className="d-flex px-3">
                   <div>
                     <span className="material-icons mx-1">visibility</span>
                     <span className="material-icons mx-1 text-danger d-none">favorite</span>
                   </div>
                   <span>{props.readings}</span>
                 </div>
                 <div className="d-flex px-3">
                   <span className="material-icons mx-1">favorite_border</span>
                   <span>{props.likes}</span>
                 </div>
                 <div className="d-flex px-3">
                   <span className="material-icons mx-1">forum</span>
                   <span>{props.numberOfComments}</span>
                 </div>
             </footer>
         </section>
      </>
 )
} 