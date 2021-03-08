import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SvgMaker from '../../components/SvgMaker';

const getDeltasCoord = (latitude, longitude) => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const northeastLat = parseFloat(latitude);
    const southwestLat = parseFloat(latitude);
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;
    return {
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
    }
}

const l = {
    "latitude": 37.422038262546096,
    "longitude": -122.08392491564155,
}

function RestaurantMap() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
        setLocation({ ...location.coords, ...getDeltasCoord(location.coords.latitude, location.coords.longitude) });
    }

    const getUserCoordinates = () => getLocation()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            getLocation();
        })();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.myLocation} onPress={getUserCoordinates}>
                <SvgMaker name='myLocation' />
            </TouchableOpacity>
            {location &&
                <MapView
                    style={styles.map}
                    initialRegion={location}
                    onRegionChange={(reg) => console.log(reg)}
                    region={location}
                >
                    <Marker
                        coordinate={l}
                        title={'Test Marker'}
                        description={'fdsfdsfsdfdsjhfsdhkjfsdjhfsjhk'}
                    />
                </MapView>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    myLocation: {
        width: 42,
        height: 42,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
    }
});

export default RestaurantMap;