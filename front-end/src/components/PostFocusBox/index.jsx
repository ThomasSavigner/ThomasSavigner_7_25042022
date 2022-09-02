import * as React from 'react';
import { toFormatedDate } from '../../utils/formatDateFromDB';
import PostLikeButton from '../PostLikeButton'
import PostCountersBox from '../PostCountersBox';
import '../../styles/PostFocusBox.css'

export default function PostFocusBox(props) {

  // Format article date
  const datePostCreatedAt = toFormatedDate(props.articleCreatedAt);
  let datePostUpdated = toFormatedDate(props.postCommentsModifiedAt);
   
  
  return (

          <>

            <section className="article-position border border-dark mx-auto mt-1 color-4">
              
              <header className="d-flex p-1 color-2">

                <img alt="user account icon" src={props.avatarUrl} className="rounded-circle avatar-art-width" />
                
                <div className="mx-2 text-light d-flex flex-wrap w-100">
                  <h2 className="my-0 font-title fs-5 w-100">{props.firstName} {props.lastName}</h2>
                  <p className="my-0 font-text fs-6 w-50">{props.department}</p>
                  <p className="mb-1 w-50 text-end">article posté le {datePostCreatedAt}</p>
                  <p className="mb-1 w-50 text-end">Contenu mis à jour le {datePostUpdated}</p>
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

              <footer className="footer-bg-color-3-opacity d-flex justify-content-end pt-1 border border-dark text-dark d-flex justify-content-between">
                
                <PostLikeButton 
                                  heartColor={props.heartColor}
                                  setHeartColor={props.setHeartColor}
                                  likesNbr={props.likesNbr}
                                  setLikesNbr={props.setLikesNbr}
                />
                
                <PostCountersBox 
                                  readingsNbr={props.readingsNbr}
                                  likesNbr={props.likesNbr}
                                  numberOfComments={props.numberOfComments}

                />
                    
              </footer>

            </section>

          </>

  )

} 