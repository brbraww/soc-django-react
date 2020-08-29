import {backendLoockup} from '../../api/posts_api'

export function apiPostList(username, callback, nextUrl) {
    let endpoint = '/posts'
    if (username) {
        endpoint = `/posts/?username=${username}`
    }
    if (nextUrl) {
        endpoint = nextUrl.replace('http://localhost:8000/api', '')
    }
    backendLoockup('GET', endpoint, callback)
}

export function apiPostFeed(callback, nextUrl) {
    let endpoint = '/posts/feed'
    if (nextUrl !== null && nextUrl !== undefined) {
        endpoint = nextUrl.replace('http://localhost:8000/api', '')
    }
    backendLoockup('GET', endpoint, callback)
}

export function apiPostCreate(content, callback) {
    const data = {content}
    backendLoockup('POST', '/posts/create', callback, data)
}

export function apiPostAction(post_id, action, callback) {
    const data = {post_id, action}
    backendLoockup('POST', '/posts/action', callback, data)
}

export function apiPostDetail(post_id, callback) {
    backendLoockup('GET', `/posts/${post_id}`, callback)
}