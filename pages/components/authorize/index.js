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
    let userId = wx.getStorageSync('token')
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo'] && userId) {
          that.setData({
            isAuthorize: true
          })
        }else{
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
        let params = {};
        params.code = app.globalData.code;
        params.sex = info.gender+'';
        params.nickName = info.nickName;
        console.log(params)
        indexApi.userLogin(params).then(res=>{
          if(res.code==200){
            wx.hideLoading()
            let getData= res.data;
            let userInfo = info;
            userInfo.token = getData.token;
            app.globalData.userInfo = userInfo;
            app.globalData.token = getData.token;
            wx.setStorageSync('token', getData.token)
            wx.setStorageSync('userInfo', userInfo)
            this.setData({
              isAuthorize: true
            })
            this.triggerEvent('sendUserInfo', userInfo)
          }
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
