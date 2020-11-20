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
import { useIsFocused } from "@react-navigation/native";
import ActionButton from "./common/ActionButton";
import ActionModal from "../../components/ActionModal";

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
  const [data, setData] = useState({});
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [offset, setOffset] = useState<Offset>({ count: 0, offset: 0 });

  const getHealthsScore = async () => {
    const response = await server.getHistory(offset.offset);
    const newFeed = { ...data };
    if (response.ok) {
      const historyFeed: HealthScore[] = response.data.data;
      historyFeed.forEach(({ date, healthScore }) => {
        Object.assign(newFeed, { [date]: healthScore });
      });
      setData(newFeed);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();
    if (event?.nativeEvent?.contentOffset?.x >= offset.count + 586) {
      setOffset((value) => ({
        ...value,
        count: event.nativeEvent.contentOffset.x,
        offset: value.offset + 10,
      }));
    }
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate("recommendedDrawer");
  };

  let focus = useIsFocused();
  useEffect(() => {
    if (focus) getHealthsScore();
  }, [focus, offset.offset]);

  return (
    <View style={styles.canvas}>
      <ActionButton
        style={styles.actionButton}
        onPress={() => setActionBtn(!actionBtn)}
      />
      <ActionModal
        visible={actionBtn}
        onClick={(value: number) => addRecommended(value)}
        onClose={() => setActionBtn(false)}
      />
      <View style={styles.header}>
        <Text type="h6">Your health score</Text>
      </View>
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
  header: {
    backgroundColor: Col.White,
    padding: Spacing.large,
  },
  actionButton: {
    zIndex: 1,
    position: "absolute",
    right: Spacing.medium,
    bottom: Spacing.large,
  },
});
export default HistoryScreen;
