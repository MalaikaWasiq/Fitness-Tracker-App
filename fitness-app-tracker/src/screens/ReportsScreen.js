// src/screens/ReportsScreen.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function ReportsScreen() {
  const { workouts } = useWorkouts() || { workouts: [] };

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Fitness Reports</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Total Workouts</Text>
          <Text style={styles.value}>{totalWorkouts}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total Duration</Text>
          <Text style={styles.value}>{totalDuration} mins</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total Calories Burned</Text>
          <Text style={styles.value}>{totalCalories} cal</Text>
        </View>

        {totalWorkouts === 0 && (
          <Text style={styles.noData}>No workouts yet. Add workouts to see reports!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a1a2e' },
  container: { padding: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#16213e', padding: 20, borderRadius: 16, marginBottom: 16 },
  label: { color: '#a0a0a0', fontSize: 14, marginBottom: 6 },
  value: { color: '#e94560', fontSize: 20, fontWeight: 'bold' },
  noData: { color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 16 },
});
