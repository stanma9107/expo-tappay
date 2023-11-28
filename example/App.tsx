import { StyleSheet, Text, View } from 'react-native';

import * as ExpoTappay from 'expo-tappay';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoTappay.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
