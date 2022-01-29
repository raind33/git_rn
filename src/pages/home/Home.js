import React, { memo, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector, useDispatch } from 'react-redux'
import { onRefreshPopular } from '../../store/actions'
import PopularItem from '../../components/PopularItem'

const URL = 'https://api.github.com/search/repositories?q='
const Tab = createMaterialTopTabNavigator()
const QUERY_STR = '&sort=stars'
function Tab1() {
  const dispatch = useDispatch()
  const url = URL + 'ios' + QUERY_STR
  let data = useSelector(state => {
    return state.popular?.ios
  })
  if (!data) {
    data = {
      items: [],
      isLoading: false,
      projectModels: [], //要显示的数据
      hideLoadingMore: true //默认隐藏加载更多
    }
  }
  const renderItem = data => {
    return <PopularItem item={data.item} />
  }
  const refreshData = () => {
    dispatch(onRefreshPopular('ios', url, 20))
  }
  useEffect(() => {
    dispatch(onRefreshPopular('ios', url, 20))
  }, [dispatch, url])
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => '' + item.id}
        data={data.items}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            titleColor={'red'}
            onRefresh={refreshData}
            tintColor={'red'}
            colors={['red']}
            refreshing={data.isLoading}
            title="loading"
          />
        }
      />
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
      <Tab.Screen name="java" component={Tab1} />
      <Tab.Screen name="ios" component={Tab2} />
      <Tab.Screen name="android" component={Tab2} />
    </Tab.Navigator>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  }
})
