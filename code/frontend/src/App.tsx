import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import LoginAndSignUpPage from './pages/LoginAndSignUpPage';
import PostCreation from './pages/PostCreation';
import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/sizes.css";
import Footer from "./components/Footer";
import Header from "./components/header";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./api/Auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/login"
            element={<LoginAndSignUpPage signupProp={false} />}
          ></Route>
          <Route
            path="/register"
            element={<LoginAndSignUpPage signupProp={true} />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create" element={<PostCreation/>}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
    <Auth>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/login"
              element={<LoginAndSignUpPage signupProp={false} />}
            ></Route>
            <Route
              path="/register"
              element={<LoginAndSignUpPage signupProp={true} />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Auth>
  );
}

export default App;
