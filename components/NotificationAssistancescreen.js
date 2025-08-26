// NotificationAssistanceScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme,TouchableOpacity  } from 'react-native';

export default function NotificationAssistanceScreen({ route , navigation}) {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const colorScheme = useColorScheme(); 

  useEffect(() => {
   
    setNotifications([
      { id: 1, text: "Votre commande a été confirmée ✅" },
      { id: 2, text: "Rappel : Coiffure demain à 10h 💇‍♀️" },
    ]);

    
    setMessages([
      { from: 'bot', text: "Bonjour, comment puis-je vous aider ?" },
      { from: 'user', text: "J'ai un souci avec ma réservation." },
    ]);
  }, []);

  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={[styles.container, isDark && { backgroundColor: '#000' }]}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={{ fontSize: 18 }}>←</Text>
              </TouchableOpacity>
      <Text style={[styles.sectionTitle, isDark && styles.darkText]}>🔔 Notifications</Text>
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <View key={notif.id} style={[styles.card, isDark && styles.darkCard]}>
            <Text style={[styles.text, isDark && styles.darkText]}>{notif.text}</Text>
          </View>
        ))
      ) : (
        <Text style={[styles.text, isDark && styles.darkText]}>Aucune notification reçue.</Text>
      )}

      <Text style={[styles.sectionTitle, isDark && styles.darkText]}>💬 Dernière conversation</Text>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <View key={index} style={[styles.card, isDark && styles.darkCard]}>
            <Text style={[styles.text, isDark && styles.darkText]}>
              <Text style={{ fontWeight: 'bold' }}>{msg.from} :</Text> {msg.text}
            </Text>
          </View>
        ))
      ) : (
        <Text style={[styles.text, isDark && styles.darkText]}>Aucune discussion avec l’assistance détectée.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop:40},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  darkText: {
    color: '#eee',
  },
});
