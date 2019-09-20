//index.js
//获取应用实例
const app = getApp()
const indexApi = require('../../api/index.js')
Page({
  data: {
    isAuthorize:false,
    buyMask:false,
    reserveMask:false,
    telPhone:app.globalData.telPhone,
    isReservation:false,
    isOnce:false
  },
  goBuyTickets(){
    wx.navigateToMiniProgram({
      appId: 'wxd6fe1d1b1a33df84',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  getAuthorize(info) {
    this.setData({
      userInfo: info.detail,
      showSign:true
    });
    this.getReservation();
  },
  bindGetUserInfo(res){
    if (res.detail.userInfo) {
      wx.showLoading({
        title: '授权登陆中...',
      })
      let info = res.detail.userInfo;
      let params = {};
      params.code = app.globalData.code;
      params.sex = info.gender + '';
      params.nickName = info.nickName;
      indexApi.userLogin(params).then(res => {
        if (res.code == 200) {
          wx.hideLoading()
          let getData = res.data;
          let userInfo = info;
          userInfo.token = getData.token;
          app.globalData.userInfo = userInfo;
          app.globalData.token = getData.token;
          wx.setStorageSync('token', getData.token)
          wx.setStorageSync('userInfo', userInfo)
          this.setData({
            isAuthorize: true
          });
          this.getReservation();
        }
      }).catch(reject => {
        wx.hideLoading()
        wx.showToast({
          title: reject.message,
          icon: 'none',
          duration: 1000
        })
      })
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 1000
      })
    }
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.telPhone
    })
  },
  //点击预约
  reservationHandle(){
    if(this.data.isReservation){//已经有预约信息
      wx.navigateTo({
        url: '../myReservation/index',
      })
    }else if(this.data.isOnce) {
      wx.navigateTo({
        url: '../reservationDate/index',
      })
    }else{
      this.setData({
        buyMask: true
      });
    }
  },
  //我的预约
  goMyReservation(){
    if (this.data.isReservation) {//已经有预约信息
      wx.navigateTo({
        url: '../myReservation/index',
      })
    }else if(this.data.isOnce){
      wx.navigateTo({
        url: '../reservationDate/index',
      })
    } else {
      this.setData({
        buyMask: true
      });
    }
  },
  stopDrag(){
    return false;
  },
  //确定购买
  sureBuyHandle(){
    this.setData({
      buyMask: false,
      reserveMask:true
    });
  },
  //取消提示
  cancelBuyMadal(){
    this.setData({
      buyMask:false
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getReservation() {
    indexApi.getUserReservation().then(res => {
      if(res.code==200){
        if(res.data && res.data.num){
          this.setData({
            isReservation: true
          })
        }else{
          this.setData({
            isReservation: false
          })
          if (res.data && res.data.day) {
            this.setData({
              isOnce: true
            })
          }
        }
      }else{
        this.setData({
          isReservation: false
        })
        if (res.data && res.data.day){
          this.setData({
            isOnce:true
          })
        }
      }
    })
  },
  onLoad: function () {
    wx.showShareMenu();
    let that = this;
    let userId = wx.getStorageSync('token')
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] && userId) {
          that.setData({
            isAuthorize: true
          })
        } else {
          that.setData({
            isAuthorize: false
          });
        }
      }
    })
  },
  onShow(){
    let token = wx.getStorageSync('token') || ''
    if (token){
      this.getReservation()
    }
  },
  onHide: function () {
    this.setData({
      buyMask: false,
      reserveMask: false
    })
  },
  
})
