import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="" className="footer-link feather">
          <img src="/assets/icons/feather_black.svg" alt="Feather icon" />
          <span>Feather Feed</span>
        </a>
        <a href="https://github.com" target="_blank " className="footer-link github">
          <img src="/assets/icons/github-mark.svg" alt="GitHub mark" />
          
          <img src="/assets/icons/GitHub_Logo.png" alt="GitHub logo" />
        </a>
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <a href="">Home</a>
          <a href="">About</a>
        </div>
        <div className="footer-column">
          <a href="">Login</a>
          <a href="">Sign up</a>
        </div>
        <div className="footer-column">
          <a href="">Create Post</a>
          <a href="">Feed</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
