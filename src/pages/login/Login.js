import React, { useState } from 'react'
import { Linking, SafeAreaView, StyleSheet, View } from 'react-native'
import Input from '../../components/Input'
import NavBar from './components/NavBar'
import ConfirmButton from './components/ConfirmButton'
import Tips from './components/Tips'
import Constants from '../../config/constants'
import LoginApi from '../../api/login'

export default props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [helpUrl, setHelpUrl] = useState(
    'https://doc.devio.org/api-help/docs/rn-api-help.html'
  )
  const [msg, setMsg] = useState('ddd')
  const onLogin = () => {
    if (userName === '' || password === '') {
      setMsg('用户名或密码不能为空')
      return
    }
    setHelpUrl('')
    setMsg('')
    LoginApi.getInstance()
      .login(userName, password)
      .then(res => {
        setMsg('登录成功')
      })
      .catch(e => {
        const { code, data: { helpUrl = '' } = {}, msg } = e
        setMsg(msg)
        setHelpUrl(helpUrl)
      })
  }
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="登录"
        righTitle="注册"
        onRightClick={() => {
          Linking.openURL(Constants.apiDoc)
        }}
      />
      <View style={styles.line} />
      <View style={styles.content}>
        <Input
          label="用户名"
          placehodler="请输入用户名"
          onChangeText={text => setUserName(text)}
        />
        <Input
          label="密码"
          placehodler="请输入密码"
          secure={true}
          onChangeText={text => setPassword(text)}
        />
        <ConfirmButton title="登录" onClick={onLogin} />
        <Tips msg={msg} helpUrl={helpUrl} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4'
  }
})
