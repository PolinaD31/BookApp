import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { purple } from "../../styles/styles";

export default function ReadingChart({ weeklyReadingData }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <LineChart
      data={{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{ data: weeklyReadingData }],
      }}
      width={screenWidth * 0.9}
      height={screenHeight * 0.4}
      yAxisLabel="Pages "
      chartConfig={{
        backgroundColor: "white",
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(150, 80, 158, ${opacity})`,
        labelColor: () => purple,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        borderRadius: 16,
      }}
    />
  );
}
