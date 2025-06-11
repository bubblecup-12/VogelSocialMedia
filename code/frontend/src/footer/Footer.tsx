import React from "react";
import "./footer.css";

function Footer() {

    

  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="" className="footer-link feather">
          <img src="/assets/icons/feather_black.svg" alt="Feather icon" />
          <span>Feather Feed</span>
        </a>
        <a href="https://github.com/bubblecup-12/VogelSocialMedia" target="_blank " className="footer-link github">
          <img src="/assets/icons/github-mark.svg" alt="GitHub mark" />
          
          <img src="/assets/icons/GitHub_Logo.png" alt="GitHub logo" />
        </a>
      </div>

      <div className="footer-right">
    
          <a className="footer-link" href="#">Home</a>
          <a className="footer-link" href="#">About</a>
          <a className="footer-link" href="#">Login</a>
          <a className="footer-link" href="#">Sign up</a>
          <a className="footer-link" href="#">Create Post</a>
          <a className="footer-link" href="#">Feed</a>
       
      </div>
    </footer>
  );
}

export default Footer;
