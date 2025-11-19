import { STORAGE_KEYS } from '../constants/index';

/**
 * 存储工具类
 */
export class Storage {
  /**
   * 设置存储
   */
  static set(key: string, value: any): void {
    try {
      wx.setStorageSync(key, value);
    } catch (error) {
      console.error('存储失败:', error);
    }
  }

  /**
   * 获取存储
   */
  static get<T = any>(key: string): T | null {
    try {
      return wx.getStorageSync(key) || null;
    } catch (error) {
      console.error('读取存储失败:', error);
      return null;
    }
  }

  /**
   * 删除存储
   */
  static remove(key: string): void {
    try {
      wx.removeStorageSync(key);
    } catch (error) {
      console.error('删除存储失败:', error);
    }
  }

  /**
   * 清空存储
   */
  static clear(): void {
    try {
      wx.clearStorageSync();
    } catch (error) {
      console.error('清空存储失败:', error);
    }
  }

  /**
   * 设置 Token
   */
  static setToken(token: string): void {
    this.set(STORAGE_KEYS.TOKEN, token);
  }

  /**
   * 获取 Token
   */
  static getToken(): string | null {
    return this.get(STORAGE_KEYS.TOKEN);
  }

  /**
   * 删除 Token
   */
  static removeToken(): void {
    this.remove(STORAGE_KEYS.TOKEN);
  }

  /**
   * 设置最后角色
   */
  static setLastRole(role: 'child' | 'traveler'): void {
    this.set(STORAGE_KEYS.LAST_ROLE, role);
  }

  /**
   * 获取最后角色
   */
  static getLastRole(): 'child' | 'traveler' | null {
    return this.get(STORAGE_KEYS.LAST_ROLE);
  }

  /**
   * 删除最后角色
   */
  static removeLastRole(): void {
    this.remove(STORAGE_KEYS.LAST_ROLE);
  }

  /**
   * 设置用户信息
   */
  static setUserInfo(userInfo: any): void {
    this.set(STORAGE_KEYS.USER_INFO, userInfo);
  }

  /**
   * 获取用户信息
   */
  static getUserInfo(): any {
    return this.get(STORAGE_KEYS.USER_INFO);
  }

  /**
   * 删除用户信息
   */
  static removeUserInfo(): void {
    this.remove(STORAGE_KEYS.USER_INFO);
  }
}
