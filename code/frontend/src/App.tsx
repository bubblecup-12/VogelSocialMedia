
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
import { NotFound } from "./pages/404Page/NotFoundPage";
import PostCreation from './PostCreation';

function App() {
  return (
    <Auth>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="*" element={<NotFound />} />
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
        </div>
        <Footer />
      </Router>
    </Auth>
  );
}

export default App;
