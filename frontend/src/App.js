import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';



function loadPosts(callback) {
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://localhost:8000/api/posts/'
  const responseType = 'json'
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function () {
    callback(xhr.response, xhr.status)
    console.log(xhr.response)
  }
  xhr.onerror = function (e) {
    callback({'message': 'request was an error'}, 400)
  }
  xhr.send()
}



function App() {
  const [posts, setPosts] = useState([{'content': '123'}])

  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if (status === 200) {
        setPosts(response)
      }
      else {
        alert('alert')
      }
    }
    loadPosts(myCallback)

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {posts.map((post, index)=>{
            return <li>{post.content}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
