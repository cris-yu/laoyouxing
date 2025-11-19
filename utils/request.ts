import { API_BASE_URL } from '../constants/index';
import { ApiResponse } from '../types/index';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
  needAuth?: boolean;
}

/**
 * 统一的请求封装
 */
export function request<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    data,
    header = {},
    needAuth = true,
  } = options;

  return new Promise((resolve, reject) => {
    // 获取token
    let token = '';
    if (needAuth) {
      token = wx.getStorageSync('token') || '';
      if (!token) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
        });
        wx.reLaunch({
          url: '/pages/role-select/index',
        });
        reject(new Error('未登录'));
        return;
      }
    }

    // 构建完整URL
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    // 发起请求
    wx.request({
      url: fullUrl,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...(needAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...header,
      },
      success: (res) => {
        const response = res.data as ApiResponse<T>;
        
        if (response.code === 0) {
          resolve(response);
        } else {
          // 处理业务错误
          wx.showToast({
            title: response.message || '请求失败',
            icon: 'none',
          });
          reject(new Error(response.message));
        }
      },
      fail: (err) => {
        // 处理网络错误
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
}

/**
 * GET 请求
 */
export function get<T = any>(url: string, data?: any, needAuth = true): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'GET', data, needAuth });
}

/**
 * POST 请求
 */
export function post<T = any>(url: string, data?: any, needAuth = true): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'POST', data, needAuth });
}

/**
 * PUT 请求
 */
export function put<T = any>(url: string, data?: any, needAuth = true): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'PUT', data, needAuth });
}

/**
 * DELETE 请求
 */
export function del<T = any>(url: string, data?: any, needAuth = true): Promise<ApiResponse<T>> {
  return request<T>(url, { method: 'DELETE', data, needAuth });
}
