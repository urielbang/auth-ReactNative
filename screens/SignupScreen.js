import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth.context";

export default function SignupScreen() {
  const [isAuth, setIsAuth] = useState(false);

  const authCtx = useContext(AuthContext);

  const singUpUSer = async ({ email, password }) => {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Auth Failed!",
        "Could not create user , please check your input and try again!"
      );
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <LoadingOverlay message="auth is in progress..." />;
  }

  return <AuthContent onAuthenticate={singUpUSer} />;
}
