import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SvgMaker from '../../components/SvgMaker';
import CustomMarker from './components/CustomMarker';
import RestaurantViewLayout from './components/RestaurantViewLayout';
import { GOOGLE_MAP_API_KEY } from '../../constants';
import server from '../../server';

const getDeltasCoord = (latitude, longitude) => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const northeastLat = parseFloat(latitude);
    const southwestLat = parseFloat(longitude);
    const latDelta = 0.0922;
    const lngDelta = latDelta * ASPECT_RATIO;
    return {
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
        lat: latitude,
        lng: longitude
    }
}

const l = {
    "latitude": 37.422038262546096,
    "longitude": -122.08392491564155,
}

const tallin = {
    latitude: 59.43696,
    longitude: 24.75353,
}

const tallinsRestaurants = [
    {
        id: 1,
        title: 'Restaraunts 1',
        address: 'Street 1',
        description: 'Lorem ipsum. It is test descr1',
        isPartner: true,
        menu: false,
        latitude: 59.434612,
        longitude: 24.750832,
    },
    {
        id: 2,
        title: 'Restaraunts 2',
        address: 'Street 2',
        description: 'Lorem ipsum. It is test descr2',
        isPartner: false,
        menu: false,
        latitude: 59.438543,
        longitude: 24.751005,
    },
    {
        id: 3,
        title: 'Restaraunts 3',
        address: 'Street 3',
        description: 'Lorem ipsum. It is test descr3',
        isPartner: false,
        menu: true,
        latitude: 59.438239,
        longitude: 24.755549,
    }
]


function RestaurantMap({ navigation }) {
    const [location, setLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([])
    const [errorMsg, setErrorMsg] = useState(null);
    const [restData, setRestData] = useState({});
    const [open, setOpen] = useState(false)

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
        setLocation((loc) => ({...loc, coordinates: getDeltasCoord(location.coords.latitude, location.coords.longitude)}));
    }

    const getUserCoordinates = () => getLocation();



    const getDistance = async (originCoords, destinationCoords) => {
        const data = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&mode=driver&sensor=true&key=${GOOGLE_MAP_API_KEY}`);
        const result = await data.json();
        console.log(result.routes[0].legs[0].distance.text)
        return result.routes[0].legs[0].distance.text;
}

    const setDataRestaraunt =  async (_, id, address, description, title, isPartner, coords) => {
        if(!title) {
            return;
        }
        setRestData({id, address, description: description || 'test description', title, isPartner, distance: await getDistance(tallin, coords)});
        setOpen(true);
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            getLocation();
        })();
        const _unsubscribe = navigation.addListener(
            'blur',
            (_) => {
              setOpen(false)
            }
          );
        return () => {
            _unsubscribe();
        }
    }, []);

    useEffect(() => {
        async function restaurants() {
            const result = await server.getRestaurants();
            if(result.ok) {
                setRestaurants(result.data)
            }
        }
        restaurants()
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.myLocation} onPress={getUserCoordinates}>
                <SvgMaker name='myLocation' />
            </TouchableOpacity>
            {location &&
                <MapView
                    style={styles.map}
                    initialRegion={{...tallin, ...getDeltasCoord(tallin.latitude, tallin.longitude)}}
                    //onRegionChange={(reg) => console.log(reg)}
                    //region={{...location, ...getDeltasCoord(tallin.latitude, tallin.longitude)}}
                >
                   {location && [...restaurants, location].map((rest, key) =>  
                    <Marker key={key} onPress={(coords) => setDataRestaraunt(coords, rest.id, rest.address, rest.description, rest.name, rest.isPartner, {latitude: rest.coordinates.lat, longitude: rest.coordinates.lng})} key={key} coordinate={{ latitude : rest.coordinates.lat , longitude : rest.coordinates.lng }}>
                        <CustomMarker {...rest}/>
                    </Marker>
                    )}
                </MapView>}
                {open && <RestaurantViewLayout setOpen={setOpen} {...restData} navigation={navigation}/>}
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