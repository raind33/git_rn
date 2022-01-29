/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './src/pages/welcome/Welcome.js'
import Main from './src/pages/main/Main.js'
import { Provider } from 'react-redux'
import store from './src/store'

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{
              title: '欢迎页'
            }}
          />
          <Stack.Screen
            name="main"
            component={Main}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
