import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "../../styles/styles";

export default function LoginInputForm({
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        mode="outlined"
      />
    </View>
  );
}
