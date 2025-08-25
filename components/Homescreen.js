
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const services = [
  { id: '1', name: 'Nettoyage', image: require('../assets/nettoyage.png') },
  { id: '2', name: 'Coiffure', image: require('../assets/coiffure.png') },
  { id: '3', name: 'Massage', image: require('../assets/massage.png') },
  { id: '4', name: 'Coaching', image: require('../assets/coaching.png') },
];

const categories = [
  { id: '1', name: 'Nettoyage', desc: 'Ménage', icon: 'home-outline' },
  { id: '2', name: 'Coiffure', desc: 'Coiffure', icon: 'cut-outline' },
  { id: '3', name: 'Massage', desc: 'Massage', icon: 'hand-left-outline' },
  { id: '4', name: 'Coaching', desc: 'Coaching', icon: 'barbell-outline' },
];

export default function HomeScreen({ route }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (route?.params?.autoFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [route?.params?.autoFocusSearch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/GestevaLogo.png')} style={styles.avatar} />
        <Text style={styles.title}>Gesteva</Text>
        <Ionicons name="help-circle-outline" size={24} color="black" />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="gray" style={{ marginHorizontal: 10 }} />
<TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder="Rechercher un service..."
      />      
      </View>

      <Text style={styles.subtitle}>Des services de qualité, à votre porte.</Text>

      <Text style={styles.sectionTitle}>Catégories</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <View key={cat.id} style={styles.categoryCard}>
            <Ionicons name={cat.icon} size={24} color="black" />
            <Text style={styles.categoryName}>{cat.name}</Text>
            <Text style={styles.categoryDesc}>{cat.desc}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Services les plus demandés</Text>
      <FlatList
        data={services}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.popularList}
        renderItem={({ item }) => (
          <View style={styles.popularCard}>
            <Image source={item.image} style={styles.popularImage} />
            <Text style={styles.popularName}>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop:40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 6,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryDesc: {
    color: 'gray',
  },
  popularList: {
    paddingVertical: 10,
  },
  popularCard: {
    width: 120,
    marginRight: 12,
  },
  popularImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  popularName: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
});
