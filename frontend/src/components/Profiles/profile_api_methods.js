import {backendLoockup} from "../../api/posts_api";

export function apiProfileDetail(username, callback) {
    backendLoockup('GET', `/profiles/${username}/`, callback)
}

export function apiProfileFollowToggle(username, action, callback) {
    const data = {'action': `${action && action}`.toLowerCase()}
    backendLoockup('POST', `/profiles/${username}/follow`, callback, data)
}