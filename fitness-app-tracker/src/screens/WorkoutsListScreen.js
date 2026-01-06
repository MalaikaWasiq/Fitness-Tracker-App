// src/screens/WorkoutsListScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function WorkoutsListScreen({ navigation }) {
  const { workouts } = useWorkouts();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>⏱️ {item.duration} mins 🔥 {item.calories} cal</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No workouts yet.</Text>}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  card: { backgroundColor: '#16213e', padding: 16, borderRadius: 16, marginBottom: 12 },
  name: { color: '#fff', fontSize: 18, fontWeight: '600' },
  info: { color: '#a0a0a0', fontSize: 14, marginTop: 4 },
  empty: { color: '#a0a0a0', textAlign: 'center', marginTop: 50 },
});
