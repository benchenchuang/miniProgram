const http = require('./httpRequest');
//用户登录
export const userLogin = (params) => http.sendRequest(`user/register`, 'POST', params)
//获取用户预约信息
export const getUserReservation = () => http.sendRequest(`user/userInfo?`, 'GET')
//根据日期查询时间段
export const getReservationTimes = (params) => http.sendRequest(`duration/queryDuration`,'POST',params);
//预约参观
export const postUserReservation = (params) => http.sendRequest(`user/reserve`,'POST',params)
//取消预约
export const cancelReservation = (params) => http.sendRequest(`user/cancel`,'POST',params)