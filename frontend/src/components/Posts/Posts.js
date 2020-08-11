import React, {useEffect, useState} from "react";
import Post from "./Post/Post";
import {loadPosts} from "../../api/posts_api";


export const PostsComponent = (props) => {
    const textAreaRef = React.createRef()
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value
        textAreaRef.current.value = ''
        console.log(newVal)
    }
    return <div className={props.className}>
        <div className="col-12 mb-3">
            <form onSubmit={handleSubmit} action="">
                <textarea ref={textAreaRef} required={true} className='form-control' name="post" id="" cols="30" rows="10"/>
                <button type='submit' className='btn btn-primary'>Post</button>
            </form>
        </div>
    </div>
}

const Posts = (props) => {
    const [posts, setPosts] = useState([{'content': '123'}])

    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setPosts(response)
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
