import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import LoginAndSignUpPage from './LoginAndSignUpPage';
import PostCreation from './PostCreation';

function App() {
  return (
    <div className="App">
      <PostCreation/>
    </div>
  );
}

export default App;
