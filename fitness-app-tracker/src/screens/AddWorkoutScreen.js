// src/screens/AddWorkoutScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, StatusBar, Alert } from 'react-native';
import { useWorkouts } from '../context/WorkoutContext';

export default function AddWorkoutScreen({ navigation }) {
  const { addWorkout } = useWorkouts();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const handleSave = async () => {
    if (!name || !duration || !calories) {
      Alert.alert('⚠️ Please fill all fields');
      return;
    }
    await addWorkout({ name, duration: parseInt(duration), calories: parseInt(calories) });
    Alert.alert('✅ Workout Added');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>🏋️ Workout Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., Running" placeholderTextColor="#666" />

        <Text style={styles.label}>⏱️ Duration (minutes)</Text>
        <TextInput style={styles.input} value={duration} onChangeText={setDuration} keyboardType="numeric" placeholder="30" placeholderTextColor="#666" />

        <Text style={styles.label}>🔥 Calories Burned</Text>
        <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" placeholder="200" placeholderTextColor="#666" />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>💾 Save Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  label: { color: '#fff', fontSize: 16, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#16213e', color: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#0f3460' },
  button: { backgroundColor: '#e94560', padding: 16, borderRadius: 16, marginTop: 24, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
