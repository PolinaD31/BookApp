import { View, Image } from "react-native";
import { Button, Text, Icon } from "react-native-paper";
import { bookItemStyles } from "../../styles/styles";

export default function BookItem({ item, user, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {item.volumeInfo.imageLinks ? (
        <Image
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
          resizeMode="cover"
          style={bookItemStyles.imageBookItem}
        />
      ) : (
        <View style={bookItemStyles.noImageBookItem}>
          <Text>No image Available</Text>
        </View>
      )}
      <View style={bookItemStyles.bookInfoView}>
        <Text variant="titleLarge" style={bookItemStyles.title}>
          {item.volumeInfo.title}
        </Text>
        <Text variant="labelMedium">
          {item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : ""}
        </Text>
        <View style={bookItemStyles.iconView}>
          <Icon source="book-open-page-variant" size={20} />
          <Text style={{ marginLeft: 5 }}>
            {item.volumeInfo.pageCount ? item.volumeInfo.pageCount : "-"}
          </Text>
        </View>
        <View style={bookItemStyles.bookDetailsButtonView}>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate("BookDetails", { book: item, user: user });
            }}
          >
            View details
          </Button>
        </View>
      </View>
    </View>
  );
}
