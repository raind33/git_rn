import React, { memo, useRef } from 'react'
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabBar
} from '@react-navigation/bottom-tabs'
import Home from '../home/Home'
import Trend from '../trend/Trend'
import My from '../my/My'
import Favorite from '../favorite/Favorite'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import EventTypes from '../../utils/EventTypes'

const Tab = createBottomTabNavigator()
export default memo(function Main() {
  const lastTabIndex = useRef(null)
  const fireEvent = navigationState => {
    const { index, history, routeNames } = navigationState
    let fromIndex = -1
    if (history.length === 1) {
      fromIndex = lastTabIndex.current
    } else {
      let key = history[history.length - 2].key
      for (let i = 0; i < routeNames.length; i++) {
        if (key.startsWith(routeNames[i])) {
          fromIndex = i
          break
        }
      }
    }
    DeviceEventEmitter.emit(EventTypes.bottom_tab_select, {
      //发送底部tab切换的事件
      from: fromIndex,
      to: index
    })
    //记录上一次的位置
    lastTabIndex.current = index
  }
  return (
    <Tab.Navigator
      tabBar={props => {
        fireEvent(props.state)
        return <BottomTabBar {...props} />
      }}>
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
          },
          headerShown: false
        }}
        name="trend"
        component={Trend}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return <Icon size={26} color={color} name="favorite" />
          },
          headerShown: false
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
