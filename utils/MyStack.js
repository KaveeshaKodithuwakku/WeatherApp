import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/screens/Home';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerTransparent: true
      }}>
        {/* <Stack.Screen options={{ headerShown: false }} name="splash" component={SplashScreen} /> */}
  
        <Stack.Screen name="Home" component={Home} options={{
          title: null,
  
          // headerRight: () => (
          //     <View style={{ flexDirection: 'row' }} >
          //         <Image
          //             style={{ width: 50, height: 50, marginRight: 10 }}
          //             source={require("../../assets/images/search.png")}
          //         />
          //     </View>
          // )
        }} />
  
      </Stack.Navigator>
  )
}

export default MyStack