import { useNavigate } from "react-router-dom";
import "./naggingFooter.css";
import LogInButton from "../buttons/LogInButton";
import SignUpButton from "../buttons/SignUpButton";

export default function NaggingFooter() {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <img
        className="header-icon header-icon-feather"
        src="/assets/icons/BirdIconO.ico"
        alt="featherIcon"
        onClick={() => navigate("/")}
      />
      <p className="header-title" onClick={() => navigate("/")}>
        Feather Feed
      </p>
      <div className="footer-spacer" />
      <div className="signup-button">
        <SignUpButton />
      </div>
      <LogInButton />
    </div>
  );
}
