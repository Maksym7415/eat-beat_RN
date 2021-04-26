import React, { FC, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavProps } from "../../components/interfaces";
import Chart from "../../components/Chart";
import server from "../../server";
import { Col, Spacing } from "../../components/Config";
import Text from "../../components/custom/Typography";
import { useIsFocused } from "@react-navigation/native";
import ActionButton from "./common/ActionButton";
import ActionModal from "../../components/ActionModal";
import moment from 'moment'

interface HealthScore {
  date: string;
  healthScore: number;
}

interface Offset {
  count: number;
  offset: number;
}

const recommendScreens = {
  0: 'recommendedRecipe',
  1: 'recommendedRestaurant',
  2: 'SnacksPopular'
}

const HistoryScreen: FC<NavProps> = ({ navigation }) => {
  const [data, setData] = useState({});
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [offset, setOffset] = useState<Offset>({ count: 0, offset: 0 });

  const getHealthsScore = async () => {
    const response = await server.getHistory(offset.offset);
    const newFeed: {[key: string]: any} = { ...data };
    if (response.ok) {
      const historyFeed: HealthScore[] = response.data.data;
      historyFeed.forEach(({ date, healthScore }) => {
        Object.assign(newFeed, { [date]: healthScore });
      });

      const dates = Object.keys(newFeed)
      dates.sort((a, b) => {
        if (moment(a).valueOf() > moment(b).valueOf()) return 1
        if (moment(a).valueOf() < moment(b).valueOf()) return -1
        return 0
      })
      const sortedFeed: {[key: string]: any} = {}
      dates.forEach((date) => {
        sortedFeed[date] = newFeed[date]
      })
      setData(sortedFeed);
    }
  };

  const handleScroll = (count: number) => {
    // setOffset({ count, offset: offset.offset + 10 });
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate(recommendScreens[value]);
  };

  let focus = useIsFocused();
  useEffect(() => {
    if (focus) {
      setOffset({ count: 0, offset: 0 })
      getHealthsScore();
    }
  }, [focus]);

  useEffect(() => {
    if (focus && offset.offset) {
      getHealthsScore();
    }
  }, [offset.offset]);

  return (
    <View style={styles.canvas}>
      <ActionButton style={styles.actionButton} onPress={() => setActionBtn(!actionBtn)} />
      <ActionModal visible={actionBtn} onClick={(value: number) => addRecommended(value)} onClose={() => setActionBtn(false)} />
      <View style={styles.header}>
        <Text type="h6">Your health score</Text>
      </View>
      <View style={{ backgroundColor: "white", paddingVertical: 32 }}>
        {Object.keys(data).length > 0 && <Chart data={data} scaleDates={false} onReachEnd={handleScroll} />}
      </View>
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
