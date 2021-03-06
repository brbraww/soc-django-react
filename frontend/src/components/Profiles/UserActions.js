import React from "react";


export const UserPicture = (props) => {
    const {user, className, hideLink} = props

    const userIdSpan = <div className={className}>
        <span className="px-3 py-2 rounded-circle bg-dark text-white">
            { user.username[0] }
        </span>
        <p className='mt-2 text-muted small'>@{ user.username }</p>
    </div>

    return hideLink === true ? userIdSpan : <UserLink username={user.username}>
        {userIdSpan}
    </UserLink>
}

export const UserLink = (props) => {
    const {username} = props
    const handleUserLink = (event) => {
        window.location.href = `/profile/${username}`
    }
    return <span className='pointer' onClick={handleUserLink}>
        { props.children }
    </span>
}

export const UserDisplay = (props) => {
    const {user, includeFullName} = props
    const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name}` : null

    return <React.Fragment>
        { nameDisplay }
    </React.Fragment>
}