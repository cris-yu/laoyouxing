import { authApi } from '../../utils/api';
import { Storage } from '../../utils/storage';
import { PAGES } from '../../constants/index';

Page({
  data: {
    loading: false,
  },

  /**
   * 选择角色
   */
  async selectRole(e: any) {
    const role = e.currentTarget.dataset.role as 'child' | 'traveler';
    
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    wx.showLoading({ title: '登录中...' });

    try {
      // 调用微信登录
      const loginRes = await wx.login();
      const code = loginRes.code;

      // 调用后端登录接口
      const res = await authApi.login(code, role);

      if (res.data) {
        const { token, user } = res.data;

        // 保存 token 和角色信息
        Storage.setToken(token);
        Storage.setLastRole(role);
        Storage.setUserInfo(user);

        // 更新全局数据
        const app = getApp<IAppOption>();
        app.globalData.user = { ...user, token };
        app.globalData.lastRole = role;

        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
        });

        // 跳转到对应首页
        setTimeout(() => {
          if (role === 'child') {
            wx.reLaunch({ url: PAGES.CHILD_HOME });
          } else {
            wx.reLaunch({ url: PAGES.TRAVELER_HOME });
          }
        }, 1500);
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none',
      });
      this.setData({ loading: false });
    }
  },
});

interface IAppOption {
  globalData: {
    user: any;
    lastRole: 'child' | 'traveler' | null;
  };
}
