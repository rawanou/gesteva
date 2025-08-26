// screens/ServiceDetailScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { CartContext } from "../context/CartContext";

export default function ServiceDetailScreen({ route, navigation }) {
  const { service } = route.params || {};
  const { addToCart } = useContext(CartContext);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Service introuvable
        </Text>
      </View>
    );
  }

  const handleOrder = () => {
    addToCart(service);
    Alert.alert(
      "Service ajouté ✅",
      `"${service.title}" a été ajouté au panier.`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={{ fontSize: 18 }}>x</Text>
      </TouchableOpacity>
      <ScrollView>
        {/* Image principale */}
        <Image source={service.image} style={styles.mainImage} />

        {/* Titre et description */}
        <View style={styles.content}>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.description}>{service.description}</Text>

          {/* Détails supplémentaires */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Détails du service</Text>
            <Text style={styles.infoText}>
              Ce service est effectué par nos professionnels qualifiés, à domicile ou sur rendez-vous.
              Nous garantissons une qualité irréprochable avec satisfaction assurée.
            </Text>
          </View>

          {/* Prix + bouton commander */}
          <View style={styles.orderSection}>
            <Text style={styles.price}>
              {/** affiche proprement le prix si fourni, sinon 0 */}
              {typeof service.price === "number"
                ? service.price.toFixed(2) + " MAD"
                : (String(service.price || "200").replace(/[^\d.,-]/g, "").replace(",", ".") || "0") + " MAD"}
            </Text>

            <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
              <Text style={styles.orderText}>Commander</Text>
            </TouchableOpacity>
          </View>

          {/* Boutons supplémentaires */}
          <TouchableOpacity
            style={[styles.extraButton, styles.addButton]}
            onPress={() => navigation.navigate("Catalogue")}
          >
            <Text style={styles.addButtonText}>Ajouter une autre commande</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.extraButton, styles.cartButton]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={styles.cartButtonText}>Aller au panier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", marginTop: 40 },
  mainImage: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 8 },
  description: { fontSize: 16, color: "#555", marginBottom: 15 },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 5 },
  infoText: { fontSize: 14, color: "#666", lineHeight: 20 },
  orderSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  price: { fontSize: 20, fontWeight: "bold", color: "#556B2F" },
  orderButton: {
    backgroundColor: "#556B2F",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  extraButton: { paddingVertical: 14, borderRadius: 25, alignItems: "center", marginBottom: 15 },
  addButton: { backgroundColor: "#f0f0f0" },
  addButtonText: { color: "#556B2F", fontSize: 16, fontWeight: "bold" },
  cartButton: { backgroundColor: "#556B2F" },
  cartButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: {
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    elevation: 2,
  },
});
