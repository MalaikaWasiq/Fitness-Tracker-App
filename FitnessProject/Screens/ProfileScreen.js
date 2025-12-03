import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=15" }}
        style={styles.avatar}
      />

      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.info}>Fitness Level: Intermediate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3e0",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  info: {
    marginTop: 8,
    fontSize: 18,
    color: "#555",
  },
});
