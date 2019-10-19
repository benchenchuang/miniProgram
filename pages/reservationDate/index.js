//获取应用实例
const app = getApp()

Page({
  data: {
    year: 0,
    month: 0,
    thisMonth:0,
    startMonth:0,
    endMonth: new Date('2019-11').getTime(),
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    todayTime:0,
    endDateTime: 0
  },
  selectDate(e){
    let selectTime = e.currentTarget.dataset.time;
    let selectDate = e.currentTarget.dataset.date;
    if (selectTime < this.data.todayTime || selectTime > this.data.endDateTime){
      return false;
    }
    this.setData({
      isDate: selectDate
    })
  },
  //下一步
  getDateNext(){
    let selectDate = this.data.isDate;
    wx.navigateTo({
      url: `../reservationTime/index?date=${selectDate}`,
    })
    console.log(this.data.isDate)
  },
  onLoad: function () {
    this.dateInit();
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let todayTime = new Date(year + '-' + this.getDoubleNum(month) + '-' + this.getDoubleNum(now.getDate())).getTime();
    let startTime = new Date('2019-10-18').getTime();
    let endDate = startTime > todayTime ? new Date('2019-10-18'):new Date(now);
    let crisisTime = new Date('2019-12-01').getTime();
    let nowTime = now.getTime();
    if(nowTime>crisisTime){
        endDate.setDate(now.getDate() + 30);
    }else{
        endDate=new Date('Dec 31, 2019 23:59:59');
    }
    this.setData({
      year: year,
      month: startTime > todayTime ?10:month,
      startMonth: startTime > todayTime ? new Date('2019-10').getTime():new Date(''+year + '-' + month).getTime(),
      isDate: startTime > todayTime ?'2019-10-18':year + '-' + this.getDoubleNum(month) + '-' + this.getDoubleNum(now.getDate()),
      todayTime: startTime > todayTime ? startTime:todayTime,
      endDateTime: endDate.getTime(),
      limitedTime: new Date('2020-03-01').getTime()
    })
  },
  dateInit: function (setYear, setMonth) {
    let thisDate = new Date();
    let thisYear = thisDate.getFullYear();
    let thisMonth = thisDate.getMonth() + 1;
    let todayTime = new Date(thisYear + '-' + this.getDoubleNum(thisMonth) + '-' + this.getDoubleNum(thisDate.getDate())).getTime();
    let startTime = new Date('2019-10-18').getTime();
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : (startTime > todayTime ? new Date('2019-10-18'):new Date());
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '-' + this.getDoubleNum(month + 1) + '-' + '01').getDay();//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isDate: year + '-' + this.getDoubleNum(month + 1) + '-' + this.getDoubleNum(num),
          dateNum: num,
          dateTime: new Date(year + '-' + this.getDoubleNum(month + 1) + '-' + this.getDoubleNum(num)).getTime()
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.dateInit(year, month);
    this.setData({
      year: year,
      month: (month + 1),
      thisMonth:new Date(year+'-'+(month+1)).getTime()
    })
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.dateInit(year, month);
    this.setData({
      year: year,
      month: (month + 1),
      thisMonth: new Date(''+year + '-' + (month + 1)).getTime()
    })
  },
  getDoubleNum(num){
    return num<10?'0'+num:num
  }
})