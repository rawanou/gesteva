import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';

export default function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />

      <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>S’inscrire</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop:40},
  back: { marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: {
    backgroundColor: '#4B5320',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  terms: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 15,
  },
});
