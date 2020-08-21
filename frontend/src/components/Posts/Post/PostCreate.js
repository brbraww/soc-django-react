import React from "react";
import {apiPostCreate} from "../posts_api_methods";
import styles from "../Posts.module.css";

const PostCreate = (props) => {
    const textAreaRef = React.createRef()
    const {didPost} = props

    const handleBackendUpdate = (response, status) => {
        if (status === 201) {
            didPost(response)
        } else {
            console.log(response)
            alert('An error occured. Please try again')
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value
        apiPostCreate(newVal, handleBackendUpdate)
        textAreaRef.current.value = ''
    }

    return <div className={"col-12 my-5 " + styles.postCreate}>
        <form onSubmit={handleSubmit} action="">
            <textarea ref={textAreaRef} required={true} className='form-control mb-3' name="post" id="" rows='5'/>
            <button type='submit' className='btn btn-primary'>Post</button>
        </form>
    </div>
}

export default PostCreate