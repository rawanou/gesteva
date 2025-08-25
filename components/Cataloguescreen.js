// CatalogueScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

const filters = ['Ménage', 'Coiffure', 'Massage', 'Coaching'];

const services = [
  {
    category: 'Ménage',
    items: [
      {
        title: 'Nettoyage complet de la maison',
        description: 'Nettoyage en profondeur de toutes les pièces',
        image: require('../assets/nettoyage.png')
      },
      {
        title: 'Nettoyage de printemps',
        description: 'Nettoyage complet avec focus sur les zones difficiles',
        image: require('../assets/nettoyage.png')
      },
      {
        title: 'Nettoyage après travaux',
        description: 'Nettoyage spécialisé après rénovation',
        image: require('../assets/nettoyage.png')
      }
    ]
  },
  {
    category: 'Coiffure',
    items: [
      {
        title: 'Coupe de cheveux',
        description: 'Coupe personnalisée selon vos préférences',
        image: require('../assets/coiffure.png')
      },
      {
        title: 'Coloration',
        description: 'Coloration complète ou partielle',
        image: require('../assets/coiffure.png')
      },
      {
        title: 'Coiffure pour évènement',
        description: 'Coiffure spéciale pour occasions spéciales',
        image: require('../assets/coiffure.png')
      }
    ]
  },
  {
    category: 'Massage',
    items: [
      {
        title: 'Massage relaxant',
        description: 'Massage pour détente et relaxation',
        image: require('../assets/massage.png')
      },
      {
        title: 'Massage sportif',
        description: 'Massage pour soulager les tensions musculaires',
        image: require('../assets/massage.png')
      },
      {
        title: 'Massage aux pierres chaudes',
        description: 'Massage avec pierres chaudes pour relaxation profonde',
        image: require('../assets/massage.png')
      }
    ]
  },
  {
    category: 'Coaching',
    items: [
      {
        title: 'Coaching de vie',
        description: 'Accompagnement pour atteindre vos objectifs personnels',
        image: require('../assets/coaching.png')
      },
      {
        title: 'Coaching sportif',
        description: 'Entraînement personnalisé pour améliorer votre forme',
        image: require('../assets/coaching.png')
      },
      {
        title: 'Coaching nutritionnel',
        description: 'Conseils pour une alimentation saine et équilibrée',
        image: require('../assets/coaching.png')
      }
    ]
  }
];

export default function CatalogueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catalogue</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollContent}>
        {services.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{section.category}</Text>
            {section.items.map((item, idx) => (
              <View key={idx} style={styles.card}>
                <Image source={item.image} style={styles.popularImage} />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
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
    paddingTop: 50, // Pour éviter de coller en haut
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: '#000',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
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
  },
  cardDescription: {
    color: '#555',
    fontSize: 14,
  },
});
