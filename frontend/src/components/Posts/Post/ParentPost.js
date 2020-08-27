import React from "react";
import Post from "./Post";

function ParentPost(props) {
    const {post} = props

    return (
            <Post post={post} hideActions className={' '} />
    )
}

export default ParentPost