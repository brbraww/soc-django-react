import React, {useEffect, useState} from "react";
import Post from "./Post/Post";
import {loadPosts} from "../../api/posts_api";


function Posts(props) {
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
