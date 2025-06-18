import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import LoginAndSignUpPage from './LoginAndSignUpPage';
import Footer from './footer/Footer';
import Header from './header';
import Feed from './feed/Feed';

function App() {
  return (
    <div className="App">
      <Feed/>
    </div>
  );
}

export default App;
