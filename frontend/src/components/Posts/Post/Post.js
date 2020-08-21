import React, {useState} from "react";
import styles from './Post.module.css'
import ActionBtn from "./Buttons/ActionBtn";
import ParentPost from "./ParentPost";


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