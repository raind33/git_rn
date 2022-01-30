import React, { memo } from 'react'
import { StyleSheet, View, Text, Button, Linking } from 'react-native'

export default memo(function Tips(props) {
  const { msg, helpUrl } = props
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tips}>{msg}</Text>
      {!!helpUrl && (
        <Button
          title="查看帮助"
          onPress={() => {
            Linking.openURL(helpUrl)
          }}
        />
      )}
    </View>
  )
})
const styles = StyleSheet.create({
  tipsLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tips: {
    fontSize: 14,
    color: 'red'
  }
})
