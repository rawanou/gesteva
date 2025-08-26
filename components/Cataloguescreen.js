
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const filters = ['Tous', 'Ménage', 'Coiffure', 'Massage', 'Coaching'];

const services = [
  {
    category: 'Ménage',
    items: [
      {
        title: 'Nettoyage complet de la maison',
        description: 'Nettoyage en profondeur de toutes les pièces',
        image: require('../assets/nettoyage.png'),
        price: '250 MAD',
      },
      {
        title: 'Nettoyage de printemps',
        description: 'Focus sur les zones difficiles à atteindre',
        image: require('../assets/nettoyage.png'),
        price: '300 MAD',
      },
      {
        title: 'Nettoyage après travaux',
        description: 'Spécialisé après rénovation',
        image: require('../assets/nettoyage.png'),
        price: '400 MAD',
      },
    ],
  },
  {
    category: 'Coiffure',
    items: [
      {
        title: 'Coupe de cheveux',
        description: 'Coupe personnalisée selon vos préférences',
        image: require('../assets/coiffure.png'),
        price: '150 MAD',
      },
      {
        title: 'Coloration',
        description: 'Coloration complète ou partielle',
        image: require('../assets/coiffure.png'),
        price: '200 MAD',
      },
      {
        title: 'Coiffure pour évènement',
        description: 'Spéciale pour mariages et soirées',
        image: require('../assets/coiffure.png'),
        price: '300 MAD',
      },
    ],
  },
  {
    category: 'Massage',
    items: [
      {
        title: 'Massage relaxant',
        description: 'Détente et relaxation assurées',
        image: require('../assets/massage.png'),
        price: '250 MAD',
      },
      {
        title: 'Massage sportif',
        description: 'Soulage les tensions musculaires',
        image: require('../assets/massage.png'),
        price: '280 MAD',
      },
      {
        title: 'Massage aux pierres chaudes',
        description: 'Relaxation profonde avec chaleur',
        image: require('../assets/massage.png'),
        price: '350 MAD',
      },
    ],
  },
  {
    category: 'Coaching',
    items: [
      {
        title: 'Coaching de vie',
        description: 'Atteignez vos objectifs personnels',
        image: require('../assets/coaching.png'),
        price: '400 MAD',
      },
      {
        title: 'Coaching sportif',
        description: 'Entraînement personnalisé pour progresser',
        image: require('../assets/coaching.png'),
        price: '350 MAD',
      },
      {
        title: 'Coaching nutritionnel',
        description: 'Conseils pour une alimentation équilibrée',
        image: require('../assets/coaching.png'),
        price: '300 MAD',
      },
    ],
  },
];

export default function CatalogueScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const navigation = useNavigation();

  // Filtrer les services selon le filtre choisi
  const filteredServices =
    selectedFilter === 'Tous'
      ? services
      : services.filter((section) => section.category === selectedFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catalogue</Text>

      {/* Filtres horizontaux */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services */}
      <ScrollView style={styles.scrollContent}>
        {filteredServices.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{section.category}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.card}
                onPress={() => navigation.navigate('ServiceDetail', { service: item })}
              >
                <Image source={item.image} style={styles.popularImage} />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#556B2F',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterText: {
    color: '#000',
    fontSize: 13,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 8,

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardText: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#222',
  },
  cardDescription: {
    color: '#555',
    fontSize: 14,
  },
  price: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#556B2F',
  },
});
