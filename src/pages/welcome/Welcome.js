import React, { memo, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NavigationUtils from '../../utils/NavigationUtils'
export default memo(function Welcome(props) {
  const timer = useRef(null)
  useEffect(() => {
    timer.current = setTimeout(() => {
      NavigationUtils.goHome(props)
    }, 2000)
    return () => clearTimeout(timer.current)
  }, [props])
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
