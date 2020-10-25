import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import axios from "axios";
import Nutrient from "../../components/Nutrient";
import Nutrition from "../../components/Nutrition";
import HealthCircle from "../../components/HealthCircle";
import Collapse from "../../components/Collapse";
import Modal from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import { Col, Spacing, Database } from "../../components/Config";
import { Text } from "../../components/custom/Typography";
import SvgMaker from "../../components/SvgMaker";
import ActionModal from "../../components/ActionModal";
import { Divider } from "../../components/MyComponents";
import { AppContext } from "../../components/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarInterface, Memo, NavProps } from "../../components/interfaces";

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionBtn, setActionBtn] = useState(false);
  const [feed, setFeed] = useState(Database.feed);
  const { calendar, saveCal } = useContext<Memo>(AppContext);
  const { visible, date } = calendar;

  const getCalendar = (value: Date) => {
    return value.toJSON().toString().slice(0, 10);
  };

  const getDailyConsumption = async () => {
    const address = `/meals/daily-consumption?date=${getCalendar(date)}`;
    try {
      const { data } = await axios(address);
      setFeed(data);
    } catch (error) {
      console.log(error);
    }
  };
  //useEffect(() => getDailyConsumption(), []);
  const onChange = (event: CalendarInterface, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    saveCal({ visible: false, date: currentDate });
  };

  const addRecommended = (value: number) => {
    setActionBtn(false);
    navigation.navigate("recommendedDrawer");
  };

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
            feed.nutrientsData.map((item) => (
              <Nutrition key={item.nutrition_title} item={item} />
            ))
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

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
});
