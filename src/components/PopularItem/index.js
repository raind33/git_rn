import React, { Component, memo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
// import BaseItem from './BaseItem'

export default memo(function Index({
  projectModel,
  index,
  itemClick,
  onFavorite
}) {
  const [favorite, setFavorite] = useState(projectModel.isFavorite)
  const onPressFavorite = () => {
    setFavorite(!favorite)
    onFavorite(projectModel.item, !favorite)
  }
  const theme = useSelector(state => {
    return state.theme.theme
  })
  const _favoriteIcon = () => {
    return (
      <TouchableOpacity
        onPress={onPressFavorite}
        style={{ padding: 6 }}
        underlayColor="transparent">
        <FontAwesome
          name={favorite ? 'star' : 'star-o'}
          size={26}
          style={{ color: theme.themeColor }}
        />
      </TouchableOpacity>
    )
  }
  if (!projectModel.item || !projectModel.item.owner) {
    return null
  }
  return (
    <TouchableOpacity
      onPress={() => {
        itemClick(isFavorite => {
          setFavorite(isFavorite)
        })
      }}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>{projectModel.item.full_name}</Text>
        <Text style={styles.description}>{projectModel.item.description}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Author:</Text>
            <Image
              style={{ height: 22, width: 22 }}
              source={{ uri: projectModel.item.owner.avatar_url }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Start:</Text>
            <Text>{projectModel.item.stargazers_count}</Text>
          </View>
          {_favoriteIcon()}
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
