import { StyleSheet, View, FlatList, SafeAreaView, ImageBackground, Alert,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  Card, Text } from 'react-native-paper';
import { PermissionsAndroid } from 'react-native';
import sunDownIc from "../../assets/images/sunDownIc.png"
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
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${longi}&units=metric&appid=${ApiKey}`)
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
<>
      <FlatList
        data={hourlyData.list}
        horizontal={true}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>


          <Card style={styles.cardContainer} key={item.id}>

            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', margin: 20, marginLeft: 40, justifyContent: 'center' }}>

                <Card.Content>

                  <Text variant="bodyMedium" style={styles.tempText}>{item.main.temp} °C</Text>
                  <Text style={{ color: 'lightgray', textTransform: 'uppercase',fontWeight:'bold',marginTop: 5, fontSize: 10, marginLeft: 10 }}>{item.weather[0].description}</Text>
                  {/* <ImageBackground source={sunDownIc} resizeMode="cover" style={styles.windIcon}>
                  </ImageBackground> */}
                  
                  <View>
          {
            item.weather.length === 0 ? <Image
            source={{ uri: `https://openweathermap.org/img/wn/01d@2x.png` }}
            style={styles.weatherIcon}
          /> 
            :  <Image
            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
            style={styles.weatherIcon}
          />
          }
        </View>
                  <Text variant="bodyMedium" style={styles.windText}>{dateFormat(item.dt_txt)}</Text>

                </Card.Content>
              </View>
            </View>
          </Card>
        }
      />
</>
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
    marginLeft:30,
    justifyContent:'center',
    alignItems:'center'
  },
  cardContainer: {
    borderRadius: 20,
    width:250,
    height:200,
    display: 'flex',
    justifyContent:'center',
    margin: 10,
  },
  weatherIcon: {
    width: 100,
    height: 70,
    justifyContent:'center',
    alignItems:'center'
  },
})