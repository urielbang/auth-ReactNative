import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth.context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCnx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={() => {
                authCnx.logout();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCnx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCnx.isAuthenticated && <AuthStack />}
      {authCnx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
  const [isTryLogIn, setIsTryLogin] = useState(true);
  const authCnx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      setIsTryLogin(true);
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCnx.authenticate(storedToken);
      }

      setIsTryLogin(false);
    };

    fetchToken();
  }, []);

  if (isTryLogIn) {
    return <AppLoading />;
  }

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style="inverted" />
        <Root />
      </AuthContextProvider>
    </>
  );
}
