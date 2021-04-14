import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  View,
  ViewStyle,
  Text,
  StyleSheet,
  TextStyle,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import * as d3shape from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";
import Svg, { Path, Defs, LinearGradient, Stop, Marker, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const Charts: FC<ChartProps> = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState(true);
  const [scales, setScales] = useState<string[]>([]);
  useEffect(() => {
    const dates: string[] = Object.keys(data);
    if (dates.length > 1) {
      setScales(dates);
      setLoading(false);
    }
  }, [data]);
  const scaleTimeDimension = scales.length
    ? scales.map((el: string) => {
        const arr = el?.split("-").map((el) => Number(el));
        return new Date(arr[0], arr[1], arr[2]);
      })
    : [];
  const chartData = scales.map((val, idx) => ({ x: scaleTimeDimension[idx], y: Number(data[val]), name: val }));
  return loading ? <View /> : <ChartPath sT={scaleTimeDimension} {...{ ...props, data: chartData }} />;
};

const ChartPath: FC<PathProps> = ({
  data = [],
  sT,
  height = 300,
  yRange = [0, 100],
  yGap = 4,
  xGap = 100,
  containerStyle,
  paddingVertical = 0,
  lineColor = "#367be2",
  lineWidth = 2,
  markerColor = "#005fff",
  markerSize = 8,
  gradient = ["#CDE3F8", "#eef6fd", "#FEFFFF"],
  gradientStops = [0, 0.8, 1],
  xLabelColor = "#367be2",
  yLabelColor = "#367be2",
  xLabelStyle,
  yLabelStyle,
  scaleDates = true,
  onReachEnd = () => null,
}) => {
  const chartWidth = data.length * xGap - xGap;
  const xRef = useRef(null);
  const scaleX = scaleLinear()
    .domain([0, sT.length - 1])
    .range([0, chartWidth]);

  const scaleXDates = scaleTime()
    .domain([sT[0], sT[sT.length - 1]])
    .range([0, chartWidth]);

  const scaleY = scaleLinear().domain([0, yRange[1]]).range([height, 0]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // @ts-ignore
    xRef.current?.setNativeProps({ left: -(e.nativeEvent.contentOffset.x - 48) });
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    if (contentOffset.x === contentSize.width - layoutMeasurement.width) onReachEnd(contentSize.width);
  };

  const line = d3shape
    .line()
    .x(({ x }, i) => (scaleDates ? scaleXDates(x) : scaleX(i)))
    .y(({ y }) => scaleY(y))
    .curve(d3shape.curveMonotoneX)(data);

  return (
    <View style={styles.root}>
      <View style={[styles.chartContainer, { height: height + markerSize }]}>
        <LabelsY yRange={yRange} yGap={yGap} color={yLabelColor} style={yLabelStyle} paddingSize={markerSize} />
        <ScrollView
          horizontal
          style={[{ height: height + markerSize }, containerStyle]}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}>
          <View style={{ paddingVertical }}>
            <Svg {...{ width: chartWidth + markerSize, height: height + markerSize }}>
              <Defs>
                <Marker id="dot" viewBox="0 0 5 5" refX={markerSize} refY={markerSize} markerWidth={markerSize} markerHeight={markerSize}>
                  <Circle cx={markerSize} cy={markerSize} r={1} fill={markerColor} />
                </Marker>
                <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                  {gradient.map((col, idx) => (
                    <Stop key={col + idx} stopColor={col} offset={gradientStops[idx]} />
                  ))}
                </LinearGradient>
              </Defs>
              <Path x={markerSize / 2} y={markerSize / 2} d={`${line} L ${chartWidth} ${height} L 0 ${height}`} fill="url(#gradient)" />
              <Path
                x={markerSize / 2}
                y={markerSize / 2}
                d={line}
                fill="none"
                stroke={lineColor}
                strokeWidth={lineWidth}
                markerStart="url(#dot)"
                markerMid="url(#dot)"
                markerEnd="url(#dot)"
              />
            </Svg>
            <View style={{ width: chartWidth + xGap, height: 50 }} />
          </View>
        </ScrollView>
      </View>
      <View ref={xRef} style={[styles.LabelX, { width: chartWidth + xGap }]}>
        {data.map((dash, index) => (
          <Text key={index} style={[styles.LabelXText, { left: index * xGap, color: xLabelColor }, xLabelStyle]}>
            {dash?.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const LabelsY: FC<YProps> = ({ yRange, yGap, color, style, paddingSize }) => {
  const yAxis = Array(yGap + 2)
    .fill(0)
    .map((_, idx) => (yRange[1] / (yGap + 1)) * idx);

  return (
    <View style={[{ flexDirection: "row", paddingVertical: paddingSize / 2 }, style]}>
      <View style={styles.LabelY} />
      <View style={styles.dashY}>
        {yAxis.map((label) => (
          <View key={label} style={{ width: 2, height: 1, backgroundColor: color }}>
            <Text style={[styles.LabelYText, { color }]}>{label.toString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    overflow: "visible",
  },
  chartContainer: {
    minWidth: width,
    flexDirection: "row",
  },
  LabelY: {
    width: 32,
  },
  dashY: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    marginRight: 8,
  },
  LabelX: {
    marginVertical: 8,
    flexDirection: "row",
    position: "absolute",
    bottom: -10,
    left: 48,
  },
  LabelYText: {
    position: "absolute",
    left: -34,
    top: -10,
    width: 32,
    textAlign: "right",
  },
  LabelXText: {
    top: 0,
    position: "absolute",
  },
});

interface Props {
  height?: number;
  paddingVertical?: number | string;
  containerStyle?: ViewStyle;
  lineColor?: string;
  markerColor?: string;
  gradient?: string[];
  xGap?: number;
  yGap?: number;
  markerSize?: number;
  lineWidth?: number;
  yRange?: number[];
  gradientStops?: string | number[];
  xLabelColor?: string;
  yLabelColor?: string;
  xLabelStyle?: TextStyle;
  yLabelStyle?: TextStyle;
  scaleDates?: boolean;
  onReachEnd?: (val: number) => void;
}
interface ChartProps extends Props {
  data: {
    [key: string]: string | number;
  };
}
interface dataProps {
  x: string | Date | number;
  y: number;
  name: string | number;
}
interface PathProps extends Props {
  data?: dataProps[];
  sT: Date[] | [];
}
interface YProps {
  yGap: number;
  yRange: number[];
  color: string;
  style?: TextStyle;
}

export default Charts;