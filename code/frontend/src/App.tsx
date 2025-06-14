import "./App.css";
import "./colors.css";
import "./fonts.css";
import LoginAndSignUpPage from "./LoginAndSignUpPage";
import Footer from "./Footer";
import Header from "./header";

function App() {
  return (
    <div className="App">
      <Header />
      <LoginAndSignUpPage />
      <Footer />
    </div>
  );
}

export default App;
