import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { 
    LineChart,
  } from "react-native-chart-kit";

  interface Data {
    dates: Array<string>
    scores: Array<number>
  }

  interface Props {
    data: Data
    dataLength: number
  }

export default function Chart({ data }: Props ) {
    let xLabelValues = 0
    
    const getXLabelValues = (value: number) => {
        console.log(value)
        switch(value) {
            case 0: 
                return '0';
            case 25: 
                return '25';
            case 50: 
                return '50';
            case 75: 
                return '75';
            case 100: 
                return '100';
            default: 
                return '0';
        }
    }

    return (
        <View style={{width: data.dates.length * 95 || 900, minWidth: Dimensions.get("window").width, backgroundColor: '#DCDEDF',height: Dimensions.get("window").height/2}}>
            <LineChart
                data={{
                labels: data.dates,
                datasets: [
                    {
                    data: data.scores,
                    // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    // strokeWidth: 2 // optional
                    }
                ]
                }}
                width={95*data.dates.length || 900} // from react-native
                height={Dimensions.get("window").height/2}
                formatYLabel={(x) => {
                    xLabelValues += 25
                    return getXLabelValues(xLabelValues - 25)
                }}
                yAxisInterval={1} // optional, defaults to 1
                withHorizontalLines={false}
                withVerticalLines={false}
                onDataPointClick={({value}) => console.log(value)}
                chartConfig={{
                backgroundColor: "#DCDEDF",
                backgroundGradientFrom: "#DCDEDF",
                backgroundGradientTo: "#DCDEDF",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `#2C97EE`,
                labelColor: (opacity = 1) => `#2C97EE`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#2C97EE"
                }
                }}
                bezier
                style={{
                    paddingBottom: -8,
                marginVertical: 8,
                borderRadius: 16
                }}
            />
        </View>
    )
}
