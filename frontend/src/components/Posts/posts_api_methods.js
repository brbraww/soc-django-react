import {backendLoockup} from '../../api/posts_api'

export function apiPostList(callback) {
    backendLoockup('GET', '/posts', callback)
}

export function apiPostCreate(content, callback) {
    backendLoockup('POST', '/posts/create', callback, {content})
}

export function apiPostAction(post_id, action, callback) {
    const data = {post_id, action}
    backendLoockup('POST', '/posts/action', callback, data)
}