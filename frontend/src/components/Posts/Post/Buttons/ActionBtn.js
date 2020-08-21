import {apiPostAction} from "../../posts_api_methods";
import React from "react";

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

export default ActionBtn