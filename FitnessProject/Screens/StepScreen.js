import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function StepsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps Tracker</Text>

      <Button
        title="View Step History"
        onPress={() => navigation.navigate("StepHistory")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
