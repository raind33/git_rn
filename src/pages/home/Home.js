import React, { memo, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector, useDispatch } from 'react-redux'
import { onLoadMorePopular, onRefreshPopular } from '../../store/actions'
import PopularItem from '../../components/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../../components/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'

const URL = 'https://api.github.com/search/repositories?q='
const Tab = createMaterialTopTabNavigator()
const QUERY_STR = '&sort=stars'
const pageSize = 10
function TabContent(props) {
  const name = props.route.name
  const dispatch = useDispatch()
  const toast = useRef(null)
  const url = URL + name + QUERY_STR
  let data = useSelector(state => {
    return state.popular?.[name]
  })
  if (!data) {
    data = {
      items: [],
      isLoading: false,
      projectModels: [], //要显示的数据
      hideLoadingMore: true //默认隐藏加载更多
    }
  }
  const renderItem = source => {
    return <PopularItem index={source.index} item={source.item} />
  }
  const genIndicator = () => {
    return data.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  const loadData = flag => {
    if (flag) {
      dispatch(
        onLoadMorePopular(name, ++data.pageIndex, pageSize, data.items, () => {
          toast.current.show('没有更多了')
        })
      )
    } else {
      dispatch(onRefreshPopular(name, url, pageSize))
    }
  }
  useEffect(() => {
    dispatch(onRefreshPopular(name, url, pageSize))
    console.log(name)
  }, [dispatch, url, name])
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => '' + item.id}
        data={data.projectModels}
        renderItem={renderItem}
        ListFooterComponent={genIndicator()}
        onEndReached={() => {
          loadData(true)
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            titleColor={'red'}
            onRefresh={loadData}
            tintColor={'red'}
            colors={['red']}
            refreshing={data.isLoading}
            title="loading"
          />
        }
      />
      <Toast ref={toast} position={'center'} />
    </View>
  )
}
export default memo(function Home() {
  let statusBar = {
    backgroundColor: 'red',
    barStyle: 'light-content'
  }
  const renderRightButton = () => {
    return (
      <TouchableOpacity>
        <View style={{ padding: 5, marginRight: 8 }}>
          <Ionicons
            name={'ios-search'}
            size={24}
            style={{
              marginRight: 8,
              alignSelf: 'center',
              color: 'white'
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  let navigationBar = (
    <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{ backgroundColor: 'gray' }}
      rightButton={renderRightButton()}
    />
  )
  return (
    <View style={{ flex: 1 }}>
      {navigationBar}
      <Tab.Navigator>
        <Tab.Screen name="java" component={TabContent} />
        <Tab.Screen name="ios" component={TabContent} />
        <Tab.Screen name="android" component={TabContent} />
      </Tab.Navigator>
    </View>
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
