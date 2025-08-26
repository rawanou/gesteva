
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from "./context/CartContext";
import LoginScreen from './components/Loginscreen';
import SignupScreen from './components/Signupscreen';
import MainTabNavigator from './MainTabNavigator';
import AssistanceScreen from './components/Assistancescreen' ;
import NotificationAssistanceScreen from './components/NotificationAssistancescreen';
import ServiceDetailScreen from './components/ServiceDetailscreen';
import CartScreen from './components/Cartscreen';
import CatalogueScreen from './components/Cataloguescreen';
import CheckoutScreen from './components/Checkoutscreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <View style={styles.container}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Assistance" component={AssistanceScreen} />
        <Stack.Screen name="NotificationAssistance" component={NotificationAssistanceScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Catalogue" component={CatalogueScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />

      </Stack.Navigator>
      </View>
    </NavigationContainer>
    </CartProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  footerContainer: { backgroundColor: '#333333' },
});
