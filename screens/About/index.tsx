import React, { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { Col } from '../../components/Config';
import SvgMaker from '../../components/SvgMaker';
import Typography from '../../components/custom/Typography';
import Constants from 'expo-constants';
import Version from '../../components/Version';

function About(params) {
    const [aboutInfo, setAboutInfo] = useState({})

    const siteLink = () => {
        Linking.openURL(aboutInfo.link)
    } 

    useEffect(() => {
        (async () => {
                const data = await AsyncStorage.getItem('@doc');
                const parseData =JSON.parse(data)
                setAboutInfo({link: parseData.link, about: parseData.aboutApp})
        })()
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <SvgMaker name='eatBeatLogo' />
                    </View>
                    <Version style={styles.version} />
                    {/*<View style={styles.version}>*/}
                    {/*    <Typography type='cap' style={{color: Col.White}}>*/}
                    {/*            {`version ${Constants.nativeAppVersion}-${Constants.nativeBuildVersion}`}*/}
                    {/*    </Typography>*/}
                    {/*</View>*/}

                </View>
                <View style={styles.aboutAppContainer}>
                    <View style={styles.itemContainer}>
                        <Typography type='bodyBold' style={{paddingBottom: 4}}>
                            Visit our site
                        </Typography>
                        <Typography onPress={siteLink} style={styles.link}>
                            {aboutInfo.link}
                        </Typography>
                    </View>
                    <View style={styles.itemContainer}>
                        <Typography type='bodyBold' style={{paddingBottom: 16}}>
                            About Eat Beat
                        </Typography>
                        <Typography>
                            {aboutInfo.about}
                        </Typography>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    header: {
        paddingTop: 26,
        paddingLeft: 8,
        backgroundColor: Col.Main,
    },
    logoContainer: {
        alignItems: 'center',
    },
    version: {
        paddingTop: 44,
        paddingBottom: 8
    },
    aboutAppContainer: {
        paddingHorizontal: 32
    },
    itemContainer: {
        paddingTop: 32,
    },
    link: {
        textDecorationLine: 'underline',
    }
})
