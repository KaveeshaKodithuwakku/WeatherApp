import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './utils/MyStack';

export default function App() {
  return (
    <NavigationContainer>
    <MyStack/>
</NavigationContainer>
  )
}