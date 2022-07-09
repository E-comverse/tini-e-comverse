
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
  orderId?: string;
}
interface HomeDataCustomMethods {
  parseDataToString(data: HomeData): string;
  onCreateOrder: () => void;
  onPayment: () => void;
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
  return _post_(CREATE_ORDER_API, {
    code
  }).then(res => {
    return res;
  })
}

Page<HomeData, HomeDataCustomMethods>({
  data: { value: "is default value", orderId: '' },
  parseDataToString(data:Object) {
    return JSON.stringify(data, null, 2);
  },
  onCreateOrder() {
    this.setData({
      value: Date.now() + ''
    })
    my.getAuthCode({
      success: async ({ authCode }) => {
        const order = await createOrder(authCode);

        this.setData({
          orderId: order.id
        })
      },
    })
  },
  onPayment() {
    my.makePayment({
      orderId: this.data.orderId || '',
      success: () => {
        console.log('success')
      },
      fail: (err) => {
        console.log('fail', err, err.errorMessage)

        return {};
      },
      complete: () => {}
    })
  }
});
 
 