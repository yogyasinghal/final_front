// import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import Listing from './Components/Listing';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <h1>hello</h1> */}
      {/* <Home/> */}
      <Router>
        <Routes>
          {/* <Route path = '/' element = {<Home/>}/> */}
          {/* <Route path = '/home' element = {<Home/>}/> */}
          <Route path = '/' element = {
              <>
              <Navbar/>
              <Home/>
              </>
              }/>
           <Route path = '/listing' element = {<Listing/>}/>
        </Routes>
      </Router>
      {/* <header className="App-header">
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
      </header> */}
    </div>
  );
}

export default App;
