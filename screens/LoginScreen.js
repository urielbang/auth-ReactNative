import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth.context";

export default function LoginScreen() {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setIsAuth(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Auth failed", "Could not log in try again later!");
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <LoadingOverlay message="login is in progress..." />;
  }
  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}
