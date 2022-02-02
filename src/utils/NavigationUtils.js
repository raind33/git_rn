import { StackActions } from '@react-navigation/native'
/**
 * 全局导航跳转工具类 by CrazyCodeBoy
 */
export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param {*} parmas 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(parmas, page) {
    const navigation = NavigationUtil.navigation || (parmas || {}).navigation
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null')
      return
    }
    navigation.navigate(page, {
      ...parmas,
      navigation: undefined //fix Non-serializable values were found in the navigation state. Check:
    })
  }
  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack(navigation) {
    navigation.goBack()
  }
  /**
   * 重置到首页
   */
  static resetToHomePage(params) {
    const { navigation } = params
    navigation.dispatch(StackActions.replace('main', {}))
  }
  /**
   * 重置到登录
   */
  static login(params = {}) {
    let { navigation } = params
    if (!navigation) {
      navigation = NavigationUtil.navigation
    }
    navigation.dispatch(StackActions.replace('login', {}))
  }
  /**
   * 重置到注册
   */
  static registration(params = {}) {
    let { navigation } = params
    if (!navigation) {
      navigation = NavigationUtil.navigation
    }
    navigation.dispatch(StackActions.replace('register', {}))
  }
}
