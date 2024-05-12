import { View } from "react-native";
import { styles } from "../../styles/styles";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={"pink"} size="large" />
    </View>
  );
}
