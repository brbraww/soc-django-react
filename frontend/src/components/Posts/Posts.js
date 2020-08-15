import React, {useEffect, useState} from "react";
import Post from "./Post/Post";
import {apiPostList, apiPostCreate} from "./posts_api_methods";
import styles from './Posts.module.css'

export const PostsComponent = (props) => {
    const textAreaRef = React.createRef()
    const [newPosts, setNewPosts] = useState([])

    const handleBackendUpdate = (response, status) => {
        let tempNewPosts = [...newPosts]
        if (status === 201) {
            tempNewPosts.unshift(response)
            setNewPosts(tempNewPosts)
        } else {
            console.log(response)
            alert('An error occured. Please try again')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value
        apiPostCreate(newVal, handleBackendUpdate)
        textAreaRef.current.value = ''
    }
    return <div className={props.className}>
        <div className={"col-12 my-5 " + styles.postCreate}>
            <form onSubmit={handleSubmit} action="">
                <textarea ref={textAreaRef} required={true} className='form-control mb-3' name="post" id="" rows='5'/>
                <button type='submit' className='btn btn-primary'>Post</button>
            </form>
        </div>
        <Posts newPosts={newPosts} />
    </div>
}

const Posts = (props) => {
    const [postsInit, setPostsInit] = useState([])
    const [posts, setPosts] = useState([])
    const [postsDidSet, setPostsDidSet] = useState(false)

    useEffect(() => {
        const final = [...props.newPosts].concat(postsInit)
        if (final.length !== posts.length) {
            setPosts(final)
        }
    }, [props.newPosts, posts, postsInit])

    useEffect(() => {
        if (postsDidSet === false) {
            const handlePostListLookup = (response, status) => {
                if (status === 200) {
                    setPostsInit(response)
                    setPostsDidSet(true)
                } else {
                    alert('alert')
                }
            }
            apiPostList(handlePostListLookup)
        }
    }, [postsInit, postsDidSet, setPostsDidSet])


    return (
        <div className='posts-list mt-5'>
            <p>Posts:</p>
            <div>
                {posts.map((item, index)=>{
                    return <Post
                        post={item}
                        className='my-5 mx-auto py-5 border bg-white text-dark'
                        key={`${index}-{item.id}`}
                    />
                })}
            </div>
        </div>
    )
}

export default Posts;
