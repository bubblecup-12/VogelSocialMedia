import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/sizes.css";
import LoginAndSignUpPage from "./pages/loginAndSignUpPage/LoginAndSignUpPage";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./api/Auth";

function App() {
  return (
    <Auth>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/login"
              element={<LoginAndSignUpPage signupProp={false} />}
            ></Route>
            <Route
              path="/register"
              element={<LoginAndSignUpPage signupProp={true} />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Auth>
  );
}

export default App;
