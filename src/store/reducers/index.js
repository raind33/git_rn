import { combineReducers } from 'redux'
import popular from './popular'
import trending from './trending'
import theme from './theme'
import language from './language'
import favorite from './favorite'
export default combineReducers({
  popular,
  trending,
  theme,
  favorite,
  language
})
