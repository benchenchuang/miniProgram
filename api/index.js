const http = require('./httpRequest')
const version = 'V1.0'
//用户登录
export const userLogin = (params) => http.sendRequest(`${version}/mini/login`, 'POST', params)
//获取openid
export const getOpenId = (params) => http.sendRequest(`${version}/mini/getOpenId`, 'POST', params)
//获取用户信息
export const getUserInfo = (userId) => http.sendRequest(`${version}/mini/getUserInfo/${userId}`, 'GET')
//根据openid获取用户
export const getUserOpenId = (id) => http.sendRequest(`${version}/mini/loginByWxAqrCode/${id}`, 'GET')
//获取二维码
export const createWxAqrCode = (userId) => http.sendRequest(`${version}/mini/createWxAqrCode/${userId}`, 'GET')
//识别名片
export const postCardFile = (file) => http.uploadImgRequest(`${version}/mini/identifyPaperCard`, file)
//添加电子名片
export const addCard = (params) => http.sendRequest(`${version}/mini/identifyPaperCard`, 'PUT', params)
//获取名片夹
export const getCards = (params) => http.sendRequest(`${version}/mini/identifyPaperCardList`, 'POST', params)
//获取行业列表
export const getIndustry = () => http.sendRequest(`${version}/mini/getIndustryList`, 'GET')
//获取兴趣爱好列表
export const getInterestList = () => http.sendRequest(`${version}/mini/getInterestList`, 'GET')
//编辑名片
export const editCard = (params) => http.sendRequest(`${version}/mini/getUserInfo`, 'PUT', params)
//收支明细
export const paymentsList = (params) => http.sendRequest(`${version}/distribution/queryBudget`, 'POST', params)
//提现记录
export const queryWithdrawalRecord = (params) => http.sendRequest(`${version}/distribution/queryWithdrawalRecord`, 'POST', params)
//可提现余额查询
export const queryWithdrawalMoney = () => http.sendRequest(`${version}/distribution/queryWithdrawalMoney`, 'GET')
//添加提现记录
export const addWithdrawalRecord = (params) => http.sendRequest(`${version}/distribution/addWithdrawalRecord`, 'POST', params)
//获取举报类型/ 1.名片举报 2.作品举报
export const getReportList = (type) => http.sendRequest(`${version}/report/getReport/${type}`, 'GET')
//分销佣金
export const queryInviteRecord = () => http.sendRequest(`${version}/distribution/queryInviteRecord`, 'GET')
//业绩统计
export const queryAchievement = (params) => http.sendRequest(`${version}/distribution/queryAchievement`, 'POST', params)
//获取精英圈列表
export const elitelist = (params) => http.sendRequest(`${version}/cream/queryCreamPerson`, 'POST', params)
//获取精英计划
export const elitePlan = () => http.sendRequest(`${version}/cream/queryOneCream`, 'GET')
//用户动作收集
/**
 *  actionCode：1001 查看名片
    actionCode：1002 转发名片
    actionCode：1003 关注名片
    actionCode：1004 举报名片
    actionCode：1011 查看作品
    actionCode：1012 评论作品
    actionCode：1013 点赞作品
    actionCode：1014 转发作品
    actionCode：1015 回复内容
    actionCode：1016 收藏作品
    actionCode：1017 举报作品
    actionCode：1021 人脉宝藏中查看名片
    actionCode：1022 人脉宝藏中关注名片
 *  {
 *  "actionCode": "1001",
    "target": "名片",
    "description": "",
    "formId":'',
    "userId": "f6bb4535-337d-429c-9f51-8a467a76c9c7"
    }
 */
export const clickActionLog = (params) => http.sendRequest(`${version}/data/clickActionLog`, 'POST', params);
//魅力值详情
export const showCharm = () => http.sendRequest(`${version}/data/showCharm`, 'GET')
//获取人脉广场列表
export const pubAlllist = (params) => http.sendRequest(`${version}/cream/queryAllCard`, 'POST', params)
//举报
export const reportAction = (params) => http.sendRequest(`${version}/report/addReport`, 'POST', params)
//人脉广场搜索
export const searchCard = (params) => http.sendRequest(`${version}/cream/searchCard`, 'POST', params)
//首次提醒 type 1 : 首次创建  2 首次转发自己名片  3 首次发布作品
export const showFirstModal = (type) => http.sendRequest(`${version}/mini/firstRemind/${type}`, 'GET');
//获取用户签到
export const showSign = () => http.sendRequest(`${version}/report/showSign`, 'GET');
//用户签到 /report/addSign
export const addSign = () => http.sendRequest(`${version}/report/addSign`, 'GET');
//获取今日运势
export const getFortune = () => http.sendRequest(`${version}/report/getTodayFortune`, 'GET');

//关注/取消关注
//参数：focusUsertId;//被关注人id
//         type;//1关注，2取消关注
export const seedAction = (params) => http.sendRequest(`${version}/user/Circle/handelMyFocusList`, 'POST', params)

//获取省份列表
export const getProvince = () => http.sendRequest(`${version}/data/dataGetProvince`, 'GET')
//获取城市列表
export const getCity = (id) => http.sendRequest(`${version}/data/dataGetCity/${id}`, 'GET')
//获取学校列表
export const getSchool = (id) => http.sendRequest(`${version}/data/dataGetSchool/${id}`, 'GET')
//获取手机号
export const getPhoneNum = (params) => http.sendRequest(`${version}/mini/getPhone`, 'POST', params)