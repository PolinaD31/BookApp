import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { purple, purple_2 } from '../../styles/styles';

export default function GoalProgressBar ({ weeklyReading, goal }) {

    const calculateTotalPagesRead = () => {
        const sumOfPages = weeklyReading.reduce((acc, pages) => {
          return acc + pages;
        }, 0);
        return sumOfPages;
      };

    const totalPages = calculateTotalPagesRead();

    const calculateProgress = (goal) => {;
        if (totalPages > goal) {
          return 1;
        } else {
          return totalPages / goal;
        }
    }

    return (
        <View>
            <Text variant='titleMedium' style={{color: purple}}>
                Goal: {goal} pages  |  {goal - totalPages > 0 ? `${goal - totalPages} pages left` : 'Goal Complete!' }
            </Text>
            <View style={{flex: 1, width: 230}}>
                <ProgressBar progress={calculateProgress(goal)} color={purple_2} style={{height: 10}} />
            </View>
        </View>
    );
}