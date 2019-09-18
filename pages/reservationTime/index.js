// pages/reservationTime/index.js
const commonApi = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durations:[],
    date:null
  },
  //选择时间
  selectTime(e){
    console.log(e)
    let durationId = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let max = e.currentTarget.dataset.max;
    let duration = e.currentTarget.dataset.duration;
    let date = this.data.date;
    wx.navigateTo({
      url: `../reservationNumber/index?durationId=${durationId}&status=${status}&max=${max}&date=${date}&duration=${duration}`,
    })
  },
  getDoubleNum(num) {
    return num < 10 ? '0' + num : num
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
    let nowDate = new Date();
    let dateFormal = nowDate.getFullYear() + '-' + this.getDoubleNum(nowDate.getMonth() + 1) + '-' + this.getDoubleNum(nowDate.getDate())
    let thisDate = new Date(dateFormal).getTime()
    let selectDate = new Date(date).getTime()
    let reduceTime = selectDate - thisDate;
   
    commonApi.getReservationTimes(params).then(res => {
      if(res.code==200){
        let getDurations = [];
        if(reduceTime>0){
          getDurations = res.data.records;
        }else{
          let nowTime = nowDate.getTime();
          let getRecords = res.data.records;
          getRecords.map(item=>{
            let timeRange = item.duration.split('-')[1].split(':');
            let endTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), Number(timeRange[0]), Number(timeRange[1]), 0).getTime();
            if(endTime-nowTime < 5*60*1000){
              item.status = '3'
            }
            getDurations.push(item)
          })
        }
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
    wx.hideShareMenu();
    let date = options.date;
    this.setData({
    	date:date
    })
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