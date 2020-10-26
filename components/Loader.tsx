import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
    children: React.ReactNode
    loading: boolean
}

export default function Loader (props: Props) {

    return (
        <>
        <View>
            {props.loading ? <ActivityIndicator style={styles.container}  size="small" color="#0000ff" />: null}
            
        </View>
        {props.children}
        </>
    )
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
