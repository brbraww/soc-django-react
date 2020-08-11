import React, {useEffect, useState} from "react";
import Post from "./Post/Post";
import {loadPosts} from "../../api/posts_api";


export const PostsComponent = (props) => {
    const textAreaRef = React.createRef()
    const [newPosts, setNewPosts] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value
        let tempNewPosts = [...newPosts]

        tempNewPosts.unshift({
            content: newVal,
            likes: 0,
            id: 123123
        })
        setNewPosts(tempNewPosts)
        textAreaRef.current.value = ''
    }
    return <div className={props.className}>
        <div className="col-12 my-5">
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

    useEffect(() => {
        const final = [...props.newPosts].concat(postsInit)
        if (final.length !== posts.length) {
            setPosts(final)
        }
    }, [props.newPosts, posts, postsInit])

    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setPostsInit(response)
            }
            else {
                alert('alert')
            }
        }
        loadPosts(myCallback)
    }, [])


    return (
        <div className='posts-list mt-5'>
            <p>Posts:</p>
            <div>
                {posts.map((item, index)=>{
                    return <Post
                        post={item}
                        className='m-5 py-5 border bg-white text-dark post'
                        key={`${index}-{item.id}`}
                    />
                })}
            </div>
        </div>
    )
}

export default Posts;
