/**
 * 网络请求封装
 * 提供基础的 GET/POST 方法
 * 当前使用 mock 数据，后续可以替换为真实接口
 */

const { routeList, routeDetails, myTrips, tripDetails } = require('../mock/routes.js');

/**
 * 基础请求方法（预留接口）
 */
function request(url, options = {}) {
  const {
    method = 'GET',
    data = {},
    header = {},
  } = options;

  return new Promise((resolve, reject) => {
    // TODO: 后续替换为真实接口调用
    // wx.request({
    //   url: baseURL + url,
    //   method,
    //   data,
    //   header,
    //   success: (res) => resolve(res.data),
    //   fail: reject
    // });
    
    // 当前返回 mock 数据
    resolve({ code: 0, message: 'success', data: {} });
  });
}

/**
 * GET 请求
 */
function get(url, data) {
  return request(url, { method: 'GET', data });
}

/**
 * POST 请求
 */
function post(url, data) {
  return request(url, { method: 'POST', data });
}

/**
 * 获取线路列表
 */
function getRouteList(params = {}) {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      let result = [...routeList];
      
      // 筛选：出发地
      if (params.departureCity) {
        result = result.filter(item => item.departureCity === params.departureCity);
      }
      
      // 筛选：天数
      if (params.days) {
        result = result.filter(item => item.days === parseInt(params.days));
      }
      
      // 筛选：价格范围
      if (params.priceMin) {
        result = result.filter(item => item.priceFrom >= parseInt(params.priceMin));
      }
      if (params.priceMax) {
        result = result.filter(item => item.priceFrom <= parseInt(params.priceMax));
      }
      
      resolve({
        code: 0,
        message: 'success',
        data: result
      });
    }, 300);
  });
}

/**
 * 获取线路详情
 */
function getRouteDetail(routeId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detail = routeDetails[routeId];
      if (detail) {
        resolve({
          code: 0,
          message: 'success',
          data: detail
        });
      } else {
        reject({
          code: -1,
          message: '线路不存在'
        });
      }
    }, 300);
  });
}

/**
 * 获取我的行程列表
 */
function getMyTrips() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: 'success',
        data: myTrips
      });
    }, 300);
  });
}

/**
 * 获取行程详情
 */
function getTripDetail(tripId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detail = tripDetails[tripId];
      if (detail) {
        resolve({
          code: 0,
          message: 'success',
          data: detail
        });
      } else {
        reject({
          code: -1,
          message: '行程不存在'
        });
      }
    }, 300);
  });
}

module.exports = {
  request,
  get,
  post,
  getRouteList,
  getRouteDetail,
  getMyTrips,
  getTripDetail
};
