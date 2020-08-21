import React, {useState} from "react";
import styles from './Posts.module.css'
import PostsList from "./PostsList";
import PostCreate from "./Post/PostCreate";


const PostsComponent = (props) => {
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === 'false' ? false : true

    const handleNewPost = (newPost) => {
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)
        setNewPosts(tempNewPosts)
    }

    return <div className={props.className}>
        {canPost === true && <PostCreate didPost={handleNewPost} className={"col-12 my-5 " + styles.postCreate} />}
        <PostsList newPosts={newPosts} {...props} />
    </div>
}


export default PostsComponent;
