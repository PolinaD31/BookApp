import { View, Text } from "react-native";
import { additionalInfoStyles } from "../../styles/styles";

export default function AdditionalInfo({ book }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <View style={additionalInfoStyles.infoBox}>
        <Text style={additionalInfoStyles.text}>
          {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : "-"}
        </Text>
        <Text style={{ color: "white" }}>Average rating</Text>
      </View>
      <View style={additionalInfoStyles.infoBox}>
        <Text style={additionalInfoStyles.text}>
          {book.volumeInfo.language}
        </Text>
        <Text style={{ color: "white" }}>language</Text>
      </View>
      <View style={additionalInfoStyles.infoBox}>
        <Text style={additionalInfoStyles.text}>
          {book.volumeInfo.maturityRating === "NOT_MATURE" ? "No" : "Yes"}
        </Text>
        <Text style={{ color: "white" }}>Mature content</Text>
      </View>
    </View>
  );
}
