import React from 'react';
import { toFormatedDate } from '../../utils/formatDateFromDB';

import '../../styles/commentsbox.css'


export default function CommentsBox(props) {

    // Format article date
    let datePost = toFormatedDate(props.timestamp)

    return (
        <>
            <section className="d-flex justify-content-center mt-1 mb-2">
                <div className="section-comment-position rounded color-4 border border-dark">
                    <header className="d-flex bg-color-3-opac header-comment-position mx-1 border border-dark rounded">
                        <img alt="avatar" src={props.userAvatar} className="rounded-circle mx-2 my-1 avatar-comment-size"/>
                        <div className="d-flex flex-column px-1 font-aside">
                            <span> {props.userFirstName} {props.userLastName}</span>
                            <span>{datePost}</span>
                        </div>
                    </header>
                    <main>
                        <span className="font-text" >{props.content}</span>
                    </main>
                </div>
            </section>
        </>
    )

}