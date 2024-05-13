import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ref, onValue } from "firebase/database";
import { Button, Text } from "react-native-paper";
import { database, auth } from "../firebaseConfig";
import PagesReadDialog from "../components/ReadingTracker/PagesReadDialog";
import {
  getStartOfWeek,
  changeWeek,
  calculateWeeklyReading,
  formatDate,
  getEndOfWeek,
} from "../utils/weekHelper";
import ReadingChart from "../components/ReadingTracker/ReadingChart";
import GoalDialog from "../components/ReadingTracker/GoalDialog";
import GoalProgressBar from "../components/ReadingTracker/GoalProgressBar";
import { styles, readingTrackerStyles, purple } from "../styles/styles";
import Loader from "../components/Common/Loader";

export default function ReadingTracker() {
  const [readingData, setReadingData] = useState({});
  const [goalData, setGoalData] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek());
  const [weekEnd, setWeekEnd] = useState(getEndOfWeek(getStartOfWeek()));
  const [weeklyReading, setWeeklyReading] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pagesDialogVisible, setPagesDialogVisible] = useState(false);
  const [goalDialogVisible, setGoalDialogVisible] = useState(false);

  const getReadingGoals = () => {
    onValue(
      ref(database, `readingGoals/${auth.currentUser.uid}`),
      (snapshot) => {
        if (snapshot.exists()) {
          setGoalData(snapshot.val());
        }
      },
    );
  };

  const getReadingData = () => {
    setIsLoading(true);
    onValue(
      ref(database, `readingData/${auth.currentUser.uid}`),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setReadingData(data);
          setWeeklyReading(calculateWeeklyReading(currentWeekStart, data));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      },
    );
  }

  useEffect(() => {
    getReadingData();
    getReadingGoals();
  }, []);

  useEffect(() => {
    setWeeklyReading(calculateWeeklyReading(currentWeekStart, readingData));
  }, [currentWeekStart, readingData]);

  return (
    <View style={styles.container} behavior="padding">
      <View style={readingTrackerStyles.goalContainer}>
        {goalData[currentWeekStart] && (
          <GoalProgressBar
            weeklyReading={weeklyReading}
            goal={goalData[currentWeekStart].goal}
          />
        )}
      </View>
      <View style={readingTrackerStyles.dateContainer}>
        <Text variant="titleLarge" style={{ color: purple }}>
          {formatDate(currentWeekStart)} - {formatDate(weekEnd)}
        </Text>
      </View>
      {!isLoading ? (
        <ReadingChart weeklyReadingData={weeklyReading} />
      ) : (
        <Loader />
      )}
      <View style={readingTrackerStyles.weekChangeButtonView}>
        <Button
          onPress={() =>
            changeWeek(
              "previous",
              currentWeekStart,
              setCurrentWeekStart,
              setWeekEnd,
            )
          }
        >
          Previous Week
        </Button>
        <Button
          onPress={() =>
            changeWeek(
              "next",
              currentWeekStart,
              setCurrentWeekStart,
              setWeekEnd,
            )
          }
        >
          Next Week
        </Button>
      </View>
      <Button
        onPress={() => setPagesDialogVisible(true)}
        mode="outlined"
        style={{ marginBottom: 10 }}
      >
        Enter what you read
      </Button>
      <View>
        <Button onPress={() => setGoalDialogVisible(true)} mode="outlined">
          Make a reading goal
        </Button>
      </View>
      <PagesReadDialog
        visible={pagesDialogVisible}
        setVisible={setPagesDialogVisible}
        user={auth.currentUser.uid}
      />
      <GoalDialog
        goalDialogVisible={goalDialogVisible}
        setGoalDialogVisible={setGoalDialogVisible}
        currentWeekStart={currentWeekStart}
        weekEnd={weekEnd}
        user={auth.currentUser.uid}
      />
    </View>
  );
}
