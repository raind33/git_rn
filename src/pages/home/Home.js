import React, { memo, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector, useDispatch } from 'react-redux'
import { onLoadMorePopular, onRefreshPopular } from '../../store/actions'
import PopularItem from '../../components/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../../components/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import { tabs } from '../../config/constants'
import { tabNav } from '../../components/NavigationDelegate'
import NavigationUtil from '../../utils/NavigationUtils'
import FavoriteDao from '../../utils/FavoriteUtil'
import { FLAG_STORAGE } from '../../utils/DataStore'
import EventTypes from '../../utils/EventTypes'
import { onFlushPopularFavorite } from '../../store/actions/popular'
import { FLAG_LANGUAGE } from '../../utils/LanguageUtil'
import { onLoadLanguage } from '@/store/actions'

const URL = 'https://api.github.com/search/repositories?q='
const Tab = createMaterialTopTabNavigator()
const QUERY_STR = '&sort=stars'
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
const pageSize = 10
let favoriteChanged = false
function TabContent(props) {
  const name = props.tabLabel
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
  const onFavorite = (item, isFavorite) => {
    const key = item.id.toString()
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
    } else {
      favoriteDao.removeFavoriteItem(key)
    }
  }
  const renderItem = source => {
    return (
      <PopularItem
        itemClick={callback => {
          NavigationUtil.goPage(
            {
              projectModel: source.item,
              navigation: props.navigation,
              callback
            },
            'detail'
          )
        }}
        onFavorite={onFavorite}
        index={source.index}
        projectModel={source.item}
      />
    )
  }
  const genIndicator = () => {
    return data.hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  const loadData = (flag, refreshFavorite) => {
    if (flag) {
      dispatch(
        onLoadMorePopular(
          name,
          ++data.pageIndex,
          pageSize,
          data.items,
          favoriteDao,
          () => {
            toast.current.show('没有更多了')
          }
        )
      )
    } else if (refreshFavorite) {
      dispatch(
        onFlushPopularFavorite(
          name,
          data.pageIndex,
          pageSize,
          data.items,
          favoriteDao
        )
      )
    } else {
      dispatch(onRefreshPopular(name, url, pageSize, favoriteDao))
    }
  }
  useEffect(() => {
    DeviceEventEmitter.addListener(
      EventTypes.favorite_changed_popular,
      data => {
        favoriteChanged = true
      }
    )
    DeviceEventEmitter.addListener(EventTypes.bottom_tab_select, data => {
      if (data.to === 0 && favoriteChanged) {
        loadData(null, true)
      }
    })

    dispatch(onRefreshPopular(name, url, pageSize, favoriteDao))
    console.log(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, url, name])
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => {
          return '' + item.item.id
        }}
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
  const dispatch = useDispatch()
  let data = useSelector(state => {
    return state.language.keys
  })
  let statusBar = {
    backgroundColor: 'red',
    barStyle: 'light-content'
  }
  useEffect(() => {
    dispatch(onLoadLanguage(FLAG_LANGUAGE.flag_key))
  }, [dispatch])
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
      style={{ backgroundColor: '#2196f3' }}
      rightButton={renderRightButton()}
    />
  )
  const TabNavigator = data.length
    ? tabNav({
        Component: TabContent,
        theme: { themeColor: '#2196f3' },
        tabs: data
      })
    : null
  return (
    <View style={{ flex: 1 }}>
      {navigationBar}
      {TabNavigator}
      {/* <Tab.Navigator>
        <Tab.Screen name="java" component={TabContent} />
        <Tab.Screen name="ios" component={TabContent} />
        <Tab.Screen name="android" component={TabContent} />
      </Tab.Navigator> */}
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
