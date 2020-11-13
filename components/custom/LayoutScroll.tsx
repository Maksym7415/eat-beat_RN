import React, { FC } from "react";
import { ScrollView, View, ViewProps } from "react-native";
interface Props {
  style?: ViewProps | object;
  scrollStyle?: ViewProps | object;
}
const LayoutScroll: FC<Props> = ({ style, scrollStyle, children }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        scrollEnabled
        contentContainerStyle={[{ flexGrow: 1 }, scrollStyle]}
        overScrollMode="auto"
      >
        <View style={style}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default LayoutScroll;
