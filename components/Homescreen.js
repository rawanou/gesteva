// HomeScreen.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Ménage', image: require('../assets/nettoyage.png') },
  { id: '2', name: 'Coiffure', image: require('../assets/coiffure.png') },
  { id: '3', name: 'Massage', image: require('../assets/massage.png') },
  { id: '4', name: 'Coaching', image: require('../assets/coaching.png') },
];

const popularServices = [
  {
    id: '1',
    name: 'Nettoyage complet',
    description: 'Service de ménage professionnel',
    image: require('../assets/nettoyage.png'),
    category: 'Ménage',
  },
  {
    id: '2',
    name: 'Coupe de cheveux',
    description: 'Coiffure tendance à domicile',
    image: require('../assets/coiffure.png'),
    category: 'Coiffure',
  },
  {
    id: '3',
    name: 'Massage relaxant',
    description: 'Massage bien-être chez vous',
    image: require('../assets/massage.png'),
    category: 'Massage',
  },
  {
    id: '4',
    name: 'Coaching sportif',
    description: 'Coach perso à domicile',
    image: require('../assets/coaching.png'),
    category: 'Coaching',
  },
];

export default function HomeScreen({ navigation, route }) {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(popularServices);

  // focus auto depuis autre screen
  useEffect(() => {
    if (route?.params?.autoFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [route?.params?.autoFocusSearch]);

  // 🔍 filtrage en fonction du texte tapé
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices(popularServices);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const results = popularServices.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.description.toLowerCase().includes(lowerQuery) ||
          s.category.toLowerCase().includes(lowerQuery)
      );
      setFilteredServices(results);
    }
  }, [searchQuery]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/GestevaLogo.png')} style={styles.avatar} />
        <Text style={styles.title}>Gesteva</Text>
        
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('Assistance')}
        >
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="gray" style={{ marginHorizontal: 10 }} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Rechercher un service..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // ✅ met à jour la recherche
        />
      </View>
      <Text style={styles.subtitle}>Des services de qualité, à votre porte.</Text>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryCard}>
            <Image source={cat.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Services */}
      <Text style={styles.sectionTitle}>Services les plus demandés</Text>
      <View style={styles.popularContainer}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.popularCard}
              onPress={() => navigation.navigate("Catalogue", { category: service.category })} 
            >
              <Image source={service.image} style={styles.popularImage} />
              <Text style={styles.popularTitle}>{service.name}</Text>
              <Text style={styles.popularDesc}>{service.description}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, color: "gray" }}>
            Aucun service trouvé
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white', marginTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  title: { fontSize: 18, fontWeight: 'bold' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 8, marginVertical: 10 },
  searchInput: { flex: 1, backgroundColor: '#f1f1f1', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 10, fontSize: 16, color: '#000' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  categoryCard: { alignItems: 'center', marginRight: 20 },
  categoryImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 8 },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#333' },
  popularContainer: { marginTop: 10 },
  popularCard: { backgroundColor: '#f9f9f9', borderRadius: 15, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  popularImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 10 },
  popularTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  popularDesc: { fontSize: 14, color: '#666' },
});
