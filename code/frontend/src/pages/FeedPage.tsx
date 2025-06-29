import { Feed } from "@mui/icons-material";
import LoginAndSignUpPage from "./loginAndSignUpPage/LoginAndSignUpPage";

export default function FeedPage() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className="feedPage">
        <div className="feedContainer">
            <LoginAndSignUpPage signupProp={isLoggedIn}/>
            <Feed />
        </div>

    </div>
  );
}