import * as Linking from 'expo-linking';
import { View, Share } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { ToggleButton, Button } from 'react-native-paper';
import { actionButtonsStyles, gray } from '../../styles/styles';

export default function BookActionButtons ({ book, onButtonToggle, status}) {
      const shareBook = () => {
        Share.share({
          title: book.volumeInfo.title,
          message: `Check out this book: ${book.volumeInfo.title} - ${book.volumeInfo.previewLink}`,
          url: book.volumeInfo.previewLink,
        });
      }
    
      const openPreviewLink = () => {
        if (book && book.volumeInfo && book.volumeInfo.previewLink) {
          Linking.openURL(book.volumeInfo.previewLink);
        }
      }
      
    

    return (
        <View style={{height: 70, backgroundColor: 'pink'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 5}}>
            <ToggleButton
              icon="heart"
              value="heart"
              status={status}
              onPress={onButtonToggle}
              style={{width: 60, height: 60}}
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 10}}>
            <IconButton
              icon="share"
              size={25}
              onPress={() => shareBook()}
              style={{margin: 1}}
            />
            <Text style={actionButtonsStyles.shareButton}>Share</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 5}}>
            <Button mode='contained' onPress={openPreviewLink} buttonColor={gray} style={{width: '80%'}}>
              Read the book!
            </Button>
          </View>
        </View>
      </View>
    );
}