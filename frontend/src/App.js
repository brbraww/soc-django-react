import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import PostsComponent from "./components/Posts/PostsComponent";



const App = (props) => {
    return (
        <div className='App'>
            <header id="pageHeader">
                <Header />
            </header>
            <div id="mainContent" className='container-fluid'>
                <PostsComponent />
            </div>
            <nav id="mainNav">Nav</nav>
            <div id="sidebar">Sidebar</div>
            <footer id="pageFooter">Footer</footer>
        </div>

    );
}

export default App;
