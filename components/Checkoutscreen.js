import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CheckoutScreen({ navigation, route }) {
  const { cartItems, totalPrice } = route.params || {
    cartItems: [],
    totalPrice: 0,
  };

  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("08:30");

  const deliveryFee = deliveryOption === "standard" ? 20 : 30;
  const serviceFee = 10;
  const finalTotal = totalPrice + deliveryFee + serviceFee;

  const generateTimeSlots = () => {
    const times = [];
    for (let h = 8; h <= 20; h++) {
      if (h === 8) times.push("08:30");
      else times.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return times;
  };

  const onDateChange = (event, selected) => {
    if (selected) {
      setScheduledDate(selected);
    }
    setShowDatePicker(false);
  };

  const handlePayment = () => {
    if (!address) {
      Alert.alert("Adresse requise", "Veuillez entrer votre adresse de livraison.");
      return;
    }

    let deliveryMessage = "";
    if (deliveryOption === "scheduled") {
      deliveryMessage = `\nLivraison prévue le ${scheduledDate.toLocaleDateString()} à ${selectedTime}`;
    }

    Alert.alert(
      "Commande confirmée",
      `Votre commande est en cours de traitement.\n\nTotal payé : ${finalTotal} MAD${deliveryMessage}`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainTabs"),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Adresse */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Adresse de livraison</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre adresse..."
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Mode de livraison */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Mode de livraison</Text>

        {/* Standard */}
        <TouchableOpacity
          style={[
            styles.option,
            deliveryOption === "standard" && styles.optionSelected,
          ]}
          onPress={() => setDeliveryOption("standard")}
        >
          <Ionicons
            name="bicycle-outline"
            size={20}
            color={deliveryOption === "standard" ? "white" : "black"}
          />
          <Text
            style={[
              styles.optionText,
              deliveryOption === "standard" && { color: "white" },
            ]}
          >
            Livraison standard (20 MAD)
          </Text>
        </TouchableOpacity>

        {/* Programmée */}
        <TouchableOpacity
          style={[
            styles.option,
            deliveryOption === "scheduled" && styles.optionSelected,
          ]}
          onPress={() => setDeliveryOption("scheduled")}
        >
          <Ionicons
            name="time-outline"
            size={20}
            color={deliveryOption === "scheduled" ? "white" : "black"}
          />
          <Text
            style={[
              styles.optionText,
              deliveryOption === "scheduled" && { color: "white" },
            ]}
          >
            Programmer la livraison (30 MAD)
          </Text>
        </TouchableOpacity>

        {/* Date et Heure si "Programmer" */}
        {deliveryOption === "scheduled" && (
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                Date choisie : {scheduledDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={scheduledDate}
                mode="date"
                display="default"
                minimumDate={new Date()}
                maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                onChange={onDateChange}
              />
            )}

            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Heure :</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {generateTimeSlots().map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={{
                      color: selectedTime === time ? "white" : "black",
                    }}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Moyen de paiement */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Moyen de paiement</Text>
        <TouchableOpacity
          style={[
            styles.option,
            paymentMethod === "cash" && styles.optionSelected,
          ]}
          onPress={() => setPaymentMethod("cash")}
        >
          <Ionicons
            name="cash-outline"
            size={20}
            color={paymentMethod === "cash" ? "white" : "black"}
          />
          <Text
            style={[
              styles.optionText,
              paymentMethod === "cash" && { color: "white" },
            ]}
          >
            Espèces à la livraison
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            paymentMethod === "card" && styles.optionSelected,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Ionicons
            name="card-outline"
            size={20}
            color={paymentMethod === "card" ? "white" : "black"}
          />
          <Text
            style={[
              styles.optionText,
              paymentMethod === "card" && { color: "white" },
            ]}
          >
            Carte bancaire
          </Text>
        </TouchableOpacity>
      </View>

      {/* Récapitulatif */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Récapitulatif</Text>
        <View style={styles.row}>
          <Text>Services</Text>
          <Text>{totalPrice} MAD</Text>
        </View>
        <View style={styles.row}>
          <Text>Livraison</Text>
          <Text>{deliveryFee} MAD</Text>
        </View>
        <View style={styles.row}>
          <Text>Frais de service</Text>
          <Text>{serviceFee} MAD</Text>
        </View>
        <View style={styles.rowTotal}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{finalTotal} MAD</Text>
        </View>
      </View>

      {/* Bouton Payer */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Payer et Commander</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16, marginTop: 40 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  optionSelected: {
    backgroundColor: "#556B2F",
    borderColor: "#556B2F",
  },
  optionText: { marginLeft: 10, fontSize: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  rowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  totalLabel: { fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontSize: 16, fontWeight: "bold", color: "#556B2F" },
  payButton: {
    backgroundColor: "#556B2F",
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  payText: { color: "white", fontSize: 16, fontWeight: "bold" },
  dateButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateButtonText: {
    fontSize: 15,
    color: "#333",
  },
  timeSlot: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    margin: 4,
  },
});
