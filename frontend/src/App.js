import React from 'react';
import './App.css';
import {PostsComponent} from "./components/Posts/Posts";
import Header from "./components/Header/Header";



const App = () => {
  return (
      <div className='App'>
          <header id="pageHeader">
              <Header />
          </header>
          <div id="mainContent" className='container'>
              <PostsComponent />
          </div>
          <nav id="mainNav">Nav</nav>
          <div id="sidebar">Sidebar</div>
          <footer id="pageFooter">Footer</footer>
      </div>

  );
}

export default App;
