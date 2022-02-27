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
import Login from './src/pages/login/Login'
import Main from './src/pages/main/Main.js'
import { Provider } from 'react-redux'
import store from './src/store'
import DetailPage from './src/pages/detail/Detail.js'
import Webview from './src/pages/webview/Webview.js'

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{
              title: '欢迎页'
            }}
          />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="detail" component={DetailPage} />
          <Stack.Screen name="WebViewPage" component={Webview} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
