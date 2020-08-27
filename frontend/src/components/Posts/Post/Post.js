import React, {useEffect, useState} from "react";
import ActionBtn from "./Buttons/ActionBtn";
import ParentPost from "./ParentPost";
import {apiPostDetail} from "../posts_api_methods";


export const PostDetailComponent = (props) => {
    const {postId} = props
    const [didLookup, setDidLookup] = useState(false)
    const [post, setPost] = useState(null)
    let className = props.className ? props.className : 'col-12 mt-5'

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

    return post === null ? null : <Post post={post} className={className} />
}


const Post = (props) => {
    const {post, didRepost} = props
    const [actionPost, setActionPost] = useState(props.post ? props.post : null)
    let className = props.className ? props.className : 'col-10 mx-auto mt-5'

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
        <div className= {className + ' mt-5'} id={post.id}>
            <div className='d-flex'>
                <div className='col-1 text-center'>
                    <span className="mx-1 px-3 py-2 rounded-circle bg-dark text-white">
                        { post.user.username[0] }
                    </span>
                    <p className='mt-2 text-muted small'>@{ post.user.username }</p>
                </div>
                <div className="col-11 px-5">
                    <div className='content'>
                        <p>
                            { post.user.first_name }{' '}
                            { post.user.last_name }
                        </p>
                        <p>{post.content}</p>
                        {post.parent && <div className='border rounded'>
                            <p className='m-1 text-muted small'>Repost</p>
                            <ParentPost post={post.parent} />
                        </div>}
                    </div>
                    <div className={'btn btn-group px-0'}>
                        {(actionPost && props.hideActions !== true) && <React.Fragment>
                            <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'like', display: 'Like'}}/>
                            <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'unlike', display: 'Unlike'}}/>
                            <ActionBtn post={actionPost} didPerformAction={handlePerformAction} action={{type:'repost', display: 'Share'}}/>
                        </React.Fragment>
                        }
                        {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;