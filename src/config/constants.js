/**
 * 全局常量类
 */
export default {
  headers: {
    'course-flag': 'rn',
    'auth-token': 'fd82d1e882462e23b8e88aa82198f166'
  },
  url: 'https://api.devio.org/uapi/',
  login: {
    api: 'user/login'
  },
  apiDoc: 'https://api.devio.org/uapi/swagger-ui.html#/',
  registration: {
    api: 'user/registration'
  },
  popular: {
    api: 'popular'
  },
  trending: {
    api: 'trending'
  },
  test: {
    api: 'test/test'
  }
}
export const tabs = [
  {
    path: 'stars:>1',
    name: 'ALL',
    short_name: 'ALL',
    checked: true
  },
  {
    path: 'iOS',
    name: 'iOS',
    checked: true
  },
  {
    path: 'react-native',
    name: 'React Native',
    checked: true
  },
  {
    path: 'MySQL',
    name: 'MySQL',
    checked: false
  },
  {
    path: 'AngularJS',
    name: 'AngularJS',
    checked: false
  },
  {
    path: 'jQuery',
    name: 'jQuery',
    checked: false
  },
  {
    path: 'react',
    name: 'React',
    checked: true
  }
]
