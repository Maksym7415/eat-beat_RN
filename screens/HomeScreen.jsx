import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NutritionItem from "../components/Nutrition";
import axios from "axios";
import Nutrient from "../components/Nutrient";
import Nutrition from "../components/Nutrition";
import HealthCircle from "../components/HealthCircle";
import Divider from "../components/Divider";
import Collapse from "../components/Collapse";
import Modal from "../components/Modal";
import { AntDesign } from "@expo/vector-icons";
import { Typ, Col, Weight, Spacing } from "../components/Config";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    
    async function getDailyConsumption() {
      
      const a = await axios(
        `https://logisticbrocker.hopto.org/eat-beat/api/auth/sign-in`,
        {
          method: "post",
          data: {
            email: "popovmaksim7415@gmail.com",
            password: "A1bcde",
          },
        }
      );

      // console.log(a.data.accessToken)
      const { data } = await axios(
        `https://logisticbrocker.hopto.org/eat-beat/api/meals/daily-consumption?date=2020-01-01`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${a.data.accessToken}`,
            // 'Content-type': 'application/json'
          },
        }
      ).catch((e) => console.log({ e }));
      console.log(data)
    setData(data)
     
    }
    getDailyConsumption();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          modalVisible={modalVisible}
          showModal={() => setModalVisible(true)}
        />
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.title}>Total meals</Text>
            <Nutrient child={true}>
              <Text style={styles.scoreNumber}>{data.totalMeals}</Text>
            </Nutrient>
          </View>
          <View style={styles.box}>
            <View style={styles.scoreContainer}>
              <Text style={styles.title}>Health Score</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="questioncircle" size={11} />
              </TouchableOpacity>
            </View>
            <Nutrient child={true}>
              <View style={styles.rowContainer}>
                <HealthCircle
                  value={+data.healthScore / 100}
                  size={40}
                  thickness={6}
                  color={Col.Green1}
                  unfilledColor={Col.Back3}
                  animationMethod="spring"
                  animationConfig={{ speed: 4 }}
                />
                <View style={styles.rowContainer}>
                  <Text style={styles.scoreNumber}>{data.healthScore}</Text>
                  <Text style={[styles.scoreNumber, { fontSize: Typ.H2 }]}>
                    /100
                  </Text>
                </View>
              </View>
            </Nutrient>
          </View>
        </View>
        <Divider styler={styles.divider} />
        <View style={styles.boxContainer}>
          {data.defaultNutrients && data.defaultNutrients.map((item, index) => (
            <View key={index} style={styles.box}>
              <Nutrient {...item} />
            </View>
          ))}
        </View>
        <Divider styler={styles.divider} />
        <View style={{ paddingHorizontal: Spacing.medium }}>
          {console.log(data.tooMuchNutrients)}
          <Collapse
            data={data.tooMuchNutrients}
            title={`Too much (${data.tooMuchNutrients && data.tooMuchNutrients.length})`}
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
          {data.nutrientsData && data.nutrientsData.map((item) => (
            <Nutrition key={item.nutrition_title} {...item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: Typ.Normal,
    color: Col.Grey1,
    textAlign: "center",
    fontWeight: Weight.Bold,
    paddingRight: 5,
  },
  scoreNumber: {
    fontSize: Typ.H1,
    fontWeight: Weight.Normal,
    color: Col.Grey1,
    fontFamily: "Roboto",
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
});
