import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import Footer from "./components/Footer";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginAndSignUpPage signupProp={false} />}
          ></Route>
          <Route
            path="/register"
            element={<LoginAndSignUpPage signupProp={true} />}
          ></Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
