import React, {useState} from "react";
import {apiPostAction} from "../posts_api_methods";
import styles from './Post.module.css'

const ActionBtn = (props) => {
    const {post, action, didPerformAction} = props
    const likes = post.likes ? post.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'

    const handlerActionBackendEvent = (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
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
    const {post, didRepost} = props
    const [actionPost, setActionPost] = useState(props.post ? props.post : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    const handlePerformAction = (newPostAction, status) => {
        if (status === 200) {
            setActionPost(newPostAction)
        } else if (status === 201) {
            if (didRepost) {
                didRepost(newPostAction)
            }
        }
    }

    return (
        <div className= {className + ' ' + styles.post} id={post.id}>
            <div className='content'>
                {post.parent && <div><ParentPost className={props.className+' '+styles.repost} post={post.parent} /></div>}
                <p>{post.id} - {post.content}</p>
            </div>
            {actionPost && <div className={'btn btn-group'}>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'like', display: 'Like'}}/>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'unlike', display: 'Unlike'}}/>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'repost', display: 'Share'}}/>
            </div>
            }
        </div>
    )
}

export default Post;