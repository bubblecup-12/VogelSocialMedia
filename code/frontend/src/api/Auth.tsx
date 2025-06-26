import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import api from "./axios";
import { jwtDecode } from "jwt-decode";
import { redirectToLogin } from "./axios";
import { refreshToken } from "./refreshToken";

type User = {
  id: string;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
  setUserState: (tryRefresh?: boolean) => Promise<void>;
};
type JwtPayload = {
  username: string;
  role: string;
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  iss: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const Auth: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUserState();
  }, []);

  const setUserState = async (tryRefresh = true) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const now = Date.now() / 1000;
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.exp > now) {
        setUser({
          id: decoded.sub,
          username: decoded.username,
          role: decoded.role,
        });
      } else if (tryRefresh) {
        await refreshToken();
        await setUserState(false);
      }
    } catch {
      console.log("Error while reading and refreshing user info"); // this error should only appear if the app is run in strictMode
      return;
    }
  };

  const logout = async () => {
    try {
      await api.delete("/user/logout");
    } catch {
      console.log("Logout error");
    }
    localStorage.clear();
    setUser(null);
    redirectToLogin(false);
  };

  return (
    <AuthContext.Provider value={{ user, logout, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
