import * as ExpoTappay from "expo-tappay";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoTappay.getTheme()}</Text>
      <Button title="setup" onPress={setup} />
      <Button title="set card" onPress={setCard} />
      <Button title="get prime" onPress={getPrime} />
    </View>
  );
}

const setup = () => {
  ExpoTappay.setup(
    11340,
    "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC",
    "sandbox",
  );
};

const setCard = () => {
  ExpoTappay.setCard("4242424242424242", "01", "25", "123");
};

const getPrime = async () => {
  try {
    const prime = await ExpoTappay.getDirectPayPrime();
    console.log(prime);
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
