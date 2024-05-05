import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginInputForm from '../components/LoginSignUp/LoginInputForm';
import { auth } from '../firebaseConfig';
import { styles } from '../styles/styles';
import { purple } from '../styles/styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const hasErrors = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setError('Invalid email address.');
        break;
      case 'auth/user-not-found':
        setError('User not found. Please sign up.');
        break;
      case 'auth/wrong-password':
        setError('Invalid email or password.');
        break;
      case 'auth/invalid-credential':
        setError('Invalid email or password.');
      break;
      default:
        setError('An error occurred. Please try again later.');
        break;
    }
  }

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error(error);
      hasErrors(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, color: purple}}>Sign In</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <LoginInputForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <Button onPress={signIn} mode="outlined" > Sign In </Button>
      <Button onPress={() => {
          navigation.navigate('SignUp')
      }} > Don't have an account? Sign Up </Button>
    </View>
  );
}