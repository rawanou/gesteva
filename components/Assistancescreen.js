// AssistanceScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function AssistanceScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([
    { from: 'bot', text: 'Bonjour 👋, comment puis-je vous aider ?' },
  ]);

  const scrollViewRef = useRef(null);

  const sendMessage = () => {
    if (message.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const newResponses = [...responses, { from: 'user', text: message }];
    setResponses(newResponses);
    setMessage('');

    // Simuler une réponse automatique simple
    setTimeout(() => {
      setResponses((prev) => [
        ...prev,
        {
          from: 'bot',
          text: "Merci pour votre question, notre équipe reviendra vers vous rapidement 😊",
        },
      ]);
    }, 1000);
  };

  // Scroll automatique vers le bas
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [responses]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Assistance</Text>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {responses.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              item.from === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text
              style={item.from === 'user' ? styles.userText : styles.botText}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Zone de saisie */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrivez votre message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          cursorColor="#007AFF"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#556B2F',
    marginBottom: 15,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#556B2F',
  },
  botText: {
    color: '#333',
    fontSize: 15,
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000', 
  },
  sendButton: {
    backgroundColor: '#556B2F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
