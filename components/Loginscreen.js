import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity,Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }

    navigation.navigate('MainTabs'); };

  return (
    <View style={styles.container}>
      {/* Image du haut */}
      <Image
        source={require('../assets/GestevaLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Titre */}
      <Text style={styles.title}>Bonjour !</Text>

      {/* Champs Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Champs Mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Lien mot de passe oublié */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>mot de passe oublié?</Text>
      </TouchableOpacity>

      {/* Bouton Se connecter → redirection vers Home */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      {/* Bouton Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 20,
    color: '#666',
    fontSize: 14,
  },
  button: {
    width: '100%',
    backgroundColor: '#556B2F',
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    color: '#556B2F',
    fontWeight: 'bold',
  },
});
