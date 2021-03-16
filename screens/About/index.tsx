import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Col } from '../../components/Config';
import SvgMaker from '../../components/SvgMaker';
import Typography from '../../components/custom/Typography';
import { APP_VERSION } from '../../constants';

function About(params) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <SvgMaker name='eatBeatLogo' />
                </View>
                <View style={styles.version}>
                    <Typography type='cap' style={{color: Col.White}}>
                            {`version ${APP_VERSION}`}
                    </Typography>
                </View>
                
            </View>
            <View style={styles.aboutAppContainer}>
                <View style={styles.itemContainer}>
                    <Typography type='bodyBold' style={{paddingBottom: 4}}>
                        Visit our site
                    </Typography>
                    <Typography >
                        site link
                    </Typography>
                </View>
                <View style={styles.itemContainer}>
                    <Typography type='bodyBold' style={{paddingBottom: 16}}>
                        About Eat Beat
                    </Typography>
                    <Typography>
                        Info about
                    </Typography>
                </View>
            </View>
        </View>
        
    )
}

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
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
    }
})