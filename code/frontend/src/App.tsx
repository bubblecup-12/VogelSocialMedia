import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import "./styles/sizes.css";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./pages/Profile";
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
