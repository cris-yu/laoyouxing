import { GlobalUser, GlobalState } from './types/index';
import { Storage } from './utils/storage';
import { authApi } from './utils/api';
import { PAGES } from './constants/index';

interface IAppOption {
  globalData: GlobalState;
  userInfoReadyCallback?: (user: GlobalUser) => void;
}

App<IAppOption>({
  globalData: {
    user: null,
    lastRole: null,
  },

  onLaunch() {
    console.log('老友行小程序启动');
    
    // 从本地读取 token 和 lastRole
    const token = Storage.getToken();
    const lastRole = Storage.getLastRole();

    if (token && lastRole) {
      // 验证 token 有效性
      authApi.me()
        .then((res) => {
          if (res.data) {
            // token 有效，更新全局用户信息
            this.globalData.user = {
              ...res.data,
              token,
            };
            this.globalData.lastRole = lastRole;

            // 根据角色跳转到对应首页
            this.navigateToHomePage(lastRole);

            // 触发回调
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(this.globalData.user);
            }
          }
        })
        .catch((error) => {
          console.error('token 验证失败:', error);
          // token 无效，清除本地存储
          Storage.removeToken();
          Storage.removeLastRole();
          Storage.removeUserInfo();
          // 跳转到角色选择页
          wx.reLaunch({ url: PAGES.ROLE_SELECT });
        });
    } else {
      // 没有 token，跳转到角色选择页
      wx.reLaunch({ url: PAGES.ROLE_SELECT });
    }
  },

  /**
   * 根据角色跳转到对应首页
   */
  navigateToHomePage(role: 'child' | 'traveler') {
    if (role === 'child') {
      wx.reLaunch({ url: PAGES.CHILD_HOME });
    } else if (role === 'traveler') {
      // 检查是否有分享参数
      const options = this.onShow.length > 0 ? {} : {};
      wx.reLaunch({ url: PAGES.TRAVELER_HOME });
    }
  },

  onShow(options: any) {
    console.log('小程序显示', options);
    
    // 处理分享卡片打开场景
    if (options.scene === 1007 || options.scene === 1008) {
      // 从分享卡片打开
      const query = options.query || {};
      if (query.orderId && query.travelerName) {
        // 优先按出行人端流程处理
        const url = `${PAGES.TRAVELER_HOME}?orderId=${query.orderId}&travelerName=${encodeURIComponent(query.travelerName)}`;
        wx.reLaunch({ url });
      }
    }
  },

  onHide() {
    console.log('小程序隐藏');
  },

  onError(msg: string) {
    console.error('小程序错误:', msg);
  },
});
