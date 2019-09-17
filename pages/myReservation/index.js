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
    isOverTime:false
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.telPhone
    })
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
          reservationData: reservationData
        })
      }
      console.log(res)
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
    this.getReservation();
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
    if(this.data.status=='success'){
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