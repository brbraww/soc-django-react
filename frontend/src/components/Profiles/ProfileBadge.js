import React, {useEffect, useState} from "react";
import {apiProfileDetail, apiProfileFollowToggle} from "./profile_api_methods";
import {UserPicture} from "./UserActions";
import {DisplayCount} from "../../utils";


const ProfileBagde = (props) => {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? 'Unfollow' : 'Follow'

    currentVerb = profileLoading ? 'Loading...' : currentVerb

    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
        <UserPicture user={user} hideLink />
        <p>{user.first_name} {user.last_name}</p>
        <p><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? 'follower' : 'followers'}</p>
        <p><DisplayCount>{user.following_count}</DisplayCount> following</p>
        {user.bio ? <p>Bio: {user.bio}</p> : null}
        {user.location ? <p>Location: {user.location}</p> : null}
        <button onClick={handleFollowToggle} className='btn btn-primary'>{currentVerb}</button>
    </div> : null
}

export const ProfileBagdeComponent = (props) => {
    const {username} = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(null)

    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        }
    }

    useEffect(() => {
        if (didLookup === false) {
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])

    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status) => {
            if (status === 200) {
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }

    return didLookup === false ? "Loading..." : profile ? <ProfileBagde user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} />: null
}
