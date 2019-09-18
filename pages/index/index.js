//index.js
//获取应用实例
const app = getApp()
const indexApi = require('../../api/index.js')
Page({
  data: {
    isToAuthorize:true,
    buyMask:false,
    reserveMask:false,
    telPhone:app.globalData.telPhone,
    isReservation:false,
    isOnce:false
  },
  goBuyTickets(){
    wx.navigateToMiniProgram({
      appId: 'wxf22d0e0349262efc',
      path: 'page/index/index?id=123',
      envVersion: 'develop',
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
        reserveMask: true
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
        reserveMask: true
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
