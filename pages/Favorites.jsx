import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../firebaseConfig";
import BookItem from "../components/Home/BookItem";
import { styles } from "../styles/styles";

export default function Favorites({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const getFavoriteBooks = () => {
    const favoriteBooksRef = ref(
      database,
      `favoriteBooks/${auth.currentUser.uid}`,
    );
    onValue(favoriteBooksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoriteBooksList = Object.values(data);
        setFavorites(favoriteBooksList);
      }
    });
  };

  useEffect(() => {
    getFavoriteBooks();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <BookItem
        item={item}
        user={auth.currentUser.uid}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text>You have not added any books to favorites!</Text>
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 15 }}
          />
        </View>
      )}
    </View>
  );
}
