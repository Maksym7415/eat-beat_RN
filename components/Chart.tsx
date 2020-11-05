import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Col } from "./Config";

interface Props {
  data: {
    dates: string[];
    scores: number[];
  };
}

const Chart: FC<Props> = ({ data }) => {
  const { dates, scores } = data;
  return scores.length ? (
    <LineChart
      data={{
        labels: dates,
        datasets: [
          {
            data: scores,
          },
        ],
      }}
      width={
        dates.length < 4 ? Dimensions.get("window").width : dates.length * 100
      }
      height={Dimensions.get("window").height / 2}
      withHorizontalLines={false}
      withVerticalLines={false}
      onDataPointClick={({ value }) => console.log(value)}
      chartConfig={{
        backgroundGradientFrom: Col.White,
        backgroundGradientTo: Col.White,
        color: () => Col.Blue,
        labelColor: () => Col.Blue,
        propsForDots: {
          r: "2",
          strokeWidth: "1",
          stroke: Col.Blue,
        },
        strokeWidth: 1,
      }}
      bezier
    />
  ) : (
    <View />
  );
};
export default Chart;
