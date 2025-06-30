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
import Footer from "./components/footer/Footer";
import Feed, {UserFeedRoute} from "./components/feed/Feed";
import Header from './components/header/Header';
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./api/Auth";
import { NotFound } from "./pages/404Page/NotFoundPage";
import ScrollToAnchor from "./components/ScrollToAnchor";


function App() {
  return (
    <Auth>
      <Router>
        <Header />
        <ScrollToAnchor />
        <div className="App">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/login"
              element={<LoginAndSignUpPage signupProp={false} />}
            ></Route>
            <Route
              path="/register"
              element={<LoginAndSignUpPage signupProp={true} />}
            ></Route>
            <Route path="/profile/:username" element={<Profile />}></Route>
            <Route path="/createpost" element={<PostCreation />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/feed/:user" element={<UserFeedRoute />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Auth>

  );
}

export default App;
