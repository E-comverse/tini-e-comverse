Page({
  data: {
    listProduct: [],
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
});
