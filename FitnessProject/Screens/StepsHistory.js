import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StepHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step History</Text>
      <Text style={styles.text}>Show past walking data, weekly or monthly stats.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
