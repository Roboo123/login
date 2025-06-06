import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    try {
      if (password !== password2) {
        Alert.alert('Błąd', 'Hasła nie są takie same');
        setPassword('');
        setPassword2('');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sukces', 'Użytkownik został zarejestrowany');
      setIsRegistering(false);
    } catch (error) {
      Alert.alert('Błąd rejestracji', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Sukces', 'Zalogowano');
    } catch (error) {
      Alert.alert('Błąd logowania', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
      setPassword2('');
      Alert.alert('Wylogowano');
    } catch (error) {
      Alert.alert('Błąd', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>{isRegistering ? 'Rejestracja' : 'Logowanie'}</Text>
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
            placeholder="Hasło"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {isRegistering && (
            <TextInput 
              style={styles.input}
              placeholder="Powtórz hasło"
              onChangeText={setPassword2}
              value={password2}
              secureTextEntry
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={isRegistering ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>{isRegistering ? 'Zarejestruj' : 'Zaloguj'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.link}>
              {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loggedContainer}>
          <Text style={styles.title}>Witaj, {user.email}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Wyloguj się</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loggedContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#34495e',
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
    borderRadius: 20, 
    backgroundColor: '#ecf0f1', 
    color: '#2c3e50', 
  },
  button: {
    backgroundColor: '#1abc9c', 
    paddingVertical: 16, 
    paddingHorizontal: 24, 
    borderRadius: 50, 
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff', 
    fontWeight: '600', 
    fontSize: 18, 
  },
  link: {
    color: '#e74c3c', 
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ecf0f1', 
  },
});