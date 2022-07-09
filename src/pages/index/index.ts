
/// <reference lib="dom" /> 
// => fix missing setTimeout

import { AUTH_TOKEN_API, CLIENT_ID, EXCHANGE_AUTH_CODE_API, CREATE_SIGNATURE_API } from '../../constant';
import { _post_ } from '../../services/auth.service';

interface HomeData {
  value: string;
}
interface HomeDataCustomMethods {
  parseDataToString(data: HomeData): string;
  onTap: () => void;
}

const exchangeAuthCode = async (code: string) => {
  return _post_(EXCHANGE_AUTH_CODE_API, {
    code,
  }).then(res => {
    return res;
  })
}

Page<HomeData, HomeDataCustomMethods>({
  data: { value: "is default value" },
  // @ts-ignore ==> test ts ignore flag
  // onLoad(query = {}) {
   
  //   setTimeout(() => {
  //     this.setData(clone({ value: "has been changed" }));
  //   }, 1000);
  // },
  parseDataToString(data:Object) {
    return JSON.stringify(data, null, 2);
  },
  onTap() {
    this.setData({
      value: Date.now() + ''
    })
    my.getAuthCode({
      success: async ({ authCode, authSuccessScope, authErrorScope }) => {
        console.log(authCode, authSuccessScope, authErrorScope);
        // console.log(signature);
        const { data, error } = await exchangeAuthCode(authCode);
        console.log(data, error);
      },
      // scopes: ['offline']
      // fail: (res) => {

      // }
    })
  }
});
 
 