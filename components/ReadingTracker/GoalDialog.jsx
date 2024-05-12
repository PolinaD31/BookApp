import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput, Button, Text, Dialog, Switch } from "react-native-paper";
import { useState } from "react";
import { ref, set, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import * as Notifications from "expo-notifications";
import { styles } from "../../styles/styles";

export default function GoalDialog({
  goalDialogVisible,
  setGoalDialogVisible,
  currentWeekStart,
  weekEnd,
  user,
}) {
  const [readingGoal, setReadingGoal] = useState("");
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [error, setError] = useState("");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const deleteGoal = () => {
    remove(ref(database, `readingGoals/${user}/${currentWeekStart}`));
  };

  const addGoal = () => {
    const goalData = {
      goal: readingGoal,
      remind: remindersEnabled,
    };

    if (remindersEnabled) {
      scheduleNotification();
    }

    set(ref(database, `readingGoals/${user}/${currentWeekStart}`), goalData);
  };

  const handleReadingGoalSubmit = () => {
    if (readingGoal === "") {
      setError("The feild is required");
      return;
    } else if (isNaN(readingGoal)) {
      setError("Reading goal has to be a number");
      return;
    }

    setError("");

    if (readingGoal == 0) {
      deleteGoal();
    } else {
      addGoal();
    }

    setReadingGoal("");
    setRemindersEnabled(false);
    setGoalDialogVisible(false);
  };

  const askPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access the send notification to schedule a notification.",
      );
      setRemindersEnabled(false);
    }
  };

  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled);
    if (!remindersEnabled) {
      askPermission();
    }
  };

  const scheduleNotification = async () => {
    const weekEndFormated = new Date(weekEnd);
    const notificationDate = weekEndFormated;
    notificationDate.setDate(weekEndFormated.getDate() - 1);
    notificationDate.setHours(11, 0, 0, 0);
    console.log(notificationDate);

    const today = new Date();
    if (today > notificationDate) {
      alert(
        "The date you want to schedule the notification for has already passed. Notification canceled.",
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reading Goal Reminder",
        body: "Have you already completed the goal for this week? Open and check!",
      },
      trigger: { date: notificationDate },
    });
  };

  return (
    <Dialog
      visible={goalDialogVisible}
      onDismiss={() => setGoalDialogVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Dialog.Title>Enter your reading goal for this week</Dialog.Title>
          <Dialog.Content>
            <Text style={{ marginBottom: 20 }}>
              By enabling reading goal notifications, you will recieve a
              notification 1 day before the end of the week reminding you to
              check on your goal status.
            </Text>
            <Text style={{ marginBottom: 20 }}>
              To update a reading goal just enter a new number and submit. To
              delete enter 0.
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              style={{ marginBottom: 10 }}
              onChangeText={setReadingGoal}
              value={readingGoal}
              keyboardType="numeric"
              label="Reading goal (in pages)"
              mode="outlined"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 10 }}>
                {remindersEnabled
                  ? "Turn off reading goal reminders"
                  : "Turn on reading goal reminders"}
              </Text>
              <Switch
                value={remindersEnabled}
                onValueChange={toggleReminders}
              />
            </View>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setGoalDialogVisible(false);
                  setReadingGoal("");
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleReadingGoalSubmit}>Submit</Button>
            </Dialog.Actions>
          </Dialog.Content>
        </View>
      </TouchableWithoutFeedback>
    </Dialog>
  );
}
