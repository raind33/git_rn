import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../home/Home'
import Trend from '../trend/Trend'
import My from '../my/My'
import Favorite from '../favorite/Favorite'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const Tab = createBottomTabNavigator()
export default memo(function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon size={26} color={color} name="whatshot" />
          },
          headerShown: false
        }}
        name="hot"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon size={26} color={color} name="trending-up" />
          }
        }}
        name="trend"
        component={Trend}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon size={26} color={color} name="favorite" />
          }
        }}
        name="favorite"
        component={Favorite}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <EntypoIcon size={26} color={color} name="user" />
          }
        }}
        name="my"
        component={My}
      />
    </Tab.Navigator>
  )
})
