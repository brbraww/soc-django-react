import React, {useEffect, useState} from "react";
import styles from './Post.module.css'
import ActionBtn from "./Buttons/ActionBtn";
import ParentPost from "./ParentPost";
import {apiPostDetail} from "../posts_api_methods";


export const PostDetailComponent = (props) => {
    const {postId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [post, setPost] = useState(null)

    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setPost(response)
        } else {
            alert('there was an error finding your post')
        }
    }

    useEffect(() => {
        if (didLookup === false) {
            apiPostDetail(postId, handleBackendLookup)
            setDidLookup(true)
        }

    }, [postId, didLookup, setDidLookup])

    return post === null ? null : <Post post={post} className={props.className} />
}


const Post = (props) => {
    const {post, didRepost} = props
    const [actionPost, setActionPost] = useState(props.post ? props.post : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    const path = window.location.pathname
    const match = path.match(/(?<id>\d+)/)
    const urlPostId = match ? match.groups.id : -1

    const isDetail = `${post.id}` === `${urlPostId}`

    const handlePerformAction = (newPostAction, status) => {
        if (status === 200) {
            setActionPost(newPostAction)
        } else if (status === 201) {
            if (didRepost) {
                didRepost(newPostAction)
            }
        }
    }
    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${post.id}`

    }

    return (
        <div className= {className + ' ' + styles.post} id={post.id}>
            <div className='content'>
                {post.parent && <div><ParentPost className={props.className+' '+styles.repost} post={post.parent} /></div>}
                <p>{post.id} - {post.content}</p>
            </div>
            <div className={'btn btn-group'}>
                {(actionPost && props.hideActions !== true) && <React.Fragment>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'like', display: 'Like'}}/>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'unlike', display: 'Unlike'}}/>
                <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'repost', display: 'Share'}}/>
                 </React.Fragment>
                }
                {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
            </div>

        </div>
    )
}

export default Post;