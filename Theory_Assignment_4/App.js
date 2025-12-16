import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function WorkoutDetails() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "PASTE_YOUR_RAPIDAPI_KEY_HERE",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExercises(data.slice(0, 5)); // sirf 5 exercises
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading workout data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Workout Details (RapidAPI)</Text>

      {exercises.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Target Muscle: {item.target}</Text>
          <Text>Equipment: {item.equipment}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
