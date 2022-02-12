import { combineReducers } from 'redux'
import popular from './popular'
import trending from './trending'
import theme from './theme'
export default combineReducers({
  popular,
  trending,
  theme
})
