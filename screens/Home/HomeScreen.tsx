import React, { useState, useEffect, useContext, FC } from "react";
import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import server from "../../server";
import Modal from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import Collapse from "../../components/Collapse";
import Nutrient from "../../components/Nutrient";
import SvgMaker from "../../components/SvgMaker";
import Nutrition from "../../components/Nutrition";
import HealthCircle from "../../components/HealthCircle";
import { Col, Spacing } from "../../components/Config";
import { Text } from "../../components/custom/Typography";
import ActionModal from "../../components/ActionModal";
import { Divider } from "../../components/MyComponents";
import { AppContext } from "../../components/AppContext";
import { Memo, NavProps } from "../../components/interfaces";
import DateTimePicker from "@react-native-community/datetimepicker";

const HomeScreen: FC<NavProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionBtn, setActionBtn] = useState(false);
  const [feed, setFeed] = useState<object | null>(null);
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const serveData = async () => {
    const response = await server.getDailyConsumption(date);
    response.ok
      ? setFeed(response.data)
      : Alert.alert(
          response.status?.toString(),
          `${response.problem}\n${JSON.stringify(response.config)}`
        );
    console.log("getDailyConsumption => request: ", response.ok);
  };

  useEffect(() => {
    serveData();
  }, [date]);

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    saveCal({ visible: false, date: currentDate });
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate("recommendedDrawer");
  };

  if (feed === null)
    return (
      <View style={styles.loading}>
        <Text>Loading</Text>
      </View>
    );

  return (
    <View style={styles.canvas}>
      <Pressable
        style={styles.actionButton}
        onPress={() => setActionBtn(!actionBtn)}
      >
        <SvgMaker name="actionButton" />
      </Pressable>
      <Modal
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
          onChange={onChange}
          style={{ shadowColor: "pink" }}
        />
      )}
      <ScrollView>
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
          {feed.defaultNutrients ? (
            feed.defaultNutrients.map((item, index) => (
              <View key={`${index}`} style={styles.box}>
                <Nutrient {...item} />
              </View>
            ))
          ) : (
            <View />
          )}
        </View>
        <Divider styler={styles.divider} />
        <View style={{ paddingHorizontal: Spacing.medium }}>
          <Collapse
            data={feed.tooMuchNutrients}
            title={`Too much (${feed.tooMuchNutrients.length})`}
            styler={{ color: Col.Error }}
            icon_type={"alert"}
          />
          <Collapse
            data={feed.notEnough}
            title={`Not enough (${feed.notEnough.length})`}
            styler={{ color: Col.Info }}
            icon_type={"verify"}
          />
        </View>
        <Divider styler={styles.divider} />
        <View style={styles.nutritionContainer}>
          {feed.nutrientsData ? (
            feed.nutrientsData.map((item, index) => (
              <Nutrition key={`${index}`} item={item} />
            ))
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </View>
  );
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
    right: 0,
    zIndex: 1,
    bottom: 20,
    position: "absolute",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
