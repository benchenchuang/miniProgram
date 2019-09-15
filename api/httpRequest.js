const baseUrl = 'https://cc.80mang.cn/reserve'; //上线的接口域名//wx1eda9a9c08e86fbe

//获取token
const getToken = () => {
  var token = wx.getStorageSync('token') || ''
  return token;
};
/**
 * url:请求接口的短链接
 * method:请求的方法 GET PUT POST ...
 * params:请求的参数
 */
const sendRequest = (url, method, params) => {
  let token = getToken();
  if(params){
    params.token = token;
  }else{
    url = url + `&token=${token}`
  }
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/${url}`,
      method: method,
      data: params,
      header: {
        'Content-Type': 'application/json',
        'token': getToken()
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