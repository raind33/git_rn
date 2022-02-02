import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StyleSheet } from 'react-native'
const Tab = createMaterialTopTabNavigator()

export function tabNav({ Component, tabs, theme, extra = ({} = {}) }) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarItemStyle: styles.tabStyle,
        tabBarScrollEnabled: true, //是否支持 选项卡滚动，默认false
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: theme.themeColor //TabBar的背景色
        },
        tabBarIndicatorStyle: styles.indicatorStyle, //标签指示器样式
        tabBarLabelStyle: styles.labelStyle //文本的样式
      }}>
      {Object.entries(_genTabs({ Component, tabs, theme, extra })).map(item => {
        return (
          <Tab.Screen
            key={item[0]}
            name={item[0]}
            component={item[1].screen}
            options={item[1].navigationOptions}
          />
        )
      })}
    </Tab.Navigator>
  )
}

function _genTabs({ Component, tabs, theme, extra = ({} = {}) }) {
  const tabsObj = {}
  tabs.forEach((item, index) => {
    if (item.checked) {
      tabsObj[`tab${index}`] = {
        //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
        screen: props => (
          <Component {...props} {...extra} tabLabel={item.name} theme={theme} />
        ),
        navigationOptions: {
          title: item.name
        }
      }
    }
  })
  return tabsObj
}
const styles = StyleSheet.create({
  tabStyle: {
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    textTransform: 'none', //取消大小写
    fontSize: 13,
    margin: 0
  }
})
