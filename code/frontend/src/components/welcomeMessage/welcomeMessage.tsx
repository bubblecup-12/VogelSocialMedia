import "./welcomeMessage.css";

export default function WelcomeMessage() {
  return (
    <div className="welcome-message">
      <h1 className="welcome-title">Welcome!</h1>
      <p className="welcome-text">Join our bird-loving community!</p>
      <p className="desktop-welcome-text">
        Exchange pictures, share your experiences, and discover interesting
        facts about birds from all over the world. Celebrate
        the beauty and diversity of birds with us!
      </p>
    </div>
  );
}
