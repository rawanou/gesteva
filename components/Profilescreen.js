import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image , item, Alert} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);

 return (
      <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.avatar} />

      <Text style={styles.name}>Olivia Bennett</Text>
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Compte</Text>
  {[
    'Information personnel',
    'Méthodes de paiement',
    'Addresses',
    'Notifications & Assistance',
  ].map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.item}
      onPress={() => {
        if (item === 'Notifications & Assistance') {
          navigation.navigate('NotificationAssistance');
        }
        // ajouter d'autres navigations 
      }}
    >
      <Text style={styles.itemText}>{item}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  ))}
</View>


              <View style={styles.section}>
            <Text style={styles.sectionTitle}>Commande</Text>
            <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Ma dernière commande</Text>
          <Text style={styles.arrow}>›</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Statistiques</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
       <TouchableOpacity
        style={styles.item}
        onPress={() => {
        Alert.alert(
       'Déconnexion',
       'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  }}
>
  <Text style={styles.itemText}>Déconnexion</Text>
  <Text style={styles.arrow}>›</Text>
</TouchableOpacity>
</View>
</View> 
 );
};


 

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5b5f3e',
    marginVertical: 10,
  },
  name: { textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 22,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemText: { fontSize: 17 },
  arrow: { fontSize: 16, color: '#888' },
});

export default ProfileScreen;
