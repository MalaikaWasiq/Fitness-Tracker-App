import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function WorkoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      <Button
        title="Go to Workout Details"
        onPress={() => navigation.navigate("WorkoutDetails")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
