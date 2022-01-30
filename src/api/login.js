import { saveBoarding } from '../utils/BoardingUtil'
import Constants from '../config/constants'
import { post } from '../utils/http'

/**
 * 登录Dao
 */
export default class LoginApi {
  constructor() {}
  static getInstance() {
    if (!LoginApi.instance) {
      LoginApi.instance = new LoginApi()
    }

    return LoginApi.instance
  }
  /**
   * 注册
   * @param userName 从https://api.devio.org/uapi/swagger-ui.html#/ 上注册
   * @param password
   */
  login(userName, password) {
    return new Promise((resolve, reject) => {
      const {
        login: { api }
      } = Constants
      const formData = new FormData()
      formData.append('userName', userName)
      formData.append('password', password)
      post(api)(formData)()
        .then(res => {
          const { code, data, msg } = res
          if (code === 0) {
            saveBoarding(data)
            resolve(data || msg)
          } else {
            reject(res)
          }
        })
        .catch(e => {
          console.log(e)
          reject({ code: -1, msg: '哎呀出错了' })
        })
    })
  }

  //   /**
  //    * 注册
  //    * @param userName
  //    * @param password
  //    * @param imoocId 慕课网ID，从https://www.imooc.com/user/setbindsns 上获取
  //    * @param orderId 课程订单号
  //    */
  //   registration(
  //     userName: string,
  //     password: string,
  //     imoocId: string,
  //     orderId: string
  //   ): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //       const {
  //         registration: { api }
  //       } = Constants
  //       const formData = new FormData()
  //       formData.append('userName', userName)
  //       formData.append('password', password)
  //       formData.append('imoocId', imoocId)
  //       formData.append('orderId', orderId)
  //       post(api)(formData)()
  //         .then((res: any) => {
  //           const { code, data, msg } = res
  //           if (code === 0) {
  //             saveBoarding(data)
  //             resolve(data || msg)
  //           } else {
  //             reject(res)
  //           }
  //         })
  //         .catch(e => {
  //           console.log(e)
  //           reject({ code: -1, msg: '哎呀出错了' })
  //         })
  //     })
  //   }
}
