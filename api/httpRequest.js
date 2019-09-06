// const baseUrl = 'https://personal-dev.mekeai.com/api'; //请求的接口域名//wxe38b4d7ea200c4df
const baseUrl = 'https://personal.mekeai.com/api'; //上线的接口域名//wx1eda9a9c08e86fbe
// const baseUrl = 'http://192.168.1.231:9001/api'; //请求的接口域名//wxe38b4d7ea200c4df

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
      },
      fail: err => {
        wx.setStorageSync('sessionId', null);
        wx.switchTab({
          url: '/pages/home/index/index',
        })
        reject(err)
      }
    })
  })
  return promise
}

const uploadQiniugFile = (url,token, file) => {
  // wx.showLoading({
  //   title: '请求中，请耐心等待..'
  // });
  let promise = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      filePath: file,
      name: 'file',
      formData: {
        'token': token
      },
      success(res) {
        wx.hideLoading();
        if (res.statusCode === 502) {
          console.log('服务正在维护中')
        } else if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
  return promise
}

const uploadImgRequest = (url, filePath) => {
  let promise = new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${baseUrl}/${url}`,
      filePath: filePath,
      name: 'img',
      header: {
        'Content-type': 'multipart/form-data',
        'session_id': getSessionId()
      },
      formData: null,
      complete: (res) => {
        wx.hideLoading();
        if (res.statusCode === 502) {
          wx.showToast({
            title: '认证失败！请重新上传',
            icon: 'none',
            duration: 2000
          });
          console.log('服务正在维护中')
        } else if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: '认证失败！请重新上传',
            icon: 'none',
            duration: 2000
          });
          reject(res.data)
        }
      }
    })
   })
  return promise
};

module.exports = {
  sendRequest: sendRequest,
  uploadImgRequest: uploadImgRequest,
  uploadQiniugFile,
  baseUrl: baseUrl
}