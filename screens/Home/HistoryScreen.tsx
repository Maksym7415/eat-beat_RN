import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Text,
  View,
} from "react-native";
import { NavProps } from "../../components/interfaces";
import Chart from "../../components/Chart";
import server from "../../server";

interface HealthScore {
  date: string;
  healthScore: number;
}

interface Data {
  dates: string[];
  scores: number[];
}

interface Offset {
  count: number;
  offset: number;
}

const HistoryScreen: FC<NavProps> = ({ navigation }) => {
  const [data, setData] = useState<Data>({ dates: [], scores: [] });
  const [offset, setOffset] = useState<Offset>({ count: 0, offset: 0 });

  const getHealthsScore = async () => {
    const response = await server.getHistory(offset.offset);
    console.log(response.data.data);
    if (response.ok) {
      const historyFeed: HealthScore[] = response.data.data;
      const dates: string[] = historyFeed.map((el) => `${el.date}`);
      const scores: number[] = historyFeed.map((el) => el.healthScore);
      console.log(dates, scores);
      setData((value) => ({ ...value, dates, scores }));
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();
    if (event?.nativeEvent?.contentOffset?.x > offset.count + 650) {
      setOffset((value) => ({
        ...value,
        count: event.nativeEvent.contentOffset.x,
        offset: value.offset + 10,
      }));
      getHealthsScore();
    }
  };

  useEffect(() => {
    getHealthsScore();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Your health score</Text>
      <ScrollView
        horizontal={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Chart data={data} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    marginBottom: 8,
  },
});
export default HistoryScreen;
