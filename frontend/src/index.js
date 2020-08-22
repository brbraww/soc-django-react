import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PostsComponent from "./components/Posts/PostsComponent";
import {PostDetailComponent} from "./components/Posts/Post/Post";


const e = React.createElement

//ReactDOM.render(<App />, document.getElementById('root'));

const appEl = document.getElementById('root')
if (appEl) {
    const DatasetComponent = e(App, appEl.dataset)
    ReactDOM.render(DatasetComponent, appEl)
}
const postsEl = document.getElementById('posts-element')
if (postsEl) {
    const DatasetComponent = e(PostsComponent, postsEl.dataset)
    ReactDOM.render(DatasetComponent, postsEl)
}
const postDetailElements = document.querySelectorAll('.post-detail-element')
postDetailElements.forEach(container=>{
    ReactDOM.render(e(PostDetailComponent, container.dataset), container)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
