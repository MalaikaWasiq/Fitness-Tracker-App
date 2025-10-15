// App.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';

/* -----------------------
   Auth Context
   ----------------------- */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // simple login: set user object
  const login = (email, password) => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return false;
    }
    // dummy login (no backend)
    setUser({ email, name: null, age: null });
    return true;
  };

  const signup = (email, password, name, age) => {
    if (!email || !password || !name || !age) {
      Alert.alert('Error', 'Please fill all fields');
      return false;
    }
    const newUser = { email, name, age };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* -----------------------
   Screens (no navigation lib)
   - currentScreen state controls rendering
   ----------------------- */

function LoginScreen({ switchTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const ok = login(email.trim(), password);
    if (ok) {
      switchTo('Home');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fitness Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => switchTo('Signup')}>
        <Text style={styles.link}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function SignupScreen({ switchTo }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSignup = () => {
    const ok = signup(email.trim(), password, name.trim(), age.trim());
    if (ok) {
      switchTo('Home');
      setName('');
      setAge('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        onChangeText={setAge}
        value={age}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Sign Up" onPress={handleSignup} />

      <TouchableOpacity onPress={() => switchTo('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function HomeScreen({ switchTo }) {
  const { user, logout } = useContext(AuthContext);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => prev + 10);
      setCalories(prev => +(prev + 0.5).toFixed(1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    switchTo('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🏃 Fitness Tracker</Text>

      <View style={styles.profileBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name || 'User'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || '-'}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{user?.age || '-'}</Text>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>Steps: {steps}</Text>
        <Text style={styles.statsText}>Calories: {calories}</Text>
      </View>

      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}

/* -----------------------
   App (entry)
   - keeps currentScreen state (Login / Signup / Home)
   - renders screens directly (no navigation lib)
   ----------------------- */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login'); // default

  // Auto-switch to Home if user becomes logged in (e.g., after reload logic)
  // Here we read user from context by wrapping provider inside this component.
  return (
    <AuthProvider>
      <AppInner currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </AuthProvider>
  );
}

function AppInner({ currentScreen, setCurrentScreen }) {
  const { user } = useContext(AuthContext);

  // If user exists, show Home
  useEffect(() => {
    if (user) setCurrentScreen('Home');
    else if (!user && currentScreen === 'Home') setCurrentScreen('Login');
  }, [user]);

  const switchTo = screenName => {
    setCurrentScreen(screenName);
  };

  return (
    <>
      {currentScreen === 'Login' && <LoginScreen switchTo={switchTo} />}
      {currentScreen === 'Signup' && <SignupScreen switchTo={switchTo} />}
      {currentScreen === 'Home' && <HomeScreen switchTo={switchTo} />}
    </>
  );
}

/* -----------------------
   Styles (shared)
   ----------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  statsBox: {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  statsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});