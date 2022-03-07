import Types from '@/store/types'
import LanguageDao from '@/utils/LanguageUtil'

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
  return async dispatch => {
    try {
      let languages = await new LanguageDao(flagKey).fetch()
      debugger
      dispatch({
        type: Types.LANGUAGE_LOAD_SUCCESS,
        languages: languages,
        flag: flagKey
      })
    } catch (e) {
      console.log(e)
    }
  }
}
