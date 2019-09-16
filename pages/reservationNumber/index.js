// pages/reservationNumber/index.js
const app = getApp()
const commonApi = require('../../api/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    telPhone: app.globalData.telPhone,
    peopleNum:1,
    maxNum:6,
    status: '0',
    durationId: ''
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
    commonApi.postUserReservation({ status, durationId,num}).then(res=>{
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
          title: '预约失败，请重试！',
          icon: 'none',
          duration: 1000
        });
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
    let durationId = options.durationId;
    let status = options.status;
    let max = options.max;
    let maxNum =6;
    let peopleNum =this.peopleNum;
    if(max<=6){
      maxNum = max;
    }
    this.setData({
      maxNum: maxNum,
      status:status,
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