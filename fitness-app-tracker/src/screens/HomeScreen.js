// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { workouts } = useWorkouts();

  const totalWorkouts = workouts?.length || 0;
  const totalDuration = workouts?.reduce((sum, w) => sum + (w.duration || 0), 0) || 0;
  const totalCalories = workouts?.reduce((sum, w) => sum + (w.calories || 0), 0) || 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.header}>
        <Text style={styles.title}>💪 Fitness Tracker</Text>
        <Text style={styles.subtitle}>Track your daily workouts</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🏋️</Text>
          <Text style={styles.statValue}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>{totalDuration}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>{totalCalories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.buttonText}>➕ Add Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WorkoutsList')}
        >
          <Text style={styles.buttonText}>📋 View Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reports')}
        >
          <Text style={styles.buttonText}>📊 Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Routines')}
        >
          <Text style={styles.buttonText}>🗓️ Routines</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#a0a0a0', marginTop: 4 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  statCard: { alignItems: 'center', backgroundColor: '#16213e', padding: 16, borderRadius: 16, flex: 1, marginHorizontal: 4 },
  statIcon: { fontSize: 36, marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#e94560' },
  statLabel: { fontSize: 12, color: '#a0a0a0', marginTop: 4, textTransform: 'uppercase' },
  buttonsContainer: { marginTop: 16, gap: 12 },
  button: { backgroundColor: '#e94560', padding: 16, borderRadius: 16, marginBottom: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
