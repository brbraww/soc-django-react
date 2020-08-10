import React from "react";

function ActionBtn(props) {
    const {post, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    return action.type === 'like' ? <button className={className}>{post.likes} Like</button> : null
}

function Post(props) {
    const {post} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return (
        <div className= {className} id={post.id}>
                {post.id} - {post.content}
                <div className='btn btn-group'>
                    <ActionBtn post={post} action={{type:'like'}}/>
                    <ActionBtn post={post} action={{type:'unlike'}}/>
                    <ActionBtn post={post} action={{type:'repost'}}/>
                </div>
        </div>
    )
}

export default Post;