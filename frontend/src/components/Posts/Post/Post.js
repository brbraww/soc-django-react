import React, {useState} from "react";

const ActionBtn = (props) => {
    const {post, action} = props
    const [likes, setLikes] = useState(post.likes ? post.likes : 0)
    const [userLike, setUserLike] = useState(post.userLike ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (userLike === true) {
                setLikes(likes-1)
                setUserLike(false)
            } else {
                setUserLike(true)
                setLikes(post.likes+1)
            }
        }
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