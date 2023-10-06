import { StyleSheet, View, FlatList, SafeAreaView, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  Card, Text } from 'react-native-paper';
import { PermissionsAndroid } from 'react-native';
import sunDownIc from "../../assets/images/sunDown.png"
import Geolocation from '@react-native-community/geolocation'
import axios from "axios";
import dateFormat, { masks } from "dateformat";


export default function HourlyWeather() {

  const [hourlyData, setHourlyData] = useState({});
  const [list, setList] = useState([]);
  masks.hammerTime = 'HH:MM';
  const ApiKey = "5a3742458d715f5f626ce21f41be4317";

  const now = new Date();

  useEffect(() => {
    requestCameraPermission();
  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Weather App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = async () => {

    await Geolocation.getCurrentPosition(
      position => {
        var { latitude, longitude } = position.coords;

        console.log("hourly coordinate" + latitude + "-" + longitude);
        getAllData(latitude, longitude);

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  };

  const getAllData = async (lati, longi) => {

    try {
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${longi}&appid=${ApiKey}`)
        .then((response) => {
          setHourlyData(response.data);
          setList(response.data.list);
        })
        .catch(err => {
          console.error(err);
        })
    } catch {

    }

  }

  const listItems = list.weather?.map(
    (element, id) => {
      return (
        <Text key={id} style={{ color: 'white', textTransform: 'uppercase', fontSize: 20 }}>{element.description}</Text>
      )
    }
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={hourlyData.list}
        horizontal={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>


          <Card style={styles.cardContainer} >

            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', margin: 20, marginLeft: 40, justifyContent: 'center' }}>

                <Card.Content style={{ flex: 1 }}>

                  <Text variant="bodyMedium" style={styles.tempText}>{Math.round((item.main.temp - 32) * 5 / 9)} °C</Text>
                  <Text style={{ color: 'lightgray', textTransform: 'uppercase', fontSize: 10, marginLeft: 10 }}>Scattered  Clouds</Text>
                  {listItems}
                  <ImageBackground source={sunDownIc} resizeMode="cover" style={styles.windIcon}>
                  </ImageBackground>
                  <Text variant="bodyMedium" style={styles.windText}>{dateFormat(item.dt_txt)}</Text>

                </Card.Content>
              </View>
            </View>
          </Card>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  windIcon: {
    width: 70,
    height: 50,
    margin: 10,
    marginLeft: '35%',
  },
  windText: {
    fontSize: 11,
    color: "black",
    fontWeight: 'bold'
  },
  tempText: {
    fontSize: 11,
    color: "black",
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  cardContainer: {
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'space-between',
  }
})