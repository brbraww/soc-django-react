import React, {useState} from "react";
import {apiPostAction} from "../posts_api_methods";

const ActionBtn = (props) => {
    const {post, action} = props
    const [likes, setLikes] = useState(post.likes ? post.likes : 0)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'

    const handleActionBackendEvent = (response, status) => {
        console.log(response, status)
        if (status === 200) {
            setLikes(response.likes)
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        apiPostAction(post.id, action.type, handleActionBackendEvent)
    }
    const display = action.type === 'like' ? `${likes} ${action.display}` : actionDisplay
    return <button onClick={handleClick} className={className}>{display}</button>
}

const Post = (props) => {
    const {post} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return (
        <div className= {className} id={post.id}>
                <div className='content'>
                    {post.id} - {post.content}
                </div>
                <div className='btn btn-group'>
                    <ActionBtn post={post} action={{type:'like', display: 'Like'}}/>
                    <ActionBtn post={post} action={{type:'unlike', display: 'Unlike'}}/>
                    <ActionBtn post={post} action={{type:'repost', display: 'Share'}}/>
                </div>
        </div>
    )
}

export default Post;