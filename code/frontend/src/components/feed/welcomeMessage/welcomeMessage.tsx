import React from "react";
import "./welcomeMessage.css";

export default function WelcomeMessage() {
    return (
        <div className="welcome-message">
            <h1 className="welcome-title">Welcome!</h1>
            <p className="welcome-text">
                Become a part of our big, bird loving community! 
            </p>
            <p className="desktop-welcome-text">
                Exchange pictures and information about birds and be part of our big bird loving community! Pellentesque vulputate a enim ac feugiat. Donec dictum magna sit amet arcu commodo, quis vehicula nunc commodo. Pellentesque varius congue varius.
            </p>
        </div>
    );
    }