// src/screens/WorkoutDetailScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function WorkoutDetailScreen({ route, navigation }) {
  const { workout } = route.params;
  const { deleteWorkout } = useWorkouts();

  const handleDelete = () => {
    Alert.alert('Delete Workout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { await deleteWorkout(workout.id); navigation.goBack(); } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.card}>
        <Text style={styles.name}>{workout.name}</Text>
        <Text style={styles.info}>⏱️ Duration: {workout.duration} mins</Text>
        <Text style={styles.info}>🔥 Calories: {workout.calories}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>🗑️ Delete Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1a1a2e' },
  card: { backgroundColor: '#16213e', padding: 20, borderRadius: 16, marginBottom: 24 },
  name: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 12 },
  info: { fontSize: 16, color: '#a0a0a0', marginBottom: 6 },
  deleteButton: { backgroundColor: 'red', padding: 16, borderRadius: 16, alignItems: 'center' },
  deleteText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
