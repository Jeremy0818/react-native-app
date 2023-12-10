import React, { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

export default function PopupBox() {
  // Declare a state variable to store the modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Define a function to toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>React Native Modal Example</Text>
      <Button title="Show Modal" onPress={toggleModal} />
      <Modal
        visible={modalVisible} // Use the state variable as the prop value
        animationType="slide" // Optional: choose the animation type
        transparent={true} // Optional: make the modal transparent
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View
            style={{
              margin: 50,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text>This is a modal</Text>
            <Button title="Hide Modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
