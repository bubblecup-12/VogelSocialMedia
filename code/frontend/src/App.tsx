import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './header';
import LoginAndSignUpPage from './LoginAndSignUpPage';

function App() {
  return (
    <div className="App">
      <LoginAndSignUpPage></LoginAndSignUpPage>
    </div>
  );
}

export default App;
