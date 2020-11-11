import React, { FC, useEffect, useRef } from "react";
import { View, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { Circle, Defs, G, LinearGradient, Stop } from "react-native-svg";
import { Col } from "./Config";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const colors =  {
  1: '#fa0000',
  2: '#dd4606',
  3: '#df6d04',
  4: '#dfa004',
  5: '#d0ce0b',
  6: '#c0d00b',
  7: '#79a517',
  8: '#5fa517',
  9: '#1da517',
  10: '#2ee526',
}

interface Props {
  percentage?: number;
  radius?: number;
  stroke?: number;
  duration?: number;
  delay?: number;
  max?: number;
  textColor?: string;
  showText?: boolean;
  background?: string;
}

const HealthCircle: FC<Props> = ({
  percentage = 0,
  radius = 22,
  stroke = 8,
  duration = 1500,
  delay = 0,
  max = 100,
  textColor = "black",
  showText = false,
  background = "#0001",
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const textRef = useRef();
  const halfCircle = radius + stroke;
  const circleCirc = 2 * Math.PI * radius;
  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  useEffect(() => {
    animation(percentage);
    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashoffset =
          circleCirc - (circleCirc * maxPercentage) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (textRef?.current) {
        textRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
    return () => animatedValue.removeAllListeners();
  }, [percentage]);
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <Defs>
          <LinearGradient id="linear" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors['10']} />
            <Stop offset="1" stopColor={percentage < 10 ? '#fa0000' : percentage === 100 ? '#2ee526' : colors[String(percentage)[0]]} />
          </LinearGradient>
        </Defs>
        <G rotation="90" origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={background}
            strokeWidth={stroke - 2}
            r={radius}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke="url(#linear)"
            strokeWidth={stroke}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCirc}
            strokeDashoffset={circleCirc}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {showText ? (
        <AnimatedInput
          ref={textRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: radius * 2,
              fontSize: radius / 1.5,
              color: textColor,
              textAlign: "center",
            },
          ]}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default HealthCircle;
/*
  let color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["#ADEA4F", "#EB665E"],
    extrapolate: "clamp",
  });
*/
