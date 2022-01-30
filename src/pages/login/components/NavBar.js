import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default memo(function NavBar(props) {
  const { title, righTitle, onRightClick } = props
  return (
    <View style={styles.navBar}>
      <View />
      <View style={styles.titleLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightClick}>
        <Text style={styles.button}>{righTitle}</Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44
  },
  titleLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  button: {
    color: '#007AFF',
    paddingRight: 15,
    fontSize: 16
  }
})
