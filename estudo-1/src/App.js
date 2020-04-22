import React from 'react';
import logo from './logo.svg';
import './App.css';

//função para pegar os dados de routes.js em formato json
function teste(){
  fetch('http://seuip:3000/users')
    .then(response => response.json())
    .then(users => console.warn(users))
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
