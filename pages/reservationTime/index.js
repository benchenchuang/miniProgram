// pages/reservationTime/index.js
const commonApi = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durations:[]
  },
  //选择时间
  selectTime(e){
    console.log(e)
    let durationId = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let max = e.currentTarget.dataset.max;
    wx.navigateTo({
      url: `../reservationNumber/index?durationId=${durationId}&status=${status}&max=${max}`,
    })
  },
  //获取特定日期的时间段
  getTimes(date){
    let params={
      page:{
        current:1,
        size:20
      },
      param: { 
        day: date 
      }
    }
    commonApi.getReservationTimes(params).then(res => {
      if(res.code==200){
        let getDurations = res.data.records;
        this.setData({
          durations: getDurations
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = options.date;
    this.getTimes(date);
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