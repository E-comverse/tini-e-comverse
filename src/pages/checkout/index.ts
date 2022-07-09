import { _post_ } from '../../services/auth.service';
import { CREATE_ORDER_API } from '../../constant';

const createOrder = async (code: string) => {
  return _post_(CREATE_ORDER_API, {
    code
  }).then(res => {
    return res;
  }).catch(() => {
    my.navigateTo({ url: 'pages/tini-world/index' });
  })
}

Page({
  data: {
    listProduct: [],
    orderId: ''
  },
  // On tap payment button
  makePayment() {
    my.alert({
      title: 'Thanh toán thành công',
      content: 'Quý khách sẽ được chuyển đến trang thông tin vận chuyển',
      buttonText: 'Đồng ý',
      success: () => {
        console.log('Success');
        my.navigateTo({ url: 'pages/tracking-shipping/index' });
      },
      fail: () => {
        console.log('Fail');
      },
      complete: () => {
        console.log('Complete');
      },
    });
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

        my.makePayment({
          orderId: this.data.orderId || '',
          success: () => {
            my.navigateTo({ url: 'pages/tini-world/index' });
          },
          fail: (err) => {
            console.log('fail', err, err.errorMessage)
    
            return {};
          },
          complete: () => {}
        })
      },
    })
  },
  // onPayment() {
  //   my.makePayment({
  //     orderId: this.data.orderId || '',
  //     success: () => {
  //       console.log('success')
  //     },
  //     fail: (err) => {
  //       console.log('fail', err, err.errorMessage)

  //       return {};
  //     },
  //     complete: () => {}
  //   })
  // }
});
