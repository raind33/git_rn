import React, { Component, memo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'
import { useSelector } from 'react-redux'
export default memo(function TrendingItem({
  projectModel,
  itemClick,
  onFavorite
}) {
  const [favorite, setFavorite] = useState(projectModel.isFavorite)
  const theme = useSelector(state => {
    return state.theme.theme
  })
  const onPressFavorite = () => {
    setFavorite(!favorite)
    onFavorite(projectModel.item, !favorite)
  }
  const item = projectModel.item
  let favoriteButton = (
    <TouchableOpacity
      style={{ padding: 6 }}
      onPress={onPressFavorite}
      underlayColor={'transparent'}>
      <FontAwesome
        name={favorite ? 'star' : 'star-o'}
        size={26}
        style={{ color: theme.themeColor }}
      />
    </TouchableOpacity>
  )
  let description = '<p>' + item.description + '</p>'
  return (
    <TouchableOpacity
      onPress={() => {
        itemClick(isFavorite => {
          setFavorite(isFavorite)
        })
      }}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <HTMLView
          value={description}
          onLinkPress={url => {}}
          stylesheet={{
            p: styles.description,
            a: styles.description
          }}
        />
        <Text style={styles.description}>{item.meta}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Built by: </Text>
            {item.contributors.map((result, i, arr) => {
              return (
                <Image
                  key={i}
                  style={{ height: 22, width: 22, margin: 2 }}
                  source={{ uri: arr[i] }}
                />
              )
            })}
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  )
})
const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
})
