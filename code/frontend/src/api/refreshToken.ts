import axios from "axios";
const getRefreshToken = () => localStorage.getItem("refreshToken");

export const refreshToken = async () => {
  const token = getRefreshToken();

  if (!token) {
    throw new Error("No refresh token available");
  }
  const response = await axios.get(
    "http://localhost:3001/api/user/refreshToken",
    {
      headers: {
        "Refresh-Token": getRefreshToken(),
      },
      withCredentials: true,
    }
  );
  const authHeader = response.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    localStorage.setItem("token", token);
  }
  const refreshToken = response.headers["refresh-token"];
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};
