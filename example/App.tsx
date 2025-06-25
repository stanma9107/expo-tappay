import * as Linking from "expo-linking"
import Tappay from "expo-tappay";
import { useEffect } from "react";
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

  useEffect(() => {
    if (tappay.applePay.isAvailable()) {
      const primeListener = tappay.applePay.addRecievePrimeListener((data) => {
        if (data.success) {
          console.log(data.prime);
        }
        tappay.applePay.showResult(data.success);
      });

      return () => {
        primeListener.remove();
      };
    }
  }, []);

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
          <Button
            title="Get Generic Prime"
            onPress={async () => {
              try {
                const prime = await tappay.generic.getPrime({
                  cardNumber: "4242424242424242",
                  ccv: "123",
                  expiryMonth: "01",
                  expiryYear: "28",
                });
                console.log(prime);
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </Group>
        <Group name="Apple Pay">
          <Button
            title="Check Apple Pay Availability"
            onPress={async () => {
              const isAvailable = tappay.applePay.isAvailable();
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
              const isAvailable = tappay.linePay.isAvailable();
              Alert.alert(
                "Line Pay Availability",
                isAvailable ? "Available" : "Not Available",
              );
            }}
          />
          <Button
            title="Install Line APP"
            onPress={async () => {
              tappay.linePay.install();
            }}
          />
          <Button
            title="Setup Line Pay Callback"
            onPress={async () => {
              const url = Linking.createURL("/");
              tappay.linePay.setupCallback(url);
            }}
          />
          <Button
            title="Get Line Pay Prime Token"
            onPress={async () => {
              try {
                const primeToken = await tappay.linePay.getPrimeToken();
                Alert.alert("Line Pay Prime Token", primeToken);
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Button
            title="Start Line Pay Payment"
            onPress={async () => {
              Alert.prompt("Payment URL", undefined, async (paymentUrl) => {
                try {
                  const result = await tappay.linePay.startPayment(paymentUrl);
                  console.log(result);
                } catch (error) {
                  console.log(error);
                }
              });
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
