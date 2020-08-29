import React, {useState} from "react";
import FeedList from "./FeedList";
import PostCreate from "./Post/PostCreate";
import styles from "./Posts.module.css";


const FeedComponent = (props) => {
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === 'false' ? false : true

    const handleNewPost = (newPost) => {
        let tempNewPosts = [...newPosts]
        tempNewPosts.unshift(newPost)
        setNewPosts(tempNewPosts)
    }

    return <div className={props.className}>
        {canPost === true && <PostCreate didPost={handleNewPost} className={"col-12 my-5 " + styles.postCreate} />}
        <FeedList newPosts={newPosts} {...props} />
    </div>
}


export default FeedComponent