import "./App.css";
import "./styles/colors.css";
import "./styles/fonts.css";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import Footer from "./components/footer/Footer";

import Feed from './components/feed/Feed';

function App() {
  return (
    <div className="App">
      <Feed/>
      <Footer/>
    </div>
  );
}

export default App;
