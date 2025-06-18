import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
