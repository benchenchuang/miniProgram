const baseUrl = 'https://personal.mekeai.com/api'; //上线的接口域名//wx1eda9a9c08e86fbe

//获取token
const getSessionId = () => {
  var sessionId = wx.getStorageSync('sessionId')
  return sessionId;
};
/**
 * url:请求接口的短链接
 * method:请求的方法 GET PUT POST ...
 * params:请求的参数
 */
const sendRequest = (url, method, params) => {
  // wx.showLoading({
  //   title: '请求中，请耐心等待..'
  // });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/${url}`,
      method: method,
      data: params,
      header: {
        'Content-Type': 'application/json',
        'session_id': getSessionId()
      },
      complete: (res) => {
        // wx.hideLoading();
        if (res.statusCode == 502) {
          wx.showLoading({
            title: '服务正在维护中'
          })
          console.log('服务正在维护中')
        } else if (res.statusCode == 200) {
            resolve(res.data)
        } else if (res.statusCode == 401){
          wx.setStorageSync('sessionId', null);
        } else {
          reject(res.data)
        }
      }
    })
  })
  return promise
}
module.exports = {
  sendRequest: sendRequest,
  baseUrl: baseUrl
}