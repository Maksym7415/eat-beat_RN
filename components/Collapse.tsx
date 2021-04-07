import React, { FC, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Image, ScrollView } from "react-native";
import { Col, Spacing } from "./Config";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import SvgMaker from "./SvgMaker";
import { Text } from "../components/custom/Typography";
import { Divider } from "./MyComponents";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppBackend from '../components/BackendSwitcher/store'


interface dataArray {
  name: string;
  value: number;
}

interface Props {
  title: string;
  icon_type: string;
  data: dataArray[];
  isPrecent: boolean
  styler?: object;
  cb?: () => void,
}

const Collapse: FC<Props> = ({ title, styler, icon_type, data, isPrecent, cb, routeToCb=() => {} }) => {
  const [arrow, setArrow] = useState(false);
  return (
      <View style={styles.container}>
        <TouchableWithoutFeedback disabled={!data.length} onPress={() => setArrow(!arrow)}>
          <View style={styles.collapseClosed}>
            <View style={styles.icon}>
              {icon_type && <SvgMaker name={icon_type} />}
              <Text type="bodyBold" style={[styler, styles.text]}>
                {title}
              </Text>
            </View>
            <Icon
              name={arrow ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              color={Col.Grey1}
              size={24}
            />
          </View>
        </TouchableWithoutFeedback>
        {arrow ? (
            <View>
              <Divider styler={styles.collapseDivider} />
              
              {data.map((item, key) => (
                <View key={item.name + key} style={{ flexDirection: "row", justifyContent: isPrecent ? 'flex-start': 'space-between', paddingHorizontal: 4, alignItems: 'center' }}>
                  <View style={styles.imageContainer}>
                    {!isPrecent && <Image
                    source={{
                      uri: AppBackend.getBaseUrl() + item.image,
                    }}
                    style={styles.image}
                      // source={{
                      //   uri: image && image.slice(0, 4) === "http" ? image : `${baseURL}${image}`,
                      // }}
                    />}
                    <View style={{width: '75%'}}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={{...styles.collapseText, textDecorationLine: isPrecent ? '' : 'underline'}}
                        onPress={() => routeToCb(item)}
                      >{item.name}</Text>
                    </View>
                  </View>
                  {isPrecent && <Divider styler={styles.verticalDivider} />}
                  {isPrecent ?
                    <Text style={styles.collapseText}>{`${
                      item.value || 0
                    } %`}</Text> :
                    <TouchableOpacity onPress={() => cb(item)}>
                      <SvgMaker name='addMenuIcon'/>
                    </TouchableOpacity>
                  }
                </View>
              ))}
            </View>
        ) : (
          <View />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    flexDirection: "column",
    backgroundColor: Col.White,
    marginVertical: Spacing.tiny,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.small,
  },
  collapseClosed: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
    overflow: "hidden",
    resizeMode: "cover",
    marginRight: Spacing.small,
    marginBottom: 10
  },
  icon: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    marginLeft: Spacing.small,
  },
  collapseDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Col.Grey3,
    marginVertical: Spacing.small,
  },
  verticalDivider: {
    marginRight: 15,
    borderLeftWidth: 1,
    borderLeftColor: Col.Grey3,
  },
  collapseText: {
    marginBottom: 6,
    color: Col.Grey,
  },
});
export default Collapse;
