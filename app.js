//app.js
const apiIndex = require('./api/index.js')
App({
  onLaunch: function () {
    this.globalData.isStart = true;
    //获取手机信息
    let systemInfo = wx.getSystemInfoSync()
    // console.log(systemInfo)
    if (systemInfo.model.indexOf('iPhone X') >= 0 || systemInfo.model.indexOf('MI 8') >= 0 || systemInfo.screenHeight>=760) {
      this.globalData.isDevice = true;
    }
    wx.hideShareMenu(); 
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.globalData.code = res.code;
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    code: null,
    isDevice:false,
    sessionId:null,
    telPhone: '400-820-8820'
  }
})