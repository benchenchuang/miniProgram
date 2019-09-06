// pages_card/component/authorize/index.js
const app = getApp();
const indexApi = require('../../../api/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTab: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    isAuthorize: true
  },
  ready() {
    let that = this;
    let userId = wx.getStorageSync('sessionId')
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo'] && userId) {
          that.setData({
            isAuthorize: true
          })
        }else{
          wx.hideTabBar({
            animation: true,
            success: (e) => {
            }
          })
          that.setData({
            isAuthorize: false
          });
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    noScroll() {
      return false;
    },
    //点击授权登陆
    openAuthorize(res){
      if(res.detail.userInfo){
        wx.showLoading({
          title: '授权登陆中...',
        })
        let info = res.detail.userInfo;
        let params={};
        params.nickName = info.nickName;
        params.headIcon = info.avatarUrl;
        params.sex = info.gender;
        params.address = `${info.country}，${info.province}，${info.city}`;
        app.userLogin(1,params).then(res=>{
          wx.hideLoading()
          let getUserInfo = res.oneselfUserInfo;
          app.globalData.userInfo = getUserInfo;
          app.globalData.sessionId = res.sessionId;
          wx.setStorageSync('sessionId', res.sessionId)
          wx.setStorageSync('userInfo', getUserInfo)
          this.setData({
            isAuthorize: true
          })
          if (this.data.isTab) {
            wx.showTabBar({
              animation: true,
              success: (e) => {
                // console.log(e)
              }
            })
          }
          app.saveUserInfo(getUserInfo);
          indexApi.showFirstModal(1).then(res=>{
            if(res.state ==0){
              wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 4000
              })
            }
          })
          this.triggerEvent('sendUserInfo', getUserInfo)
        }).catch(reject=>{
          wx.hideLoading()
          wx.showToast({
            title: reject.message,
            icon: 'none',
            duration: 1000
          })
        })
      }else{
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1000
        })
      }
    }
  }
})
