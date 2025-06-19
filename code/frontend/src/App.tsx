import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import Footer from "./components/Footer";
import Header from "./components/header";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
