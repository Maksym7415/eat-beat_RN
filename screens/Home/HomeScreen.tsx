import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import NutritionItem from "../../components/Nutrition";
import axios from "axios";
import Nutrient from "../../components/Nutrient";
import Nutrition from "../../components/Nutrition";
import HealthCircle from "../../components/HealthCircle";
import Divider from "../../components/Divider";
import Collapse from "../../components/Collapse";
import Modal from "../../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import { Typ, Col, Weight, Spacing } from "../../components/Config";
import { Text } from "../../components/custom/Typography";
import SvgMaker from "../../components/SvgMaker";
import ActionModal from "../../components/ActionModal";
const testNutrients = [
  {
    title: "Calories",
    unit: "kcal",
    currentSize: 1318,
    maxSize: 1800,
  },
  {
    title: "Protein",
    unit: "g",
    currentSize: 43,
    maxSize: 30,
  },
  {
    title: "Fat",
    unit: "g",
    currentSize: 57,
    maxSize: 50,
  },
  {
    title: "Carbs",
    unit: "g",
    currentSize: 57,
    maxSize: 50,
  },
];

export default function SplashScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionBtn, setActionBtn] = useState(false);
  const [data, setData] = useState([]);
  const getDailyConsumption = async () => {
    const { data } = await axios("/meals/daily-consumption?date=2020-01-01");
    setData(data);
  };
  //useEffect(() => getDailyConsumption(), []);
  console.log(actionBtn);
  return (
    <View style={{ flex: 1 }}>
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
        onClick={(value: number) => setActionBtn(false)}
        onClose={() => setActionBtn(false)}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text type="bodyBold" style={styles.title}>
                Total meals
              </Text>
              <Nutrient child={true}>
                <Text type="h4" style={styles.scoreNumber}>
                  {data.totalMeals}
                </Text>
              </Nutrient>
            </View>
            <View style={styles.box}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.scoreContainer}>
                  <Text type="bodyBold" style={styles.title}>
                    Health Score
                  </Text>
                  <AntDesign name="questioncircle" size={11} />
                </View>
              </TouchableOpacity>
              <Nutrient child={true}>
                <View style={styles.rowContainer}>
                  <HealthCircle
                    // value={+data.healthScore / 100}
                    size={40}
                    thickness={6}
                    color={Col.Green1}
                    unfilledColor={Col.Back3}
                    animationMethod="spring"
                    animationConfig={{ speed: 4 }}
                  />
                  <View style={styles.rowContainer}>
                    <Text type="h4" style={styles.scoreNumber}>
                      {data.healthScore}
                    </Text>
                    <Text style={styles.scoreNumber}>/100</Text>
                  </View>
                </View>
              </Nutrient>
            </View>
          </View>
          <Divider styler={styles.divider} />
          <View style={styles.boxContainer}>
            {data.defaultNutrients ? (
              data.defaultNutrients.map((item, index) => (
                <View key={index} style={styles.box}>
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
              data={data.tooMuchNutrients}
              title={`Too much (${
                data.tooMuchNutrients && data.tooMuchNutrients.length
              })`}
              styler={{ color: Col.Error }}
              icon_type={"alert"}
            />
            <Collapse
              data={data.notEnough}
              title={`Not enough (${data.notEnough && data.notEnough.length})`}
              styler={{ color: Col.Info }}
              icon_type={"verify"}
            />
          </View>
          <Divider styler={styles.divider} />
          <View style={styles.nutritionContainer}>
            {data.nutrientsData &&
              data.nutrientsData.map((item) => (
                <Nutrition key={item.nutrition_title} {...item} />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: Col.Background,
  },
  container: {
    paddingVertical: Spacing.r_small,
    backgroundColor: Col.Back3,
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.r_small,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "50%",
  },
  divider: {
    borderBottomColor: Col.Grey3,
    borderBottomWidth: 1,
    marginVertical: Spacing.small,
  },
  title: {
    color: Col.Grey1,
    textAlign: "center",
    paddingRight: 5,
  },
  scoreNumber: {
    color: Col.Grey1,
    textAlignVertical: "center",
    alignSelf: "center",
  },
  nutritionContainer: {
    backgroundColor: Col.White,
    marginHorizontal: Spacing.medium,
    marginVertical: Spacing.tiny,
    padding: Spacing.small,
    borderRadius: 8,
  },
  scoreContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionButton: {
    position: "absolute",
    right: 0,
    bottom: 20,
    zIndex: 1,
  },
});
