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
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs)
    // wx.checkSession({
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: res => {
    //     console.log(res)
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              let params={};
              this.globalData.sessionId = wx.getStorageSync('sessionId');
              params.sessionId = wx.getStorageSync('sessionId')
              //根据token获取用户信息
              // this.userLogin(params).then(res=>{
              //   let getUserInfo = res.oneselfUserInfo;
              //   this.globalData.userInfo = getUserInfo;
              //   this.globalData.sessionId = res.sessionId;
              //   wx.setStorageSync('sessionId', res.sessionId)
              //   wx.setStorageSync('userInfo', getUserInfo)
              // })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onHide(){
    if (this.globalData.isStart){
      console.log('进入后台');
      this.globalData.isStart = false;
    }
  },
  // 登录
  userLogin(type=0,userInfo={}){
    var _this = this;
    let promise = new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            userInfo.code = res.code;
            apiIndex.userLogin(userInfo).then(res => {
              if (res.state == 0) {
                resolve(res.data)
              }else if(res.state == 30007 && type!=1){
                wx.switchTab({
                  url: '/pages/home/index/index',
                })
              } else {
                reject(res)
              }
            })
          }
      })
    })
    return promise
  },
  saveUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
  },
  globalData: {
    userInfo: null,
    isDevice:false,
    sessionId:null
  }
})