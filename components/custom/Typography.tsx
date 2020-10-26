import React, { Component, ReactNode, ReactText } from "react";
import { StyleSheet, Text as ReText } from "react-native";
import { Col } from "../Config";

declare interface Props {
  style?: object;
  type?:
    | "h4"
    | "h6"
    | "sub"
    | "body"
    | "bodyBold"
    | "body2"
    | "bodyBold2"
    | "cap";
  children?: string | ReactText | ReactNode[];
  ellipsizeMode?: "head" | "middle" | "tail" | "clip" | undefined;
  numberOfLines?: number;
  onPress?: () => void;
}

export class Text extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const {
      style,
      type = "body",
      children,
      ellipsizeMode,
      numberOfLines,
      onPress,
    } = this.props;
    const def: object = styles[type] || styles.body;
    return (
      <ReText
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[def, style]}
        onPress={onPress}
      >
        {children}
      </ReText>
    );
  }
}

const Font = "Roboto";
const styles = StyleSheet.create({
  h4: {
    //fontFamily: Font,
    fontWeight: "400",
    fontSize: 34,
    color: Col.Grey,
  },
  h6: {
    //fontFamily: Font,
    fontWeight: "500",
    fontSize: 20,
    color: Col.Dark,
  },
  sub: {
    //fontFamily: Font,
    fontWeight: "500",
    fontSize: 14,
    color: Col.Black,
  },
  body: {
    //fontFamily: Font,
    fontWeight: "400",
    fontSize: 16,
    color: Col.Grey,
  },
  bodyBold: {
    //fontFamily: Font,
    fontWeight: "700",
    fontSize: 16,
    color: Col.Dark,
  },
  body2: {
    //fontFamily: Font,
    fontWeight: "400",
    fontSize: 14,
    color: Col.Grey,
  },
  bodyBold2: {
    //fontFamily: Font,
    fontWeight: "700",
    fontSize: 16,
    color: Col.Dark,
  },
  cap: {
    //fontFamily: Font,
    fontWeight: "400",
    fontSize: 12,
    color: Col.Dark,
  },
});
export default Text;
