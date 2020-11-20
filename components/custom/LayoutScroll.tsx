import React, { FC } from "react";
import { RefreshControl, ScrollView, View, ViewProps } from "react-native";
interface Props {
  style?: ViewProps | object;
  scrollStyle?: ViewProps | object;
  refreshing?: boolean;
  onRefresh?: () => void;
  pullToRefresh?: boolean;
}
const LayoutScroll: FC<Props> = ({
  style,
  scrollStyle,
  children,
  pullToRefresh = false,
  refreshing = false,
  onRefresh,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        scrollEnabled
        contentContainerStyle={[{ flexGrow: 1 }, scrollStyle]}
        overScrollMode="auto"
        refreshControl={
          pullToRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : (
            <View />
          )
        }
      >
        <View style={style}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default LayoutScroll;
