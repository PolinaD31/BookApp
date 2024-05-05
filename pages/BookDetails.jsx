import { View, Image, ImageBackground, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { ref, remove, set, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useEffect, useState, Fragment } from 'react';
import AdditionalInfo from '../components/BookDetails/AdditionalInfo';
import BookActionButtons from '../components/BookDetails/BookActionButtons';
import { bookDetailStyles } from '../styles/styles';


export default function BookDetails({ route, navigation }) {
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState('unchecked');

  const { user, book: passedBook } = route.params;

  useEffect(() => {
      setBook(passedBook );
      fetchFavoriteStatus(passedBook .id)
  }, []);

  const onButtonToggle = () => {
    if(status === 'unchecked') {
      saveBook();
    } else {
      deleteBook(book.id)
    }
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };

  const fetchFavoriteStatus = async (id) => {
    try {
      const snapshot = await get(ref(database, `favoriteBooks/${user}/${id}`));
      if (snapshot.exists()) {
        setStatus('checked');
      } else {
        setStatus('unchecked');
      }
    } catch (error) {
      console.error('Error fetching favorite status:', error);
    }
  };

  const saveBook = () => {
    const bookToAdd = {...book, favorite: 'true'}
    set(ref(database, `favoriteBooks/${user}/${book.id}`), bookToAdd);
  }

  const deleteBook = (id) => {
    remove(ref(database, `favoriteBooks/${user}/${id}`))
  }

  return (
    <View style={bookDetailStyles.containerBookDetail}>
        {book && (
          <Fragment>
          <View style={{flex: 2}}>
            <View style={{flex: 1}}>
              {book.volumeInfo.imageLinks && 
              <ImageBackground 
                source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                resizeMode='cover'
                style={bookDetailStyles.imageBackground}
              />}
              <View style={bookDetailStyles.overlay}></View>
              <View style={{flex: 5, paddingTop: 10, alignItems: 'center'}}>
                {book.volumeInfo.imageLinks ? 
                  <Image
                    source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                    resizeMode='contain'
                    style={bookDetailStyles.image}
                  />
                : <View style={bookDetailStyles.noImage}><Text>No image Available</Text></View>
                }
                <View style={{
                  flex: 0.3, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                }}>
                  <Text variant="titleLarge" style={{fontWeight: 'bold'}}>{book.volumeInfo.title}</Text>
                  <Text variant="labelMedium" style={{fontWeight: 'bold'}}>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}</Text>
                </View>
                <AdditionalInfo book={book} />
              </View>
            </View>
          </View>
          <View style={{flex: 2, backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 30}}>
              <Text style={{marginBottom: 15}}>Description</Text>
              <Text style={{
                fontSize: 17
              }}>{book.volumeInfo.description}</Text>
            </ScrollView>
          </View>
          <BookActionButtons book={book} onButtonToggle={onButtonToggle} status={status} />
        </Fragment>
        )}
    </View>
  );
}
