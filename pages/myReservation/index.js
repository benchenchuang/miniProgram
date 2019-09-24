// pages/myReservation/index.js
const app = getApp()
const indexApi = require('../../api/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status:'false',
    isCancel:false,
    telPhone: app.globalData.telPhone,
    reservationData:null,
    isOverTime:false,
    isAuthorize: false,
    buyMask:false,
    reserveMask:false
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.telPhone
    })
  },
  //点击授权
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
          wx.setStorageSync('userInfo', userInfo);
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
  //取消预约
  cancelReservation(){
    let that =this;
    let durationId = this.data.reservationData.durationId;
    let num = this.data.reservationData.num;
    wx.showModal({
      content: '是否取消预约',
      cancelText:'否',
      cancelColor:'#555556',
      confirmText:'是',
      confirmColor:'#6490FE',
      success(res) {
        if (res.confirm) {
          indexApi.cancelReservation({durationId,num}).then(res=>{
            if(res.code==200){//取消成功
              that.setData({
                isCancel:true,
                status: 'false',
              })
            }
            console.log(res)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //确定购买
  sureBuyHandle() {
    this.setData({
      buyMask: false,
      reserveMask: true
    });
  },
  goBuyTickets() {
    wx.navigateToMiniProgram({
      appId: 'wxd6fe1d1b1a33df84',
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        
      }
    })
  },
  //取消提示
  cancelBuyMadal() {
    this.setData({
      buyMask: false
    });
    wx.redirectTo({
      url: '../index/index',
    })
  },
  //获取预约信息
  getReservation() {
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    indexApi.getUserReservation().then(res => {
      if (res.code == 200) {
        let reservationData= res.data;
        let timeRange = reservationData.duration.split('-')[1].split(':');
        let dayRang = reservationData.day.split('-');
        let endTime = new Date(dayRang[0], (dayRang[1]-1), dayRang[2], Number(timeRange[0]), Number(timeRange[1]), 0).getTime();
        if ((nowTime - endTime)>0){
          console.log(1)
          this.setData({
            isOverTime:true
          })
        }
        this.setData({
          reservationData: reservationData,
          isAuthorize: true
        });
      }else{
        this.setData({
          buyMask:true,
          isAuthorize: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.from){
      this.setData({
        status:options.from
      })
    }
    wx.hideShareMenu();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let userId = wx.getStorageSync('token')
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] && userId) {
          that.setData({
            isAuthorize: true
          });
          that.getReservation();
        } else {
          that.setData({
            isAuthorize: false
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.status == 'success' || this.data.status == 'exist'){
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})