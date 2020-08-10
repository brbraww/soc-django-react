import * as axios from 'axios';

const baseURL = 'http://localhost:8000/api/'

const instance = axios.create({
    //withCredentials,
    baseURL,
})

export const postAPI = {
    getPostList() {
        return instance.get(`posts`)
    },
    getPosts(postId) {
        return instance.get(`posts/${postId}`)
    },
    createPost(content) {
        return instance.post(`posts/create`, {content})
    },
    deletePost(postId) {
        return instance.get(`posts/${postId}/delete`)
    },
    actionPost(postId, action) {
        return instance.post(`posts/action`, {postId, action})
    }
}

//old methods
export function loadPosts(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'http://localhost:8000/api/posts/'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        callback({'message': 'request was an error'}, 400)
    }
    xhr.send()
}