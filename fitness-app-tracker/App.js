// App.js
import 'react-native-gesture-handler'; // MUST be first line
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contexts
import { WorkoutProvider } from './src/context/WorkoutContext';
import { RoutineProvider } from './src/context/RoutineContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import WorkoutsListScreen from './src/screens/WorkoutsListScreen';
import WorkoutDetailScreen from './src/screens/WorkoutDetailScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import RoutinesScreen from './src/screens/RoutinesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WorkoutProvider>
      <RoutineProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#1a1a2e' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: '600' },
              contentStyle: { backgroundColor: '#1a1a2e' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{ title: 'Add Workout' }} />
            <Stack.Screen name="WorkoutsList" component={WorkoutsListScreen} options={{ title: 'All Workouts' }} />
            <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
            <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
            <Stack.Screen name="Routines" component={RoutinesScreen} options={{ title: 'Routines' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </RoutineProvider>
    </WorkoutProvider>
  );
}
