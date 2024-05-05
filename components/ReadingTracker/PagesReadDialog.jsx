import { Dialog, TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';

export default function PagesReadDialog ({ visible, setVisible, user }) {
  const [pagesRead, setPagesRead] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = () => {
    if (!selectedDate || !pagesRead) {
      return;
    }

    const formatedSelectedDate = selectedDate.toISOString().split('T')[0];

    set(ref(database, `readingData/${user}/${formatedSelectedDate}`), Number(pagesRead));
    setPagesRead('');
    setSelectedDate(new Date());
    setVisible(false); 
  };

  const onChange = (event, date) => {
    const currentDate = date;
    setSelectedDate(currentDate);
  };

  return (
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Dialog.Title>Enter Pages Read</Dialog.Title>
        <Dialog.Content>
          <Text style={{marginBottom: 10}} >
            If you want to update the page count for a certain day 
            just enter the day and pages into the fields below.
        </Text>  
          <TextInput
            style={{ marginBottom: 10 }}
            onChangeText={setPagesRead}
            value={pagesRead}
            keyboardType="numeric"
            label="Pages Read"
            mode="outlined"
          />
          <DateTimePicker
            value={selectedDate}
            mode='date'
            display='spinner'
            onChange={onChange}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => {
            setVisible(false) 
            setPagesRead('')
            setSelectedDate(new Date())
          }}
          >
              Cancel
          </Button>
          <Button onPress={handleSubmit}>Submit</Button>
        </Dialog.Actions>
        </View>
        </TouchableWithoutFeedback>
      </Dialog>
  );
};
