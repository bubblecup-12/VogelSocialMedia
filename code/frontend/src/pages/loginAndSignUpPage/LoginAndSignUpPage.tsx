import "./loginAndSignUpPage.css";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import ButtonRotkehlchen from "../../components/buttons/buttonRotkehlchen/ButtonRotkehlchen";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../api/Auth";
import { createTheme, useMediaQuery } from "@mui/material";

type FormData = {
  username: string;
  email: string;
  password: string;
};

function LoginAndSignUpPage({ signupProp }: { signupProp: boolean }) {
  const [signup, setSignup] = useState<boolean>(signupProp);
  const [errorMessages, setErrorMessages] = useState<{
    error: String;
    details: { message: string }[];
  }>();

  const location = useLocation();
  const navigate = useNavigate();

  const { setUserState } = useAuth();
  const returnTo =
    new URLSearchParams(location.search).get("returnTo") || "/feed";

  useEffect(() => {
    setSignup(signupProp);
  }, [signupProp]);
  const toggleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setErrorMessages(undefined);
    signup ? navigate("/login") : navigate("/register");
  };
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessages(undefined);
    try {
      const response = signup
        ? await api.post("/user/register", {
            email: formData.email,
            username: formData.username,
            password: formData.password,
          })
        : await api.post("/user/login", {
            username: formData.username,
            password: formData.password,
          });
      const authHeader = response.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        localStorage.setItem("token", token);
      }
      const refreshToken = response.headers["refresh-token"];
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      await setUserState();
      navigate(returnTo);
    } catch (err: any) {
      if (err.response?.data) {
        setErrorMessages(err.response.data);
      } else {
        setErrorMessages({
          error: "Error",
          details: [{ message: err.message || "Something went wrong." }],
        });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="background">
      <div
        className={matchDownMd ? "login-login" : "login-login blue-background"}
      >
        <div className="login-part">
          <div className={signup ? "signup-image" : "login-image"}></div>
        </div>
        <form onSubmit={onSubmit} className="login-part">
          <div className="login-text small-title">
            {signup ? "Sign Up" : "Login"}
          </div>
          <div className="input-fields">
            <div className="login-div-input">
              <img
                className="login-icon"
                src="/assets/icons/username_orange.svg"
                alt="icon username"
              ></img>
              <input
                type="text"
                className="login-input"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            {signup ? (
              <div className="login-div-input">
                <img
                  className="login-icon"
                  src="\assets\icons\email_orange.svg"
                  alt="icon email"
                ></img>
                <input
                  type="email"
                  className="login-input"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              ""
            )}

            <div className="login-div-input">
              <img
                className="login-icon"
                src="\assets\icons\password_orange.svg"
                alt="icon password"
              ></img>
              <input
                type="password"
                className="login-input"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={signup ? 8 : undefined}
              />
            </div>
            {errorMessages && errorMessages?.details?.length > 0 && (
              <div className="error-messages">
                {errorMessages.details.map((detail, index) => (
                  <p key={index}>{detail.message}</p>
                ))}
              </div>
            )}
          </div>
          <ButtonRotkehlchen
            style="primary"
            label={signup ? "Sign Up" : "Login"}
            type="submit"
          />
          <div className="login-signup body-m" onClick={toggleLogin}>
            {signup
              ? "Already have an account? "
              : "Don't have an account yet? "}
            Click <span className="login-here">here</span>
            {signup ? " to login." : " to sign up."}
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginAndSignUpPage;
