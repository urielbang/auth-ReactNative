import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export default AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };
  const logout = () => {
    setAuthToken(null);
    AsyncStorage.setItem("token");
  };

  const valueStore = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return (
    <AuthContext.Provider value={valueStore}>{children}</AuthContext.Provider>
  );
};
