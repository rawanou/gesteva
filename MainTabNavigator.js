import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './components/Homescreen';
import CatalogScreen from './components/Cataloguescreen';

import ProfileScreen from './components/Profilescreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Accueil') iconName = 'home-outline';
          else if (route.name === 'Catalogue') iconName = 'grid-outline';
          else if (route.name === 'Recherche') iconName = 'search-outline';
          else if (route.name === 'Profil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Catalogue" component={CatalogScreen} />
      <Tab.Screen 
  name="Recherche" 
  component={HomeScreen}
  listeners={({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault(); // empêche la navigation par défaut
      navigation.navigate("Accueil", { autoFocusSearch: true }); // 👈 focus direct
    },
  })}/>

    <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
