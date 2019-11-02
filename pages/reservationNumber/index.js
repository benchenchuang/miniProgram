// pages/reservationNumber/index.js
const app = getApp()
const indexApi = require('../../api/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telPhone: app.globalData.telPhone,
    peopleNum:1,
    maxNum:10,
    status: '0',
    durationId: '',
    isAuthorize: false
  },
  //减少人数
  reduceHandle(){
    let thisNum = this.data.peopleNum;
    if(thisNum<=1){
      return false;
    }
    this.setData({
      peopleNum:thisNum-1
    })
  },
  //增加人数
  addHandle(){
    let thisNum = this.data.peopleNum;
    if (thisNum >= this.data.maxNum) {
      return false;
    }
    this.setData({
      peopleNum: thisNum + 1
    })
  },
  //点击预约
  clickReservation(){
    wx.showLoading({
      title: '预约提交中...',
    })
    let status = this.data.status;
    let durationId = this.data.durationId;
    let num = this.data.peopleNum;
    indexApi.postUserReservation({ status, durationId,num}).then(res=>{
      wx.hideLoading()
      if(res.code==200){
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 1000
        });
        setTimeout(()=>{
          wx.redirectTo({
            url: '../myReservation/index?from=success'
          })
        }, 1000)
      }else{
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 1000
        });
        wx.clearStorageSync('token')
        setTimeout(() => {
          wx.reLaunch({
            url: '../index/index'
          })
        }, 1000)
      }
    })
  },
  //预约电话
  callReservation(){
    wx.makePhoneCall({
      phoneNumber: this.data.telPhone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    let durationId = options.durationId;
    let status = options.status;
    let max = options.max;
    let date = options.date;
    let duration = options.duration;
    let maxNum =this.data.maxNum;
    let peopleNum =this.peopleNum;
    if(max<=maxNum){
      maxNum = max;
    }
    this.setData({
      maxNum: maxNum,
      status:status,
      date:date,
      duration:duration,
      durationId:durationId
    })
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
        } else {
          that.setData({
            isAuthorize: false
          });
        }
      }
    })
  },
  //获取预约信息
  getReservation() {
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    indexApi.getUserReservation().then(res => {
      if (res.code == 200) {
        let reservationData = res.data;
        let timeRange = reservationData.duration.split('-')[1].split(':');
        let dayRang = reservationData.day.split('-');
        let endTime = new Date(dayRang[0], (dayRang[1] - 1), dayRang[2], Number(timeRange[0]), Number(timeRange[1]), 0).getTime();
        if ((nowTime - endTime) > 0) {
          console.log(1)
          this.setData({
            isOverTime: true
          })
        }
        //已授权并有预约信息
        wx.showToast({
          title: '已有预约信息',
          duration: 1500
        });
        setTimeout(() => {
          wx.redirectTo({
            url: '../myReservation/index?from=exist',
          })
        }, 1500)
      } else {
        //未预约 直接预约
        this.clickReservation()
      }
    })
  },
  //点击授权
  bindGetUserInfo(res) {
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
          wx.hideLoading()
        if (res.code == 200) {
          let getData = res.data;
          let userInfo = info;
          userInfo.token = getData.token;
          app.globalData.userInfo = userInfo;
          app.globalData.token = getData.token;
          wx.setStorageSync('token', getData.token)
          wx.setStorageSync('userInfo', userInfo);
          this.setData({
            isAuthorize:true
          });
          this.getReservation();
        }else{
          app.getLoginCode();
          wx.showToast({
            title: '授权登录失败，请重试',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch(reject => {
        wx.hideLoading();
        app.getLoginCode();
        wx.showToast({
          title: '授权登录失败，请重试',
          icon: 'none',
          duration: 1000
        })
      })
    } else {
      wx.showToast({
        title: '授权失败，请重试',
        icon: 'none',
        duration: 1000
      })
    }
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