import React from "react";
import "./StartPage.css"; 

function StartPage() {
  return (
    <div className="StartPage">
        <div className="middleContainer">
            <h1 className="welcome">Welcome</h1>
            <p className="welcomeMessage">Exchange pictures and information about birds and be part of our big bird-loving community.</p>
            <div className="buttonContainer">
                <button className="loginButton">Login</button>
                 <button className="registerButton">Register</button>
             </div>
        </div>
    </div>
  );
}

export default StartPage;
