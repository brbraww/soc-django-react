import React, {useEffect, useState} from "react";
import Post from "./Post/Post";
import {apiPostList, apiPostCreate} from "./posts_api_methods";
import styles from './Posts.module.css'

export const PostsComponent = (props) => {
    const textAreaRef = React.createRef()
    const [newPosts, setNewPosts] = useState([])
    const canPost = props.canPost === 'false' ? false : true

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
        {canPost === true && <div className={"col-12 my-5 " + styles.postCreate}>
            <form onSubmit={handleSubmit} action="">
                <textarea ref={textAreaRef} required={true} className='form-control mb-3' name="post" id="" rows='5'/>
                <button type='submit' className='btn btn-primary'>Post</button>
            </form>
        </div>
        }
        <Posts newPosts={newPosts} {...props} />
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
            apiPostList(props.username, handlePostListLookup)
        }
    }, [postsInit, postsDidSet, setPostsDidSet, props.username])

    const handleDidRepost = (newPost) => {
        const updatePostsInit = [...postsInit]
        updatePostsInit.unshift(newPost)
        setPostsInit(updatePostsInit)
        const updateFinalPosts = [...posts]
        updateFinalPosts.unshift(posts)
        setPosts(updateFinalPosts)
    }

    return (
        <div className='posts-list mt-5'>
            <p>Posts:</p>
            <div>
                {posts.map((item, index)=>{
                    return <Post
                        post={item}
                        didRepost={handleDidRepost}
                        className='my-5 mx-auto py-5 border bg-white text-dark'
                        key={`${index}-{item.id}`}
                    />
                })}
            </div>
        </div>
    )
}

export default Posts;
