import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import LoginAndSignUpPage from './LoginAndSignUpPage';
import Profile from './Profile';
import Header from './header';
import Test from './test';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Test />
      <Profile/>
    </div>
  );
}

export default App;
