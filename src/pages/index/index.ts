
/// <reference lib="dom" /> 
// => fix missing setTimeout

import {
  AUTH_TOKEN_API,
  CLIENT_ID,
  EXCHANGE_AUTH_CODE_API,
  CREATE_SIGNATURE_API,
  CREATE_ORDER_API
} from '../../constant';
import { _post_ } from '../../services/auth.service';

interface HomeData {
  value: string;
}
interface HomeDataCustomMethods {
  parseDataToString(data: HomeData): string;
  onTap: () => void;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const exchangeAuthCode = async (code: string) => {
  return _post_(EXCHANGE_AUTH_CODE_API, {
    code,
  }).then(res => {
    return res;
  })
}

const createOrder = async (code: string) => {
  // const customer_id = customer.id;
  // const items: Item[] = [
  //   {
  //     name: 'Man Ne',
  //     quantity: 4,
  //     price: 100
  //   }
  // ];
  // const customer_info = customer;

  return _post_(CREATE_ORDER_API, {
    code
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
        // const { data, error } = await exchangeAuthCode(authCode);
        // const { access_token: accessToken, customer } = data;
        const order = await createOrder(authCode);

        console.log('order', order);
      },
      // scopes: ['offline']
      // fail: (res) => {

      // }
    })
  }
});
 
 