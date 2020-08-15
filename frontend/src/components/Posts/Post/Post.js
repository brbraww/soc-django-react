import React, {useState} from "react";
import {apiPostAction} from "../posts_api_methods";
import styles from './Post.module.css'

const ActionBtn = (props) => {
    const {post, action} = props
    const [likes, setLikes] = useState(post.likes ? post.likes : 0)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'

    const handlerActionBackendEvent = (response, status) => {
        if (status === 200) {
            setLikes(response.likes)
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        apiPostAction(post.id, action.type, handlerActionBackendEvent)
    }
    const display = action.type === 'like' ? `${likes} ${action.display}` : actionDisplay
    return <button onClick={handleClick} className={className}>{display}</button>
}

export function ParentPost(props) {
    const {post} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    return (
        <div className= {className + ' col-11 p-3 mx-auto border rounded ' + styles.post} id={post.id}>
            <p className='mb-0 text-muted small'>Repost</p>
            <div className='content'>
                <p>{post.id} - {post.content}</p>
            </div>
        </div>
    )
}

const Post = (props) => {
    const {post} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return (
        <div className= {className + ' ' + styles.post} id={post.id}>
            <div className='content'>
                <p>{post.id} - {post.content}</p>
                {post.parent && <div><ParentPost className={props.className+' '+styles.repost} post={post.parent} /></div>}
            </div>
            <div className={'btn btn-group'}>
                <ActionBtn post={post} action={{type:'like', display: 'Like'}}/>
                <ActionBtn post={post} action={{type:'unlike', display: 'Unlike'}}/>
                <ActionBtn post={post} action={{type:'repost', display: 'Share'}}/>
            </div>
        </div>
    )
}

export default Post;