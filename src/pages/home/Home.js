import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()
function Tab1() {
  return (
    <View>
      <Text>tab1</Text>
    </View>
  )
}
function Tab2() {
  return (
    <View>
      <Text>tab2</Text>
    </View>
  )
}
export default memo(function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="tab1" component={Tab1} />
      <Tab.Screen name="tab2" component={Tab2} />
    </Tab.Navigator>
  )
})
