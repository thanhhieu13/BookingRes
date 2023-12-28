import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const PopUp = ({ buttonText, onPress }) => {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          onPress(item);
        }}
      >
        <Text style={styles.applyButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "red",
    width: "90%",
    marginTop: 20,
    padding: 17,
    borderRadius: 5,
  },
  applyButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  popupContainer: {
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    // width: "95%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
