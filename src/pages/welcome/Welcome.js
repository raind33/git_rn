import React, { memo, useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { getBoarding } from '../../utils/BoardingUtil'
import NavigationUtils from '../../utils/NavigationUtils'
import { onThemeInit } from '../../store/actions/theme'
export default memo(function Welcome(props) {
  const timer = useRef(null)
  const dispatch = useDispatch()
  dispatch(onThemeInit())
  const fn = useCallback(async () => {
    const boarding = await getBoarding()
    if (boarding) {
      timer.current = setTimeout(() => {
        NavigationUtils.resetToHomePage(props)
      }, 2000)
    } else {
      NavigationUtils.login(props)
    }
  }, [props])
  useEffect(() => {
    fn()
    return () => clearTimeout(timer.current)
  }, [fn])
  return (
    <View style={styles.container}>
      <Text>welcome</Text>
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
