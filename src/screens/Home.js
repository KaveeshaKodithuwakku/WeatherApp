import { StyleSheet, Text, View ,SafeAreaView, ImageBackground, StatusBar,Alert,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import morning from "../../assets/images/morning.jpg"
import night from "../../assets/images/night.jpg"
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import Icon from 'react-native-vector-icons/Entypo';
import dateFormat, { masks } from "dateformat";
import CurrentWeather from '../components/CurrentWeather';
import HourlyWeather from '../components/HourlyWeather';

export default function Home() {


  const [background, setBackground] = useState(morning);
  const [weatherData, setWeatherData] = useState({});
  const [weather, setWeather] = useState([]);
  const [main, setMain] = useState({});
  const [wind, setWind] = useState({});
   const [lati, setLati] = useState('');
   const [longi, setLongi] = useState('');
  const currTime = new Date().toLocaleTimeString();
  const now = new Date();
  const today = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  const ApiKey = "5a3742458d715f5f626ce21f41be4317";

  let x =1;

  useEffect(() => {
    findTime();
  }, [currTime])

  useEffect(() => {
    requestLocationPermission();
  }, [])


  const findTime = () => {
    const hrs = new Date().getHours();
    if (hrs === 6 || hrs < 18) {
      return setBackground(morning);
    }
    else {
      return setBackground(night);
    }
  }

  const requestLocationPermission = async () => {
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

    console.log("2222")
    // getWeatherData(0, 0);
    await Geolocation.getCurrentPosition(
      position => {
        var { latitude, longitude } = position.coords;

        console.log("coordinates" + latitude + "-" + longitude);
        getWeatherData(latitude, longitude);
        setLati(latitude);
        setLongi(longitude);

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout:20000, maximumAge: 2000 }
    );

  };

  const getWeatherData = async (lati, longi) => {
   
   // await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=5.93422059&lon=80.60411634&units=metric&appid=5a3742458d715f5f626ce21f41be4317`)
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=${ApiKey}`)
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
        setWeather(response.data.weather);
        setMain(response.data.main);
        setWind(response.data.wind);

      })
      .catch(err => {
        console.error(err);
      })
  }

 
  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
        <SafeAreaView>

<StatusBar
  animated={true}
  backgroundColor="#00134d"
/>


<View style={styles.container}>

  <View style={styles.locationContainer}>
  <Icon name='location-pin' color='white' size={30}/>
  <Text style={styles.locationText} variant="displayMedium">{weatherData.name}</Text> 
   </View> 

   <Text style={styles.dateText} variant="displayMedium">{today}</Text> 
    
   <View style={styles.tempContainer}>
  <Text style={styles.tempText} variant="displayMedium">{main.temp} °C</Text> 
  {/* <Text style={styles.tempText} variant="displayMedium">{weather[0].icon} °C</Text>  */}
  <View>
          {
            weather.length === 0 ? <Image
            source={{ uri: `https://openweathermap.org/img/wn/01d@2x.png` }}
            style={styles.weatherIcon}
          /> 
            :  <Image
            source={{ uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` }}
            style={styles.weatherIcon}
          />
          }
        </View>
  {/* <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png` }}
        style={styles.weatherIcon}
      /> */}
   </View> 


   <View >
          {
            weather.length == 0 ?  <Text style={styles.descText} variant="displayMedium">empty</Text> 
             :
             <Text style={styles.descText} variant="displayMedium">{weather[0].description}</Text> 
          }
        </View>
   {/* <Text style={styles.descText} variant="displayMedium">{weather[0].description}</Text>  */}
  
   <CurrentWeather main={main} wind={wind} />

<HourlyWeather />
 

</View>
</SafeAreaView>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  locationContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
  },
  locationText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    marginLeft:40,
  },
  dateText:{
    flexDirection:'row',
    justifyContent:'center',
    fontSize:12,
    color:'white',
    marginTop:5,
  },
  tempContainer:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  tempText:{
    color:'white',
    fontSize:40,
    fontWeight:'bold',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  descText:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
  },
})