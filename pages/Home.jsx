import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Search from '../components/Home/Search';
import BookItem from '../components/Home/BookItem';
import { styles } from '../styles/styles';
import Loader from '../components/Common/Loader';
import { auth } from '../firebaseConfig';

export default function App({ navigation }) {
  const [books, setBooks] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getBooks = () => {
    setIsLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&key=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        setBooks(data.items);
        setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false);
      console.log(error)
    });
  }

  const renderItem = ({ item }) => (
    <BookItem item={item} user={auth.currentUser.uid} navigation={navigation} />
  );
  

  return (
    <View style={styles.container}>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Button mode="contained" onPress={getBooks}>
        get books
      </Button>
      {!isLoading ? <View style={{flex: 1, paddingHorizontal: 10}}>
        {books ? 
        (<FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{marginTop: 15}}
        />) 
        : (<View style={{flex: 1, justifyContent: 'center'}}> 
          <Text>
            Start searching for books and they will appear here!
          </Text>
         </View>)
        }
      </View> 
      : <Loader />}
    </View>

  );
}