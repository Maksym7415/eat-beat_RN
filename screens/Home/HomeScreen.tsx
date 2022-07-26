import React, { useState, useEffect, useContext, FC } from "react";
import { StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import server from "../../server";
import Modal from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import Collapse from "../../components/Collapse";
import Nutrient from "../../components/Nutrient";
import Nutrition from "../../components/Nutrition";
import HealthCircle from "../../components/HealthCircle";
import { Col, Spacing } from "../../components/Config";
import { Text } from "../../components/custom/Typography";
import ActionModal from "../../components/ActionModal";
import { Divider } from "../../components/MyComponents";
import { AppContext } from "../../components/AppContext";
import { ConsumptionProps, Memo, NavProps } from "../../components/interfaces";
import DateTimePicker from "@react-native-community/datetimepicker";
import ActionButton from "./common/ActionButton";
import LayoutScroll from "../../components/custom/LayoutScroll";
import { useIsFocused } from "@react-navigation/native";

const recommendScreens = {
  0: 'recommendedRecipe',
  1: 'recommendedRestaurant',
  2: 'SnacksPopular'
}

const HomeScreen: FC<NavProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [actionBtn, setActionBtn] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [feed, setFeed] = useState<ConsumptionProps | null>(null);
  const { calendar, saveCal, refresh } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const serveData = async () => {
    const { data, ok } = await server.getDailyConsumption(date);
    if (ok) {
      Object.keys(data).length && data?.totalMeals > 0
        ? setFeed(data)
        : setFeed({});
    }
  };

  const onChange = (event: Event, selectedDate: Date) => {
    if (event.type === "dismissed")
      return saveCal({ visible: false, date: date });
    if (selectedDate && selectedDate !== date) {
      const currentDate = selectedDate || date;
      saveCal({ visible: false, date: currentDate });
    }
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate(recommendScreens[value], {clear: false});
  };

  const onRefresh = async () => {
    setRefreshing(true);
    serveData().then(() => setRefreshing(false));
  };

  useEffect(() => {
    onRefresh();
  }, [date, refresh]);

  let focus = useIsFocused();
  useEffect(() => {
    if (focus) serveData();
  }, [focus]);

  if (feed === null || refreshing)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color={Col.Black} />
      </View>
    );

  if (Object.keys(feed).length) {
    return (
      <View style={styles.canvas}>
        <ActionButton
          style={styles.actionButton}
          onPress={() => setActionBtn(!actionBtn)}
        />
        <Modal
          label="Health Score"
          content="HealthScore"
          modalVisible={modalVisible}
          showModal={() => setModalVisible(false)}
        />
        <ActionModal
          visible={actionBtn}
          onClick={(value: number) => addRecommended(value)}
          onClose={() => setActionBtn(false)}
        />
        {visible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(ev, d) => onChange(ev, d)}
            style={{ shadowColor: "pink" }}
          />
        )}
        <LayoutScroll
          pullToRefresh
          refreshing={refreshing}
          onRefresh={onRefresh}
          scrollStyle={{paddingBottom: 70}}
        >
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text type="bodyBold" style={styles.title}>
                Total meals
              </Text>
              <Nutrient child={true}>
                <Text type="h4" style={styles.scoreNumber}>
                  {feed.totalMeals}
                </Text>
              </Nutrient>
            </View>
            <View style={styles.box}>
              <Pressable onPress={() => setModalVisible(true)}>
                <View style={styles.scoreContainer}>
                  <Text type="bodyBold" style={styles.title}>
                    Health Score
                  </Text>
                  <AntDesign name="questioncircle" size={11} color={Col.Dark} />
                </View>
              </Pressable>
              <Nutrient child={true}>
                <View style={styles.rowContainer}>
                  <HealthCircle percentage={feed.healthScore} />
                  <View style={styles.percentContainer}>
                    <Text type="h4" style={styles.scoreNumber}>
                      {feed.healthScore}
                    </Text>
                    <Text style={styles.scoreNumber}>/100</Text>
                  </View>
                </View>
              </Nutrient>
            </View>
          </View>
          <Divider styler={styles.divider} />
          <View style={styles.boxContainer}>
            {feed.defaultNutrients.map((item, index) => (
              <View key={`${index}`} style={styles.box}>
                <Nutrient {...item} />
              </View>
            ))}
          </View>
          <Divider styler={styles.divider} />
          <View style={{ paddingHorizontal: Spacing.medium }}>
            <Collapse
              data={feed.tooMuchNutrients}
              title={`Too much (${feed.tooMuchNutrients.length})`}
              styler={{ color: Col.Error }}
              icon_type={"alert"}
              isPrecent
            />
            <Collapse
              data={feed.notEnough}
              title={`Not enough (${feed.notEnough.length})`}
              styler={{ color: Col.Info }}
              icon_type={"verify"}
              isPrecent
            />
          </View>
          <Divider styler={styles.divider} />
          <View style={styles.nutritionContainer}>
            <Text type="bodyBold" style={{ paddingVertical: Spacing.tiny }}>
              Nutrition Details
            </Text>
            {feed.nutrientsData.map((item, index) => (
              <Nutrition key={`${index}`} item={item} />
            ))}
          </View>
        </LayoutScroll>
      </View>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActionButton
          style={styles.actionButton}
          onPress={() => setActionBtn(!actionBtn)}
        />
        <ActionModal
          visible={actionBtn}
          onClick={(value: number) => addRecommended(value)}
          onClose={() => setActionBtn(false)}
        />
        {visible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(ev, d) => onChange(ev, d)}
            style={{ shadowColor: "pink" }}
          />
        )}
        <Text type="h6" style={{ textAlign: "center" }}>
          {`Sorry, there is nothing here yet.\nAdd your first meal`}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: Col.Background,
    paddingVertical: Spacing.r_small,
  },
  boxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.r_small,
  },
  box: {
    width: "50%",
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
    borderBottomColor: Col.Divider,
  },
  title: {
    paddingRight: 5,
    textAlign: "center",
  },
  scoreNumber: {
    alignSelf: "center",
  },
  nutritionContainer: {
    borderRadius: 8,
    padding: Spacing.small,
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    marginHorizontal: Spacing.medium,
  },
  scoreContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  percentContainer: {
    flexDirection: "row",
  },
  actionButton: {
    zIndex: 1,
    position: "absolute",
    right: Spacing.medium,
    bottom: Spacing.large,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Col.Background,
  },
});
export default HomeScreen;
