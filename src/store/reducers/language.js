import Types from '@/store/types'
import { FLAG_LANGUAGE } from '@/utils/LanguageUtil'

const defaultState = {
  languages: [],
  keys: []
}
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LANGUAGE_LOAD_SUCCESS: //获取数据成功
      if (FLAG_LANGUAGE.flag_key === action.flag) {
        debugger
        return {
          ...state,
          keys: action.languages
        }
      } else {
        console.log(FLAG_LANGUAGE.flag_key, 999, action.flag)
        return {
          ...state,
          languages: action.languages
        }
      }
    default:
      return state
  }
}
