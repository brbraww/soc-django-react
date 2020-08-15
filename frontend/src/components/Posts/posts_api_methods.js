import {backendLoockup} from '../../api/posts_api'

export function apiPostList(callback) {
    backendLoockup('GET', '/posts', callback)
}

export function apiPostCreate(content, callback) {
    const data = {content}
    backendLoockup('POST', '/posts/create', callback, data)
}

export function apiPostAction(post_id, action, callback) {
    const data = {post_id, action}
    backendLoockup('POST', '/posts/action', callback, data)
}

export function apiPostGet(post_id, callback) {
    backendLoockup('GET', `/posts/${post_id}`, callback)
}