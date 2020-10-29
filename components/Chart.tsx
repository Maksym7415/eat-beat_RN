import React, { FC } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface Props {
  data: {
    dates: string[];
    scores: number[];
  };
}

const Chart: FC<Props> = ({ data }) => {
  const { dates, scores } = data;
  return (
    <LineChart
      data={{
        labels: dates,
        datasets: [
          {
            data: scores,
          },
        ],
      }}
      width={95 * dates.length || 900} // from react-native
      height={Dimensions.get("window").height / 2}
      withHorizontalLines={false}
      withVerticalLines={false}
      onDataPointClick={({ value }) => console.log(value)}
      chartConfig={{
        backgroundColor: "#DCDEDF",
        backgroundGradientFrom: "#DCDEDF",
        backgroundGradientTo: "#DCDEDF",
        color: () => `#2C97EE`,
        labelColor: () => `#2C97EE`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#2C97EE",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};
export default Chart;
