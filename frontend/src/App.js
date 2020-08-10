import React from 'react';
import './App.css';
import Posts from "./components/Posts/Posts";
import Header from "./components/Header/Header";



function App() {
  return (
    <div className="App">
        <Header />
        <Posts />
    </div>
  );
}

export default App;
