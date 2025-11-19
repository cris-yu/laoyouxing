/**
 * 格式化日期
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 格式化价格
 */
export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let previous = 0;
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - previous > wait) {
      func.apply(this, args);
      previous = now;
    }
  };
}

/**
 * 显示加载提示
 */
export function showLoading(title: string = '加载中...'): void {
  wx.showLoading({
    title,
    mask: true,
  });
}

/**
 * 隐藏加载提示
 */
export function hideLoading(): void {
  wx.hideLoading();
}

/**
 * 显示成功提示
 */
export function showSuccess(title: string): void {
  wx.showToast({
    title,
    icon: 'success',
    duration: 2000,
  });
}

/**
 * 显示错误提示
 */
export function showError(title: string): void {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2000,
  });
}

/**
 * 显示确认对话框
 */
export function showConfirm(
  content: string,
  title: string = '提示'
): Promise<boolean> {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success: (res) => {
        resolve(res.confirm);
      },
      fail: () => {
        resolve(false);
      },
    });
  });
}

/**
 * 获取页面参数
 */
export function getPageQuery<T = Record<string, any>>(): T {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return (currentPage?.options as T) || ({} as T);
}

/**
 * 导航到页面
 */
export function navigateTo(url: string, params?: Record<string, any>): void {
  let fullUrl = url;
  
  if (params) {
    const query = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    fullUrl = `${url}?${query}`;
  }
  
  wx.navigateTo({ url: fullUrl });
}

/**
 * 重定向到页面
 */
export function redirectTo(url: string, params?: Record<string, any>): void {
  let fullUrl = url;
  
  if (params) {
    const query = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    fullUrl = `${url}?${query}`;
  }
  
  wx.redirectTo({ url: fullUrl });
}

/**
 * 返回上一页
 */
export function navigateBack(delta: number = 1): void {
  wx.navigateBack({ delta });
}

/**
 * 生成分享路径
 */
export function generateSharePath(
  path: string,
  params: Record<string, any>
): string {
  const query = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${path}?${query}`;
}
