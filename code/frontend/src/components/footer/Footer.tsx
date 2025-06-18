import "./footer.css";
import { Link } from "react-router-dom";
import { useAuth } from "../api/Auth";
function Footer() {
  const { user } = useAuth();
  const { logout } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-left">
        <Link to="/" className="footer-link feather">
          <img src="/assets/icons/BirdIconO.ico" alt="Feather icon" />
          <span className="small-title">Feather Feed</span>
        </Link>
        <a
          href="https://github.com/bubblecup-12/VogelSocialMedia"
          target="_blank"
          rel="noreferrer"
          className="footer-link github"
        >
          <img src="/assets/icons/github-mark.svg" alt="GitHub mark" />

          <img src="/assets/icons/GitHub_Logo.png" alt="GitHub logo" />
        </a>
      </div>
      <div className="footer-right">
        <Link className="footer-link" to="/">
          Feed
        </Link>
        {user ? (
          <a className="footer-link" onClick={logout}>
            Logout
          </a>
        ) : (
          <>
            <Link className="footer-link" to="login">
              Login
            </Link>
            <Link className="footer-link" to="/register">
              Sign up
            </Link>
          </>
        )}
        <Link className="footer-link" to="/createPost">
          Create Post
        </Link>
        <Link className="footer-link" to="/about">
          About
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
