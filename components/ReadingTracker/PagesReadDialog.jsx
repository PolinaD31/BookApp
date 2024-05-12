import { Dialog, TextInput, Button, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { ref, set, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import { styles } from "../../styles/styles";

export default function PagesReadDialog({ visible, setVisible, user }) {
  const [pagesRead, setPagesRead] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");

  const addPagesRead = (date) => {
    set(ref(database, `readingData/${user}/${date}`), Number(pagesRead));
  };

  const deletePagesRead = (date) => {
    remove(ref(database, `readingData/${user}/${date}`));
  };

  const handleSubmit = () => {
    if (!selectedDate || !pagesRead) {
      setError("Pages read is required");
      return;
    } else if (isNaN(pagesRead)) {
      setError("Pages read has to be a number");
      return;
    }

    setError("");

    const formatedSelectedDate = selectedDate.toISOString().split("T")[0];

    if (pagesRead == 0) {
      deletePagesRead(formatedSelectedDate);
    } else {
      addPagesRead(formatedSelectedDate);
    }

    setPagesRead("");
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
            <Text style={{ marginBottom: 10 }}>
              If you want to update the page count for a certain day just enter
              the day and pages into the fields below. To delete enter 0.
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
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
              mode="date"
              display="spinner"
              onChange={onChange}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                setError("");
                setPagesRead("");
                setSelectedDate(new Date());
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
}
