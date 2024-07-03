import { useEffect } from "react";
import useBoundStore from "../../store/Store";
import jwtDecode from "jwt-decode";
import { setSession, getAccessToken } from "../../services/jwt.service";

const Auth = ({ children }) => {
  const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
    (state) => state
  );

  const handleAuthentication = async () => {
    let token = getAccessToken();
    if (!token) {
      logoutService();
      return;
    }
    if (!isAuthTokenValid(token)) return;
    setSession(token);
    loginWithToken();
  };

  const isAuthTokenValid = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      logoutService();
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    handleAuthentication();
  }, []);

  return <div>{tokenLoading ? "" : children}</div>;
};

export default Auth;
