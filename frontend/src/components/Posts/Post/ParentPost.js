import styles from "./Post.module.css";
import React from "react";
import Post from "./Post";

function ParentPost(props) {
    const {post} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    return (
        <div className= {className + ' col-11 p-3 mx-auto border rounded ' + styles.post} id={post.id}>
            <p className='mb-0 text-muted small'>Repost</p>
            <Post post={post} hideActions={true} />
        </div>
    )
}

export default ParentPost