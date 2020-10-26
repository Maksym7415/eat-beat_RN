import React, { FC, useState, useEffect } from "react";
import { StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Text } from "react-native";
import axios from 'axios';
import { NavProps } from "../../components/interfaces";
import Chart from '../../components/Chart';
import { getDate } from '../../utils/date'
import { Value } from "react-native-reanimated";

interface HealthScore {
  date: string
  healthScore: number
}

interface Data {
  dates: Array<string>
  scores: Array<number>
}

interface Offset {
  count: number
  offset: number
}

const HistoryScreen: FC<NavProps> = ({ navigation }) => {

  const [data, setData] = useState<Data>({dates: [], scores: []})
  const [offset, setOffset] = useState<Offset>({count: 0, offset: 0})

  const getHealthsScore = async () => {
    try {
      const { data: { data } } = await axios(`/meals/healthscore-history?offset=${offset.offset}`)
      const dates:  Array<string> = []
      const scores: Array<number> = []
      data.forEach((el: HealthScore) => {
        const dateObject = getDate(new Date(el.date))
        dates.push(`${dateObject.day}-${dateObject.month}`)
        scores.push(el.healthScore)
      })
      setData((value) => ({...value, dates, scores}))
    } catch (error) {
      console.log({ error })
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    //console.log(event.nativeEvent.contentOffset.x)
    // console.log(count)
    if(event.nativeEvent.contentOffset.x  > offset.count + 650) {

      setOffset((value) => ({...value, count: event.nativeEvent.contentOffset.x, offset: value.offset+15}));
      getHealthsScore()
    }
  }

useEffect(() => {
  getHealthsScore()
}, [])

  return (   
    <>
     <Text style={{alignSelf: 'center', marginBottom: 8}}>Your health score</Text>
   <ScrollView
      horizontal={true}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      >
    <Chart data={data} />
  </ScrollView>
  </>
  )
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HistoryScreen;
