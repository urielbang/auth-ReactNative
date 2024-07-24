import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth.context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessaged] = useState("");
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://react-native-course-b21f8-default-rtdb.firebaseio.com/message.json?auth=${token}`
      );

      setFetchedMessaged(res.data);
    };
    fetch();
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
