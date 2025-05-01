import Tappay from "expo-tappay";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function App() {
  const tappay = new Tappay({
    appId: 11340,
    appKey: "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC",
    serverType: "sandbox",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Button
          title="Setup Tappay"
          onPress={() => {
            tappay.setup();
          }}
        />
        <Group name="Generic">
          <Button
            title="Check Generic Availability"
            onPress={async () => {
              const isAvailable = await tappay.generic.isAvailable();
              Alert.alert(
                "Generic Availability",
                isAvailable ? "Available" : "Not Available",
              );
            }}
          />
        </Group>
        <Group name="Apple Pay">
          <Button
            title="Check Apple Pay Availability"
            onPress={async () => {
              const isAvailable = await tappay.applePay.isAvailable();
              Alert.alert(
                "Apple Pay Availability",
                isAvailable ? "Available" : "Not Available",
              );
            }}
          />
          <Button
            title="Setup Apple Pay Merchant"
            onPress={async () => {
              tappay.applePay.setupMerchant({
                name: "Stan",
                merchantCapability: "threeDSecure",
                merchantId: "merchant.your.identifier",
                countryCode: "TW",
                currencyCode: "TWD",
                supportedNetworks: ["Visa", "MasterCard"],
              });
            }}
          />
          <Button
            title="Show Apple Pay Setup View"
            onPress={async () => {
              tappay.applePay.showSetupView();
            }}
          />
          <Button
            title="Start Apple Pay Payment"
            onPress={async () => {
              tappay.applePay.startPayment([{ name: "Test", amount: 100 }]);
            }}
          />
        </Group>
        <Group name="Line Pay">
          <Button
            title="Check Line Pay Availability"
            onPress={async () => {
              const isAvailable = await tappay.linePay.isAvailable();
              Alert.alert(
                "Line Pay Availability",
                isAvailable ? "Available" : "Not Available",
              );
            }}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
