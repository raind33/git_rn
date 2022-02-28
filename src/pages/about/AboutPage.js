import React, { Component } from 'react'
import { View, Linking } from 'react-native'

import AboutCommon, { FLAG_ABOUT } from './AboutCommon'
import config from '../../config/about.json'
import GlobalStyles from '../../assets/styles/global'
import NavigationUtil from '../../utils/NavigationUtils'
import { MORE_MENU } from '../../config/menu'
import ViewUtil from '../../utils/ViewUtil'

type Props = {}

export default class AboutPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.params = this.props.route.params
    this.aboutCommon = new AboutCommon(
      {
        ...this.params,
        navigation: this.props.navigation,
        flagAbout: FLAG_ABOUT.flag_about
      },
      data => this.setState({ ...data })
    )
    this.state = {
      data: config
    }
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount()
  }

  componentWillUnmount() {
    this.aboutCommon.componentWillUnmount()
  }

  onClick(menu) {
    const { theme } = this.params
    let RouteName,
      params = { theme, navigation: this.props.navigation }
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage'
        params.title = '教程'
        params.url = 'https://coding.m.imooc.com/classindex.html?cid=304'
        break
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage'
        break
      case MORE_MENU.Feedback:
        const url = 'mailto://crazycodeboy@gmail.com'
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log("Can't handle url: " + url)
            } else {
              Linking.openURL(url)
            }
          })
          .catch(e => {
            console.error('An error occurred', e)
          })
        break
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName)
    }
  }

  getItem(menu) {
    const { theme } = this.params
    return ViewUtil.getMenuItem(
      () => this.onClick(menu),
      menu,
      theme.themeColor
    )
  }

  render() {
    const content = (
      <View>
        {this.getItem(MORE_MENU.Tutorial)}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.About_Author)}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Feedback)}
      </View>
    )
    return this.aboutCommon.render(content, this.state.data.app)
  }
}
