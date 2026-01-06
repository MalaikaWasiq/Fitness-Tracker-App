// src/screens/RoutinesScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoutines } from '../context/RoutineContext';

export default function RoutinesScreen({ navigation }) {
  const { routines } = useRoutines();

  return (
    <View style={styles.container}>
      <FlatList
        data={routines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.workouts?.length || 0} workouts</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No routines yet. Add one!</Text>
        )}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRoutine')}
      >
        <Text style={styles.addButtonText}>➕ Add Routine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  card: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  sub: { color: '#a0a0a0', fontSize: 14, marginTop: 4 },
  emptyText: { color: '#a0a0a0', textAlign: 'center', marginTop: 50 },
  addButton: {
    backgroundColor: '#e94560',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
