import React, { Component } from 'react'

import { DeviceInfo, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
//fix from rn
import { WebView } from 'react-native-webview'
//fix from '../common/NavigationBar';
import BackPressComponent from '../../components/BackPress'
import NavigationUtil from '../../utils/NavigationUtils'
import NavigationBar from '../../components/NavigationBar'
import ViewUtil from '../../utils/ViewUtil'
import { SafeAreaView } from 'react-native'

class WebViewPage extends Component {
  constructor(props) {
    super(props)
    //fix this.params = this.props.route.params;
    this.params = this.props.route.params
    const { title, url } = this.params
    this.state = {
      title: title,
      url: url,
      canGoBack: false
    }
    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress()
    })
  }

  componentDidMount() {
    this.backPress.componentDidMount()
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount()
  }

  onBackPress() {
    this.onBack()
    return true
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }

  render() {
    const { theme: { themeColor } = {} } = this.props
    let navigationBar = (
      <NavigationBar
        title={this.state.title}
        style={{ backgroundColor: themeColor }}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
      />
    )

    return (
      <View style={{ flex: 1 }}>
        {navigationBar}
        <WebView
          ref={webView => (this.webView = webView)}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
        />
      </View>
    )
  }
}
//fix
const mapStateToProps = state => ({
  theme: state.theme.theme
})
export default connect(mapStateToProps, null)(WebViewPage)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  }
})
