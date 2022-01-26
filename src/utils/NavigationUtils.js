class NavigationUtils {
  static goHome(props) {
    const { navigation } = props
    navigation.navigate('main')
  }
}

export default NavigationUtils
