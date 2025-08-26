// screens/CartScreen.js
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CartContext } from "../context/CartContext";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart } = useContext(CartContext);

  // total : assure-toi que item.price est un nombre (le context le convertit à l'ajout)
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>
          {Number(item.price || 0).toFixed(2)} MAD
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(index)}
      >
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mon Panier</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Votre panier est vide 🛒</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 140 }}
          />

          <View style={styles.footer}>
            <Text style={styles.totalText}>Total : {total.toFixed(2)} MAD</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate("Checkout", {
                  cartItems: cart,
                  totalPrice: total,
                })
              }
            >
              <Text style={styles.checkoutText}>Valider la commande</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", marginTop: 40 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#556B2F",
    marginBottom: 15,
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, borderRadius: 10, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 5 },
  itemPrice: { fontSize: 15, color: "#556B2F", fontWeight: "bold" },
  removeButton: {
    backgroundColor: "#556B2F",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: { color: "#fff", fontWeight: "bold" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#777" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  checkoutButton: {
    backgroundColor: "#556B2F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
