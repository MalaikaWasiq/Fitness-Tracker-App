import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WorkoutDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Details</Text>
      <Text style={styles.text}>Here you can show exercise details, sets, reps, etc.</Text>
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
