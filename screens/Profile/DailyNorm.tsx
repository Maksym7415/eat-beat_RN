import React, { useState, useEffect, FC, useContext } from "react";
import server from "../../server";
import Text from "../../components/custom/Typography";
import { Col, Spacing } from "../../components/Config";
import { Button } from "../../components/MyComponents";
import { AppContext } from "../../components/AppContext";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Fetching,
  intakeProps,
  Memo,
  NavProps,
  ProfileProps,
} from "../../components/interfaces";
import IntakeSlot from "./common/IntakeSlot";
import { getDate } from "../../utils/date";

interface Options {
  labels: string[];
  values: number[];
}

interface Feed {
  label: string;
  value: number;
  edit: boolean;
}

const DailyNorm: FC<NavProps> = ({ navigation }) => {
  const { myData, getData } = useContext<Memo>(AppContext);
  const { preferences }: ProfileProps = myData;
  const [fetching, setFetching] = useState<Fetching>({
    clicked: false,
    deactivate: false
  })
  const [norms, setNorms] = useState<intakeProps>(myData.intakeNorms);
  const [feed, setFeed] = useState<Options>({
    labels: Object.keys(myData.intakeNorms),
    values: Object.values(myData.intakeNorms),
  });
  const [intakes, setIntakes] = useState<Feed[]>([
    { label: "Calories (kcal)", value: 0, edit: false },
  ]);
  const saveHandler = async () => {
    setFetching({clicked: true, deactivate: true})
    const update = {
      Calories: norms.Calories,
      Protein: norms.Protein,
      "Total Fat": norms["Total Fat"],
      Carbs: norms.Carbs,
    };
    await server.updateIntakeNorm(update);
    setFetching({clicked: false, deactivate: false})
    getData();
  };

  const sortData = () => {
    const newIntake = [];
    const edit = ["Calories", "Protein", "Total Fat", "Carbs"];
    feed.labels.map((el, index) => {
      if (edit.includes(el)) {
        newIntake.unshift({
          label: el,
          value: feed.values[index],
          edit: true,
        });
      } else {
        newIntake.push({ label: el, value: feed.values[index], edit: false });
      }
    });
    setIntakes(newIntake);
  };

  useEffect(() => {
    sortData();
    setFeed({
      labels: Object.keys(myData.intakeNorms),
      values: Object.values(myData.intakeNorms),
    });
    navigation.addListener('focus', () => {
      getData();
    });
  }, [myData]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text type="h6" style={styles.intakeNormText}>
          Daily intake norm
        </Text>
        {intakes.map((item, index) => (
          <IntakeSlot
            key={item.label}
            item={item}
            editable={!preferences}
            onEdit={(key, val) => setNorms({ ...norms, [key]: val })}
          />
        ))}
        {preferences ? (
          <View />
        ) : (
          <Button
            deactivate={fetching.deactivate}
            clicked={fetching.clicked}
            label={"Save changes"}
            onPress={saveHandler}
            style={styles.saveBtn}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Col.White,
    padding: Spacing.medium,
  },
  saveBtn: {
    backgroundColor: Col.Grey,
  },
  normItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  intakeNormText: {
    marginBottom: Spacing.medium,
  },
  nutritionContainer: {
    borderRadius: 8,
    padding: Spacing.small,
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    marginHorizontal: Spacing.medium,
  },
});
export default DailyNorm;
