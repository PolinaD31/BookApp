import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoginInputForm from "../components/LoginSignUp/LoginInputForm";
import { auth } from "../firebaseConfig";
import { styles } from "../styles/styles";
import { purple } from "../styles/styles";

export default function SingUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
    } catch (error) {
      console.error(error);
      hasErrors(error);
    }
  };

  const hasErrors = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError("The email address is already in use by another account.");
        break;
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/weak-password":
        setError("The password must be at least 6 characters long.");
        break;
      case "auth/invalid-credential":
        setError("Invalid email or password.");
        break;
      default:
        setError("An error occurred. Please try again later.");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Sign Up
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <LoginInputForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Button onPress={signUp} mode="outlined">
        Sign Up
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        Back to Login
      </Button>
    </View>
  );
}
