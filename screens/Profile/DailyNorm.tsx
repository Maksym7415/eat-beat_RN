import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Col, Spacing } from "../../components/Config";
import { Divider } from "../../components/MyComponents";
import Chip from "../../components/custom/Chip";
import Select from "../../components/custom/Select";
import Input from "../../components/custom/Input";
import Button from "../../components/custom/ConfirmationButton";
import server from "../../server";

interface Options {
  title: string;
  value: number;
}

export default function PersonalDataScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const [personalData, setPersonalData] = useState<object>({
    Age: {
      title: "Age",
      value: "23",
      unit: "years",
      edit: false,
    },
    Height: {
      title: "Height",
      value: "175",
      unit: "cm",
      edit: false,
    },
    Weight: {
      title: "Weight",
      value: "75",
      unit: "kg",
      edit: false,
    },
  });
  const [intakeNorm, setIntakeNorm] = useState({
    Calories: {
      title: "Calories (kcal)",
      value: "",
    },
    Proteins: {
      title: "Proteins (g)",
      value: "",
    },
    Fats: {
      title: "Total fats (g)",
      value: "",
    },
    Carbs: {
      title: "Total Carbs (g)",
      value: "",
    },
  });

  const onChangeHandler = (value: string, name: string) => {
    setIntakeNorm((v: any) => ({ ...v, [name]: { ...v[name], value } }));
  };

  const blurHandler = (name: string) => {
    if (Object.keys(intakeNorm).includes(name)) return;
    setPersonalData((v: any) => ({
      ...v,
      [name]: { ...v[name], edit: false },
    }));
  };

  const savePersonalDataHandler = async () => {
    let personalObject = {
      Calories: +intakeNorm["Calories"].value,
      Protein: +intakeNorm["Protein"].value,
      "Total Fat": +intakeNorm["Total Fat"].value,
      Carbs: +intakeNorm["Carbs"].value,
    };
    await server.updateIntakeNorm(personalObject);
  };

  const getProfileData = async () => {
    const {
      data: { intakeNorms: norms, preferences },
    } = await server.getProfile();
    const transitonalObj = {};
    const __editiableNutrient = ["Calories", "Total Fat", "Protein", "Carbs"];
    Object.keys(norms).map((el) => {
      if (__editiableNutrient.includes(el)) {
        transitonalObj[el] = {
          title: el,
          value: norms[el],
          editable: true,
        };
      } else {
        transitonalObj[el] = {
          title: el,
          value: norms[el],
          editable: false,
        };
      }
    });
    setIsEnabled(preferences);
    setIntakeNorm(transitonalObj);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    let focus = navigation.addListener("focus", () => {
      getProfileData();
    });
    () => {
      focus = null;
    };
  }, []);

  return (
    <View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.intakeNormContainer}>
              <Text style={styles.intakeNormText}>Daily intake norm</Text>
              {console.log(isEnabled, "dsgdfgfdgfdgdfjgi34")}
              <View>
                {Object.keys(intakeNorm)
                  .sort((a, b) =>
                    intakeNorm[a].editable < intakeNorm[b].editable ? 1 : -1
                  )
                  .map((el: string) => (
                    <View style={styles.normItemContainer}>
                      <Text>{intakeNorm[el].title}</Text>
                      {!intakeNorm[el].editable ? (
                        <View
                          style={{
                            paddingVertical: 11,
                            width: "50%",
                            paddingHorizontal: 19,
                          }}
                        >
                          <Text>{intakeNorm[el].value}</Text>
                        </View>
                      ) : (
                        <Input
                          label={el}
                          value={intakeNorm[el].value}
                          type={"numeric"}
                          onPressHandler={() => console.log("ex")}
                          onChange={(value, name) =>
                            onChangeHandler(value, name)
                          }
                          defaultIcon={
                            intakeNorm[el].editable
                              ? "keyboard-arrow-up"
                              : undefined
                          }
                          onBlur={blurHandler}
                          defaultIconSize={21}
                          additionalIcon={
                            intakeNorm[el].editable
                              ? "keyboard-arrow-down"
                              : undefined
                          }
                          editable={intakeNorm[el].editable}
                          isEnabled={isEnabled}
                        />
                      )}
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          width: "100%",
          bottom: 46,
        }}
      >
        <Button
          title={"Save changes"}
          onClickHandler={savePersonalDataHandler}
          bckColor={"#616161"}
          textColor={Col.White}
          fts={14}
          ftw={"500"}
          absolute={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Col.Back3,
    flex: 1,
  },
  intakeNormContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  normItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  intakeNormText: {
    fontWeight: "500",
    fontSize: 20,
  },
  nutritionContainer: {
    borderRadius: 8,
    padding: Spacing.small,
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    marginHorizontal: Spacing.medium,
  },
});
