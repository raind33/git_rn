import React, { Component, useCallback, useEffect, useRef } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import EventBus from 'react-native-event-bus'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../action/index'
import NavigationBar from 'react-native-navbar-plus'
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import { FLAG_STORAGE } from '../expand/dao/DataStore'
import { tabNav } from '../navigator/NavigationDelegate'
import FavoriteDao from '../expand/dao/FavoriteDao'
import NavigationUtil from '../../utils/NavigationUtils'
import EventTypes from '../util/EventTypes'
import FavoriteUtil from '../../utils/FavoriteUtil'

const TABS = [
  { name: '最热', checked: true },
  { name: '趋势', checked: true }
]

export default memo(function Favorite() {
  const theme = useSelector(state => state.theme.theme)

  let statusBar = {
    backgroundColor: theme.themeColor,
    barStyle: 'light-content'
  }
  let navigationBar = (
    <NavigationBar
      title={'收藏'}
      statusBar={statusBar}
      style={{ backgroundColor: theme.themeColor }}
    />
  )
  const TabNavigator = tabNav({
    Component: FavoriteTab,
    theme,
    keys: TABS
  })
  return (
    <View style={styles.container}>
      {navigationBar}
      {TabNavigator}
    </View>
  )
})

function FavoriteTab({ tabLabel, theme }) {
  const favorite = useSelector(state => state.favorite)
  const dispatch = useDispatch()
  const listener = useRef(null)
  const toast = useRef(null)
  const storeName =
    tabLabel === '最热' ? FLAG_STORAGE.flag_popular : FLAG_STORAGE.flag_trending
  const favoriteDao = new FavoriteDao(storeName)
  const loadData = useCallback(
    isShowLoading => {
      return dispatch(actions.onLoadFavoriteData(storeName, isShowLoading))
    },
    [dispatch, storeName]
  )
  const _store = () => {
    let store = favorite[storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [] //要显示的数据
      }
    }
    return store
  }
  const onFavorite = (item, isFavorite) => {
    const key =
      storeName === FLAG_STORAGE.flag_trending
        ? item.fullName
        : item.id.toString()
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
    } else {
      favoriteDao.removeFavoriteItem(key)
    }
    // FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, storeName)
    if (storeName === FLAG_STORAGE.flag_popular) {
      EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular)
    } else {
      EventBus.getInstance().fireEvent(EventTypes.favoriteChanged_trending)
    }
  }
  const renderItem = data => {
    const item = data.item
    const Item =
      storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem
    return (
      <Item
        projectModel={item}
        onSelect={callback => {
          NavigationUtil.goPage(
            {
              projectModel: item,
              flag: storeName,
              callback
            },
            'detail'
          )
        }}
        onFavorite={(item, isFavorite) => onFavorite(item, isFavorite)}
      />
    )
  }
  useEffect(() => {
    loadData(true)
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (listener.current = data => {
        if (data.to === 2) {
          loadData(false)
        }
      })
    )
    return () => {
      EventBus.getInstance().removeListener(listener.current)
    }
  }, [loadData])
  let store = _store()
  return (
    <View style={styles.container}>
      <FlatList
        data={store.projectModels}
        renderItem={data => renderItem(data)}
        keyExtractor={item => '' + (item.item.id || item.item.fullName)}
        refreshControl={
          <RefreshControl
            title={'Loading'}
            titleColor={theme.themeColor}
            colors={[theme.themeColor]}
            refreshing={store.isLoading}
            onRefresh={() => loadData(true)}
            tintColor={theme.themeColor}
          />
        }
      />
      <Toast ref={toast} position={'center'} />
    </View>
  )
}

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
