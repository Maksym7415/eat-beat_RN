import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { NavProps } from "../../components/interfaces";
import Chart from "../../components/Chart";
import server from "../../server";
import { Col, Spacing } from "../../components/Config";
import Text from "../../components/custom/Typography";

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
    if (response.ok) {
      const historyFeed: HealthScore[] = response.data.data;
      const dates: string[] = historyFeed.map((el) => `${el.date}`);
      const scores: number[] = historyFeed.map((el) => el.healthScore);
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
    <View style={styles.canvas}>
      <Text type="h6" style={styles.text}>
        Your health score
      </Text>
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
  canvas: {
    flex: 1,
    backgroundColor: Col.Background,
  },
  text: {
    alignSelf: "center",
    marginVertical: Spacing.small,
  },
});
export default HistoryScreen;
