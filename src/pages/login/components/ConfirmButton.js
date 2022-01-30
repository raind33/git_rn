import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default memo(function ConfirmButton(props) {
  const { title, onClick } = props
  return (
    <TouchableOpacity style={styles.confirmLayout} onPress={onClick}>
      <Text style={styles.confirmTitle}>{title}</Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  confirmLayout: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 5
  },
  confirmTitle: {
    fontSize: 20,
    color: 'white'
  }
})
