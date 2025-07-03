import "./App.css";
import "./styles/globalStyles.css";
import LoginAndSignUpPage from "./pages/loginAndSignUpPage/LoginAndSignUpPage";
import PostCreation from "./pages/postCreation/PostCreation";
import Footer from "./components/footer/Footer";
import Feed, { UserFeedRoute } from "./pages/feed/Feed";
import Header from "./components/header/Header";
import Profile from "./pages/profile/Profile";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Auth } from "./api/Auth";
import About from "./pages/about/About";
import { NotFound } from "./pages/404Page/NotFoundPage";

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
						<Route path="/profile/:username" element={<Profile />}></Route>
						<Route path="/createpost" element={<PostCreation />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/feed/:user" element={<UserFeedRoute />}></Route>
						<Route path="/" element={<Navigate to="/feed" replace />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/feed/:user" element={<UserFeedRoute />} />
						<Route path="*" element={<NotFound />} />
						<Route
							path="/login"
							element={<LoginAndSignUpPage signupProp={false} />}
						/>
						<Route
							path="/register"
							element={<LoginAndSignUpPage signupProp={true} />}
						/>
						<Route path="/about" element={<About />} />
						<Route path="/profile/:username" element={<Profile />} />
					</Routes>
					<Footer />
				</div>
			</Router>
		</Auth>
	);
}

export default App;
